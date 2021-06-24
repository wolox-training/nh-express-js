const request = require('supertest');
const app = require('../app');
const paginationHelper = require('../app/helpers/pagination');
const { generateUsers } = require('./factory/users');
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
  missingLoginError,
  noTokenError,
  invalidToken,
  invalidTokenError,
  notBearerToken,
  notBearerTokenError,
  userListRes
} = require('./data/users');
const { userListMock } = require('./mocks/users');

describe('Users', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('GET /users', () => {
    let token = '';
    beforeEach(async () => {
      await generateUsers(50);

      await request(app)
        .post('/users')
        .send(newUser);
      const auth = await request(app)
        .post('/users/sessions')
        .send(newUserLogin);
      ({ token } = auth.body);
      token = `Bearer ${token}`;
    });

    it('should get users when no pagination parameter is given', async done => {
      await request(app)
        .get('/users')
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
          expect(res.body).toHaveLength(25);
          done();
        })
        .catch(err => done(err));
    });

    it('should get users when per_page is changed', async done => {
      await request(app)
        .get('/users')
        .set('Authorization', token)
        .query({ per_page: 20 })
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
          expect(res.body).toHaveLength(20);
          done();
        })
        .catch(err => done(err));
    });

    it('should get users when per_page and page are changed', async done => {
      await request(app)
        .get('/users')
        .set('Authorization', token)
        .query({ per_page: 20, page: 3 })
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
          expect(res.body).toHaveLength(11);
          done();
        })
        .catch(err => done(err));
    });

    it('should get an error when no token is sent', async done => {
      await request(app)
        .get('/users')
        .expect('Content-Type', /json/)
        .expect(401)
        .then(res => {
          expect(res.body).toEqual(noTokenError);
          done();
        })
        .catch(err => done(err));
    });

    it('should get an error when invalid token is sent', async done => {
      await request(app)
        .get('/users')
        .set('Authorization', invalidToken)
        .expect('Content-Type', /json/)
        .expect(401)
        .then(res => {
          expect(res.body).toEqual(invalidTokenError);
          done();
        })
        .catch(err => done(err));
    });

    it('should get an error when not a Bearer token is given', async done => {
      await request(app)
        .get('/users')
        .set('Authorization', notBearerToken)
        .expect('Content-Type', /json/)
        .expect(401)
        .then(res => {
          expect(res.body).toEqual(notBearerTokenError);
          done();
        })
        .catch(err => done(err));
    });

    it('should get an error when Bearer is given with no token', async done => {
      await request(app)
        .get('/users')
        .set('Authorization', 'Bearer')
        .expect('Content-Type', /json/)
        .expect(401)
        .then(res => {
          expect(res.body).toEqual(noTokenError);
          done();
        })
        .catch(err => done(err));
    });

    it('should get users positions alias correctly', async done => {
      const paginationSpy = jest.spyOn(paginationHelper, 'pagination');
      paginationSpy.mockImplementation(userListMock);
      await request(app)
        .get('/users')
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
          expect(res.body).toEqual(userListRes);
          done();
        })
        .catch(err => done(err));
    });
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
        .expect(401)
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
        .expect(401)
        .then(res => {
          expect(res.body).toEqual(missingLoginError);
          done();
        })
        .catch(err => done(err));
    });
  });
});
