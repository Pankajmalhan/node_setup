const mongoose = require("mongoose");
const { userErrorMessages, commonErrorMessages } = require("../../util/errorMessages");
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

/*Schema for the user */
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, commonErrorMessages.required('first name')],
        match: [/^[a-zA-Z]+$/, commonErrorMessages.match('first name')]
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, commonErrorMessages.required('last name')],
        match: [/^[a-zA-Z]+$/, commonErrorMessages.match('last name')]
    },
    emailId: {
        type: String,
        trim: true,
        required: [true, commonErrorMessages.required('email Id')],
        unique: [true, commonErrorMessages.alreadyExist('email id')],
        match: [/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, commonErrorMessages.match('email Id')]
    },
    mobileNo: {
        type: String,
        trim: true,
        required: [true, commonErrorMessages.required('mobile No')],
        match: [/^([0|\+[0-9]{1,5})?([6-9][0-9]{9})$/, commonErrorMessages.match('mobile No')]
    },
    gender: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, commonErrorMessages.required('gender')],
        enum: {
            values: ['male', 'female', 'other'],
            message: commonErrorMessages.enum('male, female, other')
        }
    },
    password: {
        type: String,
        trim: true,
        required: [true, commonErrorMessages.required('password')],
        match: [/^.{8,}$/, commonErrorMessages.match('password')]
    },
    createdOn: { type: Date, default: Date.now }
});

userSchema.methods.generateAuthToken = function () {
    let jwtToken = jwt.sign(_.pick(this, ['_id', 'firstName', 'lastName', 'emailId']),
        config.get("jwtPrivateKey"));
    return jwtToken;
}

function validateUser(user) {
    const schema = Joi.object({
        firstName: Joi.string().required().trim().regex(/^[a-zA-Z]+$/),
        lastName: Joi.string().required().trim().regex(/^[a-zA-Z]+$/),
        emailId: Joi.string().required().trim().email(),
        mobileNo: Joi.string().required().trim().regex(/^([0|\+[0-9]{1,5})?([6-9][0-9]{9})$/),
        password: Joi.string().required().trim().regex(/^[a-zA-Z0-9]{8,}$/)
    }).options({ stripUnknown: true });

    return Joi.validate(user, schema);
}

function validateUserLogIn(user) {
    const schema = Joi.object({
        emailId: Joi.string().required().trim().email(),
        password: Joi.string().required().trim().regex(/^[a-zA-Z0-9]{8,}$/)
    }).options({ stripUnknown: true });

    return Joi.validate(user, schema);
}

const UserModal = mongoose.model('User', userSchema);
module.exports = { UserModal, validateUser, validateUserLogIn };

