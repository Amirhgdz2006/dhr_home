const { z } = require('zod');

const appValidator = require('./appValidator');
const categoryValidator = require('./categoryValidator');
const userValidator = require('./userValidator');


function validateBody(schema) {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        const details = err.errors.map(e => ({ message: e.message, path: e.path }));
        return res.status(400).json({ error: 'ValidationError', details });
      }
      next(err);
    }
  };
}


module.exports = {
  validateBody,
  schemas: {
    ...appValidator,
    ...categoryValidator,
    ...userValidator
  }
};
