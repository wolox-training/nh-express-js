module.exports = {
  id: {
    name: 'id',
    in: 'path',
    type: 'integer',
    example: 1,
    required: true
  },
  score: {
    name: 'score',
    in: 'body',
    type: 'integer',
    example: -1,
    required: true
  },
  per_page: {
    name: 'per_page',
    in: 'query',
    type: 'integer',
    example: 42,
    required: false
  },
  page: {
    name: 'page',
    in: 'query',
    type: 'integer',
    example: 2,
    required: false
  },
  authorization: {
    name: 'Authorization',
    in: 'header',
    schema: {
      type: 'string'
    },
    example: 'token',
    required: true
  },
  name: {
    type: 'string',
    example: 'Tom'
  },
  last_name: {
    type: 'string',
    example: 'Engels'
  },
  email: {
    type: 'string',
    example: 'tom.engels@wolox.com.ar'
  },
  password: {
    type: 'string',
    example: 'aPassword1'
  },
  Login: {
    type: 'object',
    properties: {
      email: {
        $ref: '#/components/schemas/email'
      },
      password: {
        $ref: '#/components/schemas/password'
      }
    }
  },
  User: {
    type: 'object',
    properties: {
      name: {
        $ref: '#/components/schemas/name'
      },
      last_name: {
        $ref: '#/components/schemas/last_name'
      },
      email: {
        $ref: '#/components/schemas/email'
      },
      password: {
        $ref: '#/components/schemas/password'
      }
    }
  },
  Users: {
    type: 'object',
    properties: {
      users: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/User'
        }
      }
    }
  }
};
