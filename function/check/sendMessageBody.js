exports.execute = async (request) => {
    // check for basic auth header
    if (isNaN(request.body.number) || !request.body.message || !request.body.number) {
        return { code: 400, message: 'Unexpected Body' }
    } else {
        return { code: 200, message: 'Ok' }
    }
}