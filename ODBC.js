/*
ODBC Connector

Components:

Destination
ODBC Manager
ODBC Connection
ODBC Names
*/

function Destination() {
  this.database = {};
  this.connectionManager = {};
}

Destination.prototype.SelectAll = function(table) {
  return this.database[table];
}

function Source() {
  this.database = {};
}

Source.prototype.SelectAll= function(table) {
  return this.database[table];
}

function OdbcConnector(source,destination) {
  this.destination = destination;
  this.source = source;
  //.bind(source) below is necessary because otherwise SelectAll thinks 'this' refers to the OdbcConnector object
  this.SelectAll = source.SelectAll.bind(source);
}


var access = new Destination();
var sqlServer = new Source();

//mocking data retrieval from SQL Server Client
console.log('****SQL Server Data Retrieval from SQL Server Client****')
sqlServer.database['Cars'] = ['Ford Mustang', 'Porsche Carrera', 'Lamborghini Aventador'];
console.log(sqlServer.SelectAll('Cars'));

//mocking set-up of ODBC Connection software
var odbcConnector = new OdbcConnector(sqlServer, access);
access.connectionManager['SQL Server'] = odbcConnector;

//now mocking call of SQL Server data from MS Access
console.log('****SQL Server Data Retrieval from MS Access****');
console.log(access.connectionManager['SQL Server'].SelectAll('Cars'));
