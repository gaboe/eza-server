import { executeQuery } from "./SqlQuery";
import { ReferenceConstrainSql } from "../models/ReferenceContsrains/ReferenceConstrainSql";
import { ReferenceConstrain } from "../models/ReferenceContsrains/ReferenceConstrain";
import { getReferencedConstrainsQuery, getReferencingConstrainsQuery, getReferenceConstrainQuery } from "../sql/RefernceConstrainQueries";

const getReferencedContstraints = (tableName: string) => {
    const result = executeQuery<ReferenceConstrainSql, ReferenceConstrain>(getReferencedConstrainsQuery(tableName), mapEntity);
    return result;
};

const getReferencingContstraints = (tableName: string) => {
    const result = executeQuery<ReferenceConstrainSql, ReferenceConstrain>(getReferencingConstrainsQuery(tableName), mapEntity);
    return result;
};

const getReferenceConstrain = async (referencingTableName: string, referencedTableName: string) => {
    const result = await executeQuery<ReferenceConstrainSql, ReferenceConstrain>(getReferenceConstrainQuery(referencingTableName, referencedTableName), mapEntity);
    return result[0];
};

const mapEntity = (e: ReferenceConstrainSql) => {
    const rc: ReferenceConstrain = {
        constrainName: e.ConstrainName,
        referencedTableName: e.ReferencedTableName,
        referencedColumnName: e.ReferencedColumnName,
        referencingTableName: e.ReferencingTableName,
        referencingColumnName: e.ReferencingColumnName
    };
    return rc;
};

export { getReferencedContstraints, getReferencingContstraints, getReferenceConstrain };