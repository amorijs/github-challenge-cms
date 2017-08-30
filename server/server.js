import Express from 'express';
// Express middleware which gets graphql endpoint spawned very quickly
import GraphHTTP from 'express-graphql'
import Schema from './db/models/schema';

// Config
const APP_PORT = 3000;

const app = Express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(Express.static('./client'));

app.use('/graphql', GraphHTTP({
  schema: Schema,
  pretty: true,
  // Allows you to query graphql in a "nice" way.  Look through doc of linting of graphql structure?
  graphiql: true,
}));

// app.use('/test', (req, res) => {
//   res.render()
// });

app.listen(APP_PORT, () => {
  console.log(`App listening on port ${APP_PORT}`);
});
