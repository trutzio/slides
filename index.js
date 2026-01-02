const fastify = require("fastify")({ logger: true });
const fastify_static = require("@fastify/static");
const path = require("node:path");

fastify.register(fastify_static, {
  root: path.join(__dirname, "public"),
});

fastify.register(fastify_static, {
  root: path.join(__dirname, "node_modules/reveal.js/dist"),
  prefix: "/dist/",
  decorateReply: false,
});

fastify.register(fastify_static, {
  root: path.join(__dirname, "node_modules/reveal.js/plugin"),
  prefix: "/plugin/",
  decorateReply: false,
});

fastify.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
