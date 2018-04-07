const getReferenceConstrainQuery = (referencingTableName: string, referencedTableName: string) => {
    return `${getBaseReferenceQuery()}
            WHERE C.TABLE_NAME  = '${referencingTableName}'
            AND C2.TABLE_NAME  = '${referencedTableName}'
    `;
};

const getReferencingConstrainsQuery = (tableName: string) => {
    return `${getBaseReferenceQuery()}
            WHERE C2.TABLE_NAME  = '${tableName}'
    `;
};

const getReferencedConstrainsQuery = (tableName: string) => {
    return `${getBaseReferenceQuery()}
            WHERE C.TABLE_NAME  = '${tableName}'
    `;
};

const getBaseReferenceQuery = () => {
    return `
        SELECT
             C.CONSTRAINT_NAME [ConstrainName]
            ,C.TABLE_NAME [ReferencingTableName]
            ,KCU.COLUMN_NAME [ReferencingColumnName]
            ,C2.TABLE_NAME  [ReferencedTableName]
            ,KCU2.COLUMN_NAME [ReferencedColumnName]

        FROM   INFORMATION_SCHEMA.TABLE_CONSTRAINTS C
            INNER JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE KCU
                ON C.CONSTRAINT_SCHEMA = KCU.CONSTRAINT_SCHEMA
                    AND C.CONSTRAINT_NAME = KCU.CONSTRAINT_NAME
            INNER JOIN INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS RC
                ON C.CONSTRAINT_SCHEMA = RC.CONSTRAINT_SCHEMA
                    AND C.CONSTRAINT_NAME = RC.CONSTRAINT_NAME
            INNER JOIN INFORMATION_SCHEMA.TABLE_CONSTRAINTS C2
                ON RC.UNIQUE_CONSTRAINT_SCHEMA = C2.CONSTRAINT_SCHEMA
                    AND RC.UNIQUE_CONSTRAINT_NAME = C2.CONSTRAINT_NAME
            INNER JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE KCU2
                ON C2.CONSTRAINT_SCHEMA = KCU2.CONSTRAINT_SCHEMA
                    AND C2.CONSTRAINT_NAME = KCU2.CONSTRAINT_NAME
                    AND KCU.ORDINAL_POSITION = KCU2.ORDINAL_POSITION
`;
};

export { getReferencedConstrainsQuery, getReferencingConstrainsQuery, getReferenceConstrainQuery };