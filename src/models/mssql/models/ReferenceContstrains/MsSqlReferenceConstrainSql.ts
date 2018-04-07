type MsSqlReferenceConstraint = {
    ConstraintName: string,
    ReferencedSchemaName: string,
    ReferencedTableName: string,
    ReferencedColumnName: string,
    ReferencingSchemaName: string,
    ReferencingTableName: string,
    ReferencingColumnName: string,
};

export { MsSqlReferenceConstraint };