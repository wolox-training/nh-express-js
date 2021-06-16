module.exports = {
  '/users': {
    get: {
      tags: ['Users'],
      description: 'List Users',
      operationId: 'listUsers',
      parameters: [
        {
          $ref: '#/components/schemas/per_page'
        },
        {
          $ref: '#/components/schemas/page'
        },
        {
          $ref: '#/components/schemas/authorization'
        }
      ],
      responses: {
        200: {
          description: 'Got a list of users'
        },
        401: {
          description: 'Not authorized',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'Invalid or expired token',
                internal_code: 'unauthorized'
              }
            }
          }
        }
      }
    },
    post: {
      tags: ['Users'],
      description: 'Sign Up',
      operationId: 'signUp',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User'
            }
          }
        },
        required: true
      },
      responses: {
        201: {
          description: 'New user was created'
        },
        403: {
          description: 'Wrong parameters',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: ['Email should belong to Wolox'],
                internal_code: 'forbidden'
              }
            }
          }
        },
        409: {
          description: 'Repeated email',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'The email provided is already linked to an account',
                internal_code: 'conflict'
              }
            }
          }
        }
      }
    }
  },

  '/users/sessions': {
    post: {
      tags: ['Users'],
      description: 'Sign In',
      operationId: 'signIn',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Login'
            }
          }
        },
        required: true
      },
      responses: {
        200: {
          description: 'Login was succesful'
        },
        401: {
          description: 'Invalid login credentials',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'Login failed: Invalid username or password',
                internal_code: 'unauthorized'
              }
            }
          }
        },
        403: {
          description: 'Wrong parameters',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: ['Email should belong to Wolox'],
                internal_code: 'forbidden'
              }
            }
          }
        }
      }
    }
  }
};
