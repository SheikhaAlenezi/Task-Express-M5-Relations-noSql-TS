import { Request, RequestHandler, Response } from "express";
import Post from "../models/Post";
import Author from "../models/Author";

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().populate("author").populate("tag");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
};

const createPost: RequestHandler = async (
  req: Request,
  res: Response,
  next
) => {
  try {
    const { title, body, authorId } = req.body;

    if (!title || !body || !authorId) {
      res.status(400).json({ message: "Missing required fields" });
    }

    const post = await Post.create({ title, body, author: authorId });

    const author = await Author.findById(authorId);
    if (!author) {
      res.status(404).json({ message: "Author not found" });
      return;
    }

    author.posts.push(post._id);
    await author.save();

    res.status(201).json({
      message: "Post created and linked to author successfully",
      post,
    });
  } catch (error) {
    console.error("Error in createPost:", error);
    next(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
};

export { getAllPosts, createPost, getPostById, updatePost, deletePost };
