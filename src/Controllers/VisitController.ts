import * as express from "express";
import * as path from "path";
import VisitManagment from "../Services/VisitManagment";
import Visit from "../Models/Visit";

class VisitController {
    public PlanVisit(req: express.Request, resp: express.Response): void {
        resp.sendfile("/planVisit.html");
    }
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
    public async EditVisit(req: express.Request, resp: express.Response) {
        let reqData = req.body;
        let status = await VisitManagment.ReSchedule(reqData["id"], reqData["date"], reqData["doctor"]);

        resp.status(201);
        resp.send(status)
    }
    public async GetPatientVisits(req: express.Request, resp: express.Response) {
        let visits = await VisitManagment.GetPatientVisits(req.body["patient"]);

        resp.send(visits);
        resp.status(200);

    }
    public async GetVisit(req: express.Request, resp: express.Response) {
        let visit: Visit = await VisitManagment.GetVisit(req.body["id"]);

        resp.send(visit);
        resp.status(200);
    }
}
export default new VisitController();