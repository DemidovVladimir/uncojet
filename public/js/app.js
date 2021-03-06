var app = angular.module('myApp',['ngRoute','ngResource','angularFileUpload','google-maps','ngAnimate','youtube-embed']);



    app.config(function($routeProvider,$locationProvider)
    {
        $locationProvider.html5Mode(true);
        // Register routes with the $routeProvider
        $routeProvider
            .when('/', {
                templateUrl:"parts/home.html",
                controller:'home'
            })
            .when('/test',{
                templateUrl:'/parts/test.html',
                controller:'test'
            })
            .when('/itemEquipment:equipment_name',{
                templateUrl:'/parts/item.html',
                controller:'itemEquipment'
            })
            .when('/itemArea:area_title',{
                templateUrl:'/parts/itemArea.html',
                controller:'itemArea'
            })
            .when('/admin',{
                templateUrl:'parts/admin.html',
                controller:'admin'
            })
            .when('/equipmentAdmin', {
                templateUrl:"parts/add_equipment.html",
                controller:'addEquipment'
            })
            .when('/areaAdmin',{
                templateUrl:'parts/add_area.html',
                controller:'addArea'
            })
            .when('/categoryAdmin',{
                templateUrl:'parts/add_category.html',
                controller:'addCategory'
            })
            .when('/supplies',{
                templateUrl:'parts/supplies.html',
                controller:'supplies'
            })
            .when('/monitor',{
                templateUrl:'parts/monitor.html',
                controller:'monitor'
            })
            .when('/assurance',{
                templateUrl:'parts/assurance.html',
                controller:'assurance'
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



