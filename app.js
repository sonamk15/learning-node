const  express = require('express');
const bodyparser = require('body-parser');
const path  = require('path');
const cors = require('cors');
const morgan = require('morgan');
const moment = require("moment");
var fs = require('fs');
const cron = require("node-cron");
var createError = require("http-errors");
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
    console.log(`Initializing ${iterator.fileName} --> /api${iterator.path}`);
    const router = require(iterator.fileName);
    if(iterator.middleware && iterator.middleware.length>0){
      app.use(`/api${iterator.path}`, (req, res, next)=>{
        next()
      }, ...[...iterator.middleware, router])
    }
    app.use(`/api${iterator.path}`, router);
    console.log(`👍`);
  }
}

errorHandlers = () => {
  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    console.log("I am Pralhad", err.message)
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {status: err.status};
    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });
  console.log("error handlers setup done 👍");
};

dbConnection = () => {
  db.connect(DB_URL);
}

initialSetup();
routesSetups();
errorHandlers();
dbConnection();

if (process.env.CRON_ON === "YES") {
  // "*/1 * * * *", Every min
  // "0 * * * *", Every hours
  // "* */4 * * *", Every four hours
  cron.schedule("*/1 * * * *", async () => {});
}

const listerner = app.listen(8000, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${listerner.address().port}`);  
})
