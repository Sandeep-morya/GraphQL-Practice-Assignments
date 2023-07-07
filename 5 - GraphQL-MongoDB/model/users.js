import mongoose from "mongoose";

const { String, Number } = mongoose.Schema.Types;

const UserSchema = mongoose.Schema(
	{
		name: String,
		email: { type: String, unique: true },
		age: Number,
		gender: String,
		password: String,
	},
	{
		timestamps: { createdAt: true, updatedAt: false },
	},
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
