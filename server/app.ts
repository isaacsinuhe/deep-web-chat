import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';

import setRoutes from './routes';

const app = express();
dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

// mongoose 
(<any>mongoose).Promise = global.Promise;
const connection = mongoose.connect(process.env.MONGODB_URI, 
  { useMongoClient: true }
);

connection
.then((val) => {
  console.log('Connected to MongoDB')
  
  // connected to mongo and routes fully setted up
  setRoutes(app)
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'))
  })
  
  app.listen(app.get('port'), () => {
    console.log('Express listening on port ' + app.get('port'))
  })
})
.catch((e) => {
  console.log('connection error:')
})

export { app };
