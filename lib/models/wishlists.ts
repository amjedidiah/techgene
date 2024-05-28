import { Schema, model } from 'mongoose';

const Wishlists = new Schema(
  {
    sessionId: {
      type: String,
      required: true,
    },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, required: true },
        addedAt: { type: Date, default: Date.now },
      },
    ],
    isShareable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model('Wishlists', Wishlists);
