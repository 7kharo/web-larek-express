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

// title — название товара, строка от 2 до 30 символов, обязательное поле, уникальное.
// image — путь до файла и метаинформация об изображении, объект вида { fileName: string, originalName: string; }, обязательно поле.
// category — категория товара, строка, обязательное поле.
// description — описание товара, строка, необязательное поле.
// price — цена товара, число, необязательное поле, по умолчанию null.

const imageSchema = new mongoose.Schema<IImage>({
    fileName: {
        type: String,
        required: true,
    },
    originalName: {
        type: String,
        required: true,
    }
})

const productSchema = new mongoose.Schema<IProduct>({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
    },
    image: imageSchema,
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    }
});

export default mongoose.model<IProduct>('product', productSchema); 