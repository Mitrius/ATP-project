class Procedure {
    _id: string;
    type: string;
    cost: number;
    specialization: string;

    constructor(type: string, cost: number, specialization: string) {
        this.type = this._id = type;
        this.cost = cost;
        this.specialization = specialization;
    }
}
export default Procedure;