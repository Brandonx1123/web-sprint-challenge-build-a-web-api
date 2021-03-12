const express = require("express");
const helmet = require("helmet");

const server = express();

// Complete your server here!
// Do NOT `server.listen()` inside this file!
//dont need cors because it is all used on local machines and not using cross origin

const actionsRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");

server.use(express.json());
server.use(helmet());

server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);

server.get("/", (req, res) => {
  res.send("<h3>Brandons API: Proceed At Your Own Caution</h3>");
});

module.exports = server;
