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
});

const Module = model('Module', ModuleSchema);

export default Module;
