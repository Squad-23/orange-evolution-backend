import { Schema, model } from 'mongoose';

const TrailSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    area: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: false,
    },
    imageCover: {
        type: String,
        required: false,
    }
}, {toJSON: { virtuals: true }});

TrailSchema.virtual("modules", {
    ref: "Module",
    localField: "_id",
    foreignField: "idTrail",
});

const Trail = model('Trail', TrailSchema);

export default Trail;
