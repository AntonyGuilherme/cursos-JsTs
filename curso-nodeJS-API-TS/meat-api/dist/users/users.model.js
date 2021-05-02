"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose = require("mongoose");
const validators_1 = require("../common/validators");
const bcrypt = require("bcrypt");
const environment_1 = require("../common/environment");
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 80, minlength: 3 },
    email: { type: String, unique: true, required: true, match: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i },
    password: { type: String, select: false, required: true },
    gender: { type: String, required: false, enum: ['Male', 'Female'] },
    cpf: { type: String, required: false, validate: {
            validator: validators_1.validateCPF,
            message: '{PATH}: Invalid CPF ({VALUE})'
        } }
});
userSchema.statics.findByEmail = function (email) {
    return this.findOne({ email });
};
const hashPassword = (obj, next) => {
    bcrypt.hash(obj.password, environment_1.environment.security.saltRounds).then(hash => {
        obj.password = hash;
        return next();
    }).catch(next);
};
const saveMiddleware = function (next) {
    // não se pode utilizar arrow function
    const user = this;
    if (!user.isModified('password')) {
        next(null);
    }
    else {
        hashPassword(user, next);
    }
};
const updateMiddleware = function (next) {
    if (!this.getUpdate().password) {
        next(null);
    }
    else {
        hashPassword(this.getUpdate(), next);
    }
};
userSchema.pre('save', saveMiddleware);
userSchema.pre('updateOne', updateMiddleware);
userSchema.pre('replaceOne', updateMiddleware);
exports.User = mongoose.model('User', userSchema);
