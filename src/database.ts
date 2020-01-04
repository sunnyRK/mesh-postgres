// import { Pool } from 'pg';
import {Client} from 'pg';

// var connectionString = "postgres://postgres:sunny@serverName/localhost:5432/orderbook";
// export const pgClient = new pg.Client(connectionString);

export const client = new Client({
    user: "postgres",
    password: "sunny",
    host: "localhost",
    database: "demo",
    port: 5432 
}) 

client.connect();
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