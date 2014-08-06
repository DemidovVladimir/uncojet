var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ohara');

var mongoose = require('mongoose');

var equipment = mongoose.Schema({
    equipment_name:{
        type:String,
        unique:true
    },
    equipment_photo:{
        type:[],
        unique:false
    },
    equipment_about:{
        type:String
    },
    equipment_some:{
        type:String,
        unique:false
    },
    equipment_spec:{
        type:[],
        unique:false
    },
    equipment_price:{
        type:String,
        unique:false
    },
    equipment_benefits:{
        type:String,
        unique:false
    },
    equipment_areas:{
        type:[],
        unique:false
    },
    equipment_documents:{
        type:[],
        unique:false
    },
    equipment_videos:{
        type:[],
        unique:false
    },
    equipment_category:{
        type:String,
        unique:false
    },
    equipment_order:{
        type:String
    }
});
exports.equipmentModel = mongoose.model('equipment',equipment);


var categories = mongoose.Schema({
    cat_name:{
        type:String,
        unique:true
    },
    cat_photo:{
        type:[],
        unique:false
    },
    cat_brief:{
        type:String
    },
    cat_areas:{
        type:[],
        unique:false
    },
    cat_documents:{
        type:[],
        unique:false
    },
    cat_videos:{
        type:[],
        unique:false
    },
    cat_order:{
        type:Number
    }
});
exports.categoryModel = mongoose.model('categories',categories);
