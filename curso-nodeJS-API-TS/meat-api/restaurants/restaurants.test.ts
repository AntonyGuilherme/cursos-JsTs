import 'jest';
import { ObjectId } from 'mongoose';
import * as request from 'supertest';
import { globals } from '../jest.config';

const URL_TEST: string = globals.address;
const auth: string = globals.auth;

test('get all restaurants', async () => {

    return request(URL_TEST)
        .get('/restaurants')
        .set('Authorization', auth)
        .then(response => {
            expect(response.status).toBe(200);
            expect(response.body.items).toBeInstanceOf(Array);
        })
        .catch(fail);

});

test('get restaurant by id', async () => {

    return request(URL_TEST).post('/restaurants').set('Authorization', auth).send({ name: "Restaurante-GETBYID", menu: [] })
        .then((restaurant) => {

            //verifing restaurant
            expect(restaurant.body._id).toBeDefined();
            expect(restaurant.body.name).toBe("Restaurante-GETBYID");

            return request(URL_TEST).get(`/restaurants/${restaurant.body._id}`).set('Authorization', auth).send({});
        })
        .then(response => {
            expect(response.status).toBe(200);
            expect(response.body._id).toBeDefined();
            expect(response.body.name).toBe("Restaurante-GETBYID");
        })
        .catch(fail)

})

test('post restaurant by id', async () => {

    return request(URL_TEST).post('/restaurants').set('Authorization', auth).send({ name: "Restaurante-Post", menu: [] })
        .then((restaurant) => {

            //verifing restaurant
            expect(restaurant.body._id).toBeDefined();
            expect(restaurant.body.name).toBe("Restaurante-Post");

        })
        .catch(fail)

})

test('put replace by id', async () => {


    return request(URL_TEST).post('/restaurants').set('Authorization', auth).send({ name: "Restaurante-replace", menu: [{ name: "juice", price: 100 }] })
        .then((restaurant) => {

            //verifing restaurant
            expect(restaurant.body._id).toBeDefined();
            expect(restaurant.body.name).toBe("Restaurante-replace");
            expect(restaurant.body.menu[0].price).toBe(100);


            return request(URL_TEST).put(`/restaurants/${restaurant.body._id}`).set('Authorization', auth).send({
                name: "Restaurant-replaced"
            });
        })
        .then(response => {
            expect(response.status).toBe(200);
            expect(response.body._id).toBeDefined();
            expect(response.body.name).toBe("Restaurant-replaced");
            expect(response.body.menu).toBeUndefined();

        })
        .catch(fail)

})


test('patch update restaurant', async () => {


    return request(URL_TEST).post('/restaurants').set('Authorization', auth).send({ name: "Restaurante-update", menu: [] })
        .then((restaurant) => {

            //verifing restaurant
            expect(restaurant.body._id).toBeDefined();
            expect(restaurant.body.name).toBe("Restaurante-update");

            return request(URL_TEST).patch(`/restaurants/${restaurant.body._id}`).set('Authorization', auth).send({
                name: "Restaurant-updated", menu: [{ name: "juice", price: 100 }]
            });
        })
        .then(response => {

            expect(response.status).toBe(200);
            expect(response.body._id).toBeDefined();
            expect(response.body.name).toBe("Restaurant-updated");

        })
        .catch(fail)

});

test('delete restaurant', async () => {


    return request(URL_TEST).post('/restaurants').set('Authorization', auth).send({ name: "Restaurante-delete", menu: [] })
        .then((restaurant) => {

            //verifing restaurant
            expect(restaurant.body._id).toBeDefined();
            expect(restaurant.body.name).toBe("Restaurante-delete");

            return request(URL_TEST).delete(`/restaurants/${restaurant.body._id}`).set('Authorization', auth).send({});
        })
        .then(response => {

            expect(response.status).toBe(204);
            expect(response.body).toStrictEqual({});


        })
        .catch(fail)

});

test('get menu', async () => {

    return request(URL_TEST).post('/restaurants').set('Authorization', auth).send({ name: "Restaurante-getMenu", menu: [{ name: "juice", price: 100 }] })
        .then((restaurant) => {

            //verifing restaurant
            expect(restaurant.body._id).toBeDefined();
            expect(restaurant.body.name).toBe("Restaurante-getMenu");
            expect(restaurant.body.menu).toBeInstanceOf(Array);
            expect(restaurant.body.menu[0].name).toBe('juice');
            expect(restaurant.body.menu[0].price).toBe(100);

            return request(URL_TEST).get(`/restaurants/${restaurant.body._id}/menu`).set('Authorization', auth).send({});
        })
        .then(response => {

            expect(response.body).toBeInstanceOf(Array);
            expect(response.body[0].name).toBe('juice');
            expect(response.body[0].price).toBe(100);

        })
        .catch(fail)

});


test('put menu', async () => {

    return request(URL_TEST).post('/restaurants').set('Authorization', auth).send({ name: "Restaurante-putMenu", menu: [] })
        .then((restaurant) => {

            //verifing restaurant
            expect(restaurant.body._id).toBeDefined();
            expect(restaurant.body.name).toBe("Restaurante-putMenu");
            expect(restaurant.body.menu).toBeInstanceOf(Object);

            return request(URL_TEST).put(`/restaurants/${restaurant.body._id}/menu`).set('Authorization', auth).send([{ name: "juice", price: 100 }]);
        })
        .then(response => {

            expect(response.body).toBeInstanceOf(Object);
            expect(response.body.menu[0].name).toBe('juice');
            expect(response.body.menu[0].price).toBe(100);

        })
        .catch(fail)

});


test("restaurant - document not founded", async () => {

    return request(URL_TEST).get(`/restaurants/42`).set('Authorization', auth)
        .then(response => {

            expect(response.status).toBe(404);
            expect(response.body.messages).toBeInstanceOf(Array);

        })
        .catch(fail);

})

test("restaurant/menu - document not founded", async () => {

    return request(URL_TEST).get(`/restaurants/42/menu`).set('Authorization', auth)
        .then(response => {

            expect(response.status).toBe(404);
            expect(response.body.messages).toBeInstanceOf(Array);

        })
        .catch(fail);

});

test('delete restaurant not founded', async () => {



    return request(URL_TEST).delete(`/restaurants/42`).set('Authorization', auth).send({})

        .then(response => {

            expect(response.status).toBe(404);
            expect(response.body.messages).toBeInstanceOf(Array);


        })
        .catch(fail)

});



test('put menu - without price and name', async () => {

    return request(URL_TEST).post('/restaurants').set('Authorization', auth).send({ name: "Restaurante-putMenu", menu: [] })
        .then((restaurant) => {

            //verifing restaurant
            expect(restaurant.body._id).toBeDefined();
            expect(restaurant.body.name).toBe("Restaurante-putMenu");
            expect(restaurant.body.menu).toBeInstanceOf(Object);

            return request(URL_TEST).put(`/restaurants/${restaurant.body._id}/menu`).set('Authorization', auth).send([{}]);
        })
        .then(response => {

            expect(response.status).toBe(400);
            expect(response.body.messages).toBeInstanceOf(Array);

        })
        .catch(fail);

});
