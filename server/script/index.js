const mysql = require('mysql');
const fs = require('fs');
const path = require('path');
const config = require('../config/env');
//const refData = require('./seed_data');
const connection = mysql.createConnection(config.db_url + '?multipleStatements=true');



const getFiles = (path, extension = '') => {
  if (!extension.startsWith('.')) { extension = '.' + extension; }
  return fs.readdirSync(path).filter(file => file.toLowerCase().endsWith(extension));
};

// returns the contents of the file as a string.
const getFileData = (folder, filename) => {
  let filePath = path.join(folder, filename);
  console.log(filePath);
  return fs.readFileSync(filePath).toString();
};

// returns the contents of the SQL file as a string.  If string passed doesn't end with .sql it will be appended
const getSQLFileData = (filename) => {
  // let filePath = path.join(__dirname, filename.toLowerCase().endsWith('.sql') ? filename : filename + '.sql');
  // return fs.readFileSync(filePath).toString();
  return getFileData(__dirname, filename.toLowerCase().endsWith('.sql') ? filename : filename + '.sql');
};

// Executes a SQL Script from a file
const runSQLScript = (database, filename) => {
  return new Promise( (resolve, reject) => {
    console.log(`use ${database}; ${getSQLFileData(filename)}`);
    connection.query(`use ${database}; ${getSQLFileData(filename)}`, (err, results) => {
      if (err) {
        console.log(`use ${database}; ${getSQLFileData(filename)}`);
        return reject(err);
      }
      else {
        console.log(results);
        return resolve(results);
      }
    });
  });
};

    
  Promise.all(getFiles(path.join(__dirname), 'sql').map(file => runSQLScript(config.db_config.database, `${file}`)))
       .then(results => {
        process.exit(0);
      })
      .catch(error => {
        console.log(error);
        process.exit(1);
  });


