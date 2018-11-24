/*This file contain the error message for the schema */
const userErrorMessages = {
    firstName: {
        match: 'first name is not valid'
    },
    lastName: {
        match: 'last name is not valid'
    }
}

const commonErrorMessages = {
    required: (field) => `${field} is required`,
    alreadyExist: (field) => `${field} is already exist`,
    match: (field) => `${field} is not valid`,
    enum:(values)=>`value is not valid, value should be ${values}`
}

const createResponseBody = function (status, response) {
    switch (status) {
        case 200:
            return {
                status: status,
                data: response,
                error: null
            }
            break;
        case 400 || 401:
            return {
                status: status,
                data: null,
                error: {
                    data: response
                }
            }
            break;
        case 500:
            return {
                status: status,
                data: null,
                error: null
            }
            break;
    }
}
module.exports = { userErrorMessages, commonErrorMessages, createResponseBody }