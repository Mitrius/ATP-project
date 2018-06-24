import * as express from "express";
import ProcedureController from "../Controllers/ProcedureController";

let router = express.Router();

router.get("/procedures", ProcedureController.GetProcedures);

export default router;