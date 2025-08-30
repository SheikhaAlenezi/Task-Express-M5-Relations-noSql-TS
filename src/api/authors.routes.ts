import Router from "express";
import { createAuthor, getAllAuthors } from "./authors.controller";

const router = Router();

router.get("/", getAllAuthors);
router.post("/", createAuthor);

export default router;
