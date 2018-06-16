import { sha3_512 } from 'js-sha3';
class User {
    _id: string;
    username: string;
    hash: string;
    roles: Array<string>;

    constructor(username: string, password: string, roles: Array<string>) {
        this.username = this._id = username;
        this.hash = sha3_512(password);
        this.roles = roles;
    }
}
export default User;