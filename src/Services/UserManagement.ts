import Visit from "../Models/Visit";
import User from "../Models/User";
import AbstractService from "./AbstractService";
import Doctor from "../Models/Doctor";

class UserManagement extends AbstractService {

    constructor() {
        super();
    }

    public async AddUser(username: string, userPassword: string, roles: Array<string>): Promise<Boolean> {
        let newUser = new User(username, userPassword, roles);

        let result = await this.db.collection("users").insertOne(newUser).catch((err) => console.log(err));
        return result.insertedCount === 1;
    }
    public async AddDoctor(username: string, userPassword: string, roles: Array<string>, speciality: Array<string>): Promise<Boolean> {
        let newUser = new Doctor(username, userPassword, speciality, roles);

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
    public async GetPatients(): Promise<Array<User>> {
        let users = await this.db.collection("users").find({}).toArray();
        users = users.filter((record) => record.roles.some((role: string) => role === "patient"));
        return users as Array<User>;
    }
    public async GetDoctors(): Promise<Array<Doctor>> {
        let users = await this.db.collection("users").find({}).toArray();
        users = users.filter((record) => record.roles.some((role: string) => role === "doctor"));
        return users as Array<Doctor>
    }
    public async GetUsers(): Promise<Array<User>> {
        return await this.db.collection("users").find({}).toArray() as Array<User>;
    }


}
export default new UserManagement()