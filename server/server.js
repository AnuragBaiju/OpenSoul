const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middlewares/errorMiddleware");
const { activityLogger } = require("./middlewares/logger");

const app = express();
require("dotenv").config();
connectDB();


app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

app.use(errorHandler);


app.listen(process.env.PORT, (err) => {
    console.log(`server is running on port ${process.env.PORT}`);
});
