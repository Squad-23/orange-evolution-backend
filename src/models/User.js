import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    thisADM: {
        type: Boolean,
    },

    trails: [{
        type: Schema.Types.ObjectId,
        ref: "Trail"
    }],

    completeds: [{
        type: Schema.Types.ObjectId,
        ref: "Content"
    }]

});

const User = model('User', UserSchema);

export default User;
