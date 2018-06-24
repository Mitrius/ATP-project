import * as express from "express";
import VisitController from "../Controllers/VisitController";

let router = express.Router();

router.post("/visits/", VisitController.AddVisit);

router.get("/visits/:visit_id", VisitController.GetVisit);
router.delete("/visits/:visit_id", VisitController.RemoveVisit);

router.get("/visits/patient/:patient_id", VisitController.GetPatientVisits);
router.get("/visits/doctor/:doctor_id", VisitController.GetDoctorsVisits);
router.get("/visits/doctor/:doctor_id/timetable", VisitController.GetDoctorTimetable);

export default router;