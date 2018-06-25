import * as express from "express";
import * as path from "path";
import ProceduresManagment from "../Services/ProceduresManagement";

class ProcedureController {
    async GetProcedures(req: express.Request, resp: express.Response) {
        let procedures = await ProceduresManagment.GetListOfAvailableProcedures();
        resp.status(200);
        resp.send(procedures);
    }

}
export default new ProcedureController()