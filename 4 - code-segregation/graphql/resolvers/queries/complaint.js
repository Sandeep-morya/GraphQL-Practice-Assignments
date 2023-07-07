import { users } from "../../../db.js";

const Complaint = {
	about: (complaint) => users.find((user) => user.id === complaint.userId),
};

export default Complaint;
