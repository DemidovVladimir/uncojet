var db = require('./../data/db.js');
var fs = require('fs');
var gm = require('gm');
var nodemailer = require("nodemailer");
var async = require('async');
var request = require('request');




//Ready block for adding files anywhere
exports.addFilesTo = function(req,res,next){
    var element = req.params.element;
    var titleEl = req.body.titleEl;
    var equipmentTitle = req.body.equipment_title;
    if(element=='equipment'){
        if(titleEl=='docs'){
            db.equipmentModel.find({equipment_name:equipmentTitle},function(err,item){
                if(err) return next(err);
                if(item.length!=0){
                    db.equipmentModel.update({equipment_name:equipmentTitle},
                        {$push:{'equipment_documents':req.files.file.originalFilename}},
                        function(err){
                            if(err) return next(err);
                            fs.createReadStream(req.files.file.path)
                                .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
                            if (!err) console.log('Files are loaded!');
                            res.send(200);
                        }
                    )
                }else{
                    db.equipmentModel.create({equipment_name:equipmentTitle,
                            equipment_documents:req.files.file.originalFilename
                        },
                        function(err){
                            if(err) return next(err);
                            fs.createReadStream(req.files.file.path)
                                .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
                            if (!err) console.log('Files are loaded!');
                            res.send(200);
                        }
                    )
                }
            });
        }else if(titleEl=='photos'){
            db.equipmentModel.find({equipment_name:equipmentTitle},function(err,item){
                if(err) return next(err);
                if(item.length!=0){
                    db.equipmentModel.update({equipment_name:equipmentTitle},
                        {$push:{'equipment_photo':req.files.file.originalFilename}},
                        function(err){
                            if(err) return next(err);
                            fs.createReadStream(req.files.file.path)
                                .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
                            gm('public/uploaded/'+req.files.file.originalFilename)
                                .resize(170, 140)
                                .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                                    if (!err) console.log('Files are loaded!');
                                    res.send(200);
                                });
                        }
                    )
                }else{
                    db.equipmentModel.create({equipment_name:equipmentTitle,
                            equipment_photo:req.files.file.originalFilename
                        },
                        function(err){
                            if(err) return next(err);
                            fs.createReadStream(req.files.file.path)
                                .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
                            gm('public/uploaded/'+req.files.file.originalFilename)
                                .resize(170, 140)
                                .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                                    if (!err) console.log('Files are loaded!');
                                    res.send(200);
                                });
                        }
                    )
                }
            });

        }
    }else if(element=='areas'){
        db.areaModel.find({area_title:req.body.area_title},function(err,item){
            if(err) return next(err);
            if(item.length!=0){
                db.areaModel.update({area_title:req.body.area_title},
                    {$push:{'area_photos':req.files.file.originalFilename}},
                    function(err){
                        if(err) return next(err);
                        fs.createReadStream(req.files.file.path)
                            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
                        gm('public/uploaded/'+req.files.file.originalFilename)
                            .resize(170, 140)
                            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                                if (!err) console.log('Files are loaded!');
                                res.send(200);
                            });
                    }
                )
            }else{
                db.areaModel.create({area_title:req.body.area_title,
                        area_photos:req.files.file.originalFilename
                    },
                    function(err){
                        if(err) return next(err);
                        fs.createReadStream(req.files.file.path)
                            .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
                        gm('public/uploaded/'+req.files.file.originalFilename)
                            .resize(170, 140)
                            .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                                if (!err) console.log('Files are loaded!');
                                res.send(200);
                            });
                    }
                )
            }
        });
    }else if(element=='category'){

        if(titleEl=='docs'){
            db.categoryModel.find({cat_title:req.body.category_title},function(err,item){
                if(err) return next(err);
                if(item.length!=0){
                    db.categoryModel.update({cat_title:req.body.category_title},
                        {$push:{'cat_documents':req.files.file.originalFilename}},
                        function(err){
                            if(err) return next(err);
                            fs.createReadStream(req.files.file.path)
                                .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
                            if (!err) console.log('Files are loaded!');
                            res.send(200);
                        }
                    )
                }else{
                    db.categoryModel.create({cat_title:req.body.category_title,
                            cat_documents:req.files.file.originalFilename
                        },
                        function(err){
                            if(err) return next(err);
                            fs.createReadStream(req.files.file.path)
                                .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
                            if (!err) console.log('Files are loaded!');
                            res.send(200);
                        }
                    )
                }
            });
        }else if(titleEl=='photos'){
            db.categoryModel.find({cat_title:req.body.category_title},function(err,item){
                if(err) return next(err);
                if(item.length!=0){
                    db.categoryModel.update({cat_title:req.body.category_title},
                        {$push:{'cat_photos':req.files.file.originalFilename}},
                        function(err){
                            if(err) return next(err);
                            fs.createReadStream(req.files.file.path)
                                .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
                            gm('public/uploaded/'+req.files.file.originalFilename)
                                .resize(170, 140)
                                .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                                    if (!err) console.log('Files are loaded!');
                                    res.send(200);
                                });
                        }
                    )
                }else{
                    db.categoryModel.create({cat_title:req.body.category_title,
                            cat_photos:req.files.file.originalFilename
                        },
                        function(err){
                            if(err) return next(err);
                            fs.createReadStream(req.files.file.path)
                                .pipe(fs.createWriteStream('public/uploaded/'+req.files.file.originalFilename));
                            gm('public/uploaded/'+req.files.file.originalFilename)
                                .resize(170, 140)
                                .write('public/uploaded/mini_'+req.files.file.originalFilename, function (err) {
                                    if (!err) console.log('Files are loaded!');
                                    res.send(200);
                                });
                        }
                    )
                }
            });

        }
    }
}

