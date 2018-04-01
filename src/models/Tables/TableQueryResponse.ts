type TableQueryResponse = {
    rows: ResponseRow[];
};

type ResponseRow = {
    columns: ResponseColumn[];
};

type ResponseColumn = {
    columnName: string;
    value: string;
};

export { TableQueryResponse, ResponseRow, ResponseColumn };


