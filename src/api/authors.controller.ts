import { Request, Response } from "express";
import Author from "../models/Author";

export const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await Author.find().populate("posts");

    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ error: "failed fetch authors", details: error });
  }
};

export const createAuthor = async (req: Request, res: Response) => {
  try {
    const { name, posts } = req.body;
    const newAuthor = new Author({ name, posts });
    const savedAuthor = await newAuthor.save();
    res.status(201).json(savedAuthor);
  } catch (error) {
    res.status(500).json({ error: "failed creating author", details: error });
  }
};