exports.deleteFileEquipment = function(req,res,next){
    var file = req.params.file;
    var type = req.params.type;
    if(type=='docs'){
        db.equipmentModel.update({equipment_documents:file},
            { $pull: {"equipment_documents": file}},function(err){
                if(err) return next(err);
                fs.unlink(__dirname+'/../public/uploaded/'+file,function(err){
                    if(err) return next(err);
                    console.log('deleted - '+file);
                    res.send(200);
                });
            });
    }else if(type=='photos'){
        db.equipmentModel.update({equipment_photo:file},
            { $pull: {"equipment_photo": file}},function(err){
                if(err) return next(err);
                fs.unlink(__dirname+'/../public/uploaded/'+file,function(err){
                    if(err) return next(err);
                    fs.unlink(__dirname+'/../public/uploaded/mini_'+file,function(err){
                        if(err) return next(err);
                        console.log('deleted - '+file);
                        res.send(200);
                    })
                });
            });
    }

}
exports.deleteFileArea = function(req,res,next){
    var file = req.params.file;
        db.areaModel.update({area_photos:file},
            { $pull: {"area_photos": file}},function(err){
                if(err) return next(err);
                fs.unlink(__dirname+'/../public/uploaded/'+file,function(err){
                    if(err) return next(err);
                    fs.unlink(__dirname+'/../public/uploaded/mini_'+file,function(err){
                        if(err) return next(err);
                        console.log('deleted - '+file);
                        res.send(200);
                    })
                });
            });
}

exports.deleteFileCategory = function(req,res,next){
    var file = req.params.file;
    var type = req.params.type;
    if(type=='docs'){
        db.categoryModel.update({cat_documents:file},
            { $pull: {"cat_documents": file}},function(err){
                if(err) return next(err);
                fs.unlink(__dirname+'/../public/uploaded/'+file,function(err){
                    if(err) return next(err);
                    console.log('deleted - '+file);
                    res.send(200);
                });
            });
    }else if(type=='photos'){
        db.categoryModel.update({cat_photos:file},
            { $pull: {"cat_photos": file}},function(err){
                if(err) return next(err);
                fs.unlink(__dirname+'/../public/uploaded/'+file,function(err){
                    if(err) return next(err);
                    fs.unlink(__dirname+'/../public/uploaded/mini_'+file,function(err){
                        if(err) return next(err);
                        console.log('deleted - '+file);
                        res.send(200);
                    })
                });
            });
    }

}







exports.deleteEquipmentTotal = function(req,res,next){
    var equipmentTitle = req.params.equipment;
    db.equipmentModel.find({equipment_name:equipmentTitle},function(err,data){
        if(err) return next(err);
        if(data.equipment_photo && data.equipment_photo.length!=0){
            data.equipment_photo.forEach(function(pic){
                fs.unlink(__dirname+'/../public/uploaded/'+pic,function(err){
                    if(err) return next(err);
                    fs.unlink(__dirname+'/../public/uploaded/mini_'+pic,function(err){
                        if(err) return next(err);
                    })
                })
            });
        }
        if(data.equipment_documents && data.equipment_documents.length!=0){
            data.equipment_documents.forEach(function(doc){
                fs.unlink(__dirname+'/../public/uploaded/'+doc,function(err){
                    if(err) return next(err);
                })
            });
        }
        db.equipmentModel.remove({equipment_name:equipmentTitle},function(err){
            if(err) return next(err);
        });
    });
};

