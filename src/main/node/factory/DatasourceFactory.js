const DataQuery = require("../datasource/SqlQuery");
const Datasource = require("../datasource/Datasource");

class DatasourceFactory {

    constructor(host, user, pass, database, connectionLimit) {

    }

    create() {
        return new Datasource(this.connectionPool, this.dataQuery);
    }
}

module.exports = DatasourceFactory;