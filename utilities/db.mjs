import PG from "pg";




const { Pool } = PG;

const dataBase = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "superfast",
    port: 5432
});

export default dataBase;