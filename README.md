# Pacman-Reseau-API
Serveur NodeJS servant de middleware pour Pacman-Réseau et notre BDD

# Pre-Requis

Il s'agit d'un serveur NodeJS donc tout en javascript.

## Pourquoi NodeJS ?

NodeJS est un serveur simple à déployer, il ne necessite pas de configuration particulière.
Le JavaScript est un language très permissif.

## Installation

L'installation est assez simple:

### Windows

Télécharger NodeJS : https://nodejs.org/fr/

Lors de l'instalation de NodeJS vous installerez en même temps NPM, un gestionnaire de package

Un fois l'installation terminer lancer cette commande pour voir si tout c'est bien passé :
> node -v  
> npm -v  

Les numéros de versions devraient s'afficher si ce n'est pas le cas vous avez un problème, il est necesaire de refaire une intallation sur un environnement sein.

### Linux

#### Debian 9

Package requis:
- build-essential
- libssl-dev
- curl

**Avec Sudo:**
> curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -

**Sans Sudo:**
> cd Downloads  
> curl -sL https://deb.nodesource.com/setup_8.x  
> chmod +x setup_8.x  
> ./setup_8.x

**Puis:**

> apt install nodejs

Un fois l'installation terminer lancer cette commande pour voir si tout c'est bien passé :
> node -v  
> npm -v

Les numéros de versions devraient s'afficher si ce n'est pas le cas vous avez un problème, il est necesaire de refaire une intallation sur un environnement sein.  
Source Installation : https://linuxconfig.org/how-to-install-nodejs-on-debian-9-stretch-linux

#### CentOS 7

Package requis:
- Sudo
- curl

> sudo yum install epel-release  
> curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -  
> sudo yum install nodejs

Outils pour npm:  
> sudo yum install gcc-c++ make  

Un fois l'installation terminer lancer cette commande pour voir si tout c'est bien passé :
> node -v  
> npm -v

Les numéros de versions devraient s'afficher si ce n'est pas le cas vous avez un problème, il est necesaire de refaire une intallation sur un environnement sein.  
Source Installation : https://www.rosehosting.com/blog/how-to-install-node-js-and-npm-on-centos-7/

## Lancement du serveur Node

Aller sur dans votre dossier puis lancer la commande suivant:
> npm i  

Cette commande permet de télécharger tout les packets necessaire au bon fonctionnement de l'API. La liste de ces package ce trouve dans packages.json  
Lancement du serveur ( port 3000 par défaut ):
> npm run start  

Description de la commande dans package.json  
Une fois le serveur lancer vous pouver tester son fonctionnement en lancement une requette HTTP: 'localhost:3000/authentifier'  
Outils de lancement de requête http: **Postman**: https://www.getpostman.com

Si tout est correctement intallé le serveur reçois votre requête et affiche:
```
receiving login request
```
Les erreurs qui suivent sont surement des erreurs de connexion à la BDD