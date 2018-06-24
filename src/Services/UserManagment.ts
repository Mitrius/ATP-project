import Visit from "../Models/Visit";
import User from "../Models/User";
import AbstractService from "./AbstractService";

class UserManagment extends AbstractService {

    constructor() {
        super();
    }

    public async AddUser(username: string, userPassword: string, roles: Array<string>): Promise<Boolean> {
        let newUser = new User(username, userPassword, roles);

        let result = await this.db.collection("users").insertOne(newUser).catch((err) => console.log(err));
        return result.insertedCount === 1;
    }
    public async RemoveUser(username: string): Promise<Boolean> {
        let result = await this.db.collection("users").deleteOne({ "_id": username }).catch((err) => console.log(err));;
        return result.deletedCount === 1;
    }
    public async EditUser(username: string, userPassword: string, roles: Array<string>): Promise<Boolean> {
        let newUser = new User(username, userPassword, roles);

        let result = await this.db.collection("users").replaceOne({ "username": username }, newUser).catch((err) => console.log(err));;
        return result.modifiedCount === 1;
    }
    public async GetUser(username: string): Promise<User> {
        return await this.db.collection("users").findOne({ "username": username }) as User;
    }
    public async GetUsers(): Promise<Array<User>> {
        return await this.db.collection("users").find({}).toArray();
    }

}
export default new UserManagment()