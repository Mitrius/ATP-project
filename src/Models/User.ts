import { sha3_512 } from 'js-sha3';
class User {
    username: string;
    hash: string;
    roles: Array<string>;

    constructor(username: string, password: string) {
        this.username = username;
        this.hash = sha3_512(password);
        this.roles = new Array<string>();
    }
    public addRole(role: string) {
        this.roles.push(role);
    }
    public revokeRole(role: string) {
        this.roles = this.roles.filter((availRole) => availRole != role);
    }
}
export default User;