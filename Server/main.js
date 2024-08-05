const express = require("express");
var cors = require("cors");

const connectDB = require("./configs/configDB");
const moviesRouter = require("./routers/moviesRouter");
const membersRouter = require("./routers/membersRouter");
const workersRouter = require("./routers/workersRouter");
const subsRouter = require("./routers/SubsRouter");

const app = express();
const PORT = 3000;

app.use(cors());

connectDB();

app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/members", membersRouter);
app.use("/subscriptions", subsRouter);
app.use("/users", workersRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
