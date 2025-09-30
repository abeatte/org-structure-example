import chalk from "chalk";
import type { TestResult } from "./run.js";
import type { Test } from "./tests/test_cases.js";

export function print(str: string) {
    console.log(str);
}

export function getResultsString(testResult: TestResult) : string {
    return (testResult.test.answer === testResult.result ? chalk.green("[SUCCESS]") : chalk.red("[FAILURE]")).concat(chalk.white(`: "${testResult.test.case}" ${testResult.result}`));
}

export function getTestCasesString(tests: Test[]): string {
    const test_strings = tests.reduce((prev, cur, idx, arr) => prev.concat('\t').concat(getTestCaseString(cur).concat(',\n')), '');
    return "[\n".concat(test_strings).concat("]");
}

export function getTestCaseString(test: Test): string {
    return JSON.stringify(test);
}