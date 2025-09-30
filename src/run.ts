import Member from "./org/member.js";
import TestCases, { CYCLE_DETECTED_RESULT, NONE_FOUND_RESULT, type Test } from "./tests/test_cases.js";
import { getResultsString, getTestCasesString, print } from "./util.js";

export interface TestResult {
    test: Test;
    result: string;
};

interface SearchMember {
    side: 'left' | 'right';
    member: Member;
}

const evaluateTestCase = (test: Test): TestResult => {
    const members: {[id: string]: Member} = {}

    test.tree.forEach(mem => {
        // create all Members
        if (!members[mem.id]) {
            members[mem.id] = new Member(mem.name, mem.id, mem.reports);
        }
    });

    const target_a = members[test.targets[0]!];
    const target_b = members[test.targets[1]!];

    // no target found
    if (!target_a || !target_b) {
        return {test, result: NONE_FOUND_RESULT};
    }

    // const {case, tree, targets, answer} = test;
    const seen_left: {[id: string]: boolean} = {}
    const seen_right: {[id: string]: boolean} = {}
    const queue: SearchMember[] = [];
    
    queue.push({side: 'left', member: target_a});
    queue.push({side: 'right', member: target_b});

    while(queue.length > 0) {
        // pop member
        const search_member = queue.shift()!;

        const left =  seen_left[search_member.member.getId()];
        const right = seen_right[search_member.member.getId()];
        if (search_member.side === 'left') {
            if (left) {
                // cycle detected
                return {test, result: CYCLE_DETECTED_RESULT};
            } else if (right) {
                // common manager found
                return {test, result: search_member.member.getId()}
            } else {
                seen_left[search_member.member.getId()] = true;
                // push their reports
                search_member.member.getReports().forEach(rep => {
                    const rep_member = members[rep]
                    if (rep_member) {
                        queue.push({side: 'left', member: rep_member});
                    }
                });
            }
        } else { // search_member.side === 'right'
            if (right) {
                // cycle detected
                return {test, result: CYCLE_DETECTED_RESULT};
            } else if (left) {
                // common manager found
                return {test, result: search_member.member.getId()}
            } else {
                seen_right[search_member.member.getId()] = true;
                // push their reports
                search_member.member.getReports().forEach(rep => {
                    const rep_member = members[rep]
                    if (rep_member) {
                        queue.push({side: 'right', member: rep_member});
                    }
                });
            }
        }
    }

    // no common manager found
    return {test, result: NONE_FOUND_RESULT};
};

print("Welcome to the Org-Mapper 5000.");

const test_cases = TestCases;
print(`Inputs: ${getTestCasesString(test_cases)}`);

print("...\nprocessing\n...");
const results = test_cases.map(evaluateTestCase)
const result_strings = results.map(r => '\n'.concat(getResultsString(r)))

print(`Results: ${result_strings}`);