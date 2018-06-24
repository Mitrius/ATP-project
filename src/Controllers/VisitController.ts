import * as express from "express";
import * as path from "path";
import UserManagment from "../Services/UserManagment";
import VisitManagment from "../Services/VisitManagment";
import Visit from "../Models/Visit";

class VisitController {
    public async AddVisit(req: express.Request, resp: express.Response) {
        let reqData = req.body;
        let visit: Visit = await VisitManagment.AddVisit(reqData["patient"], reqData["date"], reqData["doctor"], reqData["procedures"]);

        resp.status(201);
        resp.send(visit);
    }
    public async RemoveVisit(req: express.Request, resp: express.Response) {
        let reqData = req.body;
        let status = await VisitManagment.CancelVisit(reqData["id"]);
        if (status)
            resp.status(204);
        else
            resp.status(418);
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
    public async GetVisit(req: express.Request, resp: express.Response) {
        let visit: Visit = await VisitManagment.GetVisit(req.body["id"]);

        resp.send(visit);
        resp.status(200);
    }
}
export default new VisitController();