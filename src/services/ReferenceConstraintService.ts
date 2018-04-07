import { executeQuery } from "./SqlQuery";
import { MsSqlReferenceConstraint } from "../models/mssql/models/ReferenceContstrains/MsSqlReferenceConstrainSql";
import { ReferenceConstraint } from "../models/db/ReferenceConstraints/DbReferenceConstraint";
import { getReferencedConstrainsQuery, getReferencingConstrainsQuery, getReferenceConstrainQuery } from "../sql/ReferenceConstraintQueries";

const getReferencedContstraints = (tableName: string) => {
    const result = executeQuery<MsSqlReferenceConstraint, ReferenceConstraint>(getReferencedConstrainsQuery(tableName), mapEntity);
    return result;
};

const getReferencingContstraints = (tableName: string) => {
    const result = executeQuery<MsSqlReferenceConstraint, ReferenceConstraint>(getReferencingConstrainsQuery(tableName), mapEntity);
    return result;
};

const getReferenceConstraint = async (referencingTableName: string, referencedTableName: string) => {
    const result = await executeQuery<MsSqlReferenceConstraint, ReferenceConstraint>(getReferenceConstrainQuery(referencingTableName, referencedTableName), mapEntity);
    return result[0];
};

const mapEntity = (e: MsSqlReferenceConstraint) => {
    const rc: ReferenceConstraint = {
        constraintName: e.ConstraintName,
        referencedSchemaName: e.ReferencedSchemaName,
        referencedTableName: e.ReferencedTableName,
        referencedColumnName: e.ReferencedColumnName,
        referencingSchemaName: e.ReferencingSchemaName,
        referencingTableName: e.ReferencingTableName,
        referencingColumnName: e.ReferencingColumnName
    };
    return rc;
};

export { getReferencedContstraints, getReferencingContstraints, getReferenceConstraint };