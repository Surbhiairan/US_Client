const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const cors = require('cors');

//var server = require('http').createServer(app);
//var io = require('socket.io')(server);


const apiRoutes = require('./server/routes');
app.use(cors());
app.use(bodyParser.json({'limit' : '100mb'}));
app.use('/api',apiRoutes);

app.use(express.static(path.join(__dirname, 'client/build')));

//app.use(express.static(path.join(__dirname,"notification")));


//production mode
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    //
    app.get('*', (req, res) => {
      res.sendfile(path.join(__dirname = 'client/build/index.html'));
    })
  }
  //build mode
  app.get("/client.js", (req, res) => {
    res.sendFile(path.resolve(__dirname+"/client/public/client.js"));
  });
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/public/index.html'));
  })


//Route setup
app.get('/', (req, res) => {
  
  res.send('root route');
})
//Start server


app.listen(port, (req, res) => {
console.log(`server listening on port: ${port}`)
 });