"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
exports.handleError = (request, response, error, done) => {
    let messages = [];
    switch (error.name) {
        case 'MongoError':
            if (error.code === 11000) {
                response.statusCode = 400;
                messages.push({ message: error.message });
            }
            break;
        case 'ValidationError':
            response.statusCode = 400;
            for (const name in error.errors) {
                messages.push({ message: error.errors[name].message });
            }
            break;
        default:
            messages.push({ message: error.message });
            break;
    }
    Object.defineProperty(error, 'toJSON', {
        value() {
            const alt = {};
            Object.getOwnPropertyNames(this).forEach(function (key) {
                alt[key] = this[key];
            }, this);
            return alt;
        },
        configurable: true,
        writable: true
    });
    error.toJSON = () => {
        return {
            messages,
        };
    };
    done();
};
