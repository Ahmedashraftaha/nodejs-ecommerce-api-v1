const express = require("express");

const dotenv = require("dotenv");

const morgan = require("morgan");

const ApiError = require("./utils/apiError");

const globalError = require("./middlewares/errorMiddlewares");

dotenv.config({ path: "config.env" });
const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoute");
const subCategoryRoute = require("./routes/subCategoryRoute");
const brandRoute = require("./routes/brandRoute");
const productRoute = require("./routes/productRoute");

// Connect with db
dbConnection();

// express app
const app = express();

// Middlewares
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", subCategoryRoute);
app.use("/api/v1/brands/api/v1/brands", brandRoute);
app.use("/api/v1/products", productRoute);

app.all("*", (req, res, next) => {
  next(new ApiError(`ctan't find this route ${req.originalUrl}`, 400));
});
// Global handel error
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});

// handel rejection out side express
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Error : ${err.name} | ${err.message}`);
  server.close(() => {
    console.error("Shutting down .................");
    process.exit(1);
  });
});
