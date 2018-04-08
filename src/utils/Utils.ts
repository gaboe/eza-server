type Diff<T extends string, U extends string> = ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T];

/**
 * Omits property from type
 * @example type Base = { a: string; b: number; };
 * @returns type Omitted = Omit<Base, "b">;
 */
type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

const nameof = <T>(key: keyof T): keyof T => key;

const isNotNullOrUndefined = <T extends Object>(input: null | undefined | T): input is T => input != null;

export { Diff, Omit, nameof, isNotNullOrUndefined };