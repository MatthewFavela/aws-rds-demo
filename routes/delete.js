'use strict';
const Pool = require('pg-pool');
const config = require("../config.json");
const {table,host,database,user,password,port} = config;
const pool =  new  Pool({
  host,
  database,
  user,
  password,
  port,
  idleTimeoutMillis: 1000
});

module.exports.deleteStudents = (event, context, callback) => {
console.log('event', event);
  const id = event.body.id;
  const deleteStudent = `DELETE FROM ${table} WHERE id = $1`;
  
  pool.connect()
  .then(client => {
    client.release()
    return client.query(deleteStudent, [id]);
  })      
  .then(res => {
  const response = {      
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': 'http://127.0.0.1:8080',
      'Access-Control-Allow-Credentials': true                                 
    },
    body: JSON.stringify({
      message: res,
    }),
  };

    callback(null, response);
  })
  .catch(err => {
    console.log('err', err);
  })
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};