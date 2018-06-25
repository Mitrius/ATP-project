import Visit from "../Models/Visit";
import Procedure from "../Models/Procedure";
import AbstractService from "./AbstractService";

class VisitManagement extends AbstractService {

    constructor() {
        super();
    }
    public async AddVisit(patient: string, date: Date, doctor: string, procedures: Array<Procedure>): Promise<Visit> {
        let nextVisit: Visit = new Visit(date, doctor, patient, procedures);

        this.db.collection("visits").insertOne(nextVisit);
        return nextVisit;
    }
    public async CancelVisit(visit_id: string): Promise<Boolean> {
        let result = await this.db.collection("visits").deleteOne({ '_id': visit_id });
        return result.deletedCount === 1;
    }
    public async GetPatientVisits(patient: string): Promise<Array<Visit>> {
        let visits: Array<Visit> = await this.db.collection("visits").find({ "patient": patient }).toArray();
        return visits;
    }
    public async GetDoctorsVisit(doctor: string): Promise<Array<Visit>> {
        let visits: Array<Visit> = await this.db.collection("visits").find({ "doctor": doctor }).toArray();
        return visits;
    }
    public async GetVisit(id: string): Promise<Visit> {
        let visit: Visit = await this.db.collection("visits").findOne({ "_id": id });
        return visit;
    }
}
export default new VisitManagement();