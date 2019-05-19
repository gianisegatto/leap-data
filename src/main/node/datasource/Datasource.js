const ErrorBuilder = require("leap-core").ErrorBuilder;

class Datasource {

    constructor(connectionPool, dataQuery) {
        this.connectionPool = connectionPool;
        this.dataQuery = dataQuery;
    }

    query(sql, values, rowMapper) {

        return new Promise((resolve, reject) => {

            this.connectionPool.getConnection((err, connection) => {

                if (err) {
                    return reject(ErrorBuilder.build("DATABASE_CONNECTION", "Error during open connection", err));
                }

                return this.dataQuery.query(connection, sql, values, rowMapper)
                    .then(result => resolve(result))
                    .catch(exception => reject(exception))

            });
        });
    }
}

module.exports = Datasource;