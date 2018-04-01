type TableQueryResponse = {
    rows: ResponseRow[];
};

type ResponseRow = {
    columns: ResponseColumn[];
    key: string;
};

type ResponseColumn = {
    columnName: string;
    value: string;
};

export { TableQueryResponse, ResponseRow, ResponseColumn };


