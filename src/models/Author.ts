import { model, Schema, Types } from "mongoose";

const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: Schema.ObjectId,
      ref: "Post",
      required: true,
    },
  ],
});

const Author = model("Author", authorSchema);

export default Author;
