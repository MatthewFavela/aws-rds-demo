'use strict';
const Pool = require('pg-pool');
const config = require('../config.json');
const { table, host, database, user, password, port } = config;
const pool = new Pool({
    host,
    database,
    user,
    password,
    port,
    idleTimeoutMillis: 1000
});

module.exports.postStudent = (event, context, callback) => {
    const name = event.body.student_name;
  const grade = event.body.grade_level;
  const postNexwStudents = `INSERT INTO ${table} VALUES(default, $1, $2)`;

    pool.connect()
        .then(client => {
            client.release()
            return client.query(postNewStudent, [name, grade]);
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
                })
            };

            callback(null, response)
        })
        .catch(err => {
            console.log('err', err);
        });


    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};