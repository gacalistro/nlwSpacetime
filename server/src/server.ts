import "dotenv/config";

import fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import multipart from "@fastify/multipart";
import fileStatic from "@fastify/static";
import { resolve } from "node:path";

import { authRoutes } from "./routes/auth";
import { uploadRoutes } from "./routes/upload";
import { memoriesRoutes } from "./routes/memories";

const app = fastify();

app.register(cors, {
  origin: true,
});

app.register(jwt, {
  secret: "offmymindfromhazelenglish",
});

app.register(multipart);
app.register(fileStatic, {
  root: resolve(__dirname, "../uploads"),
  prefix: "/uploads/",
});

app.register(authRoutes);
app.register(uploadRoutes);
app.register(memoriesRoutes);

app.listen({ port: 3333, host: "0.0.0.0" }, (_err, address) =>
  console.log(`Servir is now listening on ${address}`)
);
