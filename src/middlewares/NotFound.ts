import { Request, Response, NextFunction } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({ message: "route not found" });
};
export default notFound;
