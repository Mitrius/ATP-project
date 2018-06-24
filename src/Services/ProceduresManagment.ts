import procedure from "../Models/Procedure";
import AbstractService from "./AbstractService";
import Procedure from "../Models/Procedure";

class ProceduresManagment extends AbstractService {
    constructor() {
        super();
    }
    public async GetListOfAvailableProcedures(): Promise<Array<Procedure>> {
        let procedures: Array<Procedure> = await this.db.collection("procedures").find({}).toArray();
        return procedures;
    }
    public async AddProcedure(procedure: Procedure) {
        this.db.collection("procedures").insert(procedure);
    }
    public async GetProcedure(procedure_name: string): Promise<Procedure> {
        return await this.db.collection("procedures").findOne({ "type": procedure_name }) as Procedure;
    }
}
export default new ProceduresManagment();