type MsSqlReferenceConstraint = {
    ConstrainName: string,
    ReferencedTableName: string,
    ReferencedColumnName: string,
    ReferencingTableName: string,
    ReferencingColumnName: string,
};

export { MsSqlReferenceConstraint };