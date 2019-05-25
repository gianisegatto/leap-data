const ErrorBuilder = require("leap-core").ErrorBuilder;

class SqlErroBuilder {
    
    static build(source, message, details) {
        const error = ErrorBuilder.build(source, message, details);
        error.type = "DATA_SQL";
        return error;
    }
}

module.exports = SqlErroBuilder;