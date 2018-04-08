type MsSqlColumn = {
    COLUMN_NAME: string,
    TABLE_SCHEMA: string,
    TABLE_NAME: string,
    ORDINAL_POSITION: number,
    DATA_TYPE: string,
    IsKey: boolean;
};

export { MsSqlColumn };