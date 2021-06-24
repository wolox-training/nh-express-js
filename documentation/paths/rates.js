module.exports = {
  '/weets/{id}/ratings': {
    post: {
      tags: ['Rates'],
      description: 'Rate Weet',
      operationId: 'rateWeet',
      parameters: [
        {
          $ref: '#/components/schemas/authorization'
        },
        {
          $ref: '#/components/schemas/id'
        },
        {
          $ref: '#/components/schemas/score'
        }
      ],
      responses: {
        201: {
          description: 'Rated weet'
        },
        200: {
          description: 'User already rated weet, can be updated'
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
