const insertData = require('./insert')
const deleteHotelData = require('./delete')
const aggregateData = require('./aggregate')
const Crud = { insertData, deleteHotelData, aggregateData }

module.exports = Crud