exports.deleteCategoryTotal = function(req,res,next){
    var categoryTitle = req.params.category;
    db.categoryModel.find({cat_title:categoryTitle},function(err,data){
        if(err) return next(err);
        if(data.cat_photos && data.cat_photos.length!=0){
            data.cat_photos.forEach(function(pic){
                fs.unlink(__dirname+'/../public/uploaded/'+pic,function(err){
                    if(err) return next(err);
                    fs.unlink(__dirname+'/../public/uploaded/mini_'+pic,function(err){
                        if(err) return next(err);
                    })
                })
            });
        }
        if(data.cat_documents && data.cat_documents.length!=0){
            data.cat_documents.forEach(function(doc){
                fs.unlink(__dirname+'/../public/uploaded/'+doc,function(err){
                    if(err) return next(err);
                })
            });
        }
        db.categoryModel.remove({cat_title:categoryTitle},function(err){
            if(err) return next(err);
        });
    });
};

exports.deleteAreaTotal = function(req,res,next){
    var areaTitle = req.params.area;
    db.areaModel.find({area_title:areaTitle},function(err,data){
        if(err) return next(err);
        if(data.area_photos && data.area_photos.length!=0){
            data.area_photos.forEach(function(pic){
                fs.unlink(__dirname+'/../public/uploaded/'+pic,function(err){
                    if(err) return next(err);
                    fs.unlink(__dirname+'/../public/uploaded/mini_'+pic,function(err){
                        if(err) return next(err);
                    })
                })
            });
        }
        db.areaModel.remove({area_title:areaTitle},function(err){
            if(err) return next(err);
        });
    });
};

