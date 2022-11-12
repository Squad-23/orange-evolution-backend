import { Schema, model } from 'mongoose';

const ContentSchema = new Schema({
    subject: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    fileType: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
        unique: true,
    },
    time: {
        type: Number,
    },
    idModule: {
        type: Schema.Types.ObjectId,
        ref: 'Module',
    },
});

const Content = model('Content', ContentSchema);

export default Content;
