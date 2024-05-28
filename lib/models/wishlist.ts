import { Schema, model } from 'mongoose';

const Wishlist = new Schema(
  {
    sessionId: {
      type: String,
      required: true,
    },
    items: [
      {
        productId: { type: String, required: true },
        addedAt: { type: Date, default: Date.now },
      },
    ],
    isShareable: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model('Wishlist', Wishlist);
