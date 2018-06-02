import User from "./User";

class Doctor extends User {
    specialities: Array<string>;
    constructor(username: string, password: string, specialities: Array<string>) {
        super(username, password);
        this.specialities = specialities;
    }
}