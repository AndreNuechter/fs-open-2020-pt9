/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Gender } from "../types";

export function isDiagnosisCodes(codes: Array<string>): boolean {
    return Array.isArray(codes) && codes.every((c: any) => isString(c));
}

export function isString(val: any): boolean {
    return typeof val === 'string';
}

export function isDate(val: string): boolean {
    return /^\d{4}-\d{2}-\d{2}$/.test(val);
}

export function assertNever(value: never): never {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
}

export function isGender(val: any): boolean {
    return Object.values(Gender).includes(val);
}