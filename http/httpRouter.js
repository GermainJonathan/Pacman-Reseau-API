const path = require('path');
const express = require('express');
const http = require('http');
const colors = require('colors');
const router = express.Router();

const HttpCtrl = require(path.join(__dirname, 'httpCtrl.js'));
const httpCtrl = new HttpCtrl();

// les requetes json
router.get('/service/:arg', (request, response) => {
  console.log(`receiving json request: ${request.params.arg}`.grey);
 // response.set('Content-Encoding', 'gzip'); // NOPE
  httpCtrl.requestPath(request.params.arg, response);
});

// requete d'authentification
router.post('/authentifier', (request, response) => {
  console.log(`receiving login request`.green);
  httpCtrl.authentifier(request.body, response);
});

module.exports = router;
