import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { errorMiddleware } from "./src/middlewares/error.middleware";
import mongoose from "mongoose";
import usersRoute from "./src/routes/users.route";
import morgan from "morgan";
// @ts-ignore
import { getEndpoints } from "express-routes";
import rateLimit, { MemoryStore } from "express-rate-limit";
import helmet from "helmet";

console.time("start");

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

console.time("database");
mongoose.connect(process.env.MONGODB as string, {}, () => {
  console.log(`\x1b[32mconnected to database`);
  console.timeEnd("database");
});

app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});
app.use("/v1/api/users", usersRoute);
app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    message: "NOT_FOUND",
  });
});

app.use(errorMiddleware);

app.use(helmet());
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 1 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  store: new MemoryStore(),
});

app.use(apiLimiter);

app.listen(port, () => {
  console.log(
    `\x1b[35m⚡️[server]: Server is running at http://localhost:${port}`
  );
  console.timeEnd("start");

  getEndpoints(app).forEach((route: { path: string; methods: string[] }) => {
    if (route.path != "*") {
      route.methods.forEach((method) =>
        console.log(
          `\x1b[33m${new Date().toISOString()} \x1b[32m${method}\t\x1b[35m${
            route.path
          }`
        )
      );
    }
  });
});
