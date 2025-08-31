import express from "express";
import postsRouter from "./api/posts.routes";

import authorRoutes from "./api/authors.routes";
import tagRouter from "./api/tags.routes";
import dotenv from "dotenv";
import connectDB from "./database";
import errorHandler from "./middlewares/errorHandler";
import notFound from "./middlewares/notFound";

const app = express();
app.use(express.json());
dotenv.config();
connectDB();
const PORT = process.env.PORT || 8000;

app.use("/api/authors", authorRoutes);
app.use("/posts", postsRouter);
app.use("/tags", tagRouter);
app.use(errorHandler);
app.use(notFound);
app.listen(8000, () => {
  console.log(`Server is running on port ${PORT}`);
});
