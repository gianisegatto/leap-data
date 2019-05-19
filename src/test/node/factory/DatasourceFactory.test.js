const sinon = require("sinon");
const expect = require("chai").expect;

const DatasourceFactory = require("../../../main/node/factory/DatasourceFactory");

describe("DatasourceFactory", () => {

    it("should create Datasource", () => {
        
        const host = "host";
        const user = "user";
        const pass = "pass";
        const connectionLimit = 1;
        const database = "database";

        const configuration = { host: host, user: user, pass: pass, database: database, connectionLimit: connectionLimit };
        const connectionPool = {};

        const providerConnection = {
            createPool(configuration){}
        };

        const mokedProviderConnection = sinon.mock(providerConnection);
        mokedProviderConnection.expects("createPool").withExactArgs(configuration).returns(connectionPool);

        const datasourceFactory = new DatasourceFactory(host, user, pass, database, connectionLimit);

        const datasource = datasourceFactory.create();

        expect(datasource).to.not.be.null;
    });
});