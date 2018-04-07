type Diff<T extends string, U extends string> = ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T];

type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

const nameof = <T>(key: keyof T): keyof T => key;

export { Diff, Omit, nameof };