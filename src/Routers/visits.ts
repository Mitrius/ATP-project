import * as express from "express";
import VisitController from "../Controllers/VisitController";

let router = express.Router();

router.get("/visits/plan", VisitController.AddVisit);
router.post("/visits",VisitController.PlanVisit);
router.get("/visits/:visit_id",VisitController.GetVisit);


export default router;