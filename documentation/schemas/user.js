module.exports = {
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
