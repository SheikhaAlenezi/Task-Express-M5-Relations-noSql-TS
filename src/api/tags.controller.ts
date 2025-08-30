import { Request, Response } from "express";
import Post from "../models/Post";
import Tag from "../models/Tag";

export const getAllTags = async (req: Request, res: Response) => {
  try {
    const tags = await Tag.find().populate("posts");
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tags" });
  }
};

export const createTag = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const tag = await Tag.create({ name, posts: [] });
    res.status(201).json(tag);
  } catch (error) {
    res.status(500).json({ message: "error creating tag", details: error });
  }
};

export const addTagPost = async (req: Request, res: Response) => {
  try {
    const { postId, tagId } = req.params;
    await Post.findByIdAndUpdate(postId, {
      $addToSet: { tags: tagId },
    });
    await Tag.findByIdAndUpdate(tagId, {
      $addToSet: { tags: tagId },
    });
    res.status(200).json({ message: "Tag added to post" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error linking tag to post", details: error });
  }
};
