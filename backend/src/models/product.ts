import mongoose from 'mongoose';

export interface IImage {
    fileName: string,
    originalName: string,
}

export interface IProduct {
    title: string,
    image: IImage,
    category: string,
    description: string,
    price: number | null,
}

const imageSchema = new mongoose.Schema<IImage>({
  fileName: {
    type: String,
    required: [true, 'Имя файла является обязательным полем'],
  },
  originalName: {
    type: String,
    required: [true, 'Оригинальное имя файла является обязательным полем'],
  },
});

const productSchema = new mongoose.Schema<IProduct>({
  title: {
    type: String,
    required: [true, 'Название продукта является обязательным полем'],
    unique: true,
    minlength: [2, 'Название продукта должны быть длиннее 2-х символов'],
    maxlength: [30, 'Название продукта должны быть не длиннее 30-ти символов'],
  },
  image: imageSchema,
  category: {
    type: String,
    required: [true, 'Категория продукта является обязательным полем'],
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    min: [0, 'Цена не может быть отрицательной'],
  },
});

export default mongoose.model<IProduct>('product', productSchema);
