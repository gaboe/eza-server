import { Table } from "./Table";
import { ReferenceConstrain } from "../ReferenceContsrains/ReferenceConstrain";

type TableDetail =
    Table & {
        columns: Column[],
        referencingTables: ReferenceConstrain[],
        referencedTables: ReferenceConstrain[],
    };

export { TableDetail };