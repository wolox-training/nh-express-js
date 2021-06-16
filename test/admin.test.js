const request = require('supertest');
const app = require('../app');
const usersService = require('../app/services/users');
const {
  newUser,
  newUserRes,
  newUserLogin,
  invalidToken,
  invalidTokenError,
  notBearerToken,
  notBearerTokenError,
  noTokenError
} = require('./data/users');
const { adminUser, adminUserRes, adminTokenError } = require('./data/admin');
const { adminUserMock } = require('./mocks/admin');

describe('Admin', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('POST /admin/users', () => {
    let adminToken = '';
    beforeAll(async () => {
      const findByEmailSpy = jest.spyOn(usersService, 'findByEmail');
      findByEmailSpy.mockImplementation(adminUserMock);
      ({ token: adminToken } = (
        await request(app)
          .post('/users/sessions')
          .send({ email: 'nicolas.admin@wolox.co', password: 'pass1234' })
      ).body);
      adminToken = `Bearer ${adminToken}`;

      findByEmailSpy.mockRestore();
    });

    it('should create admin user when admin authenticated', async done => {
      await request(app)
        .post('/admin/users')
        .set('Authorization', adminToken)
        .send(adminUser)
        .expect('Content-Type', /json/)
        .expect(201)
        .then(res => {
          expect(res.body).toEqual(adminUserRes);
          done();
        })
        .catch(err => done(err));
    });

    it('should update admin permissions when admin authenticated', async done => {
      await request(app)
        .post('/users')
        .send(newUser);

      await request(app)
        .post('/admin/users')
        .set('Authorization', adminToken)
        .send(newUser)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
          expect(res.body).toEqual(newUserRes);
          done();
        })
        .catch(err => done(err));
    });

    it('should not create admin user when admin not authenticated', async done => {
      await request(app)
        .post('/users')
        .send(newUser);
      const auth = await request(app)
        .post('/users/sessions')
        .send(newUserLogin);
      const userToken = `Bearer ${auth.body.token}`;

      await request(app)
        .post('/admin/users')
        .set('Authorization', userToken)
        .send(adminUser)
        .expect('Content-Type', /json/)
        .expect(401)
        .then(res => {
          expect(res.body).toEqual(adminTokenError);
          done();
        })
        .catch(err => done(err));
    });

    it('should not create admin user when invalid token is given', async done => {
      await request(app)
        .post('/admin/users')
        .set('Authorization', invalidToken)
        .send(adminUser)
        .expect('Content-Type', /json/)
        .expect(401)
        .then(res => {
          expect(res.body).toEqual(invalidTokenError);
          done();
        })
        .catch(err => done(err));
    });

    it('should not create admin user when not a Bearer token is given', async done => {
      await request(app)
        .post('/admin/users')
        .set('Authorization', notBearerToken)
        .send(adminUser)
        .expect('Content-Type', /json/)
        .expect(401)
        .then(res => {
          expect(res.body).toEqual(notBearerTokenError);
          done();
        })
        .catch(err => done(err));
    });

    it('should not create admin user when no token is given', async done => {
      await request(app)
        .post('/admin/users')
        .send(adminUser)
        .expect('Content-Type', /json/)
        .expect(401)
        .then(res => {
          expect(res.body).toEqual(noTokenError);
          done();
        })
        .catch(err => done(err));
    });

    it('should not create admin user when Bearer is given with no token ', async done => {
      await request(app)
        .post('/admin/users')
        .set('Authorization', 'Bearer')
        .send(adminUser)
        .expect('Content-Type', /json/)
        .expect(401)
        .then(res => {
          expect(res.body).toEqual(noTokenError);
          done();
        })
        .catch(err => done(err));
    });
  });
});
