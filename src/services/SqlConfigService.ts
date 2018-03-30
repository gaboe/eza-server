const sql = require("mssql");

const connect = () => sql.connect("mssql://app:123@localhost/eza");

export { connect };