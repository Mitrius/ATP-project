import * as uuid from "uuid/v4";
import Procedure from "./Procedure";
class Visit {
    id: string;
    date: Date;
    doctor: string;
    patient: string;
    procedures: Array<Procedure>;

    constructor(date: Date, doctor: string, patient: string, procedures: Array<Procedure>) {
        this.id = uuid();
        this.date = date;
        this.patient = patient;
        this.doctor = doctor;
        this.procedures = procedures;
    }
}
export default Visit;