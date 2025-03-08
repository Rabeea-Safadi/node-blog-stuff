const { config } = require("dotenv");
const express = require("express");
const { resolve } = require("path");
const wildCardRouter = require("./routers/wild-card");
const viewsRouter = require("./routers/views");
const cookieSession = require("cookie-session");
const authRouter = require("./routers/auth");
const logMiddleware = require("./utils/log-middleware");
const apiRouter = require("./routers/api");

const app = express();

// setup default request middlewares
app.set('trust proxy', 1)
app.use(
    cookieSession({
        name: "session",
        keys: ["key1"],
    })
);
app.use(logMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup view engine and views directory
app.set("view engine", "ejs");
app.set("views", resolve(__dirname, "../views"));

// setup custom middlewares and routers
app.use("/", viewsRouter);
app.use("/auth", authRouter);
app.use("/api", apiRouter);


// setup not found and wildcard router
app.use("*", wildCardRouter);

// get environemnt variables
// start server
config();
const host = process.env.SERVER_HOST ?? "localhost";
const port = parseInt(process.env.SERVER_PORT ?? "3000");

app.listen(port, host, () => {
    console.log(`Server running on http://${host}:${port}`);
});
