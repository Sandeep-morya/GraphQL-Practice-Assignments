import { complaints, students, teachers, users } from "../../../db.js";

const Query = {
	users: () => users,
	teachers: () => teachers,
	students: () => students,
	complaints: () => complaints,

	// :: Get document by ID ::
	user: (_, { id }) => users.find((user) => user.id == id),
	teacher: (_, { id }) => teachers.find((teacher) => teacher.userId == id),
	student: (_, { id }) => students.find((student) => student.userId == id),
	complaint: (_, { id }) => complaints.find((complaint) => complaint.id == id),
};
export default Query;
