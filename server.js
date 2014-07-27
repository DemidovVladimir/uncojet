var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var bodyParser = require('body-parser');
var api = require('./api/index');


var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(favicon());
app.use(logger('dev'));
app.use(express.bodyParser());
app.use(cookieParser());
app.use(cookieParser());
app.use(session({
    secret: 'Ohara Pub'
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);








app.post('/input_dish',api.input_dish);
//app.get('',api.index );
app.post('/input_dish',api.input_dish);
app.post('/addDish',api.addDish);
app.post('/addNews',api.addNews);
app.post('/addDishPhoto',api.addDishPhoto);
app.post('/addNewsPhoto',api.addNewsPhoto);
app.post('/addEventPhoto',api.addEventPhoto);
app.post('/addCategoryPhoto',api.addCategoryPhoto);
app.post('/postDishOutOfFile',api.postOutOfFile);
app.post('/postDishDataOutOfFile',api.postDishDataOutOfFile);
app.post('/postNewsDataOutOfFile',api.postNewsDataOutOfFile);
app.post('/postEventDataOutOfFile',api.postEventDataOutOfFile);
app.post('/postNewsOutOfFile',api.postNewsOutOfFile);
app.post('/postEventOutOfFile',api.postEventOutOfFile);
app.post('/addEvent',api.addEvent);
app.post('/sendEmail',api.sendEmail);
app.post('/postCategoryDataOutOfFile',api.postCategoryDataOutOfFile);

app.get('/getMenuTotal',api.getMenuTotal);

app.get('/getHosperTotal',api.getHosperTotal);
app.get('/getMenuByCat/:category',api.getMenuByCat);
app.get('/getCategoriesTotal',api.getCategoriesTotal);
app.get('/getCategoriesInfo',api.getCategoriesInfo);
app.get('/getBarTotal',api.getBarTotal);
app.get('/getFoodTotal',api.getFoodTotal);
app.get('/getNewsTotal',api.getNewsTotal);
app.get('/getDishInfo/:dish',api.getDishInfo);
app.get('/getNewsInfo/:news',api.getNewsInfo);
app.get('/getEventInfo/:event',api.getEventInfo);
app.get('/deletePicture/:dish/:pic',api.deletePicture);
app.get('/deleteNewsPicture/:news/:pic',api.deleteNewsPicture);
app.get('/deleteEventPicture/:event/:pic',api.deleteEventPicture);
app.get('/deleteDishTotal/:dish',api.deleteDishTotal);
app.get('/deleteNewsTotal/:news',api.deleteNewsTotal);
app.get('/getNewsTotal',api.getNewsTotal);
app.get('/deleteEventTotal/:event',api.deleteEventTotal);
app.get('/getEventsTotal',api.getEventsTotal);
app.get('/getBearMenuTotal',api.getBearMenuTotal);
app.get('/getLaunchMenuTotal',api.getLaunchMenuTotal);
app.get('/getBranchMenuTotal',api.getBranchMenuTotal);
app.get('/photosVk',api.photosVk);

app.get('*',function(req, res) {
    res.sendfile('index.html');
});
/*
 app.post('/adminPanel',api.tryToLog);
 app.get('/adminPanel',function(req,res){
 res.sendfile('login.html');//Change this one
 });//Link to lh:/adminPanel
 */
/*
 app.get('*',function(req,res){
 if(req.session.user=='Admin'){
 res.sendfile('login.html');
 }else{
 res.redirect('/');/////Link other types of pages USERPAGES
 }
 });

 */

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
app.listen(8080);