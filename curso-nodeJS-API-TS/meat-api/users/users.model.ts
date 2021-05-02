import * as mongoose from 'mongoose';
import { validateCPF } from '../common/validators';
import * as bcrypt from 'bcrypt';
import { environment } from '../common/environment';

export interface User extends mongoose.Document {
    name: string,
    email: string,
    password: string,
    cpf: string;
    gender: string;
    profiles: string[];
    matches(password: string): boolean;
    hasAny(...profiles: string[]): boolean;
}

export interface UserModel extends mongoose.Model<User> {
    findByEmail(email: string, projection?: string): Promise<User>
}


const userSchema = new mongoose.Schema<User>({

    name: { type: String, required: true, maxlength: 80, minlength: 3 },
    email: { type: String, unique: true, required: true, match: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i },
    password: { type: String, select: false, required: true }, // não deve trazer como padrão
    gender: { type: String, required: false, enum: ['Male', 'Female'] },
    cpf: {
        type: String, required: false, validate: {
            validator: validateCPF,
            message: '{PATH}: Invalid CPF ({VALUE})'
        }
    },
    profiles: { type: [String], required: false }
});


userSchema.statics.findByEmail = function (email: string, projection: string) {
    return this.findOne({ email }, projection);
}

userSchema.methods.matches = function (password: string) {
    return bcrypt.compareSync(password, this.password);
}

userSchema.methods.hasAny = function (...profiles: string[]): boolean {
    return profiles.some(profile => this.profiles.indexOf(profile) !== -1);
}


const hashPassword = (obj, next) => {
    bcrypt.hash(obj.password, environment.security.saltRounds).then(hash => {
        obj.password = hash;
        return next();
    }).catch(next);
}

const saveMiddleware = function (next) {
    // não se pode utilizar arrow function
    const user: User = this;

    if (!user.isModified('password')) {
        next(null);
    } else {
        hashPassword(user, next)
    }


}

const updateMiddleware = function (next) {
    if (!(<any>this.getUpdate()).password) {
        next(null);
    } else {
        hashPassword((<any>this.getUpdate()), next);
    }
}

userSchema.pre('save', saveMiddleware);
userSchema.pre('updateOne', updateMiddleware);
userSchema.pre('replaceOne', updateMiddleware);

export const User = mongoose.model<User, UserModel>('User', userSchema);
