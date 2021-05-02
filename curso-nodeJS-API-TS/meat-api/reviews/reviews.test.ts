import 'jest';
import * as request from 'supertest';
import { globals } from '../jest.config';

const URL_TEST: string = globals.address;


test('GET /REVIEWS' , async () => {

    return request(URL_TEST)
    .get('/reviews')
    .then(response => {
        expect(response.status).toBe(200);
        expect(response.body.items).toBeInstanceOf(Array);
    })
    .catch(fail);

});

test('POST /REVIEWS/', async () => {

    return Promise.all([
        request(URL_TEST).post('/restaurants').send({ name : "Restaurante-Review" , menu : [] }) , 
        request(URL_TEST).post('/users').send({ name : "TEST" , email : "test@test.tes" , password : "123456" })
    ])
    .then(([restaurant,user]) => {

        //verifing restaurant
        expect(restaurant.body._id).toBeDefined();
        expect(restaurant.body.name).toBe("Restaurante-Review");

        //verifing user
        expect(user.body._id).toBeDefined();
        expect(user.body.name).toBe("TEST");
        expect(user.body.email).toBe("test@test.tes");

        return request(URL_TEST).post('/reviews').send({
            date : "2018-02-20T23:10:20",rating : 4, comments : "Muito bom!", 
            user : user.body._id , restaurant : restaurant.body._id
        });
    })
    .then(response => {

        expect(response.body._id).toBeDefined();
        expect(response.body.date).toBeDefined();
        expect(response.body.rating).toBe(4);
        expect(response.body.comments).toBe("Muito bom!");
        expect(response.body.user).toBeDefined();
        expect(response.body.restaurant).toBeDefined();

    })
    .catch(fail)

})

test('GET / REVIEW BY ID' , async () => {

    return Promise.all([
        request(URL_TEST).post('/restaurants').send({ name : "Restaurante-Review1" , menu : [] }) , 
        request(URL_TEST).post('/users').send({ name : "TEST1" , email : "test1@test.tes" , password : "123456" })
    ])
    .then(([restaurant,user]) => {

        //verifing restaurant
        expect(restaurant.body._id).toBeDefined();
        expect(restaurant.body.name).toBe("Restaurante-Review1");

        //verifing user
        expect(user.body._id).toBeDefined();
        expect(user.body.name).toBe("TEST1");
        expect(user.body.email).toBe("test1@test.tes");

        return request(URL_TEST).post('/reviews').send({
            date : "2018-02-20T23:10:20",rating : 4, comments : "Muito bom!", 
            user : user.body._id , restaurant : restaurant.body._id
        });
    })
    .then(response => {

        expect(response.body._id).toBeDefined();
        expect(response.body.date).toBeDefined();
        expect(response.body.rating).toBe(4);
        expect(response.body.comments).toBe("Muito bom!");
        expect(response.body.user).toBeDefined();
        expect(response.body.restaurant).toBeDefined();

        return request(URL_TEST).get(`/reviews/${response.body._id}`)
    })

    .then(response => {

        expect(response.body._id).toBeDefined();
        expect(response.body.date).toBeDefined();
        expect(response.body.rating).toBe(4);
        expect(response.body.comments).toBe("Muito bom!");
        expect(response.body.user).toBeDefined();
        expect(response.body.restaurant).toBeDefined();

    })

    .catch(fail)


})