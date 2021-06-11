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
  missingDataError,
  newUserLogin,
  unknownEmail,
  credentialsError,
  wrongPassword,
  externalEmailLogin,
  missingLoginError
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

  describe('POST /users/sessions', () => {
    beforeEach(async () => {
      await request(app)
        .post('/users')
        .send(newUser);
    });

    it('should login succesfully', async done => {
      await request(app)
        .post('/users/sessions')
        .send(newUserLogin)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
          expect(res.body).toHaveProperty('token');
          done();
        })
        .catch(err => done(err));
    });

    it('should return an error when email is not registered', async done => {
      await request(app)
        .post('/users/sessions')
        .send({ ...newUserLogin, email: unknownEmail })
        .expect('Content-Type', /json/)
        .expect(401)
        .then(res => {
          expect(res.body).toEqual(credentialsError);
          done();
        })
        .catch(err => done(err));
    });

    it('should return an error when password is incorrect', async done => {
      await request(app)
        .post('/users/sessions')
        .send({ ...newUserLogin, password: wrongPassword })
        .expect('Content-Type', /json/)
        .expect(401)
        .then(res => {
          expect(res.body).toEqual(credentialsError);
          done();
        })
        .catch(err => done(err));
    });

    it('should return an error when email is not from Wolox', async done => {
      await request(app)
        .post('/users/sessions')
        .send({ ...newUserLogin, email: externalEmail })
        .expect('Content-Type', /json/)
        .expect(403)
        .then(res => {
          expect(res.body).toEqual(externalEmailLogin);
          done();
        })
        .catch(err => done(err));
    });

    it('should return an error when no information is given', async done => {
      await request(app)
        .post('/users/sessions')
        .expect('Content-Type', /json/)
        .expect(403)
        .then(res => {
          expect(res.body).toEqual(missingLoginError);
          done();
        })
        .catch(err => done(err));
    });
  });
});
