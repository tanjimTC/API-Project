const Joi = require("joi");
const { Schema } = require("mongoose");

module.exports = {
  validateParam: (schema, name) => {
    return async (req, res, next) => {
      const result = await schema.validate({ params: req["params"][name] });
      if (result.error) {
        // Error happened=
        return res.status(400).json(result.error);
      } else {
        if (!req.value) {
          req.value = {};
        }
        if (!req.value["params"]) {
          req.value["params"] = {};
        }
        req.value["params"][name] = result.value.params;
        next();
      }
    };
  },

  validateBody: (schema) => {
    return async (req, res, next) => {
      const result = await schema.validate(req.body);
      if (result.error) {
        // Error happened=
        return res.status(400).json(result.error);
      } else {
        if (!req.value) {
          req.value = {};
        }
        if (!req.value["body"]) {
          req.value["body"] = {};
        }
        req.value["body"] = result.value;
        next();
      }
    };
  },

  schemas: {
    idSchema: Joi.object().keys({
      params: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
    userSchema: Joi.object().keys({
      fistName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
    }),
    userOptionalSchema: Joi.object().keys({
      fistName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string().email(),
    }),
    userCarSchema: Joi.object().keys({
      make: Joi.string().required(),
      model: Joi.string().required(),
      year: Joi.number().required(),
    }),
    carSchema: Joi.object().keys({
      seller: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      make: Joi.string().required(),
      model: Joi.string().required(),
      year: Joi.number().required(),
    }),
    putCarSchema: Joi.object().keys({
      make: Joi.string().required(),
      model: Joi.string().required(),
      year: Joi.number().required(),
    }),
    patchCarSchema: Joi.object().keys({
      make: Joi.string(),
      model: Joi.string(),
      year: Joi.number(),
    }),
  },
};
