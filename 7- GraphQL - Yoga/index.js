import { createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import schema from "./graphQL/schema.js";

createServer(createYoga({ schema })).listen(4000, () => {
	console.log(`Server is Running on http://localhost:4000`);
});
