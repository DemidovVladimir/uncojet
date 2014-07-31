'use strict';









app.controller('home',function($scope,$resource,$window){


});
app.controller('total',function($scope,$resource){
    $('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
        // Avoid following the href location when clicking
        event.preventDefault();
        // Avoid having the menu to close when clicking
        event.stopPropagation();
        // If a menu is already open we close it
        //$('ul.dropdown-menu [data-toggle=dropdown]').parent().removeClass('open');
        // opening the one you clicked on
        $('ul.dropdown-menu [data-toggle=dropdown]').parent().removeClass('open');
        $(this).parent().toggleClass('open');

        var menu = $(this).parent().find("ul");
        var menupos = menu.offset();

        if ((menupos.left + menu.width()) + 30 > $(window).width()) {
            var newpos = - menu.width();
        } else {
            var newpos = $(this).parent().width();
        }
        menu.css({ left:newpos });

    });
});




app.controller('getMenu',function($scope,$resource,$document,$window){
    $('.collapse li').mouseover(function(){
        $(this).addClass('gradientMenu');
    });
    $('.collapse li').mouseout(function(){
        $(this).removeClass('gradientMenu');
    });
    $scope.clickLeftSecond = function(){
        $('#myCarousel_2 .left').trigger('click');
    }

    $scope.clickRightSecond = function(){
        $('#myCarousel_2 .right').trigger('click');
    }
    $scope.clickLeftThird = function(){
        $('#myCarousel_3 .left').trigger('click');
    }

    $scope.clickRightThird = function(){
        $('#myCarousel_3 .right').trigger('click');
    }



    $scope.width = window.innerWidth;
    var todo_2 = $resource('/photosVk');
    var events = todo_2.query(function(){

        $scope.totalEvents = events;

        //Check window size
        $scope.$watch('width', function(newValue, oldValue) {
           if(newValue < 992){
                var pictureArr = [];
                for(var x=0; x<events.length; x++){
                    var total = {};
                    total.pic = events[x].photo;
                    pictureArr.push(total);
                };
                var picLength = pictureArr.length;
                var leftPic = picLength%2;
                var devidedTot = picLength/2;
                var devidedInt = parseInt(devidedTot);

                if(leftPic!=0 && devidedInt==0){
                    var nesPic = 2-leftPic;
                    for(var i=0;i<nesPic;i++){
                        var total = {};
                        total.pic = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                        pictureArr.push(total);
                    };
                }

                var itemsActive = pictureArr.splice(0,2);
                var set = [];
               var nonSet = [];
                set.push(itemsActive);
                $scope.activeEvents = set[0];
               //If items 3
               var totLen = pictureArr.length/2;
               totLen = parseInt(totLen);
               var leftLen = pictureArr.length%2;


               for(var i=0; i<totLen; i++){
                   var itemsActive = pictureArr.splice(0,2);
                   nonSet.push(itemsActive);
               }
               if(leftLen!=0){
                   var itemsActive = pictureArr.splice(0,2);
                   nonSet.push(itemsActive);
               }
               $scope.singleEvents = nonSet;

               /*var leftLen = picLength-2;
                var itemsSingle = [];
                itemsSingle = pictureArr.slice(0);

                for(var t=0;t<itemsSingle.length;t++){
                    var set_copy = [];
                    set_copy = set[t].slice(0);
                    set_copy.splice(0,1);
                    set_copy.push(itemsSingle[t]);
                    set.push(set_copy);
                };

                var itemsResult = [];
                for(var d=0;d<set.length-1;d++){
                    itemsResult.push(set[d+1]);
                }
                $scope.singleEvents = itemsResult;*/
            }else{
                var pictureArr = [];
                for(var x=0; x<events.length; x++){
                    var total = {};
                    total.pic = events[x].photo;
                    pictureArr.push(total);
                };
                var picLength = pictureArr.length;
                var leftPic = picLength%3;
                var devidedTot = picLength/3;
                var devidedInt = parseInt(devidedTot);

                if(leftPic!=0 && devidedInt==0){
                    var nesPic = 3-leftPic;
                    for(var i=0;i<nesPic;i++){
                        var total = {};
                        total.pic = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                        pictureArr.push(total);
                    };
                }

                var itemsActive = pictureArr.splice(0,3);
                var set = [];
                var nonSet = [];
                set.push(itemsActive);
                $scope.activeEvents = set[0];







               //If items 3
               var totLen = pictureArr.length/3;
               totLen = parseInt(totLen);
               var leftLen = pictureArr.length%3;


               for(var i=0; i<totLen; i++){
                   var itemsActive = pictureArr.splice(0,3);
                    nonSet.push(itemsActive);
               }
               if(leftLen!=0){
                   var itemsActive = pictureArr.splice(0,3);
                   nonSet.push(itemsActive);
               }
               $scope.singleEvents = nonSet;
           };
        });
    });
               //$scope.rest = set;
              /*  for(var t=0;t<pictureArr.length;t++){
                    var set_copy = [];
                    set_copy = set[t].slice(0);
                    var toE = t*3;
                    var new_set = set_copy.splice(0,3);
                    //set_copy.push(pictureArr[t]);
                    set.push(new_set);
                };

                var itemsResult = [];
                for(var d=0;d<set.length-1;d++){
                    itemsResult.push(set[d+1]);
                }*/












    var todo = $resource('/getMenuByCat/хоспер');
    var info = todo.query(function(){
        var forRepo = info;

        forRepo.forEach(function(repo){
            if(repo.dish_brief == 'undefined'){
                repo.dish_brief = '';
            }
            if(repo.dish_about == 'undefined'){
                repo.dish_about = '';
            }
        });

        $scope.info = forRepo;
        var lenka = info.length;






        //Check window size
        $scope.$watch('width', function(newValue, oldValue) {
            if(newValue < 768){
                var pictureArr = [];
                for(var x=0; x<lenka; x++){
                    var total = {};
                    if(!info[x].dish_photo[0] || info[x].dish_photo[0]=='undefined'){
                        total.pic = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                        total.mini = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                    }else{
                        total.pic = '/uploaded/'+info[x].dish_photo[0];
                        total.mini = '/uploaded/mini_'+info[x].dish_photo[0];
                    }
                    if(info[x].dish_name!='undefined'){
                        total.title = info[x].dish_name;
                    }else{
                        total.title = "";
                    }
                    if(info[x].dish_brief!='undefined'){
                        total.brief = info[x].dish_brief;
                    }else{
                        total.brief = '';
                    }
                    pictureArr.push(total);
                };
                $scope.itemsSingle = pictureArr;
            }else if(newValue < 992){
                var pictureArr = [];
                for(var x=0; x<lenka; x++){
                    var total = {};
                    total.pic = '/uploaded/'+info[x].dish_photo[0];
                    total.mini = '/uploaded/mini_'+info[x].dish_photo[0];
                    if(info[x].dish_name!='undefined'){
                        total.title = info[x].dish_name;
                    }else{
                        total.title = "";
                    }

                    if(info[x].dish_brief!='undefined'){
                        total.brief = info[x].dish_brief;
                    }else{
                        total.brief = '';
                    }


                    pictureArr.push(total);
                };
                var picLength = pictureArr.length;
                var leftPic = picLength%4;
                var devidedTot = picLength/4;
                var devidedInt = parseInt(devidedTot);

                if(leftPic!=0 && devidedInt==0){
                    var nesPic = 4-leftPic;
                    for(var i=0;i<nesPic;i++){
                        var total = {};
                        total.pic = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                        total.mini = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                        total.title = "";
                        total.brief = '';
                        pictureArr.push(total);
                    };
                }

                var itemsActive = pictureArr.splice(0,4);
                var set = [];
                set.push(itemsActive);
                $scope.active = set[0];
                var leftLen = picLength-4;
                var itemsSingle = [];
                itemsSingle = pictureArr.slice(0);

                for(var t=0;t<itemsSingle.length;t++){
                    var set_copy = [];
                    set_copy = set[t].slice(0);
                    set_copy.splice(0,1);
                    set_copy.push(itemsSingle[t]);
                    set.push(set_copy);
                };

                var itemsResult = [];
                for(var d=0;d<set.length-1;d++){
                    itemsResult.push(set[d+1]);
                }
                $scope.itemsSingle = itemsResult;
            }else{
                var pictureArr = [];
                for(var x=0; x<lenka; x++){
                    var total = {};
                    if(!info[x].dish_photo[0] || info[x].dish_photo[0]=='undefined'){
                        total.pic = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                        total.mini = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                    }else{
                        total.pic = '/uploaded/'+info[x].dish_photo[0];
                        total.mini = '/uploaded/mini_'+info[x].dish_photo[0];
                    }
                    if(info[x].dish_name!='undefined'){
                        total.title = info[x].dish_name;
                    }else{
                        total.title = "";
                    }

                    if(info[x].dish_brief!='undefined'){
                        total.brief = info[x].dish_brief;
                    }else{
                        total.brief = '';
                    }


                    pictureArr.push(total);
                };
                var picLength = pictureArr.length;
                var leftPic = picLength%5;
                var devidedTot = picLength/5;
                var devidedInt = parseInt(devidedTot);

                if(leftPic!=0 && devidedInt==0){
                    var nesPic = 5-leftPic;
                    for(var i=0;i<nesPic;i++){
                        var total = {};
                        total.pic = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                        total.mini = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                        total.title = "";
                        total.brief = '';
                        pictureArr.push(total);
                    };
                }

                var itemsActive = pictureArr.splice(0,5);
                var set = [];
                set.push(itemsActive);
                $scope.active = set[0];
                var leftLen = picLength-5;
                var itemsSingle = [];
                itemsSingle = pictureArr.slice(0);

                for(var t=0;t<itemsSingle.length;t++){
                    var set_copy = [];
                    set_copy = set[t].slice(0);
                    set_copy.splice(0,1);
                    set_copy.push(itemsSingle[t]);
                    set.push(set_copy);
                };

                var itemsResult = [];
                for(var d=0;d<set.length-1;d++){
                    itemsResult.push(set[d+1]);
                }
                $scope.itemsSingle = itemsResult;
            };
        });
    });




//Manipulating DOM




    function tellAngular() {
        $scope.$apply(function() {
            $scope.width = window.innerWidth;
           // location.reload();
        });
    }



    //calling tellAngular on resize event
    $window.onresize = tellAngular;
});

