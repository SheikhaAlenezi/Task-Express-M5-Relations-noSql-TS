import express from "express";
import { addTagPost, createTag, getAllTags } from "./tags.controller";

const router = express.Router();
router.get("/", getAllTags);
router.post("/", createTag);
router.post("/:postId/:tagId", addTagPost);
export default router;
