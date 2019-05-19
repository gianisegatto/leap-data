const sinon = require("sinon");
const expect = require("chai").expect;

const ErrorBuilder = require("leap-core").ErrorBuilder;
const Datasource = require("../../../main/node/datasource/Datasource");
const DataQuery = require("../../../main/node/datasource/SqlQuery");

describe("Datasource", () => {

    it("should execute success query", async () => {

        const connection = {};
        const sql = "SELECT * FROM table";
        const values = [];

        const rowMapper = {};

        const connectionPool = {
            getConnection(callback) {
                callback(null, connection);
            }
        };

        const TestQuery = class TestQuery extends DataQuery {

            query(connection, sql, values, rowMapper){}
        };

        const testQuery = new TestQuery();

        const expectedResult = [{test: "test"}];

        const expectedPromise = new Promise((resolve => resolve(expectedResult)));

        const mockedDataQuery = sinon.mock(testQuery);
        mockedDataQuery.expects("query").withExactArgs(connection, sql, values, rowMapper).returns(expectedPromise);

        const datasource = new Datasource(connectionPool, testQuery);

        const result = await datasource.query(sql, values, rowMapper);

        expect(result).to.deep.equal(expectedResult);

    });

    it("should return error from query execution", async () => {

        const connection = {};
        const sql = "SELECT * FROM test";
        const values = [];
        const rowMapper = {};

        const connectionPool = {
            getConnection(callback) {
                callback(null, connection);
            }
        };

        const TestQuery = class TestQuery extends DataQuery {

            query(connection, sql, values, rowMapper) { }
        };

        const testQuery = new TestQuery();

        const expectedException = "Table test not found";

        const expectedPromise = new Promise(((resolve, reject) => reject(expectedException)));

        const mockedDataQuery = sinon.mock(testQuery);
        mockedDataQuery.expects("query").withExactArgs(connection, sql, values, rowMapper).returns(expectedPromise);

        const datasource = new Datasource(connectionPool, testQuery);

        try {
            await datasource.query(sql, values, rowMapper);
        } catch (e) {
            expect(e).to.deep.equal(expectedException);
        }

    });

    it("should return error database connection", async () => {

        const error = "Error to open conneciton";
        const sql = "SELECT * FROM table";
        const values = [];
        const rowMapper = {};

        const expectedException = ErrorBuilder.build("DATABASE_CONNECTION", "Error during open connection", error);

        const connectionPool = {
            getConnection(callback) {
                callback(error);
            }
        };

        const datasource = new Datasource(connectionPool);

        try {
            await datasource.query(sql, values, rowMapper);
        } catch (e) {
            expect(e).to.deep.equal(expectedException);
        }
    });
});