import { MongoClient, Db } from "mongodb";

class AbstractService {
    db!: Db;

    constructor() {
        this.connect().catch((err) => console.log(err));
    }
    async connect() {
        let client = await MongoClient.connect("mongodb://127.0.0.1:27017").catch((err) => console.log(err));
        this.db = await client.db("clinic");
        return this.db;
    }
}
export default AbstractService;