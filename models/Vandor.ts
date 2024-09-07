import mongoose, { Schema, Document, Model } from "mongoose";

interface VandorDoc extends Document {
  name: string;
  ownerName: string;
  foodType: [string];
  pindcode: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  salt: string;
  serviceAvailable: string;
  coverImages: [string];
  rating: number;
  food: any;
}

const VandorSchema = new Schema(
  {
    name: { type: String, required: true },
    ownerName: { type: String, required: true },
    foodType: { type: [String] },
    pincode: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    serviceAvailable: { type: Boolean },
    coverImages: { type: [String] },
    rating: { type: Number },
    // food: [
    //   {
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: "food",
    //   },
    // ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
        delete ret.updatedAt;
        delete ret.createdAt;
      },
    },
    timestamps: true,
  }
);

const Vandor = mongoose.model<VandorDoc>("vandor", VandorSchema);

export { Vandor };
