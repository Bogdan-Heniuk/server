import express from "express";
import cors from "cors";
import AuthRouter from "./routes/auth.js";
import CompanyRouter from "./routes/company.js";
import ChatRouter from "./routes/chat.js";
import VacancyRouter from "./routes/vacancy.js";
import UserRouter from "./routes/user.js";
import process from "process";

const app = express();

app.use(express.json({}));
app.use(
  cors({
    origin: "*",
  })
);

app.use("/auth", AuthRouter);
app.use("/chat", ChatRouter);
app.use("/company", CompanyRouter);
app.use("/vacancy", VacancyRouter);
app.use("/user", UserRouter);

process.on("uncaughtException", (error, source) => {
  process.exit(0);
});

export { app };