//At the menu administration posting data without photo
exports.postEquipmentOutOfFile = function(req,res,next){
    var title = req.body.title;
    var popular = req.body.popular;
    if(req.body.about===undefined){
        var about = '';
    }else{
        var about = req.body.about;
    }

    if(req.body.some===undefined){
        var some = '';
    }else{
        var some = req.body.some;
    }

    if(req.body.price===undefined){
        var price = '';
    }else{
        var price = req.body.price;
    }

    if(req.body.benefit===undefined){
        var benefit = '';
    }else{
        var benefit = req.body.benefit;
    }

    if(req.body.category===undefined){
        var category = '';
    }else{
        var category = req.body.category;
    }

    if(req.body.specs===undefined){
        var specs = [];
    }else{
        var specs = req.body.specs;
    }

    if(req.body.areas===undefined){
        var areas = [];
    }else{
        var areas = req.body.areas;
    }

    if(req.body.videoLinks===undefined){
        var videoLinks = [];
    }else{
        var videoLinks = req.body.videoLinks;
    }

    if(req.body.order===undefined){
        var order = '';
    }else{
        var order = req.body.order;
    }








    db.equipmentModel.find({equipment_name:title},function(err,data){
        if(err) return next(err);
        if(data.length==0){
            db.equipmentModel.create({equipment_name:title, equipment_about:about,equipment_some:some,equipment_price:price,equipment_benefits:benefit,equipment_category:category,equipment_spec:specs,equipment_areas:areas,equipment_videos:videoLinks,equipment_popular:popular,equipment_order:order},function(err){
                if(err) return next(err);
                res.send(200);
            });
        }else{
            db.equipmentModel.update({equipment_name:title},{equipment_about:about,equipment_some:some,equipment_price:price,equipment_benefits:benefit,equipment_category:category,equipment_spec:specs,equipment_areas:areas,equipment_videos:videoLinks,equipment_popular:popular,equipment_order:order},function(err){
                if(err) return next(err);
                res.send(200);
            });
        }
    });

}
//At the menu administration posting data without photo
exports.postAreaOutOfFile = function(req,res,next){
    var title = req.body.title;
    var about = req.body.about;
    var equipments = req.body.equipments;
    if(req.body.videoLinks===undefined){
        var videoLinks = [];
    }else{
        var videoLinks = req.body.videoLinks;
    }
    db.areaModel.find({area_title:title},function(err,data){
        if(err) return next(err);
        if(data.length==0){
            db.areaModel.create({area_title:title, area_about:about,area_equipment:equipments,area_videos:videoLinks},function(err){
                if(err) return next(err);
                res.send(200);
            });
        }else{
            db.areaModel.update({area_title:title},{ area_about:about,area_equipment:equipments,area_videos:videoLinks},function(err){
                if(err) return next(err);
                res.send(200);
            });
        }
    });

}
//At the menu administration posting data without photo
exports.postCategoryOutOfFile = function(req,res,next){
    var title = req.body.title;
    if(req.body.about===undefined){
        var about = '';
    }else{
        var about = req.body.about;
    }

    if(req.body.areas===undefined){
        var areas = [];
    }else{
        var areas = req.body.areas;
    }

    if(req.body.videoLinks===undefined){
        var videoLinks = [];
    }else{
        var videoLinks = req.body.videoLinks;
    }

    if(req.body.order===undefined){
        var order = '';
    }else{
        var order = req.body.order;
    }








    db.categoryModel.find({cat_title:title},function(err,data){
        if(err) return next(err);
        if(data.length==0){
            db.categoryModel.create({cat_title:title, cat_about:about,cat_areas:areas,cat_videos:videoLinks,cat_order:order},function(err){
                if(err) return next(err);
                res.send(200);
            });
        }else{
            db.categoryModel.update({cat_title:title},{cat_about:about,cat_areas:areas,cat_videos:videoLinks,cat_order:order},function(err){
                if(err) return next(err);
                res.send(200);
            });
        }
    });

}
exports.getEquipmentsTotal = function(req,res,next){
    db.equipmentModel.aggregate({$sort:{equipment_order:1}},function(err,data){
        if(err) return next(err);
        res.send(data);
    });
}
exports.getAreasTotal = function(req,res,next){
    db.areaModel.find({},function(err,data){
        if(err) return next(err);
        res.send(data);
    });
}
exports.getAreaTotal = function(req,res,next){
    var area = req.params.area;
    db.areaModel.find({area_title:area},function(err,data){
        if(err) return next(err);
        res.send(data);
    });
}
exports.getCategoriesTotal = function(req,res,next){
    db.categoryModel.aggregate({$sort:{cat_order:1}},function(err,data){
        if(err) return next(err);
        res.send(data);
    });
}
exports.getEquipmentsTotalByCat = function(req,res,next){
    var cat = req.params.bycat;
    db.equipmentModel.aggregate({$match:{equipment_category:cat}},{$sort:{equipment_order:1}},function(err,data){
        if(err) return next(err);
        var info = data;
        res.send(info);
    });
}
exports.getEquipmentsTotalByArea = function(req,res,next){
    var area = req.params.area;
    ///Defining proper exit object
    var printers = [];
    db.equipmentModel.find({},function(err,data){
        if(err) return next(err);
        var lenka = data.length;
        for(var i=0; i<lenka; i++){
            var printer = data[i].equipment_name;
            var photo = data[i].equipment_photo;
            var areas = data[i].equipment_areas;
            areas = JSON.parse(areas);
            for(var xi=0; xi<areas.length; xi++){
                var printerObj = {};
                if(areas[xi].title==area){
                    printerObj.title = printer;
                    printerObj.photo = photo[0];
                    printers.push(printerObj);
                }
            }
        }
        res.send(printers);
    });
}
exports.getAreasTotalByEquipment = function(req,res,next){
    var equipment = req.params.equipment;
    var output = [];
    db.equipmentModel.find({equipment_name:equipment},function(err,info){
        if(err) return next(err);
        var equipAreas = JSON.parse(info[0].equipment_areas);
        for(var i=0; i<equipAreas.length; i++){

                db.areaModel.find({area_title:equipAreas[i].title},function(err,data){
                    if(err) return next(err);
                    if(data.length!=0){
                        var outputObj = {};
                        outputObj.title = data[0].area_title;
                        outputObj.photos = data[0].area_photos;
                        output.push(outputObj);
                        if(output.length==equipAreas.length){
                            res.send(output);
                        }
                    }else{
                        //res.send('no result');
                    }
                });
        }
    });
}
exports.getEquipmentTotal = function(req,res,next){
    var equipment = req.params.equipment;
    db.equipmentModel.find({equipment_name:equipment},function(err,data){
        if(err) return next(err);
        var info = data;
       // console.log(info);
        res.send(info);
    });
}


exports.sendEmail = function(req,res,next){
    var name = req.body.name;
    var emailAddress = req.body.emailFrom;
    var theme = req.body.theme;
    var body = req.body.body;

    // create reusable transport method (opens pool of SMTP connections)
     var smtpTransport = nodemailer.createTransport("SMTP",{
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



    /*var mail = require("nodemailer").mail;

    mail({
        from: name+" ✔ "+emailAddress, // sender address
        to: "meandevelopmentstudio@gmail.com", // list of receivers
        subject: theme+" ✔", // Subject line
        text: body+" ✔", // plaintext body
        html: "<b>"+body+" ✔</b>" // html body
    });*/

}

exports.search = function(req,res,next){
    var item = req.params.item;
    var results = {};
    db.areaModel.find({area_title:item},function(err,areas){
        if(err) return next(err);
        results.areas = areas;
        db.categoryModel.aggregate({$match:{cat_title:item}},{$sort:{cat_order:1}},function(err,categories){
            if(err) return next(err);
            results.categories = categories;
            db.equipmentModel.aggregate({$match:{equipment_name:item}},{$sort:{equipment_order:1}},function(err,printers){
                if(err) return next(err);
                results.equipment = printers;
                res.send(results);
            });
        });
    });
}


















