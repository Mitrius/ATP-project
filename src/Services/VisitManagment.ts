import Visit from "../Models/Visit";
import Procedure from "../Models/Procedure";
import AbstractService from "./AbstractService";

class VisitManagment extends AbstractService {

    constructor() {
        super();
    }
    public async AddVisit(patient: string, date: Date, doctor: string, procedures: Array<Procedure>): Promise<Visit> {
        let nextVisit: Visit = new Visit(date, doctor, patient, procedures);

        this.db.collection("visits").insertOne(nextVisit);
        return nextVisit;
    }
    public async CancelVisit(visit_id: string): Promise<Boolean> {
        let result = await this.db.collection("visits").deleteOne({ 'key': visit_id });
        return result.deletedCount === 1;
    }
    public async ReSchedule(visit_id: string, date: Date, doctor: string): Promise<Visit> {
        let previousVisit = await this.db.collection("visits").findOne({ "key": visit_id });
        let nextVisit = new Visit(date, doctor, previousVisit.patient, previousVisit.procedures);

        this.db.collection("visits").replaceOne({ 'key': previousVisit.id }, nextVisit);
        return nextVisit;
    }
    public async GetPatientVisits(patient: string): Promise<Array<Visit>> {
        let visits = await this.db.collection("visits").find({ "patient": patient }).toArray();
        return visits.map((record) => JSON.parse(record) as Visit)
    }
    public async GetVisit(id: string): Promise<Visit> {
        let visit = await this.db.collection("visits").findOne({ "id": id }) as Visit;
        return visit;
    }
}
export default new VisitManagment();