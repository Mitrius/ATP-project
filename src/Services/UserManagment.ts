import Visit from "../Models/Visit";
import User from "../Models/User";
import AbstractService from "./AbstractService";

class UserManagment extends AbstractService {

    constructor() {
        super();
    }

    public async addUser(username: string, userPassword: string, roles: Array<string>): Promise<Boolean> {
        let newUser = new User(username, userPassword);

        roles.forEach((role) => {
            newUser.addRole(role);
        });

        let result = await this.db.collection("users").insertOne(newUser).catch((err) => console.log(err) );
        return result.insertedCount === 1;
    }
    public async removeUser(username: string): Promise<Boolean> {
        let result = await this.db.collection("users").deleteOne({ "username": username }).catch((err) => console.log(err) );;
        return result.deletedCount === 1;
    }
    public async editUser(username: string, userPassword: string, roles: Array<string>): Promise<Boolean> {
        let newUser = new User(username, userPassword);

        roles.forEach((role) => {
            newUser.addRole(role);
        });
        let result = await this.db.collection("users").replaceOne({ "username": username }, newUser).catch((err) => console.log(err) );;
        return result.modifiedCount === 1;
    }

}
export default new UserManagment()