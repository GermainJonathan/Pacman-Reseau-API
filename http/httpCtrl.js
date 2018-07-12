const path = require('path');
const http = require('http');
const fs = require('fs');
const exec = require('child_process').exec;

const zlib = require('zlib');
const wkt = require('terraformer-wkt-parser');

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
      case 'logon':
        // this.getJsonData('R_Gare', response);
        console.log(`Login request`.green);
        response.status(200).json({test: 'test'});
        break;
      default:
        response.status(400).json(`Request for argument ${argument} not found`);
    }
  }

  /**
   * Paramètre et exécute la requête SOAP vers le service de login
   *
   * @param {object} params - contient le login / mdp
   * @param {httpObject} response
   */
  requestLoginSoap(params, response) {
    this.perfCtrl.start('full-soap-request (login)');

    const xml = this.getXmlWrap({
      login: params.login,
      password: params.password
    }, 'loginWrap');

    // options soap
    const action = `AuthentifierUtilisateur`, path = `/ISIAdministrationClient.svc`;

    this.getSoapData(action, path, xml, data => {
      //Comportement pour authentification basic
      const authBaliseName = [
        'IdUtilisateur',
        'IsAdministrator',
        'IsConsultant',
        'IsEditeur',
        'IsOperateur',
        'Login',
        'Name',
        'MotDePasse',
        'NomGroupeUtilisateur'
      ];
      const authChildBalise = 'AuthentifierUtilisateurResponse';
      const parsedData = this.parserSoapReponsToJSON(authChildBalise, data, authBaliseName);

      const code = parsedData == -1 ? 501 : 200;
      response.status(code).json(parsedData);
    });
  }

  /**
   * Effectue la requête vers le serveur applicatif
   *
   * @param {string} path - paramètres url
   * @param {httpObject} response - requête du client
   */
  getJsonData(path, response) {
    let options = {
      hostname: environement.hostName, // TODO env
      port: environement.jsonPort, // TODO env
      path: `${environement.railGeometries}/${path}`,
      method: 'GET'
    };

    let req = http.request(options, res => {
      // let chunkIndex = 0;
      let rawData = '';
      res.setEncoding('utf8');
      res.on('data', chunk => {
        // console.log(`[${chunkIndex++}] chunk receive`);
        rawData += chunk;
      });
      res.on('end', () => {
        const data = this.wktToGeoJson(rawData);
        response.status(200).json(data);
      });
    });

    req.on('error', error => {
      console.log(error);
      response.status(400).send('An error has occured');
    });

    req.end();
  }

  /**
   * Envoie une requête de recherche de ligne
   *
   * @param {any} params contient le code de ligne (codeLigne) et l'utilisateur
   * @param {any} response
   * @returns
   */
  requestSearchLine(params, response) {
    this.perfCtrl.start('soap-package');
    const xml = this.getXmlWrap(
      {
        codeLigne: params.codeLigne,
        IdUtilisateur: params.user.id,
        IsAdministrator: params.user.isAdministrator,
        IsConsultant : params.user.isConsultant,
        IsEditeur : params.user.isEditeur,
        IsOperateur : params.user.isOperateur,
        Login : params.user.login,
        MotDePasse : params.user.motDePasse,
        Name : params.user.name,
        NomGroupeUtilisateur : params.user.nomGroupeUtilisateur
      },
      'searchLineWrap'
    );

    // options soap
    const path = `/ISI_GIRail_Infras_LigneClient.svc`,
      action = `RechercherLigneParCodeR_Ligne`;

    this.getSoapData(action, path, xml, data => {
      const searchChildBalise = 'RechercherLigneParCodeR_LigneResult';
      const searchNameBalise = [ '_idMetier' ];
      const parsedData = this.parserSoapReponsToJSON(searchChildBalise, data, searchNameBalise);
      response.status(200).json(parsedData);
      this.perfCtrl.stop('soap-package');
    });
  }

};
