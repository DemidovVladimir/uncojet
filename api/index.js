var db = require('./../data/db.js');
//var fs = require('fs');
//var gm = require('gm');
var nodemailer = require("nodemailer");
var async = require('async');
var request = require('request');

/*
exports.input_dish = function(req,res,next){
    var dishe = req.body.name;
    var about = req.body.about;


    db.dishesModel.create({ dish_name:dishe,dish_about:about},function(err){
        if(err) console.log('Dublicate data');
    });
}

exports.getMenuTotal = function(req,res,next){
    db.dishesModel.aggregate({$sort:{dish_order:1}},function(err,data){
        if(err) return next(err);
        var info = data;
        res.send(info);
    });
}

exports.getHosperTotal = function(req,res,next){
    db.dishesModel.aggregate({$match:{dish_category:'хоспер'}},{$sort:{_id:1}},function(err,data){
        if(err) return next(err);
        var info = data;
        res.send(info);
    });
}

exports.getBarTotal = function(req,res,next){
    var cats;
    async.series([
        function(callback){
            db.dishesModel.aggregate({$match:{dish_type:'drink'}},{$group:{_id:'$dish_category'}},function(err,data){
                if(err) return next(err);
                cats = data;
                callback(null, cats);
            });
        },
        function(callback){
            var result = [];
            var len = cats.length;
            cats.forEach(function(item){
                db.categoriesModel.find({category_tytle: item._id},function(err,cat){
                    if(err) return next(err);
                    result.push(cat);
                    if(len==result.length){
                        callback(null, result);
                    }
                });
            });


        }
    ],
// optional callback
        function(err, results){
            var i = results.length;
            var iter = results[i-1];
            var clear = [];
            iter.forEach(function(itt){
                clear.push(itt[0]);
            });
            res.send(clear);

        });



    /*  var result = [];
     db.dishesModel.aggregate({$match:{dish_type:'drink'}},{$group:{_id:'$dish_category'}},function(err,data){
     data.forEach(function(item){
     db.categoriesModel.find({category_tytle: item._id},function(err,cat){
     if(err) return next(err);
     result.push(cat);
     });
     });
     });*//*

}
exports.getFoodTotal = function(req,res,next){
    var cats;
    async.series([
        function(callback){
            db.dishesModel.aggregate({$match:{dish_type:'food'}},{$group:{_id:'$dish_category'}},function(err,data){
                if(err) return next(err);
                cats = data;
                callback(null, cats);
            });
        },
        function(callback){
            var result = [];
            var len = cats.length;
            cats.forEach(function(item){
                db.categoriesModel.find({category_tytle: item._id},function(err,cat){
                    if(err) return next(err);
                    result.push(cat);
                    if(len==result.length){
                        callback(null, result);
                    }
                });
            });


        }
    ],
// optional callback
        function(err, results){
            var i = results.length;
            var iter = results[i-1];
            var clear = [];
            iter.forEach(function(itt){
                clear.push(itt[0]);
            });
            res.send(clear);
        });
}
exports.getNewsTotal = function(req,res,next){
    db.newsModel.aggregate({$sort:{_id:1}},function(err,data){
        if(err) return next(err);
        var info = data;
        res.send(info);
    });
}
exports.getEventsTotal = function(req,res,next){
    db.eventsModel.aggregate({$sort:{_id:1}},function(err,data){
        if(err) return next(err);
        var events = data;
        res.send(events);
    });
}







//At the menu administration adding photo with data
exports.addDish = function(req,res,next){
    db.dishesModel.find({dish_name:req.body.title},function(err,data){if(err) return next(err);
        if(data.length==1){
            fs.createReadStream(req.files.file.path)
                .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
            gm('public/uploaded/'+req.files.file.originalFilename)
                .resize(170, 140)
                .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                    if (!err) console.log('done_mini');
                });
            db.dishesModel.update({dish_name:req.body.title},
                { $push: {"dish_photo": req.files.file.originalFilename}},function(err){
                    if(err) return next(err);
                    res.send(200);
                }
            );
        }else{
            fs.createReadStream(req.files.file.path)
                .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
            gm('public/uploaded/'+req.files.file.originalFilename)
                .resize(170, 140)
                .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                    if (!err) console.log('done_mini');
                });
            var titleDish = req.body.title;
            var aboutDish = req.body.about;
            var timeDish = req.body.time;
            var brief = req.body.brief;
            var price = req.body.price;
            var weight = req.body.weight;
            var type = req.body.type;
            var category = req.body.category;
            var order = req.body.order;
            db.dishesModel.create({dish_name:titleDish,dish_order:order,dish_photo:req.files.file.originalFilename, dish_brief:brief, dish_about:aboutDish, dish_prepare:timeDish,dish_price:price,dish_weight:weight,dish_type:type, dish_category:category},function(err){
                if(err) return next(err);
                res.send(200);
            });
        }
    });
}
//At the menu administration adding photo with data
exports.addNews = function(req,res,next){
    db.newsModel.find({news_name:req.body.title},function(err,data){if(err) return next(err);
        if(data.length==1){
            fs.createReadStream(req.files.file.path)
                .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
            gm('public/uploaded/'+req.files.file.originalFilename)
                .resize(170, 140)
                .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                    if (!err) console.log('done_mini');
                });
            db.newsModel.update({news_name:req.body.title},
                { $push: {"news_photo": req.files.file.originalFilename}},function(err){
                    if(err) return next(err);
                    res.send(200);
                }
            );
        }else{
            fs.createReadStream(req.files.file.path)
                .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
            gm('public/uploaded/'+req.files.file.originalFilename)
                .resize(170, 140)
                .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                    if (!err) console.log('done_mini');
                });
            var titleNews = req.body.title;
            var aboutNews = req.body.about;
            var brief = req.body.brief;
            var dateOf = req.body.dateOf;
            db.newsModel.create({news_name:titleNews,news_photo:req.files.file.originalFilename, news_brief:brief, news_about:aboutNews,news_date:dateOf},function(err){
                if(err) return next(err);
                res.send(200);
            });
        }
    });
}
//At the event administration adding photo with data
exports.addEvent = function(req,res,next){
    db.eventsModel.find({event_name:req.body.title},function(err,data){if(err) return next(err);
        if(data.length==1){
            fs.createReadStream(req.files.file.path)
                .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
            gm('public/uploaded/'+req.files.file.originalFilename)
                .resize(170, 140)
                .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                    if (!err) console.log('done_mini');
                });
            db.eventsModel.update({event_name:req.body.title},
                { $push: {"event_photo": req.files.file.originalFilename}},function(err){
                    if(err) return next(err);
                    res.send(200);
                }
            );
        }else{
            fs.createReadStream(req.files.file.path)
                .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
            gm('public/uploaded/'+req.files.file.originalFilename)
                .resize(170, 140)
                .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                    if (!err) console.log('done_mini');
                });
            var title = req.body.title;
            var about = req.body.about;
            var brief = req.body.brief;
            var dateOf = req.body.dateOf;
            db.eventsModel.create({event_name:title,event_photo:req.files.file.originalFilename, event_brief:brief, event_about:about,event_date:dateOf},function(err){
                if(err) return next(err);
                res.send(200);
            });
        }
    });
}







//In maintain dish adding photo option
exports.addDishPhoto = function(req,res,next){
    var aboutDish = req.body.about;
    var timeDish = req.body.time;
    var briefDish = req.body.brief;
    var priceDish = req.body.price;
    var weightDish = req.body.weight;
    var orderDish = req.body.order;
    if(weightDish == 'undefined'){
        weightDish = null;
    }
    if(priceDish=='undefined'){
        priceDish = null;
    }
    if(briefDish=='undefined'){
        briefDish = null;
    }
    if(aboutDish == 'undefined'){
        aboutDish = null;
    }
    if(timeDish == 'undefined'){
        timeDish = null;
    }

    if(aboutDish && timeDish && briefDish && priceDish && weightDish){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.dishesModel.update({dish_name:req.body.title},
            { $push: {"dish_photo": req.files.file.originalFilename},dish_brief:briefDish,dish_weight:weightDish, dish_price:priceDish, dish_about:aboutDish, dish_prepare:timeDish},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }else if(aboutDish && timeDish && briefDish && priceDish && !weightDish){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.dishesModel.update({dish_name:req.body.title},
            { $push: {"dish_photo": req.files.file.originalFilename},dish_brief:briefDish, dish_price:priceDish, dish_about:aboutDish, dish_prepare:timeDish},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }else if(!aboutDish && !timeDish && !briefDish && !priceDish && !weightDish && orderDish){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.dishesModel.update({dish_name:req.body.title},
            { $push: {"dish_photo": req.files.file.originalFilename},dish_brief:briefDish, dish_order:orderDish},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }else if(aboutDish && timeDish && briefDish && !priceDish && weightDish){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.dishesModel.update({dish_name:req.body.title},
            { $push: {"dish_photo": req.files.file.originalFilename},dish_brief:briefDish, dish_weight: weightDish, dish_about:aboutDish, dish_prepare:timeDish},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }else if(aboutDish && timeDish && briefDish && !priceDish && !weightDish){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.dishesModel.update({dish_name:req.body.title},
            { $push: {"dish_photo": req.files.file.originalFilename},dish_brief:briefDish, dish_about:aboutDish, dish_prepare:timeDish},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }else if(aboutDish && !timeDish && !briefDish && priceDish && weightDish){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.dishesModel.update({dish_name:req.body.title},
            { $push: {"dish_photo": req.files.file.originalFilename}, dish_about:aboutDish, dish_weight:weightDish, dish_price:priceDish},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }else if(aboutDish && !timeDish && !briefDish && priceDish && !weightDish){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.dishesModel.update({dish_name:req.body.title},
            { $push: {"dish_photo": req.files.file.originalFilename}, dish_about:aboutDish, dish_price:priceDish},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }else if(aboutDish && !timeDish && !briefDish && !priceDish && weightDish){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.dishesModel.update({dish_name:req.body.title},
            { $push: {"dish_photo": req.files.file.originalFilename}, dish_about:aboutDish,dish_weight:weightDish},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }else if(aboutDish && !timeDish && !briefDish && !priceDish && !weightDish){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.dishesModel.update({dish_name:req.body.title},
            { $push: {"dish_photo": req.files.file.originalFilename}, dish_about:aboutDish},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }
    else if(!aboutDish && timeDish && !briefDish && priceDish && weightDish){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.dishesModel.update({dish_name:req.body.title},
            { $push: {"dish_photo": req.files.file.originalFilename},dish_price:priceDish,dish_weight:weightDish, dish_prepare:timeDish},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    } else if(!aboutDish && timeDish && !briefDish && priceDish && !weightDish){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.dishesModel.update({dish_name:req.body.title},
            { $push: {"dish_photo": req.files.file.originalFilename},dish_price:priceDish, dish_prepare:timeDish},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }else if(!aboutDish && timeDish && !briefDish && !priceDish && weightDish){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.dishesModel.update({dish_name:req.body.title},
            { $push: {"dish_photo": req.files.file.originalFilename}, dish_prepare:timeDish, dish_weight:weightDish},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }else if(!aboutDish && timeDish && !briefDish && !priceDish && !weightDish){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.dishesModel.update({dish_name:req.body.title},
            { $push: {"dish_photo": req.files.file.originalFilename}, dish_prepare:timeDish},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }
    else if(aboutDish && timeDish && !briefDish && priceDish && weightDish){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.dishesModel.update({dish_name:req.body.title},
            { $push: {"dish_photo": req.files.file.originalFilename},dish_about: aboutDish,dish_weight: weightDish, dish_prepare:timeDish, dish_price:priceDish},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }else if(aboutDish && timeDish && !briefDish && priceDish && !weightDish){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.dishesModel.update({dish_name:req.body.title},
            { $push: {"dish_photo": req.files.file.originalFilename},dish_about: aboutDish, dish_prepare:timeDish, dish_price:priceDish},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }else if(aboutDish && timeDish && !briefDish && !priceDish && weightDish){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.dishesModel.update({dish_name:req.body.title},
            { $push: {"dish_photo": req.files.file.originalFilename},dish_about: aboutDish,dish_weight:weightDish, dish_prepare:timeDish},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }else if(aboutDish && timeDish && !briefDish && !priceDish && !weightDish){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.dishesModel.update({dish_name:req.body.title},
            { $push: {"dish_photo": req.files.file.originalFilename},dish_about: aboutDish, dish_prepare:timeDish},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }
    else if(!aboutDish && !timeDish && briefDish && priceDish && weightDish){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.dishesModel.update({dish_name:req.body.title},
            { $push: {"dish_photo": req.files.file.originalFilename}, dish_brief:briefDish,dish_weight:weightDish, dish_price:priceDish},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }else if(!aboutDish && !timeDish && briefDish && priceDish && !weightDish){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.dishesModel.update({dish_name:req.body.title},
            { $push: {"dish_photo": req.files.file.originalFilename}, dish_brief:briefDish, dish_price:priceDish},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }else if(!aboutDish && !timeDish && briefDish && !priceDish && weightDish){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.dishesModel.update({dish_name:req.body.title},
            { $push: {"dish_photo": req.files.file.originalFilename}, dish_brief:briefDish,dish_weight:weightDish},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }else if(!aboutDish && !timeDish && briefDish && !priceDish && !weightDish){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.dishesModel.update({dish_name:req.body.title},
            { $push: {"dish_photo": req.files.file.originalFilename}, dish_brief:briefDish},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }
    else if(aboutDish && !timeDish && briefDish && priceDish && weightDish){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.dishesModel.update({dish_name:req.body.title},
            { $push: {"dish_photo": req.files.file.originalFilename}, dish_brief:briefDish,dish_weight:weightDish, dish_about:aboutDish, dish_price:priceDish},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }else if(aboutDish && !timeDish && briefDish && priceDish && !weightDish){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.dishesModel.update({dish_name:req.body.title},
            { $push: {"dish_photo": req.files.file.originalFilename}, dish_brief:briefDish, dish_about:aboutDish, dish_price:priceDish},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }
    else if(aboutDish && !timeDish && briefDish && !priceDish && weightDish){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.dishesModel.update({dish_name:req.body.title},
            { $push: {"dish_photo": req.files.file.originalFilename}, dish_brief:briefDish,dish_weight:weightDish, dish_about:aboutDish},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }else if(aboutDish && !timeDish && briefDish && !priceDish && !weightDish){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.dishesModel.update({dish_name:req.body.title},
            { $push: {"dish_photo": req.files.file.originalFilename}, dish_brief:briefDish, dish_about:aboutDish},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }
    else if(!aboutDish && timeDish && briefDish && priceDish && weightDish){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.dishesModel.update({dish_name:req.body.title},
            { $push: {"dish_photo": req.files.file.originalFilename}, dish_brief:briefDish,dish_weight:weightDish, dish_prepare:timeDish, dish_price:priceDish},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }else if(!aboutDish && timeDish && briefDish && priceDish && !weightDish){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.dishesModel.update({dish_name:req.body.title},
            { $push: {"dish_photo": req.files.file.originalFilename}, dish_brief:briefDish, dish_prepare:timeDish, dish_price:priceDish},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }else if(!aboutDish && timeDish && briefDish && !priceDish && weightDish){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.dishesModel.update({dish_name:req.body.title},
            { $push: {"dish_photo": req.files.file.originalFilename}, dish_brief:briefDish,dish_weight:weightDish, dish_prepare:timeDish},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }else if(!aboutDish && timeDish && briefDish && !priceDish && !weightDish){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.dishesModel.update({dish_name:req.body.title},
            { $push: {"dish_photo": req.files.file.originalFilename}, dish_brief:briefDish, dish_prepare:timeDish},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }else if(!aboutDish && !timeDish && !briefDish && !priceDish && weightDish){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.dishesModel.update({dish_name:req.body.title},
            { $push: {"dish_photo": req.files.file.originalFilename},dish_weight:weightDish},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }
    else{
        console.log('triyng logic without data')
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.dishesModel.update({dish_name:req.body.title},
            { $push: {"dish_photo": req.files.file.originalFilename}},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }
}

//In maintain news adding photo option
exports.addNewsPhoto = function(req,res,next){
    var aboutNews = req.body.about;
    var briefNews = req.body.brief;
    var dateNews = req.body.dateOf;
    if(dateNews == 'undefined'){
        dateNews = null;
    }
    if(briefNews=='undefined'){
        briefNews = null;
    }
    if(aboutNews == 'undefined'){
        aboutNews = null;
    }

    if(aboutNews && briefNews && !dateNews){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.newsModel.update({news_name:req.body.title},
            { $push: {"news_photo": req.files.file.originalFilename},news_brief:briefNews, news_about:aboutNews},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }else if(aboutNews && briefNews && dateNews){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.newsModel.update({news_name:req.body.title},
            { $push: {"news_photo": req.files.file.originalFilename},news_brief:briefNews, news_about:aboutNews, news_date:dateNews},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }
    else if(aboutNews && !briefNews && !dateNews){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.newsModel.update({news_name:req.body.title},
            { $push: {"news_photo": req.files.file.originalFilename}, news_about:aboutNews},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }else if(aboutNews && !briefNews && dateNews){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.newsModel.update({news_name:req.body.title},
            { $push: {"news_photo": req.files.file.originalFilename}, news_about:aboutNews,news_date:dateNews},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }
    else if(aboutNews && !briefNews && !dateNews){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.newsModel.update({news_name:req.body.title},
            { $push: {"news_photo": req.files.file.originalFilename},news_about: aboutNews},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }else if(aboutNews && !briefNews && dateNews){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.newsModel.update({news_name:req.body.title},
            { $push: {"news_photo": req.files.file.originalFilename},news_about: aboutNews, news_date:dateNews},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }else{
        console.log('triyng logic without data')
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.newsModel.update({news_name:req.body.title},
            { $push: {"news_photo": req.files.file.originalFilename}},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }
}


//In maintain event adding photo option
exports.addEventPhoto = function(req,res,next){
    var aboutEvent = req.body.about;
    var briefEvent = req.body.brief;
    var dateEvent = req.body.dateOf;
    if(dateEvent == 'undefined'){
        dateEvent = null;
    }
    if(briefEvent=='undefined'){
        briefEvent = null;
    }
    if(aboutEvent == 'undefined'){
        aboutEvent = null;
    }

    if(aboutEvent && briefEvent && !dateEvent){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.eventsModel.update({event_name:req.body.title},
            { $push: {"event_photo": req.files.file.originalFilename},event_brief:briefEvent, event_about:aboutEvent},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }else if(aboutEvent && briefEvent && dateEvent){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.eventModel.update({event_name:req.body.title},
            { $push: {"event_photo": req.files.file.originalFilename},event_brief:briefEvent, event_about:aboutEvent, event_date:dateEvent},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }
    else if(aboutEvent && !briefEvent && !dateEvent){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.eventsModel.update({event_name:req.body.title},
            { $push: {"event_photo": req.files.file.originalFilename}, event_about:aboutEvent},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }else if(aboutEvent && !briefEvent && dateEvent){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.eventsModel.update({event_name:req.body.title},
            { $push: {"event_photo": req.files.file.originalFilename}, event_about:aboutEvent,event_date:dateEvent},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }
    else if(aboutEvent && !briefEvent && !dateEvent){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.eventsModel.update({event_name:req.body.title},
            { $push: {"event_photo": req.files.file.originalFilename},event_about: aboutEvent},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }else if(aboutEvent && !briefEvent && dateEvent){
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.eventsModel.update({event_name:req.body.title},
            { $push: {"event_photo": req.files.file.originalFilename},event_about: aboutEvent, event_date:dateEvent},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }else{
        console.log('triyng logic without data')
        fs.createReadStream(req.files.file.path)
            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
        gm('public/uploaded/'+req.files.file.originalFilename)
            .resize(170, 140)
            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                if (!err) console.log('done_mini');
            });
        db.eventsModel.update({event_name:req.body.title},
            { $push: {"event_photo": req.files.file.originalFilename}},function(err){
                if(err) return next(err);
                res.send(200);
            }
        );
    }
}



//At the menu administration posting data without photo
exports.postOutOfFile = function(req,res,next){
    var title = req.body.title;
    var about = req.body.about;
    var time = req.body.time;
    var brief = req.body.brief;
    var price = req.body.price;
    var weight = req.body.weight;
    var type = req.body.type;
    var category = req.body.category;
    var order = req.body.order;
    db.dishesModel.create({dish_name:title,dish_order:order, dish_about:about, dish_brief:brief, dish_prepare:time, dish_price:price, dish_weight:weight, dish_type:type, dish_category:category},function(err){
        if(err) return next(err);
        res.send(200);
    });
}
//At the menu administration posting data without photo
exports.postNewsOutOfFile = function(req,res,next){
    var title = req.body.title;
    var about = req.body.about;
    var brief = req.body.brief;
    var dateOf = req.body.dateOf;
    db.newsModel.create({news_name:title, news_about:about, news_brief:brief,news_date:dateOf},function(err){
        if(err) return next(err);
        res.send(200);
    });
}
//At the menu administration posting data without photo
exports.postEventOutOfFile = function(req,res,next){
    var title = req.body.title;
    var about = req.body.about;
    var brief = req.body.brief;
    var dateOf = req.body.dateOf;
    db.eventsModel.create({event_name:title, event_about:about, event_brief:brief,event_date:dateOf},function(err){
        if(err) return next(err);
        res.send(200);
    });
}








//Same as before but from dish maintaining
exports.postDishDataOutOfFile = function(req,res,next){
    var title = req.body.title;
    var about = req.body.about;
    var time = req.body.time;
    var brief = req.body.brief;
    var price = req.body.price;
    var weight = req.body.weight;
    var order = req.body.order;
    if(about && time && brief && price && weight){
        db.dishesModel.update({dish_name:title},{dish_about:about, dish_prepare:time,dish_brief:brief,dish_price:price,dish_weight:weight},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }
    else if(about && time && brief && !price && weight){
        db.dishesModel.update({dish_name:title},{dish_about:about, dish_prepare:time,dish_brief:brief,dish_weight:weight},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }else if(!about && !time && !brief && !price && !weight && order){
        db.dishesModel.update({dish_name:title},{dish_order:order},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }else if(about && time && brief && price && !weight){
        db.dishesModel.update({dish_name:title},{dish_about:about, dish_prepare:time,dish_brief:brief,dish_price:price},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }
    else if(about && time && brief && !price && !weight){
        db.dishesModel.update({dish_name:title},{dish_about:about, dish_prepare:time,dish_brief:brief},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }


    else if(about && !time && brief && price && weight){
        db.dishesModel.update({dish_name:title},{dish_about:about,dish_brief:brief,dish_price:price,dish_weight:weight},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }else if(about && !time && brief && !price && weight){
        db.dishesModel.update({dish_name:title},{dish_about:about,dish_brief:brief,dish_weight:weight},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }else if(about && !time && brief && !price && !weight){
        db.dishesModel.update({dish_name:title},{dish_about:about,dish_brief:brief},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }else if(about && !time && brief && price && !weight){
        db.dishesModel.update({dish_name:title},{dish_about:about,dish_brief:brief,dish_price:price},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }





    else if(about && !time && brief && weight && price){
        db.dishesModel.update({dish_name:title},{dish_about:about,dish_brief:brief,dish_price:price,dish_weight:weight},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }else if(about && !time && brief && !weight && !price){
        db.dishesModel.update({dish_name:title},{dish_about:about,dish_brief:brief},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }else if(about && !time && brief && !weight && price){
        db.dishesModel.update({dish_name:title},{dish_about:about,dish_brief:brief,dish_price:price},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }else if(about && !time && brief && weight && !price){
        db.dishesModel.update({dish_name:title},{dish_about:about,dish_brief:brief,dish_weight:weight},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }





    else if(!about && !time && brief && weight && price){
        db.dishesModel.update({dish_name:title},{dish_brief:brief,dish_price:price,dish_weight:weight},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }else if(!about && !time && brief && !weight && !price){
        db.dishesModel.update({dish_name:title},{dish_brief:brief},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }else if(!about && !time && brief && !weight && price){
        db.dishesModel.update({dish_name:title},{dish_brief:brief,dish_price:price},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }else if(!about && !time && brief && weight && !price){
        db.dishesModel.update({dish_name:title},{dish_brief:brief,dish_weight:weight},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }





    else if(!about && time && brief && weight && price){
        db.dishesModel.update({dish_name:title},{dish_prepare:time,dish_brief:brief,dish_price:price,dish_weight:weight},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }else if(!about && time && brief && !weight && !price){
        db.dishesModel.update({dish_name:title},{dish_prepare:time,dish_brief:brief},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }else if(!about && time && brief && weight && !price){
        db.dishesModel.update({dish_name:title},{dish_prepare:time,dish_brief:brief,dish_weight:weight},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }else if(!about && time && brief && !weight && price){
        db.dishesModel.update({dish_name:title},{dish_prepare:time,dish_brief:brief,dish_price:price},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }





    else if(about && !time && !brief && weight && price){
        db.dishesModel.update({dish_name:title},{dish_about:about,dish_price:price,dish_weight:weight},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }else if(about && !time && !brief && !weight && !price){
        db.dishesModel.update({dish_name:title},{dish_about:about},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }else if(about && !time && !brief && !weight && price){
        db.dishesModel.update({dish_name:title},{dish_about:about,dish_price:price},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }else if(about && !time && !brief && weight && !price){
        db.dishesModel.update({dish_name:title},{dish_about:about,dish_weight:weight},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }




    else if(!about && time && !brief && weight && price){
        db.dishesModel.update({dish_name:title},{dish_prepare:time,dish_price:price,dish_weight:weight},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }else if(!about && time && !brief && !weight && !price){
        db.dishesModel.update({dish_name:title},{dish_prepare:time},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }else if(!about && time && !brief && !weight && price){
        db.dishesModel.update({dish_name:title},{dish_prepare:time,dish_price:price},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }else if(!about && time && !brief && weight && !price){
        db.dishesModel.update({dish_name:title},{dish_prepare:time,dish_weight:weight},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }





    else if(about && time && !brief && weight && price){
        db.dishesModel.update({dish_name:title},{dish_about:about,dish_prepare:time,dish_price:price,dish_weight:weight},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }else if(about && time && !brief && !weight && !price){
        db.dishesModel.update({dish_name:title},{dish_about:about,dish_prepare:time},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }else if(about && time && !brief && !weight && price){
        db.dishesModel.update({dish_name:title},{dish_about:about,dish_prepare:time,dish_price:price},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }else if(about && time && !brief && weight && !price){
        db.dishesModel.update({dish_name:title},{dish_about:about,dish_prepare:time,dish_price:price},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }




    else if(!about && !time && !brief && price && weight){
        db.dishesModel.update({dish_name:title},{dish_price:price,dish_weight:weight},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }else if(!about && !time && !brief && price && !weight){
        db.dishesModel.update({dish_name:title},{dish_price:price},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }else if(!about && !time && !brief && !price && weight){
        db.dishesModel.update({dish_name:title},{dish_weight:weight},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }
}
//Same as before but from dish maintaining
exports.postNewsDataOutOfFile = function(req,res,next){
    var title = req.body.title;
    var about = req.body.about;
    var brief = req.body.brief;
    var dateOf = req.body.dateOf;
    if(about && brief && !dateOf){
        db.newsModel.update({news_name:title},{news_about:about,news_brief:brief},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }else if(about && brief && dateOf){
        db.newsModel.update({news_name:title},{news_about:about,news_brief:brief, news_date:dateOf},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }
    else if(!about && brief && !dateOf){
        db.newsModel.update({news_name:title},{news_brief:brief},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }else if(!about && brief && dateOf){
        db.newsModel.update({news_name:title},{news_brief:brief, news_date:dateOf},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }
    else if(about && !brief && !dateOf){
        db.newsModel.update({news_name:title},{news_about:about},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }else if(about && !brief && dateOf){
        db.newsModel.update({news_name:title},{news_about:about, news_date:dateOf},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }
}

//Same as before but from dish maintaining
exports.postEventDataOutOfFile = function(req,res,next){
    var title = req.body.title;
    var about = req.body.about;
    var brief = req.body.brief;
    var dateOf = req.body.dateOf;
    if(about && brief && !dateOf){
        db.eventsModel.update({event_name:title},{event_about:about,event_brief:brief},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }else if(about && brief && dateOf){
        db.eventsModel.update({event_name:title},{event_about:about,event_brief:brief, event_date:dateOf},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }
    else if(!about && brief && !dateOf){
        db.eventsModel.update({event_name:title},{event_brief:brief},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }else if(!about && brief && dateOf){
        db.eventsModel.update({event_name:title},{event_brief:brief, event_date:dateOf},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }
    else if(about && !brief && !dateOf){
        db.eventsModel.update({event_name:title},{event_about:about},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }else if(about && !brief && dateOf){
        db.eventsModel.update({event_name:title},{event_about:about, event_date:dateOf},function(err){
            if(err) return next(err);
            res.send(200);
        });
    }
}




exports.getDishInfo = function(req,res,next){
    var dishTitle = req.params.dish;
    db.dishesModel.find({dish_name:dishTitle},function(err,data){
        if(err) return next(err);
        console.log(data);
        res.send(data);
    });
}

exports.getNewsInfo = function(req,res,next){
    var newsTitle = req.params.news;
    db.newsModel.find({news_name:newsTitle},function(err,data){
        if(err) return next(err);
        res.send(data);
    });
}

exports.getEventInfo = function(req,res,next){
    var eventTitle = req.params.event;
    db.eventsModel.find({event_name:eventTitle},function(err,data){
        if(err) return next(err);
        res.send(data);
    });
}

exports.deletePicture = function(req,res,next){
    var dishToMaintain = req.params.dish;
    var pictureToDelete = req.params.pic;
    db.dishesModel.update({dish_name:dishToMaintain},
        { $pull: {"dish_photo": pictureToDelete}},function(err){
            if(err) return next(err);
            fs.unlink(__dirname+'/../public/uploaded/'+pictureToDelete,function(err){
                if(err) return next(err);
                fs.unlink(__dirname+'/../public/uploaded/mini_'+pictureToDelete,function(err){
                    if(err) return next(err);
                });
            });
            res.send(200);
        }
    );
}
exports.deleteNewsPicture = function(req,res,next){
    var newsToMaintain = req.params.news;
    var pictureToDelete = req.params.pic;
    db.newsModel.update({news_name:newsToMaintain},
        { $pull: {"news_photo": pictureToDelete}},function(err){
            if(err) return next(err);
            fs.unlink(__dirname+'/../public/uploaded/'+pictureToDelete,function(err){
                if(err) return next(err);
                fs.unlink(__dirname+'/../public/uploaded/mini_'+pictureToDelete,function(err){
                    if(err) return next(err);
                });
            });
            res.send(200);
        }
    );
}

exports.deleteEventPicture = function(req,res,next){
    var eventToMaintain = req.params.event;
    var pictureToDelete = req.params.pic;
    db.eventsModel.update({event_name:eventToMaintain},
        { $pull: {"event_photo": pictureToDelete}},function(err){
            if(err) return next(err);
            fs.unlink(__dirname+'/../public/uploaded/'+pictureToDelete,function(err){
                if(err) return next(err);
                fs.unlink(__dirname+'/../public/uploaded/mini_'+pictureToDelete,function(err){
                    if(err) return next(err);
                });
            });
            res.send(200);
        }
    );
}

exports.deleteDishTotal = function(req,res,next){
    var dishTitle = req.params.dish;
    db.dishesModel.find({dish_name:dishTitle},function(err,data){
        if(err) return next(err);
        var picObj = data[0].dish_photo;
        picObj.forEach(function(pic){
            fs.unlink(__dirname+'/../public/uploaded/'+pic,function(err){
                if(err) return next(err);
                fs.unlink(__dirname+'/../public/uploaded/mini_'+pic,function(err){
                    if(err) return next(err);
                })
            })
        });
        db.dishesModel.remove({dish_name:dishTitle},function(err){
            if(err) return next(err);
        });
    });
};
exports.deleteNewsTotal = function(req,res,next){
    var newsTitle = req.params.news;
    db.newsModel.find({news_name:newsTitle},function(err,data){
        if(err) return next(err);
        var picObj = data[0].news_photo;
        picObj.forEach(function(pic){
            fs.unlink(__dirname+'/../public/uploaded/'+pic,function(err){
                if(err) return next(err);
                fs.unlink(__dirname+'/../public/uploaded/mini_'+pic,function(err){
                    if(err) return next(err);
                })
            })
        });
        db.newsModel.remove({news_name:newsTitle},function(err){
            if(err) return next(err);
        });
    });
};

exports.deleteEventTotal = function(req,res,next){
    var eventTitle = req.params.event;
    db.eventsModel.find({event_name:newsTitle},function(err,data){
        if(err) return next(err);
        var picObj = data[0].event_photo;
        picObj.forEach(function(pic){
            fs.unlink(__dirname+'/../public/uploaded/'+pic,function(err){
                if(err) return next(err);
                fs.unlink(__dirname+'/../public/uploaded/mini_'+pic,function(err){
                    if(err) return next(err);
                })
            })
        });
        db.eventsModel.remove({event_name:eventTitle},function(err){
            if(err) return next(err);
        });
    });
};



exports.tryToLog = function(req,res,next){
    var username = req.body.username;
    var password = req.body.passworduser;
    console.log(username +' - '+password);
    db.userModel.find({},function(err,data){
        if(err) return next(err);
        console.log(data);
        req.session.user = data[0].username;
        //console.log(req.session.user);
        res.redirect('/menuAdmin');
    });
};

exports.sendEmail = function(req,res,next){
    var name = req.body.name;
    var emailAddress = req.body.emailFrom;
    var theme = req.body.theme;
    var body = req.body.body;

    // create reusable transport method (opens pool of SMTP connections)
    /* var smtpTransport = nodemailer.createTransport("SMTP",{
     service: "Gmail",
     auth: {
     user: "meandevelopmentstudio@gmail.com",
     pass: "vladimir050486"
     }
     });

     // setup e-mail data with unicode symbols
     var mailOptions = {
     from: emailAddress, // sender address
     to: "meandevelopmentstudio@gmail.com", // list of receivers
     subject:theme, // Subject line
     text: body, // plaintext body
     html: "<b>"+body+" ---- От:"+name+" - "+emailAddress+"</b>" // html body
     }

     // send mail with defined transport object
     smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
     console.log(error);
     }else{
     console.log("Message sent: " + response.message);
     }
     });
    var mail = require("nodemailer").mail;

    mail({
        from: name+" ✔ "+emailAddress, // sender address
        to: "meandevelopmentstudio@gmail.com", // list of receivers
        subject: theme+" ✔", // Subject line
        text: body+" ✔", // plaintext body
        html: "<b>"+body+" ✔</b>" // html body
    });

}

exports.getCategoriesTotal = function(req,res,next){
    db.dishesModel.aggregate({$group:{_id:'$dish_category'}},{$sort:{_id:1}},function(err,data){
        if(err) return next(err);
        var info = data;
        res.send(info);
    });
};


exports.addCategoryPhoto = function(req,res,next){
    var brief = req.body.brief;
    var tytle = req.body.tytle;

    db.categoriesModel.find({category_tytle:tytle},function(err,data){
        if(err) return next(err);
        if(data.category_photo){
            if(brief!='undefined' && brief){
                fs.unlink(__dirname+'/../public/uploaded/'+data.category_photo,function(err){
                    if(err) return next(err);
                    fs.unlink(__dirname+'/../public/uploaded/mini_'+data.category_photo,function(err){
                        if(err) return next(err);
                        fs.createReadStream(req.files.file.path)
                            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
                        gm('public/uploaded/'+req.files.file.originalFilename)
                            .resize(170, 140)
                            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                                if (!err) console.log('done_mini');
                            });
                        db.categoriesModel.update({category_tytle:tytle},{category_tytle:tytle,category_brief:brief, category_photo:req.files.file.originalFilename},function(err){
                            if(err) return next(err);
                            res.send(200);
                        });
                    });
                });

            }else{
                fs.unlink(__dirname+'/../public/uploaded/'+data.category_photo,function(err){
                    if(err) return next(err);
                    fs.unlink(__dirname+'/../public/uploaded/mini_'+data.category_photo,function(err){
                        if(err) return next(err);
                        fs.createReadStream(req.files.file.path)
                            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
                        gm('public/uploaded/'+req.files.file.originalFilename)
                            .resize(170, 140)
                            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                                if (!err) console.log('done_mini');
                            });
                        db.categoriesModel.update({category_tytle:tytle},{category_photo:req.files.file.originalFilename},function(err){
                            if(err) return next(err);
                            res.send(200);
                        });
                    });
                });
            }
        }else{
            if(data.category_tytle){
                fs.createReadStream(req.files.file.path)
                    .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
                gm('public/uploaded/'+req.files.file.originalFilename)
                    .resize(170, 140)
                    .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                        if (!err) console.log('done_mini');
                    });
                db.categoriesModel.update({category_tytle:tytle},{category_photo: req.files.file.originalFilename,category_brief:brief},function(err){
                    if(err) return next(err);
                    res.send(200);
                });
            }else{
                fs.createReadStream(req.files.file.path)
                    .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
                gm('public/uploaded/'+req.files.file.originalFilename)
                    .resize(170, 140)
                    .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                        if (!err) console.log('done_mini');
                    });
                db.categoriesModel.create({category_tytle:tytle,category_photo: req.files.file.originalFilename,category_brief:brief},function(err){
                    if(err) return next(err);
                    res.send(200);
                });
            }
        }
    });
};

exports.getCategoriesInfo = function(req,res,next){
    db.categoriesModel.find({},function(err,data){
        if(err) return next(err);
        res.send(data);
    });
};

exports.postCategoryDataOutOfFile = function(req,res,next){
    var title = req.body.title;
    var brief = req.body.brief;
    db.categoriesModel.find({category_tytle:title},function(err,info){

        if(info.category_tytle){
            db.categoriesModel.update({category_tytle:title},{category_brief:brief},function(err){
                if(err) return next(err);
            });
        }else{
            db.categoriesModel.create({category_tytle:title,category_brief:brief},function(err){
                if(err) return next(err);
            });
        }
    });
};


exports.getMenuByCat = function(req,res,next){
    var category = req.params.category;
    db.dishesModel.aggregate({$match:{dish_category:category}},{$sort:{dish_order:1}},function(err,data){
        if(err) return next(err);
        res.send(data);
    });
};


exports.getBearMenuTotal = function(req,res,next){
    db.dishesModel.aggregate({$match:{dish_category:'пивное меню'}},{$sort:{_id:1}},function(err,data){
        if(err) return next(err);
        res.send(data);
    });
};

exports.getLaunchMenuTotal = function(req,res,next){
    db.dishesModel.aggregate({$match:{dish_category:'ланч'}},{$sort:{_id:1}},function(err,data){
        if(err) return next(err);
        res.send(data);
    });
};

exports.getBranchMenuTotal = function(req,res,next){
    db.dishesModel.aggregate({$match:{dish_category:'бранч'}},{$sort:{_id:1}},function(err,data){
        if(err) return next(err);
        res.send(data);
    });
};

exports.photosVk = function(req,res,next){
    request('http://api.vk.com/method/photos.get?oid=213486813&aid=194337111', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var fir = response.body;
            var obj = JSON.parse(fir);
            var sec = obj.response;
            var repo = [];
            sec.forEach(function(item){
                var info = {};
                info.photo = item.src_xbig;
                repo.push(info);
            });
            res.send(repo);
        }
    })
};



*/



















