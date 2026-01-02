const fastify = require("fastify")({ logger: true });
const fastify_static = require("@fastify/static");
const fastify_view = require("@fastify/view");
const path = require("node:path");

fastify.register(fastify_view, {
  engine: {
    ejs: require("ejs"),
  },
});

fastify.get("/:file", (req, reply) => {
  reply.view("index.ejs", {
    language: "de",
    title: "Test slide",
    theme: "night",
    highlight_theme: "monokai",
    markdown: req.params.file,
  });
});

fastify.register(fastify_static, {
  root: path.join(__dirname, "md"),
  prefix: "/md/",
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
