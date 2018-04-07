import { DbTable } from "../../db/Tables/DbTable";
import { ReferenceConstraint } from "../../db/ReferenceConstraints/DbReferenceConstraint";

type TableDetail =
    DbTable & {
        columns: DbColumn[],
        referencingTables: ReferenceConstraint[],
        referencedTables: ReferenceConstraint[],
    };

export { TableDetail };