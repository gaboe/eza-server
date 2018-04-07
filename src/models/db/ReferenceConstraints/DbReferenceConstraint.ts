type ReferenceConstraint = {
    constraintName: string,
    referencedSchemaName: string,
    referencedTableName: string,
    referencedColumnName: string,
    referencingSchemaName: string,
    referencingTableName: string,
    referencingColumnName: string,
};

export { ReferenceConstraint };