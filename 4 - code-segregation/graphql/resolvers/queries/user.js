import { complaints } from "../../../db.js";

const User = {
	complaints: (user) => complaints.filter((x) => user.id === x.userId),
};

export default User;
