import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

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

UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User = model('User', UserSchema);

export default User;
