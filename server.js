const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

//parse application/json
app.use(bodyParser.json())

const port = 3000

//bringing routers
const user = require('./router/user');
const post = require('./router/post');
const auth = require('./router/auth');
const vote = require('./router/vote');

const DB = require('./config/db');

DB.socialNWDB.sequelizeDB.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
    DB.socialNWDB.sequelizeDB.sync({})
    .then(() => {
        console.log('tables creation successful');
      })
      .catch(err => {
        console.error('tables creation failed:', err);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});

//add the routes to server(apis)
app.use('/api/user',user);
app.use('/api/post',post);
app.use('/api/auth',auth);
app.use('/api/vote',vote);

//app server
app.listen(port, () => {
    console.log('server running in 3000 port')
})