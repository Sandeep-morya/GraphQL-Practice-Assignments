import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
import http from "http";
import { Server } from "socket.io";

import Query, { updateChats } from "./graphql/resolvers/Query.js";
import Todo from "./graphql/resolvers/Todo.js";
import typeDefs from "./graphql/schema.js";
import axios from "axios";

const context = async () => {
	const API = axios.create({
		baseURL: "https://jsonplaceholder.typicode.com",
	});
	return { axios: API };
};

const app = express();
const httpServer = http.createServer(app);

// :: Set up Apollo Server ::
const server = new ApolloServer({
	typeDefs,
	resolvers: { Query, Todo },
	/**
	 * The ApolloServerPluginDrainHttpServer plugin is a useful way to prevent errors when the
	 * server is shut down. When the server is shut down, the HTTP server will be automatically
	 * closed. However, if there are any pending requests, the HTTP server will not be able to
	 * close until the requests have finished. The ApolloServerPluginDrainHttpServer plugin ensures
	 * that all pending requests are drained before the server shuts down, which prevents errors
	 * from occurring.
	 */
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();
app.use(express.json(), cors());
app.use("/graphql", expressMiddleware(server, { context: context }));

const io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", (socket) => {
	console.log(socket.id); // x8WIv7-mJelg7on_ALbx
	socket.on("new:message", ({ content, user }) => {
		const chats = updateChats(content, user);
		io.emit("chat:update", chats);
	});
});

httpServer.listen(8080);
console.log("🚀 Server ready at http://localhost:8080");
