const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
import { log } from "./logger";
let dbName;

switch (process.env.NODE_ENV) {
    case "test":
        dbName = "todo_test";
        break;
    case "production":
        dbName = "todo";
        break;
    default:
        dbName = "todo_dev";
}

const dbAddress = process.env.DB_HOST || "127.0.0.1";
const dbPort = process.env.DB_PORT || 27017;


let options = {
    useMongoClient: true
};

if (process.env.DB_AUTH === "true") {
    options["user"] = process.env.DB_USER;
    options["pass"] = process.env.DB_PASS;
}

mongoose.connect(`mongodb://${dbAddress}:${dbPort}/${dbName}`, options)
    .then(() => {
        log.info(`Express server connected with mongodb on ${dbAddress}`);
    }).catch(err => {
        if (err.message.indexOf("ECONNREFUSED") !== -1) {
            console.error("Error: The server was not able to reach MongoDB. Maybe it's not running?");
            process.exit(1);
        } else {
            throw err;
        }
    });
