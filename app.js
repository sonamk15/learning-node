const  express = require('express');
const bodyparser = require('body-parser');
const path  = require('path');
const cors = require('cors');
const morgan = require('morgan');
const moment = require("moment");
var fs = require('fs');
require('dotenv').config();

const db = require("./src/db");
const routerMap = require('./router')
let app = express();
const MONGO_HOSTNAME = process.env.MONGO_HOSTNAME;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_DB = process.env.MONGO_DB;
const DB_URL = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`;

initialSetup = () => {
  app.use(bodyparser.json({limit:'150mb', parameterLimit:5000}))
  app.use(bodyparser.urlencoded({limit:'150mb', parameterLimit:5000, extended:true }))
  app.set('views', path.join(__dirname, 'src/views'))
  app.set('view engine', 'jade')
  app.use(express.json())
  app.use(express.urlencoded({extended:false}))
  app.use(cors({origin:'*'}))
  
  
  // setup the logger
  if (!fs.existsSync(path.join(__dirname, 'apilogs.json')) ) {
    fs.writeFileSync(path.join(__dirname, 'apilogs.json'), JSON.stringify([]));
  }
    
  app.use(morgan( (tokens, req, res) => {
    let rawdata = fs.readFileSync('apilogs.json');
    let jsonData = JSON.parse(rawdata)
    const data = { "METHOD:": tokens.method(req, res),
      "URI:": tokens.url(req, res),
      "STATUS_CODE:": tokens.status(req, res),
      "BODY:": JSON.stringify(req.body),
      "PARAMS": JSON.stringify(req.params),
      "QUERY_PARAMS": JSON.stringify(req.query),
      "HEADER:": JSON.stringify(req.headers),
      "API_RES": req.apiRes ? JSON.stringify(req.apiRes): null,
      "RESPONCE_TIME:": `${tokens['response-time'](req, res)}ms`,
      "TOTAL_RES_TIME:": `${tokens['total-time'](req, res)}ms`,
      "REQ_DATE_TIME:": moment(tokens.date()).format("DD-MM-YYYY hh:mm:ss A")
    }
    jsonData.push(data)
    fs.writeFileSync("apilogs.json", JSON.stringify(jsonData, null, 2));
    return;
  }))
}

//  route setup
routesSetups = ()=>{
  for (const iterator of routerMap) {
    const router = require(iterator.fileName)
    if(iterator.middleware && iterator.middleware.length>0){
      app.use(`/api${iterator.path}`, (req, res, next)=>{
        next()
      }, ...[...iterator.middleware, router])
    }
    app.use(`/api${iterator.path}`, router)
  }
}

dbConnection = () => {
  db.connect(DB_URL);
}

initialSetup();
routesSetups();
dbConnection()

const listerner = app.listen(8000, () => {
  console.log(`lisning on port no: ${listerner.address().port}`)  
})
