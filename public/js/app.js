var app = angular.module('myApp',['ngRoute','ngResource','angularFileUpload','google-maps','ngAnimate']);



    app.config(function($routeProvider,$locationProvider)
    {
        $locationProvider.html5Mode(true);
        // Register routes with the $routeProvider
        $routeProvider
            .when('/', {
                templateUrl:"parts/home.html",
                controller:'home'
            })
            .when('/equipmentAdmin', {
                templateUrl:"parts/add_equipment.html",
                controller:'addEquipment'
            })
            .when('/equipmentAdmin:equipment', {
                templateUrl:"/parts/maintain_equipment.html",
                controller:'oneEquipment'
            })


            .when('/aboutUs',{
                templateUrl:'parts/aboutUs.html',
                controller:'aboutUs'
            })
            .when('/brewery',{
                templateUrl:'parts/brewery.html',
                controller:'brewery'
            })
            .when('/delivery',{
                templateUrl:'parts/delivery.html',
                controller:'delivery'
            })
            .when('/menu',{
                templateUrl:'parts/menu.html',
                controller:'allMenu'
            })
            .when('/menubar',{
                templateUrl:'parts/bar.html',
                controller:'bar'
            })
            .when('/menufood',{
                templateUrl:'parts/food.html',
                controller:'food'
            })
            .when('/menubear',{
                templateUrl:'parts/bear.html',
                controller:'bear'
            })
            .when('/menulaunch',{
                templateUrl:'parts/launch.html',
                controller:'launch'
            })
            .when('/menubranch',{
                templateUrl:'parts/branch.html',
                controller:'branch'
            })

            .when('/adminCategory', {
                templateUrl:"parts/maintain_category.html",
                controller:'maintainCategory'
            })
            .when('/newsAdmin', {
                templateUrl:"/parts/add_news.html",
                controller:'addNews'
            })
            .when('/newsAdmin:news', {
                templateUrl:"/parts/maintain_news.html",
                controller:'oneNews'
            })
            .when('/eventsAdmin', {
                templateUrl:"/parts/add_event.html",
                controller:'addEvent'
            })
            .when('/eventsAdmin:event', {
                templateUrl:"/parts/maintain_event.html",
                controller:'oneEvent'
            })
            .when('/viewDish:dish', {
                templateUrl:"/parts/veiwDish.html",
                controller:'viewDish'
            })
            .when('/news', {
                templateUrl:"/parts/news.html",
                controller:'news'
            })
            .when('/news:news', {
                templateUrl:"/parts/viewNews.html",
                controller:'viewNews'
            })
            .when('/events', {
                templateUrl:"/parts/events.html",
                controller:'events'
            })
            .when('/events:event', {
                templateUrl:"/parts/viewEvent.html",
                controller:'viewEvent'
            })
            .when('/menubyCat:category', {
                templateUrl:"/parts/menuCat.html",
                controller:'menuCat'
            })


            .when('/contacts', {
                templateUrl:"/parts/contacts.html",
                controller:'contacts'
            })
            .when('/assist',{
                templateUrl:"/parts/assist.html",
                controller:'assist'
            })
            .when('/assistTech',{
                templateUrl:"/parts/assistTech.html",
                controller:'assistTech'
            })
            .otherwise({
                redirectTo: '/'
            });
    });



