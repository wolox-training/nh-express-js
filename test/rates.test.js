const request = require('supertest');
const app = require('../app');
const { generateWeets } = require('./factory/weets');
const { newUser, newUserLogin } = require('./data/users');

describe('Rates', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('POST /weets/{id}/ratings', () => {
    let token = '';
    beforeEach(async () => {
      await request(app)
        .post('/users')
        .send(newUser);
      await generateWeets(50);
      const auth = await request(app)
        .post('/users/sessions')
        .send(newUserLogin);
      ({ token } = auth.body);
      token = `Bearer ${token}`;
    });

    it('should rate a weet', async done => {
      await request(app)
        .post('/weets/1/ratings')
        .set('Authorization', token)
        .send({ score: 1 })
        .expect('Content-Type', /json/)
        .expect(201)
        .then(res => {
          expect(res.body).toHaveProperty('score');
          done();
        })
        .catch(err => done(err));
    });

    it('should return ok when rate already exists with the same score', async done => {
      await request(app)
        .post('/weets/1/ratings')
        .set('Authorization', token)
        .send({ score: 1 });

      await request(app)
        .post('/weets/1/ratings')
        .set('Authorization', token)
        .send({ score: 1 })
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
          expect(res.body).toHaveProperty('score');
          done();
        })
        .catch(err => done(err));
    });

    it('should return ok when rate already exists with another score', async done => {
      await request(app)
        .post('/weets/1/ratings')
        .set('Authorization', token)
        .send({ score: -1 });

      await request(app)
        .post('/weets/1/ratings')
        .set('Authorization', token)
        .send({ score: 1 })
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
          expect(res.body).toHaveProperty('score');
          done();
        })
        .catch(err => done(err));
    });

    it('should get an error when score is not -1 or 1', async done => {
      await request(app)
        .post('/weets/1/ratings')
        .set('Authorization', token)
        .send({ score: 2 })
        .expect('Content-Type', /json/)
        .expect(403)
        .then(res => {
          expect(res.body).toHaveProperty('internal_code');
          done();
        })
        .catch(err => done(err));
    });
  });
});
