import fastify from "fastify";

const server = fastify({ logger: true });

server.get("/", async (req, res) => {
  return res.send("Hello World !!");
});

server
  .listen({ port: 3000, host: "0.0.0.0" })
  .then(() => console.log("Servidor rodando !!!"))
  .catch((e) => {
    console.error(e);
  });
