const goCatch = async(promise) => {
    try {
        const result = await promise
        return [result, null]
    } catch (err) {
        return [null, err]
    }
}

module.exports = goCatch