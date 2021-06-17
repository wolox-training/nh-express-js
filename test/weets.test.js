const request = require('supertest');
const app = require('../app');
const numberFactsService = require('../app/services/number_facts');
const { newUser, newUserLogin } = require('./data/users');
const { longWeetError } = require('./data/weets');
const { longWeetMock } = require('./mocks/weets');

describe('Weets', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('POST /weets', () => {
    let token = '';
    beforeEach(async () => {
      await request(app)
        .post('/users')
        .send(newUser);
      const auth = await request(app)
        .post('/users/sessions')
        .send(newUserLogin);
      ({ token } = auth.body);
      token = `Bearer ${token}`;
    });

    it('should create weet user when user authenticated', async done => {
      await request(app)
        .post('/weets')
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(201)
        .then(res => {
          expect(res.body).toHaveProperty('content');
          done();
        })
        .catch(err => done(err));
    });

    it('should get an error when number fact is too long', async done => {
      const getNumberFactSpy = jest.spyOn(numberFactsService, 'getNumberFact');
      getNumberFactSpy.mockImplementation(longWeetMock);

      await request(app)
        .post('/weets')
        .set('Authorization', token)
        .send(newUser)
        .expect('Content-Type', /json/)
        .expect(500)
        .then(res => {
          expect(res.body).toEqual(longWeetError);
          done();
        })
        .catch(err => done(err));
    });
  });
});
