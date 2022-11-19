exports.execute = async (request) => {
    // check for basic auth header
    // if (!request.headers.authorization || request.headers.authorization.indexOf('Basic ') === -1) {
    //     return { code: 400, message: 'Missing Authorization Header' }
    // } else {
    //     return { code: 200, message: 'Ok' }
    // }
    return { code: 200, message: 'Ok' }
}