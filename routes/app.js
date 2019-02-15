const express = require('express');
const app = express();

const knex = require('knex')({
  client: 'pg',
  connection: {
    host     : '127.0.0.1',
    user     : 'cubex',
    password : 'cubex',
    database : 'firstStep',
    charset  : 'utf8'
  }
});
const bookshelf = require('bookshelf')(knex);






app.use('/public', express.static(__dirname + '/public'));
//app.use(express.static(__dirname + '/public'));



const server = app.listen(config.PORT, () => {
    console.log(`Express launched at http://localhost:'  ${config.PORT}  '; press Ctrl+C to disconnect`);
});
mongoose.connect(process.env.DB_CONN, { useNewUrlParser: true }, function(err) {
    //console.log(process.env.DB_CONN);
    if (err) {
        return console.log(err);
    } else {
        console.log('Database connected succesfully!');
    }
});
const io = require('socket.io')(server);




