import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { getProviderByModel } from '../utils/model.util';
import paginate, { ModelPaginate } from '../mongoose/paginate';
import Joi from '../joi';

export interface Article {
    readonly _id?: string;
    readonly title: string;
    readonly content: string;
    readonly summary: string;
    readonly screenshot?: string;
    readonly category: string;
    readonly commentCount?: number;
    readonly viewsCount?: number;
    readonly isDeleted?: boolean;
    readonly isDraft?: boolean;
    readonly createdAt?: string | Date;
    readonly updatedAt?: string | Date;
    readonly tags?: string[];
    readonly dayReadings?: Array<{
        count?: number;
        timestamp: number;
    }>;
}

export const ArticleJoiSchema = {
    title: Joi.string()
        .min(1)
        .max(80),
    content: Joi.string()
        .min(1)
        .max(2000),
    summary: Joi.string()
        .min(1)
        .max(1000),
    screenshot: Joi.string()
        .min(1)
        .max(100),
    category: Joi.string()
        .min(1)
        .max(30),
    tags: Joi.array().items(Joi.string().max(20)),
};

const DayReadings = new mongoose.Schema({
    count: {
        type: Number,
        default: 0,
        required: true,
    },
    timestamp: { type: Number, required: true },
});

export interface ArticleDocument extends Article, Document {
    readonly _id: string;
}

const ArticleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            minlength: 1,
            maxlength: 80,
            trim: true,
            required: true,
        },
        content: {
            type: String,
            minlength: 1,
            maxlength: 2000,
            trim: true,
            required: true,
        },
        summary: {
            type: String,
            minlength: 1,
            maxlength: 1000,
            trim: true,
            required: true,
        },
        screenshot: {
            type: String,
            maxlength: 100,
            trim: true,
            default: '',
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category',
            required: true,
        },
        commentCount: {
            type: Number,
            max: 100000,
            default: 0,
        },
        viewsCount: {
            type: Number,
            max: 100000,
            default: 0,
        },
        //标签
        tags: {
            type: [{ type: String, maxlength: 20, lowercase: true, trim: true, index: true }],
            index: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        isDraft: {
            type: Boolean,
            default: false,
        },
        dayReadings: [DayReadings],
    },
    {
        timestamps: true,
    }
);

ArticleSchema.plugin(paginate);

const ArticleModel: ModelPaginate<ArticleDocument> = mongoose.model('article', ArticleSchema, 'article');

export type IArticleModel = typeof ArticleModel;

export { ArticleModel };

export const ArticleModelProvider = getProviderByModel(ArticleModel);
