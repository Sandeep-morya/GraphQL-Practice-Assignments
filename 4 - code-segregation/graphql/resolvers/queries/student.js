import { users } from "../../../db.js";

const Student = {
	about: (student) => users.find((user) => user.id === student.userId),
};

export default Student;
