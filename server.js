var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var bodyParser = require('body-parser');
var api = require('./api/index');
var io = require('socket.io')(http);
var path = require('path');















// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(favicon());
app.use(logger('dev'));
app.use(express.bodyParser());
app.use(cookieParser());
app.use(cookieParser());
app.use(session({
    secret: 'UncoJet'
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);






//io.sockets.on('connection', socket);




io.on('connection',function(socket){
   // socket.broadcast.emit('chat message','Make_beep');
    socket.on('disconnect', function(){
        //socket.broadcast.emit('chat message','Спасибо за помощь!');
    });
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});




app.post('/sendEmail',api.sendEmail);
app.post('/addFilesTo/:element',api.addFilesTo);

app.get('/deleteFileEquipment/:type/:file',api.deleteFileEquipment);
app.get('/deleteFileArea/:file',api.deleteFileArea);
app.get('/deleteFileCategory/:type/:file',api.deleteFileCategory);

app.get('/deleteEquipmentTotal/:equipment',api.deleteEquipmentTotal);
app.get('/deleteAreaTotal/:area',api.deleteAreaTotal);
app.get('/deleteCategoryTotal/:category',api.deleteCategoryTotal);
app.post('/postEquipmentOutOfFile',api.postEquipmentOutOfFile);
app.post('/postAreaOutOfFile',api.postAreaOutOfFile);
app.post('/postCategoryOutOfFile',api.postCategoryOutOfFile);
app.get('/getEquipmentsTotal',api.getEquipmentsTotal);
app.get('/getAreasTotal',api.getAreasTotal);
app.get('/getAreaTotal/:area',api.getAreaTotal);
app.get('/getCategoriesTotal',api.getCategoriesTotal);
app.get('/getEquipmentTotal/:equipment',api.getEquipmentTotal);
app.get('/getEquipmentsTotal/:bycat',api.getEquipmentsTotalByCat);
app.get('/getEquipmentsTotalByArea/:area',api.getEquipmentsTotalByArea);
app.get('/getAreasTotalByEquipment/:equipment',api.getAreasTotalByEquipment);
app.get('/searchFor/:item',api.search);

app.get('*',function(req, res) {
    res.sendfile(path.join(
      __dirname,
      'index.html'
    ));
});




/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.log(err.message);
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    console.log(err.message);
});

module.exports = app;
http.listen(80, function(){
    console.log('listening on 80');
});
