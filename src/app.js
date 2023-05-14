import express from "express";
import cors from "cors";
import AuthRouter from "./routes/auth.js";
import CompanyRouter from "./routes/company.js";
import VacancyRouter from "./routes/vacancy.js";
import UserRouter from "./routes/user.js";

const app = express();

app.use(express.json({}));
app.use(
  cors({
    origin: "*",
  })
);

app.use("/auth", AuthRouter);
app.use("/company", CompanyRouter);
app.use("/vacancy", VacancyRouter);
app.use("/user", UserRouter);


export { app };
