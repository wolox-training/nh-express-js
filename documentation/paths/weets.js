module.exports = {
  '/weets': {
    post: {
      tags: ['Weets'],
      description: 'Create weet',
      operationId: 'createWeet',
      parameters: [
        {
          $ref: '#/components/schemas/authorization'
        }
      ],
      responses: {
        201: {
          description: 'Weet created'
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
        },
        500: {
          description: 'Service error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'Weet was too long',
                internal_code: 'default_error'
              }
            }
          }
        }
      }
    }
  }
};
