const joi = require("joi");

module.exports = {
  body: {
    title: joi.string().required(),
    desciption: joi.string().required(),
    price: joi.number().required()
  }
};
