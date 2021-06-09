const request = require('supertest');
const app = require('../app');
const {
  newUser,
  newUserRes,
  repeatedEmailError,
  badPassword,
  badPasswordError,
  externalEmail,
  externalEmailError,
  missingDataError
} = require('./data/users');

describe('Users', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('POST /users', () => {
    it('should create an user succesfully', async done => {
      await request(app)
        .post('/users')
        .send(newUser)
        .expect('Content-Type', /json/)
        .expect(201)
        .then(res => {
          expect(res.body).toEqual(newUserRes);
          done();
        })
        .catch(err => done(err));
    });

    it('should return an error when repeated email is given', async done => {
      await request(app)
        .post('/users')
        .send(newUser);
      await request(app)
        .post('/users')
        .send(newUser)
        .expect('Content-Type', /json/)
        .expect(409)
        .then(res => {
          expect(res.body).toEqual(repeatedEmailError);
          done();
        })
        .catch(err => done(err));
    });

    it('should return an error when password does not meet the requirements', async done => {
      await request(app)
        .post('/users')
        .send({ ...newUser, password: badPassword })
        .expect('Content-Type', /json/)
        .expect(403)
        .then(res => {
          expect(res.body).toEqual(badPasswordError);
          done();
        })
        .catch(err => done(err));
    });

    it('should return an error when email is not from Wolox', async done => {
      await request(app)
        .post('/users')
        .send({ ...newUser, email: externalEmail })
        .expect('Content-Type', /json/)
        .expect(403)
        .then(res => {
          expect(res.body).toEqual(externalEmailError);
          done();
        })
        .catch(err => done(err));
    });

    it('should return an error when no information is given', async done => {
      await request(app)
        .post('/users')
        .expect('Content-Type', /json/)
        .expect(403)
        .then(res => {
          expect(res.body).toEqual(missingDataError);
          done();
        })
        .catch(err => done(err));
    });
  });
});
