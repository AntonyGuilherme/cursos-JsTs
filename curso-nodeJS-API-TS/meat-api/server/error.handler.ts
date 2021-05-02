import * as restify from 'restify';



export const handleError = (request: restify.Request, response: restify.Response, error, done) => {

    let messages: any[] = [];

    switch (error.name) {

        case 'MongoError':
            if (error.code === 11000) {
                error.statusCode = 400
                messages.push({ message: error.message })
            }
            break;
        case 'ValidationError':
            error.statusCode = 400;
            for (const name in error.errors) {
                messages.push({ message: error.errors[name].message })
            }
            break;
        default:
            messages.push({ message: error.message });
            break;
    }

    Object.defineProperty(error, 'toJSON', {
        value() {
            const alt = {}

            Object.getOwnPropertyNames(this).forEach(function (key) {
                alt[key] = this[key]
            }, this)
            return alt
        },
        configurable: true,
        writable: true
    })

    error.toJSON = () => {
        return {
            messages,
        }
    }

    done();



}