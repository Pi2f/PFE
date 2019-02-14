# PFE

Architecture de base d'une application permettant la gestion des utilisateurs, la gestion de photos, la prise de photo et la capacité d'ajouter des services d'analyses de photos à partir d'un fichier de configuration.

## Getting Started

### Prérequis
- ` node 8.11.1 `
- ` mongoDB `
- ` npm ` ou ` yarn `
- ` openssl ` pour la connexion https (optionnel)

### Intro

Pour utiliser l'application, vous aurez besoin d'héberger 4 applications :

- [user-PFE](https://github.com/Pi2f/user-PFE) : Gestion des utilisateurs en base de données
- [photo-PFE](https://github.com/Pi2f/photo-PFE) : Gestion des photos en base de données
- [PFE](https://github.com/Pi2f/PFE) : Application principale comprenant la partie client et les appels vers les applications de gestion. 


### Configuration 

Pour configurer chaque application vous devez modifier les fichiers de configuration ` config.js `
de chaque application.

---
Fichier de configuration de photo-PFE 

Ce fichier est muni d'un compte mail pour pouvoir envoyer les photos à un docteur expert en mélanome.

``` javascript

module.exports = {
    urlDB: "mongodb://<user>:<password>@<hostname>:<port>/<DBname>", // url de la base de données mongo
    port: '3000', // port d'écoute du serveur
}

```
---
Fichier de configuration de user-PFE

Ce fichier est muni d'un compte mail pour permettre de valider les inscriptions et permettre de regénérer un mot de passe en cas d'oubli.

``` javascript

module.exports = {
    urlDB: "mongodb://<user>:<password>@<hostname>:<port>/<DBname>", // url de la base de données mongo
    port: '3000', // port d'écoute du serveur
    sendMail: '<mailAdress>', // Adresse du compte email attaché à l'application example noreply@hostname.com
    pass: '<password>', // Mot de passe associé à l'email
    mailService: '<mailService>' // Service de messagerie example gmail
    doctorMail: '<mailDoctor>' // Adresse email du docteur correspondant
}

```
---
Fichier de configuration de l'application général PFE

``` javascript

module.exports = {
    port: '3000', // port d'écoute du serveur
    secret : '<tokenSecret>', // token public secret 
    userApiUrl : '<urlAdress>', // adresse de l'application user-PFE
    photoApiUrl : '<urlAdress>', // adresse de l'application photo-PFE

    // Services d'analyse de photo à ajouter
    services: [
        {
            url: '<urlAdress0>', // adresse du premier service
            path:'<path0>', // path du service utilisé
        },
        {
            url: '<urlAdress1>',
            path:'<path1>',
        },
        ...etc,
    ]
}

```
---

### Configuration de la connexion HTTPS (optionnel)

Exécuter les commandes ci-dessous à la racine du dossier

``` shell
openssl genrsa -des3 -out server.enc.key 1024
openssl req -new -key server.enc.key -out server.csr
openssl rsa -in server.enc.key -out server.key
openssl x509 -req -in server.csr -signkey server.enc.key -out server.cert
```
Remplacer la connexion http par la connexion https dans le fichier `server.js`

``` javascript
var fs = require(‘fs’);
var app = require(‘express’);
var https = require(‘https’);
var options = {
    key : fs.readFileSync(‘server.key’),
    cert : fs.readFileSync(‘server.cert’),
};

https.createServer(opyions, app).listen(config.port, function() { console.log(‘started’)})
```


---

### Exécution

1. A la racine de chaque projet, commencer par installer tous les packages à l'aide de la commande `npm install` ou `yarn`.

2. Pour exécuter les applications il suffit de lancer la commande `npm start ` pour chaque application.

## Important

N'oublier pas après la création du premier utilisateur administrateur en base de données de modifier son champ `isAdmin` à `true` directement dans la base de données pour qu'il puisse accéder à son espage d'administrateur.








