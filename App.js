import "dotenv/config";
import express from "express";
import Hello from "./Hello.js";
import Courses from "./Courses/routes.js";
import Modules from "./Modules/routes.js";
import Quizzes from "./Quizzes/routes.js";
import cors from "cors";
import session from "express-session";
import SessionExercises from "./SessionExercises.js";
import Users from "./Users/routes.js";
import Lab5 from "./Lab5.js";
import mongoose from "mongoose";

const CONNECTION_STRING =
    process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";
mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        // origin: "https://a5--splendorous-selkie-55b336.netlify.app",
        credentials: true,
    })
);
app.use(express.json());

const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.HTTP_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));

Hello(app);
Courses(app);
Modules(app);
Quizzes(app);
SessionExercises(app);
Users(app);
Lab5(app);

app.listen(process.env.PORT || 4000);
