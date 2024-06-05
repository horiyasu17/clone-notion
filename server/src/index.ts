import express from "express";
import { Express, Request, Response } from "express";

const app: Express = express();
const port = process.env.PORT || 5050;

app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`),
);

app.get("/", (req: Request, res: Response) => res.send("Hello World!"));
