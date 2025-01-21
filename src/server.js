import http from "node:http";
import { jsson } from "./middlewares/json.js";

const users = [];
const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/users") {
    return res.end(JSON.stringify(users));
  }

  await jsson(req, res);

  if (method === "POST" && url === "/users") {
    const { name, email } = req.body;
    users.push({
      id: 1,
      name,
      email,
    });

    return res.writeHead(201).end();
  }
  return res.writeHead(404).end("Not Found");
});

server.listen(3333);
