type ColumnInput = {
    name: string;
    table: ColumnInputTable;
    position: number;
    dataType: string;
};

type ColumnInputTable = {
    schemaName: string;
    tableName: string;
    isPrimary: boolean;
};

export { ColumnInput, ColumnInputTable };