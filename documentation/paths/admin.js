module.exports = {
  '/admin/users': {
    post: {
      tags: ['Admin'],
      description: 'Admin Sign Up',
      operationId: 'adminSignUp',
      parameters: [
        {
          $ref: '#/components/schemas/authorization'
        }
      ],
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
        200: {
          description: 'User permissions were updated'
        },
        201: {
          description: 'New admin user was created'
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
    }
  }
};
