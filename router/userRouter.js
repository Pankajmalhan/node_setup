const router = require('express').Router();
const _ = require("lodash");
const { UserModal, validateUser, validateUserLogIn } = require("../db/schemas/userSchema");
const { createResponseBody } = require("../util/errorMessages");
const { hash, compare } = require("../util/hash");

router.post('/signup', async (req, res) => {
    let { body } = req;
    console.log({ body });
    try {
        var { error } = validateUser(body);
        if (error) return res.status(400).send(createResponseBody(400, error.details[0].message.replace(new RegExp('\"', 'g'), '')));
        let user = await UserModal.findOne({ emailId: body.emailId });
        if (user) return res.status(400).send(createResponseBody(400, 'user already registered'));
        var userObj = new UserModal(body);
        userObj.password = await hash(body.password);
        var result = await userObj.save();
        res.status(200).send(createResponseBody(200, _.pick(result, ['_id', 'firstName', 'lastName', 'emailId'])));
    }
    catch (err) {
        res.status(400).send(createResponseBody(400, err.errors[Object.keys(err.errors)[0]].message));
    }
});


router.post('/signin', async (req, res) => {
    let { body } = req;
    try {
        var { error } = validateUserLogIn(_.pick(body, ['emailId', 'password']));
        if (error) return res.status(400).send(createResponseBody(400, error.details[0].message.replace(new RegExp('\"', 'g'), '')));
        let user = await UserModal.findOne({ emailId: body.emailId });
        if (!user) return res.status(400).send(createResponseBody(400, 'Invalid email or password'));
        const validPassword =await compare(body.password, user.password);
        if ( !validPassword) return res.status(400).send(createResponseBody(400, 'Invalid email or password'));
        let jwtToken = user.generateAuthToken();
        res.status(200).send(createResponseBody(200, jwtToken));
    }
    catch (err) {
        console.log({ err })
        res.status(400).send(createResponseBody(400, err.errors[Object.keys(err.errors)[0]].message));
    }
});


module.exports = router;