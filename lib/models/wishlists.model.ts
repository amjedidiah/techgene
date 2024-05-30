import { Schema, model } from 'mongoose';

const Wishlists = new Schema(
  {
    sessionId: {
      type: String,
      required: true,
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Products',
          required: true,
        },
        addedAt: { type: Date, default: Date.now },
      },
    ],
    isPrivate: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware to populate product details when fetching a wishlist
Wishlists.pre(/^find/, function (this: any, next: any) {
  this.populate(
    'items.product',
    'name image price _id isDeleted inStock'
  ).select('-sessionId'); // Populate only the name, image, and price fields
  next();
});

Wishlists.index({ 'items.product': 1 }, { sparse: true });

export default model('Wishlists', Wishlists);
