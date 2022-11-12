import { Schema, model } from 'mongoose';

const ModuleSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    imageURL: {
        type: String,
    },
    idTrail: {
        type: Schema.Types.ObjectId,
        ref: "Trail"
    }
}, {toJSON: { virtuals: true }});

ModuleSchema.virtual("contents", {
    ref: "Content",
    localField: "_id",
    foreignField: "idModule",
});

const Module = model('Module', ModuleSchema);

export default Module;
