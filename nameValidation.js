const Joi = require('joi');

const nameValidation = (reqBody) =>{
    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(reqBody, schema);

    return result;
};


module.exports = nameValidation;


