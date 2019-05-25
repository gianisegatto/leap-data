const ErrorBuilder = require("leap-core").ErrorBuilder;

class Datasource {

    constructor(connectionPool, dataQuery) {
        this.connectionPool = connectionPool;
        this.dataQuery = dataQuery;
    }

    query(sql, values, rowMapper) {
    }
}

module.exports = Datasource;