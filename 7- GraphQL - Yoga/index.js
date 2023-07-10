import { createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import schema from "./graphQL/schema.js";
import { Server } from "socket.io";

const server = createServer(createYoga({ schema }));

const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
	console.log(socket.id);
	socket.on("client:send-message", (content, user) => {
		console.log({ content });
		io.emit("server:send-message", content);
	});
});

server.listen(4000, () => {
	console.log(`Server is Running on http://localhost:4000`);
});
