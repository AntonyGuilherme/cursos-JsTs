import 'jest';
import * as request from 'supertest';
import { globals } from '../jest.config';

const URL_TEST: string = globals.address;


test('GET / USERS', async () => {

    return request(URL_TEST)
        .get('/users')
        .then(response => {
            expect(response.status).toBe(200);
            expect(response.body.items).toBeInstanceOf(Array);
        })
        .catch(fail)

});

test('POST /USERS', async () => {

    return request(URL_TEST)
        .post('/users')
        .send({
            name: "SAM",
            email: "captan@america.org",
            password: "thebestfromamareca",
            cpf: '725.472.430-91'
        })
        .then(response => {

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('_id');
            expect(response.body.name).toBe('SAM');
            expect(response.body.email).toBe('captan@america.org');
            expect(response.body.cpf).toBe('725.472.430-91');
            expect(response.body.password).toBeUndefined();


        })
        .catch(fail);

});

test('POST /USERS - without essencial information', async () => {

    return request(URL_TEST)
        .post('/users')
        .send({
            name: "SAM",
            cpf: '725.472.430-91'
        })
        .then(response => {

            expect(response.status).toBe(400);
            expect(response.body.messages).toBeInstanceOf(Array);


        })
        .catch(fail);

});

test('get /users/42 - Invalid Object ID' , async () => {

    return request(URL_TEST)
    .get('/users/42')
    .then(response => {
        expect(response.status).toBe(404);
    })
    .catch(fail)

});

test('path /users/:id', async () => {

    return request(URL_TEST)
        .post('/users')
        .send({
            name: "SAM",
            email: "falcon@america.org",
            password: "thebestfromamareca",
            cpf: '725.472.430-91'
        })
        .then(response => request(URL_TEST).patch(`/users/${response.body._id}`).send({ name : "Captan" }))
        .then(response => {
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('_id');
            expect(response.body.name).toBe('Captan');
            expect(response.body.email).toBe('falcon@america.org');
            expect(response.body.cpf).toBe('725.472.430-91');
            expect(response.body.password).toBeUndefined();

        })
        .catch(fail);

});


test('path /users/:id - with incorrectly information', async () => {

    return request(URL_TEST)
        .post('/users')
        .send({
            name: "SAM",
            email: "falcon42@america.org",
            password: "thebestfromamareca",
            cpf: '725.472.430-91'
        })
        .then(response => request(URL_TEST).patch(`/users/${response.body._id}`).send({ name : "Ca" }))
        .then(response => {

            expect(response.status).toBe(400);
            expect(response.body.messages).toBeInstanceOf(Array);

        })
        .catch(fail);

});
