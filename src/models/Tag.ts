import { Schema, model } from "mongoose";

const tagSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  ],
});
const Tag = model("Tag", tagSchema);
export default Tag;
