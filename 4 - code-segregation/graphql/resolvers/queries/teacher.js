import { users } from "../../../db.js";

const Teacher = {
	about: (teacher) => users.find((user) => user.id === teacher.userId),
};

export default Teacher;
