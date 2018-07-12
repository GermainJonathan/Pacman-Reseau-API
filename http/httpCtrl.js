const path = require('path');
const http = require('http');
const fs = require('fs');
const exec = require('child_process').exec;

const zlib = require('zlib');
const wkt = require('terraformer-wkt-parser');
var mysql = require('mysql');

const environement = require(path.join(__dirname, '..', 'environements', 'environement.js'));

module.exports = class HttpCtrl {
  constructor() {
  }

  /**
   * Envoi la donnée JSON suivant l'argument donné
   *
   * @param {string} argument
   * @param {httpObject} response
   */
  requestPath(argument, response) {
    switch (argument) {
      case 'newScore':
        console.log(`New score request`.green);
        this.getScore(response);
        break;
      case 'allScore':
        console.log(`All score request`.green);
        this.getScore(response);
        break;
      default:
        response.status(400).json(`Request for argument ${argument} not found`);
    }
  }

  createBO() {
    var mySqlClient = mysql.createConnection({
      host     : environement.dbAcces,
      user     : environement.login,
      password : environement.password,
      database : "PACMAN-BDD"
    });
    mySqlClient.connect(function(err) {
      if(err){
          console.log(err.code);
          console.log(err.fatal);
          return;
      }
    });
    return mySqlClient;
  }

  authentifier(body, response) {
    mySqlClient = this.createBO();
    if(!body || !mySqlClient) {
      response.status(502).json(`ERROR IN ${mySqlClient} or ${body}`);
    }
    var query = "INSERT INTO USER ('admin', 'admin', 0);";
    mySqlClient.query(
      query,
      function select(error, results, fields) {
        if (error) {
          console.log(error);
          mySqlClient.end();
          return;
        }
          
        if ( results.length > 0 )  { 
          console.log(results);
          // var firstResult = results[0];
          // console.log('id: ' + firstResult['id']);
          // console.log('label: ' + firstResult['label']);
          // console.log('valeur: ' + firstResult['valeur']);
        } else {
          console.log("Pas de données");
        }
        mySqlClient.end();
      }
    );
  }
  
  getScore(player, response) {
    mySqlClient = this.createBO();
    if(!mySqlClient) {
      response.status(502).json(`ERROR IN ${mySqlClient}`);
    }
    var query = `SELECT SCORE_MAX FROM USER WHERE PSEUDO = ${player}`;
    mySqlClient.query(
      query,
      function select(error, results, fields) {
        if (error) {
          console.log(error);
          mySqlClient.end();
          return;
        }
          
        if ( results.length > 0 )  { 
          console.log(results);
          // var firstResult = results[0];
          // console.log('id: ' + firstResult['id']);
          // console.log('label: ' + firstResult['label']);
          // console.log('valeur: ' + firstResult['valeur']);
        } else {
          console.log("Pas de données");
        }
        mySqlClient.end();
      }
    );
  }
};
