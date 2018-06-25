import * as express from "express";
import * as path from "path";
import UserManagment from "../Services/UserManagment";
import VisitManagment from "../Services/VisitManagment";
import Visit from "../Models/Visit";

class VisitController {
    public async AddVisit(req: express.Request, resp: express.Response) {
        let reqData = req.body;
        let plannedDate = new Date(reqData["date"]);
        let plannedEndDate = new Date(plannedDate.getTime());
        plannedEndDate.setMinutes(plannedDate.getMinutes() + 30);

        let doctor_timetable = await VisitManagment.GetDoctorsVisit(reqData["doctor"]);
        let dates = doctor_timetable.map((record) => record.date);
        if (dates.some((date) => (date >= plannedDate) && (date <= plannedEndDate))) {
            resp.status(409);
            resp.send({});
        } else {
            let visit = await VisitManagment.AddVisit(reqData["patient"], plannedDate, reqData["doctor"], reqData["procedures"]);

            resp.status(201);
            resp.send(visit);
        }
    }
    public async RemoveVisit(req: express.Request, resp: express.Response) {

        let username = req.header("Username") as string;
        let userData = await UserManagment.GetUser(username);

        let visit_id = req.param("visit_id");
        let visit = await VisitManagment.GetVisit(visit_id);

        if (!userData.roles.some((role) => (role === "admin" || (role === "patient" && username === visit.patient)))) {
            resp.status(403);
        } else {
            let status = await VisitManagment.CancelVisit(visit_id);
            if (status)
                resp.status(204);
            else
                resp.status(418);
        }

    }
    public async GetPatientVisits(req: express.Request, resp: express.Response) {
        let username = req.header("Username") as string;

        let userData = await UserManagment.GetUser(username);

        if (!userData.roles.some((role) => (role === "admin" || role === "patient"))) {
            resp.status(403);
        }
        else {
            let patient_id: string = req.param("patient_id");
            let visits = await VisitManagment.GetPatientVisits(patient_id);

            resp.send(visits);
            resp.status(200);
        }
    }
    public async GetDoctorsVisits(req: express.Request, resp: express.Response) {
        let username = req.header("Username") as string;

        let userData = await UserManagment.GetUser(username);
        if (!userData.roles.some((role) => (role === "admin" || role === "doctor"))) {
            resp.status(403);
        }
        else {
            let doctor_id: string = req.param("doctor_id");
            let visits = await VisitManagment.GetDoctorsVisit(doctor_id);

            resp.send(visits);
            resp.status(200);
        }

    }
    public async GetDoctorTimetable(req: express.Request, resp: express.Response) {
        let doctor = req.param("doctor_id");
        let doctor_visits = await VisitManagment.GetDoctorsVisit(doctor);
        let schedule = doctor_visits.map((record) => record.date);

        resp.send(schedule);
        resp.status(200);
    }
    public async GetVisit(req: express.Request, resp: express.Response) {
        let visit: Visit = await VisitManagment.GetVisit(req.param("visit_id"));

        resp.send(visit);
        resp.status(200);
    }
}
export default new VisitController();