app.controller('menuCat',function($scope,$resource,$document,$window,$routeParams){
    var category = $routeParams.category;
    $('.content').ready(function(){


        $('.collapse li').mouseover(function(){
            $(this).addClass('gradientMenu');
        });
        $('.collapse li').mouseout(function(){
            $(this).removeClass('gradientMenu');
        });
    });

    $scope.width = window.innerWidth;

    var todo = $resource('/getMenuByCat/'+category);
    var info = todo.query(function(){
        var forRepo = info;
        forRepo.forEach(function(repo){
            if(repo.dish_brief == 'undefined'){
                repo.dish_brief = '';
            }
            if(repo.dish_about == 'undefined'){
                repo.dish_about = '';
            }
        });

        $scope.info = forRepo;
        var lenka = info.length;






        //Check window size
        $scope.$watch('width', function(newValue, oldValue) {
            if(newValue < 992){
                var pictureArr = [];
                for(var x=0; x<lenka; x++){
                    var total = {};
                    if(!info[x].dish_photo[0] || info[x].dish_photo[0]=='undefined'){
                        total.pic = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                        total.mini = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                    }else{
                        total.pic = '/uploaded/'+info[x].dish_photo[0];
                        total.mini = '/uploaded/mini_'+info[x].dish_photo[0];
                    }
                    if(info[x].dish_name!='undefined'){
                        total.title = info[x].dish_name;
                    }else{
                        total.title = "";
                    }

                    if(info[x].dish_brief!='undefined'){
                        total.brief = info[x].dish_brief;
                    }else{
                        total.brief = '';
                    }


                    pictureArr.push(total);
                };
                var picLength = pictureArr.length;
                var leftPic = picLength%4;
                var devidedTot = picLength/4;
                var devidedInt = parseInt(devidedTot);

                if(leftPic!=0 && devidedInt==0){
                    var nesPic = 4-leftPic;
                    for(var i=0;i<nesPic;i++){
                        var total = {};
                        total.pic = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                        total.mini = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                        total.title = "";
                        total.brief = '';
                        pictureArr.push(total);
                    };
                }

                var itemsActive = pictureArr.splice(0,4);
                var set = [];
                set.push(itemsActive);
                $scope.active = set[0];
                var leftLen = picLength-4;
                var itemsSingle = [];
                itemsSingle = pictureArr.slice(0);

                for(var t=0;t<itemsSingle.length;t++){
                    var set_copy = [];
                    set_copy = set[t].slice(0);
                    set_copy.splice(0,1);
                    set_copy.push(itemsSingle[t]);
                    set.push(set_copy);
                };

                var itemsResult = [];
                for(var d=0;d<set.length-1;d++){
                    itemsResult.push(set[d+1]);
                }
                $scope.itemsSingle = itemsResult;
            }else{
                var pictureArr = [];
                for(var x=0; x<lenka; x++){
                    var total = {};
                    if(!info[x].dish_photo[0] || info[x].dish_photo[0]=='undefined'){
                        total.pic = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                        total.mini = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                    }else{
                        total.pic = '/uploaded/'+info[x].dish_photo[0];
                        total.mini = '/uploaded/mini_'+info[x].dish_photo[0];
                    }
                    if(info[x].dish_name!='undefined'){
                        total.title = info[x].dish_name;
                    }else{
                        total.title = "";
                    }

                    if(info[x].dish_brief!='undefined'){
                        total.brief = info[x].dish_brief;
                    }else{
                        total.brief = '';
                    }


                    pictureArr.push(total);
                };
                var picLength = pictureArr.length;
                var leftPic = picLength%5;
                var devidedTot = picLength/5;
                var devidedInt = parseInt(devidedTot);

                if(leftPic!=0 && devidedInt==0){
                    var nesPic = 5-leftPic;
                    for(var i=0;i<nesPic;i++){
                        var total = {};
                        total.pic = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                        total.mini = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                        total.title = "";
                        total.brief = '';
                        pictureArr.push(total);
                    };
                }

                var itemsActive = pictureArr.splice(0,5);
                var set = [];
                set.push(itemsActive);
                $scope.active = set[0];
                var leftLen = picLength-5;
                var itemsSingle = [];
                itemsSingle = pictureArr.slice(0);

                for(var t=0;t<itemsSingle.length;t++){
                    var set_copy = [];
                    set_copy = set[t].slice(0);
                    set_copy.splice(0,1);
                    set_copy.push(itemsSingle[t]);
                    set.push(set_copy);
                };

                var itemsResult = [];
                for(var d=0;d<set.length-1;d++){
                    itemsResult.push(set[d+1]);
                }
                $scope.itemsSingle = itemsResult;
            };
        });
    });




//Manipulating DOM




    function tellAngular() {
        $scope.$apply(function() {
            $scope.width = window.innerWidth;
            //location.reload();
        });
    }



    //calling tellAngular on resize event
    $(window).resize(tellAngular);







//Manipulating DOM










    $scope.clickLeftMenu = function(){
        $('#myCarousel_7 .left').trigger('click');
        $('#myCarousel_8 .left').trigger('click');
    }

    $scope.clickRightMenu = function(){
        $('#myCarousel_7 .right').trigger('click');
        $('#myCarousel_8 .right').trigger('click');
    }


    $scope.clickcontrol = function(event){
        event.preventDefault();
    };

    /*#myCarousel_2 .thumbnail .btn-info{
        position: relative;
        bottom: -150px;
    }*/


});








