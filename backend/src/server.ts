import fastify from "fastify";
import { userRoutes } from "./routes/user-routes";

const server = fastify({ logger: true });

server.register(userRoutes);

server
  .listen({ port: 3000, host: "0.0.0.0" })
  .then(() => console.log("Server is running ⚡⚡"))
  .catch((e) => {
    console.error(e);
  });
