const  express = require('express');
const bodyparser = require('body-parser');
const path  = require('path');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const routerMap = require('./router')
let app = express()

initialSetup = () => {
  app.use(bodyparser.json({limit:'150mb', parameterLimit:5000}))
  app.use(bodyparser.urlencoded({limit:'150mb', parameterLimit:5000, extended:true }))
  app.set('views', path.join(__dirname, 'src/views'))
  app.set('view engine', 'jade')
  app.use(express.json())
  app.use(express.urlencoded({extended:false}))
  app.use(cors({origin:'*'}))
  app.use(morgan('dev'))
}

routesSetups = ()=>{
  for (const iterator of routerMap) {
    const router = require(iterator.fileName)
    if(iterator.middleware && iterator.middleware.length>0){
      app.use(`/api${iterator.path}`, (req, res, next)=>{
        next()
      }, ...[...iterator.middleware, router])
    }
    app.use(`/api${iterator.path}`, router)
    // console.log(iterator)
    
  }
}
initialSetup()
routesSetups()


app.listen(8000, () => {
  console.log('lisning on port no: 8000')  
})

