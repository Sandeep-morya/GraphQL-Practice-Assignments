import fs from "fs";
const stringyFiedDB = fs.readFileSync("db.json", "utf-8");
const db = JSON.parse(stringyFiedDB.trim());
const { users, teachers, students, complaints } = db;
export { users, teachers, students, complaints };
export default db;
