import * as express from "express";
import VisitController from "../Controllers/VisitController";

let router = express.Router();

router.get("/visit/plan", VisitController.AddVisit);
router.post("/visit",VisitController.PlanVisit);
router.get("/visit/{visit_id}",)


export default router;