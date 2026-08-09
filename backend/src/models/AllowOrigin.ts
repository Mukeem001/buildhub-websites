import mongoose, { Document, Schema } from "mongoose";

export interface IAllowOrigin extends Document {
  origin: string;
  createdAt: Date;
}

const AllowOriginSchema = new Schema<IAllowOrigin>(
  {
    origin: { type: String, required: true, unique: true, index: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const AllowOrigin = mongoose.model<IAllowOrigin>("AllowOrigin", AllowOriginSchema);

export default AllowOrigin;
