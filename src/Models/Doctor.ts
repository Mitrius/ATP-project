import User from "./User";

class Doctor extends User {
    specialities: Array<string>;
    constructor(username: string, password: string, specialities: Array<string>, roles: Array<string>) {
        super(username, password, roles);
        this.specialities = specialities;
    }
}
export default Doctor;