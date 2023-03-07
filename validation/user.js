const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    email:Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .lowercase()
            .required(),

    password: Joi.string()
        .min(7)
        .required()
        .pattern(new RegExp('^[a-zA-Z0-9]{8,30}')),

    confirmPassword: Joi.ref('password'),
    
})
const pwChange=Joi.object({
    oldpassword:Joi.string()
            .min(7)
            .required()
            .pattern(new RegExp('^[a-zA-Z0-9]{8,30}')),
    newpassword: Joi.string()
        .min(7)
        .required()
        .pattern(new RegExp('^[a-zA-Z0-9]{8,30}')),

    newconfirmPassword: Joi.ref('newpassword'),
})
   


const loginV=Joi.object({
    email:Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .lowercase()
    .required(),

password: Joi.string()
.min(7)
.required()
.pattern(new RegExp('^[a-zA-Z0-9]{8,30}')),
})


module.exports={
    userSchema,
    pwChange,
    loginV
}