"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Pool } from 'pg';
var pg_1 = require("pg");
// var connectionString = "postgres://postgres:sunny@serverName/localhost:5432/orderbook";
// export const pgClient = new pg.Client(connectionString);
exports.client = new pg_1.Client({
    user: "postgres",
    password: "sunny",
    host: "localhost",
    database: "demo",
    port: 5432
});
exports.client.connect();
// client.connect().then(() => console.log("connected succesfully"))
//     .then(() => client.query("select * from user"))
//     // .then(results => console.table(results.rows))
//     .catch(e => console.log(e))
//     .finally(() => client.end())
// export const pool = new Pool({
//     user: "postgres",
//     host: "localhost",
//     password: "sunny",
//     database: "orderbook",
//     port: 5432
// });
