require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRouter = require("./routes/authRoute");
const itemRouter = require("./routes/itemRoute");
const cartRouter = require("./routes/cartRoute");

const authenticate = require("./middlewares/authenticate");
const notFoundMiddleware = require("./middlewares/notFound");
const errorMiddleware = require("./middlewares/error");

// const { sequelize } = require("./models");
// sequelize.sync({ alter: true });

const app = express();
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);
app.use("/items", authenticate, itemRouter);
app.use("/carts", authenticate, cartRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server is running on port: ${port}`));