app.controller('addMenu', function ($scope, $fileUploader,$resource,$route, $location) {
    $scope.path = 'http://oharapub.kz/menuAdmin';// Путь который контролит данный обработчик--------------------------------------


    $scope.deleteTotalDish = function(dish){
        var Todo = $resource('/deleteDishTotal/'+dish);
        var info = Todo.query();
        $route.reload();
    }

    //Post all data without picture--------------
    $scope.postDataOutOfFile = function(){
        var title = $scope.title;
        var about = $scope.about;
        var brief = $scope.brief;
        var time = $scope.time;
        var price = $scope.price;
        var weight = $scope.weight;
        var type = $scope.dish_type;
        var category = $scope.dish_category;
        var order = $scope.order;
        if(title && title!='Данное поле является обязательным!!!'){
            var inputTo = $resource('/postDishOutOfFile');

            var input = new inputTo();
            input.title = title;
            input.about = about;
            input.time = time;
            input.brief = brief;
            input.price = price;
            input.weight = weight;
            input.type = type;
            input.category = category;
            input.order = order;

            input.$save();

            $route.reload();
        }else{
            $scope.title = 'Данное поле является обязательным!!!';
        }
    }


    var Todo = $resource('getMenuTotal');
    $scope.incomings = [];
    var info = Todo.query(function(){
        info.forEach(function(data){
            var incomeInfo = {};
            incomeInfo.title = data.dish_name;
            incomeInfo.photo = data.dish_photo;
            incomeInfo.about = data.dish_about;
            incomeInfo.brief = data.dish_brief;
            incomeInfo.time = data.dish_prepare;
            incomeInfo.price = data.dish_price;
            incomeInfo.weight = data.dish_weight;
            incomeInfo.order = data.dish_order;
            $scope.incomings.push(incomeInfo);
        });
    });





    //Photo uploader-----------------------------------------------------
        var uploader = $scope.uploader = $fileUploader.create({
            scope: $scope,
            url: 'addDish'
        });





    uploader.bind('beforeupload', function (event, item) {
        var title = $scope.title;
        var about = $scope.about;
        var brief = $scope.brief;
        var time = $scope.time;
        var price = $scope.price;
        var weight = $scope.weight;
        var type = $scope.dish_type;
        var category = $scope.dish_category;
        var order = $scope.order;
        var info = {title:title,about:about,order:order,time:time,brief:brief,price:price,weight:weight,type:type,category:category};
        item.formData.push(info);
    });
    uploader.bind('completeall', function (event, items) {
        $route.reload();
    });



        // ADDING FILTERS

        // Images only
        uploader.filters.push(function(item /*{File|HTMLInputElement}*/) {
            var type = uploader.isHTML5 ? item.type : '/' + item.value.slice(item.value.lastIndexOf('.') + 1);
            type = '|' + type.toLowerCase().slice(type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        });


        // REGISTER HANDLERS

        uploader.bind('afteraddingfile', function (event, item) {
            console.info('After adding a file', item);
        });

        uploader.bind('whenaddingfilefailed', function (event, item) {
            console.info('When adding a file failed', item);
        });

        uploader.bind('afteraddingall', function (event, items) {
            console.info('After adding all files', items);
        });

        uploader.bind('beforeupload', function (event, item) {
            console.info('Before upload', item);
        });

        uploader.bind('progress', function (event, item, progress) {
            console.info('Progress: ' + progress, item);
        });

        uploader.bind('success', function (event, xhr, item, response) {
            console.info('Success', xhr, item, response);
        });

        uploader.bind('cancel', function (event, xhr, item) {
            console.info('Cancel', xhr, item);
        });

        uploader.bind('error', function (event, xhr, item, response) {
            console.info('Error', xhr, item, response);
        });

        uploader.bind('complete', function (event, xhr, item, response) {
            console.info('Complete', xhr, item, response);
        });

        uploader.bind('progressall', function (event, progress) {
            console.info('Total progress: ' + progress);
        });

        uploader.bind('completeall', function (event, items) {

        });
    });













app.controller('oneDish', function ($scope,$fileUploader,$routeParams,$resource,$route,$location){
    var dish = $routeParams.dish;
    var Todo = $resource('/getDishInfo/'+dish);
    var info = Todo.query(function(){
        var data = info[0];
        $scope.dishTitle = data.dish_name;
        $scope.dishAbout = data.dish_about;
        $scope.dishTime = data.dish_prepare;
        $scope.dishPhoto = data.dish_photo;
        $scope.dishBrief = data.dish_brief;
        $scope.dishPrice = data.dish_price;
        $scope.dishWeight = data.dish_weight;
        $scope.dishOrder = data.dish_order;
    });
    $scope.deletePic = function(pic){
        var toDo = $resource('/deletePicture/'+dish+'/'+pic);
        var deleteStuf = toDo.query();
        $route.reload();
    };











    //Post all data without picture
    $scope.postDataOutOfFile = function(){
        var title = $routeParams.dish;
        var about = $scope.about;
        var time = $scope.time;
        var brief = $scope.brief;
        var price = $scope.price;
        var weight = $scope.weight;
        var order = $scope.order;
        var inputTo = $resource('/postDishDataOutOfFile');

        var input = new inputTo();
        input.title = title;
        input.about = about;
        input.time = time;
        input.brief = brief;
        input.price = price;
        input.weight = weight;
        input.order = order;

        input.$save();

        $route.reload();
    };

    ////Photo uploader------------------------------------------------------
    var uploader = $scope.uploader = $fileUploader.create({
        scope: $scope,
        url: 'addDishPhoto'
    });





    uploader.bind('beforeupload', function (event, item) {
        var title = $routeParams.dish;
        var about = $scope.about;
        var time = $scope.time;
        var brief = $scope.brief;
        var price = $scope.price;
        var weight = $scope.weight;
        var order = $scope.order;
        var info = {title:title,order:order,about:about,brief:brief,time:time,price:price,weight:weight};
        item.formData.push(info);
    });
    uploader.bind('completeall', function (event, items) {
        $route.reload();
    });



    // ADDING FILTERS

    // Images only
    uploader.filters.push(function(item) {
        var type = uploader.isHTML5 ? item.type : '/' + item.value.slice(item.value.lastIndexOf('.') + 1);
        type = '|' + type.toLowerCase().slice(type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    });


    // REGISTER HANDLERS

    uploader.bind('afteraddingfile', function (event, item) {
        console.info('After adding a file', item);
    });

    uploader.bind('whenaddingfilefailed', function (event, item) {
        console.info('When adding a file failed', item);
    });

    uploader.bind('afteraddingall', function (event, items) {
        console.info('After adding all files', items);
    });

    uploader.bind('beforeupload', function (event, item) {
        console.info('Before upload', item);
    });

    uploader.bind('progress', function (event, item, progress) {
        console.info('Progress: ' + progress, item);
    });

    uploader.bind('success', function (event, xhr, item, response) {
        console.info('Success', xhr, item, response);
    });

    uploader.bind('cancel', function (event, xhr, item) {
        console.info('Cancel', xhr, item);
    });

    uploader.bind('error', function (event, xhr, item, response) {
        console.info('Error', xhr, item, response);
    });

    uploader.bind('complete', function (event, xhr, item, response) {
        console.info('Complete', xhr, item, response);
    });

    uploader.bind('progressall', function (event, progress) {
        console.info('Total progress: ' + progress);
    });

    uploader.bind('completeall', function (event, items) {

    });
});


app.controller('addNews',function($scope,$fileUploader,$routeParams,$resource,$route,$location){
    $scope.path = 'http://oharapub.kz/newsAdmin';// Путь который контролит данный обработчик--------------------------------------


    $scope.deleteTotalNews = function(news){
        var Todo = $resource('/deleteNewsTotal/'+news);
        var info = Todo.query();
        $route.reload();
    }

    //Post all data without picture--------------
    $scope.postDataOutOfFile = function(){
        var title = $scope.title;
        var about = $scope.about;
        var brief = $scope.brief;
        var dateOf = $scope.dateOf;
        if(title && title!='Данное поле является обязательным!!!'){
            var inputTo = $resource('/postNewsOutOfFile');

            var input = new inputTo();
            input.title = title;
            input.about = about;
            input.brief = brief;
            input.dateOf = dateOf;

            input.$save();

            $route.reload();
        }else{
            $scope.title = 'Данное поле является обязательным!!!';
        }
    }


    var Todo = $resource('getNewsTotal');
    $scope.incomings = [];
    var info = Todo.query(function(){
        info.forEach(function(data){
            var incomeInfo = {};
            incomeInfo.title = data.news_name;
            incomeInfo.photo = data.news_photo;
            incomeInfo.about = data.news_about;
            incomeInfo.brief = data.news_brief;
            incomeInfo.dateOf = data.news_date;
            $scope.incomings.push(incomeInfo);
        });
    });





    //Photo uploader-----------------------------------------------------
    var uploader = $scope.uploader = $fileUploader.create({
        scope: $scope,
        url: 'addNews'
    });





    uploader.bind('beforeupload', function (event, item) {
        var title = $scope.title;
        var about = $scope.about;
        var brief = $scope.brief;
        var dateOf = $scope.dateOf;
        var info = {title:title,about:about,brief:brief,dateOf:dateOf};
        item.formData.push(info);
    });
    uploader.bind('completeall', function (event, items) {
        $route.reload();
    });



    // ADDING FILTERS

    // Images only
    uploader.filters.push(function(item /*{File|HTMLInputElement}*/) {
        var type = uploader.isHTML5 ? item.type : '/' + item.value.slice(item.value.lastIndexOf('.') + 1);
        type = '|' + type.toLowerCase().slice(type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    });


    // REGISTER HANDLERS

    uploader.bind('afteraddingfile', function (event, item) {
        console.info('After adding a file', item);
    });

    uploader.bind('whenaddingfilefailed', function (event, item) {
        console.info('When adding a file failed', item);
    });

    uploader.bind('afteraddingall', function (event, items) {
        console.info('After adding all files', items);
    });

    uploader.bind('beforeupload', function (event, item) {
        console.info('Before upload', item);
    });

    uploader.bind('progress', function (event, item, progress) {
        console.info('Progress: ' + progress, item);
    });

    uploader.bind('success', function (event, xhr, item, response) {
        console.info('Success', xhr, item, response);
    });

    uploader.bind('cancel', function (event, xhr, item) {
        console.info('Cancel', xhr, item);
    });

    uploader.bind('error', function (event, xhr, item, response) {
        console.info('Error', xhr, item, response);
    });

    uploader.bind('complete', function (event, xhr, item, response) {
        console.info('Complete', xhr, item, response);
    });

    uploader.bind('progressall', function (event, progress) {
        console.info('Total progress: ' + progress);
    });

    uploader.bind('completeall', function (event, items) {

    });
});



app.controller('addEvent',function($scope,$fileUploader,$routeParams,$resource,$route,$location){
    $scope.path = 'http://oharapub.kz/eventsAdmin';// Путь который контролит данный обработчик--------------------------------------


    $scope.deleteTotalEvent = function(event){
        var Todo = $resource('/deleteEventTotal/'+event);
        var info = Todo.query();
        $route.reload();
    }

    //Post all data without picture--------------
    $scope.postDataOutOfFile = function(){
        var title = $scope.title;
        var about = $scope.about;
        var brief = $scope.brief;
        var dateOf = $scope.dateOf;
        if(title && title!='Данное поле является обязательным!!!'){
            var inputTo = $resource('/postEventOutOfFile');

            var input = new inputTo();
            input.title = title;
            input.about = about;
            input.brief = brief;
            input.dateOf = dateOf;

            input.$save();

            $route.reload();
        }else{
            $scope.title = 'Данное поле является обязательным!!!';
        }
    }


    var Todo = $resource('getEventsTotal');
    $scope.incomings = [];
    var info = Todo.query(function(){
        info.forEach(function(data){
            var incomeInfo = {};
            incomeInfo.title = data.event_name;
            incomeInfo.photo = data.event_photo;
            incomeInfo.about = data.event_about;
            incomeInfo.brief = data.event_brief;
            incomeInfo.dateOf = data.event_date;
            $scope.incomings.push(incomeInfo);
        });
    });





    //Photo uploader-----------------------------------------------------
    var uploader = $scope.uploader = $fileUploader.create({
        scope: $scope,
        url: 'addEvent'
    });





    uploader.bind('beforeupload', function (event, item) {
        var title = $scope.title;
        var about = $scope.about;
        var brief = $scope.brief;
        var dateOf = $scope.dateOf;
        var info = {title:title,about:about,brief:brief,dateOf:dateOf};
        item.formData.push(info);
    });
    uploader.bind('completeall', function (event, items) {
        $route.reload();
    });



    // ADDING FILTERS

    // Images only
    uploader.filters.push(function(item /*{File|HTMLInputElement}*/) {
        var type = uploader.isHTML5 ? item.type : '/' + item.value.slice(item.value.lastIndexOf('.') + 1);
        type = '|' + type.toLowerCase().slice(type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    });


    // REGISTER HANDLERS

    uploader.bind('afteraddingfile', function (event, item) {
        console.info('After adding a file', item);
    });

    uploader.bind('whenaddingfilefailed', function (event, item) {
        console.info('When adding a file failed', item);
    });

    uploader.bind('afteraddingall', function (event, items) {
        console.info('After adding all files', items);
    });

    uploader.bind('beforeupload', function (event, item) {
        console.info('Before upload', item);
    });

    uploader.bind('progress', function (event, item, progress) {
        console.info('Progress: ' + progress, item);
    });

    uploader.bind('success', function (event, xhr, item, response) {
        console.info('Success', xhr, item, response);
    });

    uploader.bind('cancel', function (event, xhr, item) {
        console.info('Cancel', xhr, item);
    });

    uploader.bind('error', function (event, xhr, item, response) {
        console.info('Error', xhr, item, response);
    });

    uploader.bind('complete', function (event, xhr, item, response) {
        console.info('Complete', xhr, item, response);
    });

    uploader.bind('progressall', function (event, progress) {
        console.info('Total progress: ' + progress);
    });

    uploader.bind('completeall', function (event, items) {

    });
});




app.controller('oneNews',function($scope,$fileUploader,$routeParams,$resource,$route,$location){
    var news = $routeParams.news;
    var Todo = $resource('/getNewsInfo/'+news);
    var info = Todo.query(function(){
        var data = info[0];
        $scope.newsTitle = data.news_name;
        $scope.newsAbout = data.news_about;
        $scope.newsTime = data.news_prepare;
        $scope.newsPhoto = data.news_photo;
        $scope.newsBrief = data.news_brief;
        $scope.newsDate = data.news_date;
    });
    $scope.deletePic = function(pic){
        var toDo = $resource('/deleteNewsPicture/'+news+'/'+pic);
        var deleteStuf = toDo.query();
        $route.reload();
    };











    //Post all data without picture
    $scope.postDataOutOfFile = function(){
        var title = $routeParams.news;
        var about = $scope.about;
        var brief = $scope.brief;
        var dateOf = $scope.dateOf;
        var inputTo = $resource('/postNewsDataOutOfFile');

        var input = new inputTo();
        input.title = title;
        input.about = about;
        input.brief = brief;
        input.dateOf = dateOf;

        input.$save();

        $route.reload();
    };

    ////Photo uploader------------------------------------------------------
    var uploader = $scope.uploader = $fileUploader.create({
        scope: $scope,
        url: 'addNewsPhoto'
    });





    uploader.bind('beforeupload', function (event, item) {
        var title = $routeParams.news;
        var about = $scope.about;
        var brief = $scope.brief;
        var dateOf = $scope.dateOf;
        var info = {title:title,about:about,brief:brief, dateOf:dateOf};
        item.formData.push(info);
    });
    uploader.bind('completeall', function (event, items) {
        $route.reload();
    });



    // ADDING FILTERS

    // Images only
    uploader.filters.push(function(item) {
        var type = uploader.isHTML5 ? item.type : '/' + item.value.slice(item.value.lastIndexOf('.') + 1);
        type = '|' + type.toLowerCase().slice(type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    });


    // REGISTER HANDLERS

    uploader.bind('afteraddingfile', function (event, item) {
        console.info('After adding a file', item);
    });

    uploader.bind('whenaddingfilefailed', function (event, item) {
        console.info('When adding a file failed', item);
    });

    uploader.bind('afteraddingall', function (event, items) {
        console.info('After adding all files', items);
    });

    uploader.bind('beforeupload', function (event, item) {
        console.info('Before upload', item);
    });

    uploader.bind('progress', function (event, item, progress) {
        console.info('Progress: ' + progress, item);
    });

    uploader.bind('success', function (event, xhr, item, response) {
        console.info('Success', xhr, item, response);
    });

    uploader.bind('cancel', function (event, xhr, item) {
        console.info('Cancel', xhr, item);
    });

    uploader.bind('error', function (event, xhr, item, response) {
        console.info('Error', xhr, item, response);
    });

    uploader.bind('complete', function (event, xhr, item, response) {
        console.info('Complete', xhr, item, response);
    });

    uploader.bind('progressall', function (event, progress) {
        console.info('Total progress: ' + progress);
    });

    uploader.bind('completeall', function (event, items) {

    });
});


app.controller('oneEvent',function($scope,$fileUploader,$routeParams,$resource,$route,$location){
    var event = $routeParams.event;
    var Todo = $resource('/getEventInfo/'+event);
    var info = Todo.query(function(){
        var data = info[0];
        $scope.eventTitle = data.event_name;
        $scope.eventAbout = data.event_about;
        $scope.eventPhoto = data.event_photo;
        $scope.eventBrief = data.event_brief;
        $scope.eventDate = data.event_date;
    });
    $scope.deletePic = function(pic){
        var toDo = $resource('/deleteEventPicture/'+event+'/'+pic);
        var deleteStuf = toDo.query();
        $route.reload();
    };











    //Post all data without picture
    $scope.postDataOutOfFile = function(){
        var title = $routeParams.event;
        var about = $scope.about;
        var brief = $scope.brief;
        var dateOf = $scope.dateOf;
        var inputTo = $resource('/postEventDataOutOfFile');

        var input = new inputTo();
        input.title = title;
        input.about = about;
        input.brief = brief;
        input.dateOf = dateOf;

        input.$save();

        $route.reload();
    };

    ////Photo uploader------------------------------------------------------
    var uploader = $scope.uploader = $fileUploader.create({
        scope: $scope,
        url: 'addEventPhoto'
    });





    uploader.bind('beforeupload', function (event, item) {
        var title = $routeParams.event;
        var about = $scope.about;
        var brief = $scope.brief;
        var dateOf = $scope.dateOf;
        var info = {title:title,about:about,brief:brief, dateOf:dateOf};
        item.formData.push(info);
    });
    uploader.bind('completeall', function (event, items) {
        $route.reload();
    });



    // ADDING FILTERS

    // Images only
    uploader.filters.push(function(item) {
        var type = uploader.isHTML5 ? item.type : '/' + item.value.slice(item.value.lastIndexOf('.') + 1);
        type = '|' + type.toLowerCase().slice(type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    });


    // REGISTER HANDLERS

    uploader.bind('afteraddingfile', function (event, item) {
        console.info('After adding a file', item);
    });

    uploader.bind('whenaddingfilefailed', function (event, item) {
        console.info('When adding a file failed', item);
    });

    uploader.bind('afteraddingall', function (event, items) {
        console.info('After adding all files', items);
    });

    uploader.bind('beforeupload', function (event, item) {
        console.info('Before upload', item);
    });

    uploader.bind('progress', function (event, item, progress) {
        console.info('Progress: ' + progress, item);
    });

    uploader.bind('success', function (event, xhr, item, response) {
        console.info('Success', xhr, item, response);
    });

    uploader.bind('cancel', function (event, xhr, item) {
        console.info('Cancel', xhr, item);
    });

    uploader.bind('error', function (event, xhr, item, response) {
        console.info('Error', xhr, item, response);
    });

    uploader.bind('complete', function (event, xhr, item, response) {
        console.info('Complete', xhr, item, response);
    });

    uploader.bind('progressall', function (event, progress) {
        console.info('Total progress: ' + progress);
    });

    uploader.bind('completeall', function (event, items) {

    });
});



app.controller('viewDish',function($scope,$fileUploader,$routeParams,$resource,$window,$document){
    var dish = $routeParams.dish;
    var todo = $resource('/getDishInfo/'+dish);
    var dishInfo = todo.query(function(){
        $scope.in = dishInfo;
        $scope.dish = dishInfo[0].dish_name;
        $scope.price = dishInfo[0].dish_price;
        $scope.about = dishInfo[0].dish_about;
        $scope.photo = dishInfo[0].dish_photo[0];
        $scope.weight = dishInfo[0].dish_weight;
    });
    $scope.clickLeftSecond = function (){
        $('#myCarousel_2 .left').trigger('click');
    }

    $scope.clickRightSecond = function (){
        $('#myCarousel_2 .right').trigger('click');
    }



    $scope.width = window.innerWidth;
    var todo = $resource('/getHosperTotal');
    var info = todo.query(function(){
        var forRepo = info;

        forRepo.forEach(function(repo){
            if(repo.dish_brief == 'undefined'){
                repo.dish_brief = '';
            }
            if(repo.dish_about == 'undefined'){
                repo.dish_about = '';
            }
        });

        $scope.info = forRepo;
        var lenka = info.length;






        //Check window size
        $scope.$watch('width', function(newValue, oldValue) {
            if(newValue < 768){
                var pictureArr = [];
                for(var x=0; x<lenka; x++){
                    var total = {};
                    total.pic = '/uploaded/'+info[x].dish_photo[0];
                    total.mini = '/uploaded/mini_'+info[x].dish_photo[0];
                    if(info[x].dish_name!='undefined'){
                        total.title = info[x].dish_name;
                    }else{
                        total.title = "";
                    }
                    if(info[x].dish_brief!='undefined'){
                        total.brief = info[x].dish_brief;
                    }else{
                        total.brief = '';
                    }
                    pictureArr.push(total);
                };
                $scope.itemsSingle = pictureArr;
            }else if(newValue < 992){
                var pictureArr = [];
                for(var x=0; x<lenka; x++){
                    var total = {};
                    total.pic = '/uploaded/'+info[x].dish_photo[0];
                    total.mini = '/uploaded/mini_'+info[x].dish_photo[0];
                    if(info[x].dish_name!='undefined'){
                        total.title = info[x].dish_name;
                    }else{
                        total.title = "";
                    }

                    if(info[x].dish_brief!='undefined'){
                        total.brief = info[x].dish_brief;
                    }else{
                        total.brief = '';
                    }


                    pictureArr.push(total);
                };
                var picLength = pictureArr.length;
                var leftPic = picLength%4;
                var devidedTot = picLength/4;
                var devidedInt = parseInt(devidedTot);

                if(leftPic!=0 && devidedInt==0){
                    var nesPic = 4-leftPic;
                    for(var i=0;i<nesPic;i++){
                        var total = {};
                        total.pic = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                        total.mini = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                        total.title = "";
                        total.brief = '';
                        pictureArr.push(total);
                    };
                }

                var itemsActive = pictureArr.splice(0,4);
                var set = [];
                set.push(itemsActive);
                $scope.active = set[0];
                var leftLen = picLength-4;
                var itemsSingle = [];
                itemsSingle = pictureArr.slice(0);

                for(var t=0;t<itemsSingle.length;t++){
                    var set_copy = [];
                    set_copy = set[t].slice(0);
                    set_copy.splice(0,1);
                    set_copy.push(itemsSingle[t]);
                    set.push(set_copy);
                };

                var itemsResult = [];
                for(var d=0;d<set.length-1;d++){
                    itemsResult.push(set[d+1]);
                }
                $scope.itemsSingle = itemsResult;
            }else{
                var pictureArr = [];
                for(var x=0; x<lenka; x++){
                    var total = {};
                    total.pic = '/uploaded/'+info[x].dish_photo[0];
                    total.mini = '/uploaded/mini_'+info[x].dish_photo[0];
                    if(info[x].dish_name!='undefined'){
                        total.title = info[x].dish_name;
                    }else{
                        total.title = "";
                    }

                    if(info[x].dish_brief!='undefined'){
                        total.brief = info[x].dish_brief;
                    }else{
                        total.brief = '';
                    }


                    pictureArr.push(total);
                };
                var picLength = pictureArr.length;
                var leftPic = picLength%5;
                var devidedTot = picLength/5;
                var devidedInt = parseInt(devidedTot);

                if(leftPic!=0 && devidedInt==0){
                    var nesPic = 5-leftPic;
                    for(var i=0;i<nesPic;i++){
                        var total = {};
                        total.pic = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                        total.mini = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                        total.title = "";
                        total.brief = '';
                        pictureArr.push(total);
                    };
                }

                var itemsActive = pictureArr.splice(0,5);
                var set = [];
                set.push(itemsActive);
                $scope.active = set[0];
                var leftLen = picLength-5;
                var itemsSingle = [];
                itemsSingle = pictureArr.slice(0);

                for(var t=0;t<itemsSingle.length;t++){
                    var set_copy = [];
                    set_copy = set[t].slice(0);
                    set_copy.splice(0,1);
                    set_copy.push(itemsSingle[t]);
                    set.push(set_copy);
                };

                var itemsResult = [];
                for(var d=0;d<set.length-1;d++){
                    itemsResult.push(set[d+1]);
                }
                $scope.itemsSingle = itemsResult;
            };
        });
    });




//Manipulating DOM




    function tellAngular() {
        $scope.$apply(function() {
            $scope.width = window.innerWidth;
            // location.reload();
        });
    }



    //calling tellAngular on resize event
    $window.onresize = tellAngular;
});

app.controller('news',function($scope,$routeParams,$resource,$window,$document){
    $('.collapse li').mouseover(function(){
        $(this).addClass('gradientMenu');
    });
    $('.collapse li').mouseout(function(){
        $(this).removeClass('gradientMenu');
    });
    $scope.clickLeftMenu = function (){
        $('#myCarousel_10 .left').trigger('click');
    }

    $scope.clickRightMenu = function (){
        $('#myCarousel_10 .right').trigger('click');
    }
    $scope.width = window.innerWidth;
    var todo_2 = $resource('/getNewsTotal');
    var news = todo_2.query(function(){

        $scope.totalNews = news;



                var pictureArr = [];
                for(var x=0; x<news.length; x++){
                    var total = {};
                    total.pic = '/uploaded/'+news[x].news_photo[0];
                    total.mini = '/uploaded/mini_'+news[x].news_photo[0];
                    total.dateOf = news[x].news_date;
                    total.date = news[x].news_date.split(' ');
                    total.day = total.date[0];
                    total.mongth = total.date[1];
                    total.year = total.date[2];
                    total.title = news[x].news_name;
                    total.brief = news[x].news_brief;
                    total.about = news[x].news_about;
                    pictureArr.push(total);
                };
                var picLength = pictureArr.length;
                var leftPic = picLength%6;
                var devidedTot = picLength/6;
                var devidedInt = parseInt(devidedTot);

                if(leftPic!=0 && devidedInt==0){
                    var nesPic = 6-leftPic;
                    for(var i=0;i<nesPic;i++){
                        var total = {};
                        total.pic = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                        total.mini = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                        total.dateOf = '';
                        total.title = '';
                        total.brief = '';
                        total.about = '';
                        pictureArr.push(total);
                    };
                }

                var itemsActive = pictureArr.splice(0,6);
                var set = [];
                set.push(itemsActive);
                $scope.activeNews = set[0];
                var leftLen = picLength-6;
                var itemsSingle = [];
                itemsSingle = pictureArr.slice(0);

                for(var t=0;t<itemsSingle.length;t++){
                    var set_copy = [];
                    set_copy = set[t].slice(0);
                    set_copy.splice(0,1);
                    set_copy.push(itemsSingle[t]);
                    set.push(set_copy);
                };

                var itemsResult = [];
                for(var d=0;d<set.length-1;d++){
                    itemsResult.push(set[d+1]);
                }
                $scope.singleNews = itemsResult;

    });
});


app.controller('viewNews',function($scope,$fileUploader,$routeParams,$resource,$window,$document){
    var news = $routeParams.news;
    var todo = $resource('/getNewsInfo/'+news);
    var newsInfo = todo.query(function(){
        $scope.news = newsInfo;
        var date = newsInfo[0].news_date;
        date = date.split(' ');
        if(date[1]=='undefined' || !date[1]){
            $scope.day = date[0];
            $scope.year = null;
        }else{
            $scope.day = date[0];
            $scope.year = date[1]+' '+date[2];
        }

    });
});


app.controller('viewEvent',function($scope,$fileUploader,$routeParams,$resource,$window,$document){
    var event = $routeParams.event;
    var todo = $resource('/getEventInfo/'+event);
    var eventInfo = todo.query(function(){
        $scope.event = eventInfo;
        var date = eventInfo[0].event_date;
        date = date.split(' ');
        if(date[0]){
            $scope.day = date[0];
        }else{
            $scope.day = '';
        }
        if(date[1] && date[2]){
            $scope.year = date[1]+' '+date[2];
        }else{
            $scope.year = '';
        }

    });
});

app.controller('events',function($scope,$resource){
    $('.collapse li').mouseover(function(){
        $(this).addClass('gradientMenu');
    });
    $('.collapse li').mouseout(function(){
        $(this).removeClass('gradientMenu');
    });
    $scope.clickLeftMenu = function (){
        $('#myCarousel_11 .left').trigger('click');
    }

    $scope.clickRightMenu = function (){
        $('#myCarousel_11 .right').trigger('click');
    }



    var todo = $resource('/photosVk');
    var body = todo.query(function(){
        $scope.totalActs = body;
        var pictureArr = [];
        for(var x=0; x<body.length; x++){
            var total = {};
            total.pic = body[x].photo;
            pictureArr.push(total);
        };

        var picLength = pictureArr.length;
        var leftPic = picLength%12;
        var devidedTot = picLength/12;
        var devidedInt = parseInt(devidedTot);

        var itemsActive = [];
        itemsActive = pictureArr.splice(0,12);
        $scope.activeActs = itemsActive;
        var setActive = [];
        for(var i =0; i<3; i++){
            var activeset = itemsActive.splice(0,4);
            setActive.push(activeset);
        }
        $scope.activeSet = setActive;






        var set = [];
        for (var i = 0; i<devidedInt; i++){
            var newEnter = pictureArr.splice(0,12);
            set.push(newEnter);
        }
        $scope.singleActs = set;
        var singleSet = [];
        set.forEach(function(setIn){
            var setSingle = [];
            for(var i=0;i<3;i++){
                var setSingleEach = setIn.splice(0,4);
                setSingle.push(setSingleEach);
            };
            singleSet.push(setSingle);
        });
        $scope.singleSet = singleSet;
    });
});




















//INs
app.controller('contacts',function($scope,$resource){
    $scope.submitIt = function(){
        var name = $scope.name;
        var email = $scope.emailFrom;
        var theme = $scope.theme;
        var body = $scope.body;
        var emailAdd = $resource('/sendEmail');

        var emailNew = new emailAdd();
        emailNew.name = name;
        emailNew.emailFrom = email;
        emailNew.theme = theme;
        emailNew.body = body;

        emailNew.$save();
        $scope.result = 'Ваше письмо успешно отправленно!';
    };
    $scope.map = {
        center: {
            latitude: 43.249761,
            longitude: 76.851154
        },
        zoom: 15
    };
});
app.controller('assist',function($scope){
    var person = prompt("Введите ваше имя", "");
    sessionStorage.person = person;
    if(sessionStorage.person=='' || sessionStorage.person=='undefined' || sessionStorage.person == 'null' || sessionStorage.person == 'UncoTech'){
        window.location.href = '/';
    }else{
        var socket = io();
        $('form').submit(function(){
            socket.emit('chat message', sessionStorage.person +' : '+ $('#msg').val());
            $('#msg').val('');
            return false;
        });
        socket.on('chat message', function(msg){
            var endMsg = msg.split(":");
            endMsg = endMsg[0];
            if(endMsg=='UncoTech '){
                $('#messages').append($('<li style="color: blue">').text(msg));
            }else{
                $('#messages').append($('<li>').text(msg));
            }
        });

        var pageHeight = window.innerHeight;
        var approxHeight = pageHeight - 280;
        $('.assist_msg').height(approxHeight);
    }
});
app.controller('assistTech',function($scope){
    var pass = prompt("Введите пароль", "");
    sessionStorage.pass = pass;
    if(sessionStorage.pass!='TechSupport'){
        window.location.href = '/';
    }else{
        var socket = io();
        $('form').submit(function(){
            socket.emit('chat message', 'UncoTech' +' : '+ $('#msg').val());
            $('#msg').val('');
            return false;
        });
        socket.on('chat message', function(msg){
            var endMsg = msg.split(":");
            endMsg = endMsg[0];
            if(endMsg!='UncoTech '){
                $('#messages').append($('<li style="color: green">').text(msg));
            }else{
                $('#messages').append($('<li>').text(msg));
            }
        });

        var pageHeight = window.innerHeight;
        var approxHeight = pageHeight - 280;
        $('.assist_msg').height(approxHeight);
    }
});


//INs


















app.controller('bar',function($scope,$resource,$document,$window){
    $('.content').ready(function(){


        $('.collapse li').mouseover(function(){
            $(this).addClass('gradientMenu');
        });
        $('.collapse li').mouseout(function(){
            $(this).removeClass('gradientMenu');
        });
    });
    $scope.width = window.innerWidth;







    var todo = $resource('/getBarTotal');
    var info = todo.query(function(){

        var forRepo = info;

        forRepo.forEach(function(repo){
            if(repo.category_brief == 'undefined'){
                repo.category_brief = '';
            }
        });


        var totalItems = [];
        info.forEach(function(item){
            var itemObj = {};
            itemObj.title = item.category_tytle;
            if(item.category_brief){
                itemObj.brief = item.category_brief;
            }else{
                itemObj.brief = '';
            }
            if(item.category_photo){
                itemObj.photo = '/uploaded/'+item.category_photo;
                itemObj.mini = '/uploaded/mini_'+item.category_photo;
            }else{
                itemObj.photo = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                itemObj.mini = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
            }
            totalItems.push(itemObj);
        });



        $scope.total = totalItems;

        $scope.info = forRepo;


        var lenka = info.length;





        //Check window size
        $scope.$watch('width', function(newValue, oldValue) {
            if(newValue < 992){
                var pictureArr = [];
                for(var x=0; x<lenka; x++){
                    var total = {};
                    if(!info[x].category_photo || info[x].category_photo=='undefined'){
                        total.pic = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                        total.mini = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                    }else{
                        total.pic = '/uploaded/'+info[x].category_photo;
                        total.mini = '/uploaded/mini_'+info[x].category_photo;
                    }
                    total.title = info[x].category_tytle;

                    if(info[x].category_brief!='undefined'){
                        total.brief = info[x].category_brief;
                    }else{
                        total.brief = '';
                    }


                    pictureArr.push(total);
                };
                var picLength = pictureArr.length;
                var leftPic = picLength%4;
                var devidedTot = picLength/4;
                var devidedInt = parseInt(devidedTot);

                if(leftPic!=0 && devidedInt==0){
                    var nesPic = 4-leftPic;
                    for(var i=0;i<nesPic;i++){
                        var total = {};
                        total.pic = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                        total.mini = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                        total.title = "";
                        total.brief = '';
                        pictureArr.push(total);
                    };
                }

                var itemsActive = pictureArr.splice(0,4);
                var set = [];
                set.push(itemsActive);
                $scope.active = set[0];
                var leftLen = picLength-4;
                var itemsSingle = [];
                itemsSingle = pictureArr.slice(0);

                for(var t=0;t<itemsSingle.length;t++){
                    var set_copy = [];
                    set_copy = set[t].slice(0);
                    set_copy.splice(0,1);
                    set_copy.push(itemsSingle[t]);
                    set.push(set_copy);
                };

                var itemsResult = [];
                for(var d=0;d<set.length-1;d++){
                    itemsResult.push(set[d+1]);
                }
                $scope.itemsSingle = itemsResult;
            }else{
                var pictureArr = [];
                for(var x=0; x<lenka; x++){
                    var total = {};
                    if(!info[x].category_photo || info[x].category_photo=='undefined'){
                        total.pic = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                        total.mini = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                    }else{
                        total.pic = '/uploaded/'+info[x].category_photo;
                        total.mini = '/uploaded/mini_'+info[x].category_photo;
                    }
                    total.title = info[x].category_tytle;

                    if(info[x].category_brief!='undefined'){
                        total.brief = info[x].category_brief;
                    }else{
                        total.brief = '';
                    }


                    pictureArr.push(total);
                };
                var picLength = pictureArr.length;
                var leftPic = picLength%5;
                var devidedTot = picLength/5;
                var devidedInt = parseInt(devidedTot);

                if(leftPic!=0 && devidedInt==0){
                    var nesPic = 5-leftPic;
                    for(var i=0;i<nesPic;i++){
                        var total = {};
                        total.pic = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                        total.mini = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                        total.title = "";
                        total.brief = '';
                        pictureArr.push(total);
                    };
                }

                var itemsActive = pictureArr.splice(0,5);
                var set = [];
                set.push(itemsActive);
                $scope.active = set[0];
                var leftLen = picLength-5;
                var itemsSingle = [];
                itemsSingle = pictureArr.slice(0);

                for(var t=0;t<itemsSingle.length;t++){
                    var set_copy = [];
                    set_copy = set[t].slice(0);
                    set_copy.splice(0,1);
                    set_copy.push(itemsSingle[t]);
                    set.push(set_copy);
                };

                var itemsResult = [];
                for(var d=0;d<set.length-1;d++){
                    itemsResult.push(set[d+1]);
                }
                $scope.itemsSingle = itemsResult;
            };
        });
    });




//Manipulating DOM




    function tellAngular() {
        $scope.$apply(function() {
            $scope.width = window.innerWidth;
            //location.reload();
        });
    }



    //calling tellAngular on resize event
    $(window).resize(tellAngular);







//Manipulating DOM










    $scope.clickLeftMenu = function(){
        $('#myCarousel_7 .left').trigger('click');
        $('#myCarousel_8 .left').trigger('click');
    }

    $scope.clickRightMenu = function(){
        $('#myCarousel_7 .right').trigger('click');
        $('#myCarousel_8 .right').trigger('click');
    }


    $scope.clickcontrol = function(event){
        event.preventDefault();
    };

    /*#myCarousel_2 .thumbnail .btn-info{
     position: relative;
     bottom: -150px;
     }*/


});

app.controller('maintainCategory',function($scope,$resource,$fileUploader,$route){
    var todo_1 = $resource('/getCategoriesInfo');
    var out = todo_1.query(function(){
        $scope.output = out;
    });

    var todo = $resource('/getCategoriesTotal');
    var info = todo.query(function(){
        $scope.info = info;
    });

    //Post all data without picture
    $scope.postDataOutOfFile = function(){
        var title = $scope.category;
        var brief = $scope.brief;
        var inputTo = $resource('/postCategoryDataOutOfFile');

        var input = new inputTo();
        input.title = title;
        input.brief = brief;

        input.$save();

        $route.reload();
    };


    ////Photo uploader------------------------------------------------------
    var uploader = $scope.uploader = $fileUploader.create({
        scope: $scope,
        url: 'addCategoryPhoto'
    });





    uploader.bind('beforeupload', function (event, item) {
        var brief = $scope.brief;
        var tytle = $scope.category;
        var input={
            brief:brief,
            tytle:tytle
        }
        item.formData.push(input);
    });
    uploader.bind('completeall', function (event, items) {
        $route.reload();
    });



    // ADDING FILTERS

    // Images only
    uploader.filters.push(function(item) {
        var type = uploader.isHTML5 ? item.type : '/' + item.value.slice(item.value.lastIndexOf('.') + 1);
        type = '|' + type.toLowerCase().slice(type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    });


    // REGISTER HANDLERS

    uploader.bind('afteraddingfile', function (event, item) {
        console.info('After adding a file', item);
    });

    uploader.bind('whenaddingfilefailed', function (event, item) {
        console.info('When adding a file failed', item);
    });

    uploader.bind('afteraddingall', function (event, items) {
        console.info('After adding all files', items);
    });

    uploader.bind('beforeupload', function (event, item) {
        console.info('Before upload', item);
    });

    uploader.bind('progress', function (event, item, progress) {
        console.info('Progress: ' + progress, item);
    });

    uploader.bind('success', function (event, xhr, item, response) {
        console.info('Success', xhr, item, response);
    });

    uploader.bind('cancel', function (event, xhr, item) {
        console.info('Cancel', xhr, item);
    });

    uploader.bind('error', function (event, xhr, item, response) {
        console.info('Error', xhr, item, response);
    });

    uploader.bind('complete', function (event, xhr, item, response) {
        console.info('Complete', xhr, item, response);
    });

    uploader.bind('progressall', function (event, progress) {
        console.info('Total progress: ' + progress);
    });

    uploader.bind('completeall', function (event, items) {

    });

});





app.controller('food',function($scope,$resource,$document,$window){
    $('.content').ready(function(){


        $('.collapse li').mouseover(function(){
            $(this).addClass('gradientMenu');
        });
        $('.collapse li').mouseout(function(){
            $(this).removeClass('gradientMenu');
        });
    });
    $scope.width = window.innerWidth;







    var todo = $resource('/getFoodTotal');
    var info = todo.query(function(){

        var forRepo = info;

        forRepo.forEach(function(repo){
            if(repo.category_brief == 'undefined'){
                repo.category_brief = '';
            }
        });

        var totalItems = [];
        info.forEach(function(item){
            var itemObj = {};
            itemObj.title = item.category_tytle;
            if(item.category_brief){
                itemObj.brief = item.category_brief;
            }else{
                itemObj.brief = '';
            }
            if(item.category_photo){
                itemObj.photo = '/uploaded/'+item.category_photo;
                itemObj.mini = '/uploaded/mini_'+item.category_photo;
            }else{
                itemObj.photo = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                itemObj.mini = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
            }
            totalItems.push(itemObj);
        });



        $scope.total = totalItems;
        $scope.info = forRepo;
        var lenka = info.length;





        //Check window size
        $scope.$watch('width', function(newValue, oldValue) {
            if(newValue < 992){
                var pictureArr = [];
                for(var x=0; x<lenka; x++){
                    var total = {};
                    if(!info[x].category_photo || info[x].category_photo=='undefined'){
                        total.pic = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                        total.mini = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                    }else{
                        total.pic = '/uploaded/'+info[x].category_photo;
                        total.mini = '/uploaded/mini_'+info[x].category_photo;
                    }
                    total.title = info[x].category_tytle;

                    if(info[x].category_brief!='undefined'){
                        total.brief = info[x].category_brief;
                    }else{
                        total.brief = '';
                    }


                    pictureArr.push(total);
                };
                var picLength = pictureArr.length;
                var leftPic = picLength%4;
                var devidedTot = picLength/4;
                var devidedInt = parseInt(devidedTot);

                if(leftPic!=0 && devidedInt==0){
                    var nesPic = 4-leftPic;
                    for(var i=0;i<nesPic;i++){
                        var total = {};
                        total.pic = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                        total.mini = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                        total.title = "";
                        total.brief = '';
                        pictureArr.push(total);
                    };
                }

                var itemsActive = pictureArr.splice(0,4);
                var set = [];
                set.push(itemsActive);
                $scope.active = set[0];
                var leftLen = picLength-4;
                var itemsSingle = [];
                itemsSingle = pictureArr.slice(0);

                for(var t=0;t<itemsSingle.length;t++){
                    var set_copy = [];
                    set_copy = set[t].slice(0);
                    set_copy.splice(0,1);
                    set_copy.push(itemsSingle[t]);
                    set.push(set_copy);
                };

                var itemsResult = [];
                for(var d=0;d<set.length-1;d++){
                    itemsResult.push(set[d+1]);
                }
                $scope.itemsSingle = itemsResult;
            }else{
                var pictureArr = [];
                for(var x=0; x<lenka; x++){
                    var total = {};
                    if(!info[x].category_photo || info[x].category_photo=='undefined'){
                        total.pic = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                        total.mini = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                    }else{
                        total.pic = '/uploaded/'+info[x].category_photo;
                        total.mini = '/uploaded/mini_'+info[x].category_photo;
                    }
                    total.title = info[x].category_tytle;

                    if(info[x].category_brief!='undefined'){
                        total.brief = info[x].category_brief;
                    }else{
                        total.brief = '';
                    }


                    pictureArr.push(total);
                };
                var picLength = pictureArr.length;
                var leftPic = picLength%5;
                var devidedTot = picLength/5;
                var devidedInt = parseInt(devidedTot);

                if(leftPic!=0 && devidedInt==0){
                    var nesPic = 5-leftPic;
                    for(var i=0;i<nesPic;i++){
                        var total = {};
                        total.pic = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                        total.mini = "http://placehold.it/500/bbbbbb/fff&amp;text=4";
                        total.title = "";
                        total.brief = '';
                        pictureArr.push(total);
                    };
                }

                var itemsActive = pictureArr.splice(0,5);
                var set = [];
                set.push(itemsActive);
                $scope.active = set[0];
                var leftLen = picLength-5;
                var itemsSingle = [];
                itemsSingle = pictureArr.slice(0);

                for(var t=0;t<itemsSingle.length;t++){
                    var set_copy = [];
                    set_copy = set[t].slice(0);
                    set_copy.splice(0,1);
                    set_copy.push(itemsSingle[t]);
                    set.push(set_copy);
                };

                var itemsResult = [];
                for(var d=0;d<set.length-1;d++){
                    itemsResult.push(set[d+1]);
                }
                $scope.itemsSingle = itemsResult;
            };
        });
    });




//Manipulating DOM




    function tellAngular() {
        $scope.$apply(function() {
            $scope.width = window.innerWidth;
            //location.reload();
        });
    }



    //calling tellAngular on resize event
    $(window).resize(tellAngular);







//Manipulating DOM










    $scope.clickLeftMenu = function(){
        $('#myCarousel_7 .left').trigger('click');
        $('#myCarousel_8 .left').trigger('click');
    }

    $scope.clickRightMenu = function(){
        $('#myCarousel_7 .right').trigger('click');
        $('#myCarousel_8 .right').trigger('click');
    }


    $scope.clickcontrol = function(event){
        event.preventDefault();
    };

    /*#myCarousel_2 .thumbnail .btn-info{
     position: relative;
     bottom: -150px;
     }*/


});


app.controller('bear',function($scope, $resource){
    var todo = $resource('/getBearMenuTotal');
    var info = todo.query(function(){
        $scope.result = info;
    });
});

app.controller('launch',function($scope, $resource){
    var todo = $resource('/getLaunchMenuTotal');
    var info = todo.query(function(){
        info.forEach(function(inf){
            if(!inf.dish_weight || inf.dish_weight=='undefined'){
                inf.dish_weight = null;
            }
        });
        $scope.result = info;
    });
});

app.controller('branch',function($scope, $resource){
    var todo = $resource('/getBranchMenuTotal');
    var info = todo.query(function(){
        info.forEach(function(inf){
            inf.dish_weight = null;
        });
        $scope.result = info;
    });
});


app.controller('aboutUs',function($scope){

});
app.controller('brewery',function($scope){
    $("#myCarousel_1").swipe( {
        //Generic swipe handler for all directions
        swipeRight:function(event, distance, duration, fingerCount, fingerData) {
            $('#myCarousel_1 .left').trigger('click');
        },
        swipeLeft:function(event, distance, duration, fingerCount, fingerData) {
            $('#myCarousel_1 .right').trigger('click');
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
        threshold:0
    });
});
app.controller('allMenu',function($scope){

});
app.controller('delivery',function($scope){

});