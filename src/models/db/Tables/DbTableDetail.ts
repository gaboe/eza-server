import { DbTable } from "./DbTable";
import { ReferenceConstraint } from "../ReferenceConstraints/DbReferenceConstraint";

type DbTableDetail =
    DbTable & {
        columns: DbColumn[],
        referencingTables: ReferenceConstraint[],
        referencedTables: ReferenceConstraint[],
    };

export { DbTableDetail };