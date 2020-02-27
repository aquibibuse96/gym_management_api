function createResponse(error, dbResult) {
    var result = {};
    if (error == undefined || error == null) {
        result['status'] = 'success';
        result['data'] = dbResult;
    } else {
        result['status'] = 'error';
    }

    return result;
}

module.exports = {
    createResponse: createResponse
};
