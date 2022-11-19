exports.send = async (number, message) => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

    for (let cont = 0; cont <= 10; cont++) {
        if (client) { continue }

        await delay(1000)
        if (cont === 10) return { execution: 'error', code: 401, result: 'client not started' }
    }

    return await client.sendText(`${number}@c.us`, message)
        .then(result => {
            return { execution: 'success', code: 200, result: result }
        })
        .catch(error => {
            return { execution: 'error', code: 400, result: error }
        });
}