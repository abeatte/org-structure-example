import type { FlatMember } from "../org/member.js";

export interface Test {
    case: string;
    tree: FlatMember[];
    targets: string[];
    answer: string;
};

export const NONE_FOUND_RESULT = "[NONE FOUND]";
export const CYCLE_DETECTED_RESULT = "[CYCLE DETECTED]";

const TestCases: Test[] = [
    {
        case: 'empty',
        tree: [],
        targets: ['1111', '3333'],
        answer: NONE_FOUND_RESULT,
    },
    {
        case: 'single',
        tree: [{name: 'one', id: '1111', reports: []}],
        targets: ['1111', '3333'],
        answer: NONE_FOUND_RESULT,
    },
    {
        case: 'simple-true',
        tree: [
            {name: 'left', id: '1111', reports: []},
            {name: 'boss', id: '2222', reports: ['1111', '3333']},
            {name: 'right', id: '3333', reports: []}
        ],
        targets: ['1111', '3333'],
        answer: '2222',
    },
    {
        case: 'simple-false',
        tree: [
            {name: 'left', id: '1111', reports: []},
            {name: 'boss', id: '2222', reports: ['3333']},
            {name: 'right', id: '3333', reports: []},
        ],
        targets: ['1111', '3333'],
        answer: NONE_FOUND_RESULT,
    },
    {
        case: 'cycle',
        tree: [
            {name: 'left', id: '1111', reports: ['4444']},
            {name: 'boss', id: '2222', reports: ['1111','3333']},
            {name: 'right', id: '3333', reports: []},
            {name: 'lefter', id: '4444', reports: ['1111']},
        ],
        targets: ['1111', '3333'],
        answer: CYCLE_DETECTED_RESULT,
    },
]

export default TestCases;