'use strict';


app


    // Angular File Upload module does not include this directive
    // Only for example


/**
 * The ng-thumb directive
 * @author: nerv
 * @version: 0.1.2, 2014-01-09
 *
 *
 */

    .directive('mainCarousel',function(){
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            link:function($scope,$element){
                $element.swiperight(function() {
                    $('#myCarousel_1 .left').trigger('click');
                });
                $element.swipeleft(function(){
                    $('#myCarousel_1 .right').trigger('click');
                });
            },
            templateUrl: 'parts/mainCarousel.html'
        };
    })
    .directive('mainCarouselSecond',function(){
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            link:function($scope,$element){
                $element.swiperight(function() {
                    $('#myCarousel_4 .left').trigger('click');
                });
                $element.swipeleft(function(){
                    $('#myCarousel_4 .right').trigger('click');
                });
            },
            templateUrl: 'parts/mainCarouselSecond.html'
        };
    })

    .directive('ngThumb', ['$window', function($window) {
        var helper = {
            support: !!($window.FileReader && $window.CanvasRenderingContext2D),
            isFile: function(item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage: function(file) {
                var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

        return {
            restrict: 'A',
            template: '<canvas/>',
            link: function(scope, element, attributes) {
                if (!helper.support) return;

                var params = scope.$eval(attributes.ngThumb);

                if (!helper.isFile(params.file)) return;
                if (!helper.isImage(params.file)) return;

                var canvas = element.find('canvas');
                var reader = new FileReader();

                reader.onload = onLoadFile;
                reader.readAsDataURL(params.file);

                function onLoadFile(event) {
                    var img = new Image();
                    img.onload = onLoadImage;
                    img.src = event.target.result;
                }

                function onLoadImage() {
                    var width = params.width || this.width / this.height * params.height;
                    var height = params.height || this.height / this.width * params.width;
                    canvas.attr({ width: width, height: height });
                    canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                }
            }
        };
    }]);




/*
app.directive('activeFirst',function(){
    return{
        restrict: 'E',
        replace:true,
        templateUrl: 'parts/carouselActive.html'
    }
});

app.directive('single',function(){
    return{
        restrict: 'E',
        replace:true,
        templateUrl: 'parts/carouselSingle.html'
    }
});

app.directive('activeThumb',function(){
    return{
        restrict: 'E',
        replace:true,
        templateUrl: 'parts/carouselThumbActive.html'
    }
});
app.directive('singleThumb',function(){
    return{
        restrict: 'E',
        replace:true,
        templateUrl: 'parts/carouselThumbSingle.html'
    }
});
app.directive('activeThumbBtn',function(){
    return{
        restrict: 'E',
        replace:true,
        templateUrl: 'parts/activeBtn.html'
    }
});
app.directive('singleThumbBtn',function(){
    return{
        restrict: 'E',
        replace:true,
        templateUrl: 'parts/singleBtn.html'
    }
});
app.directive('repoThumb',function(){
    return{
        restrict: 'E',
        replace:true,
        templateUrl: 'parts/repeatThumb.html'
    }
});
*/








