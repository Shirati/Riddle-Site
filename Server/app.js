const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const { config } = require("dotenv");
const { connectToDB } = require("./api/config/dbConfig");

const userRouter = require("./api/routers/user.router");
const subjectRouter = require("./api/routers/subject.router");
const difficultyRouter = require("./api/routers/difficulty.router");
const riddleRouter = require("./api/routers/riddle.router");
const ageRouter = require("./api/routers/age.router");
const statisticRouter = require("./api/routers/statistic.router");

const { notFound } = require("./api/middlewares/notFound");
const { errorHandling } = require("./errorHandling");

config();
connectToDB();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static('uploads'))

app.use("/user", userRouter);
app.use("/subject", subjectRouter);
app.use("/difficulty", difficultyRouter);
app.use("/riddle", riddleRouter);
app.use("/age", ageRouter);
app.use("/statistic", statisticRouter);


app.get('/', (req, res) => {
    res.status(200).json({
        message: "welcome"
    })
});

app.use(notFound);

app.use(errorHandling);

module.exports = app;
