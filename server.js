const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const compression = require('compression');
const zlib = require('zlib');

const router = express.Router();
const httpRouter = require(path.join(__dirname, 'http', 'httpRouter.js'));
const environement = require(path.join(__dirname, 'environements', 'environement.js'));

const app = express();

// cross-domain
app.use(cors({ origin: environement.modeEnum[mode] }));

app.use(compression({
  level: 6, // Taux de compression compris entre -1 et 9 (-1 correspond à la valuer par défaut, 1 corespondant à la compression la plus rapide et 9 la plus comprimante)
  memLevel: 8 // Correspond à la mémoire à allouer à la compression, compris entre 1 et 9 (1 étant le minimum et le 9 le maximum)
}));

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// definition des routes
router.get('/', (req, res) => {
  res.write('<h1>Node works</h1>');
});
app.use('/', httpRouter);

// port
const port = process.env.PORT || '3000';
app.set('port', port);

app.use('/', router);
// creation du serveur
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on port: ${port}\n`));
