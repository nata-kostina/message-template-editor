// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function assertNever(x: never): never {
    throw new Error("Unexpected value. Should have been never.");
}
