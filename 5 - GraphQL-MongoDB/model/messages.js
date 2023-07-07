import mongoose from "mongoose";

const { String, ObjectId } = mongoose.Schema.Types;

const MessageSchema = mongoose.Schema(
	{
		content: { type: String, required: true },
		sender: { type: ObjectId, ref: "User", required: true },
		reciever: { type: ObjectId, ref: "User", required: true },
	},
	{
		timestamps: { createdAt: true, updatedAt: false },
	},
);

const MessageModel = mongoose.model("Message", MessageSchema);

export default MessageModel;
