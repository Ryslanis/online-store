const deviceInfoSchema = {
    type: 'array',
    items: {
      type: 'object',
      required: ['title', 'description'],
      properties: {
        title: { type: 'string' },
        description: { type: 'string' }
      }
    }
  };

  module.exports = {deviceInfoSchema}