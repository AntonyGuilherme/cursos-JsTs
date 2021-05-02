import 'jest';
import * as request from 'supertest';
import { globals } from '../jest.config';

const URL_TEST: string = globals.address;
const auth: string = globals.auth;
const authNoPermissions : string = globals.authNoPermissions;
const invalidToken : string = 'Bearer 42';

test('AUTH - NO PERMISSIONS GET / USERS', async () => {

    return request(URL_TEST)
        .get('/users')
        .set('Authorization',authNoPermissions)
        .then(response => {
            expect(response.status).toBe(403);
            expect(response.body.messages).toBeInstanceOf(Array);
        })
        .catch(fail)

});

test('AUTH - INVALID TOKEN', async () => {

    return request(URL_TEST)
        .get('/users')
        .set('Authorization',invalidToken)
        .then(response => {
            expect(response.status).toBe(403);
            expect(response.body.messages).toBeInstanceOf(Array);
        })
        .catch(fail)

});

test('AUTH - WITH PERMISSIONS GET / USERS', async () => {

    return request(URL_TEST)
        .get('/users')
        .set('Authorization',auth)
        .then(response => {
            expect(response.status).toBe(200);
            expect(response.body.items).toBeInstanceOf(Array);
        })
        .catch(fail)

});
