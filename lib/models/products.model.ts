import { Schema, model } from 'mongoose';

const Products = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        'https://images.pexels.com/photos/6208084/pexels-photo-6208084.jpeg',
    },
    price: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model('Products', Products);
