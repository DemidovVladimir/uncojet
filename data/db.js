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
    equipment_brief:{
        type:String
    },
    equipment_about:{
        type:String,
        unique:false
    },
    equipment_price:{
        type:String,
        unique:false
    },
    eqiupment_type:{
        type:String
    },
    equipment_order:{
        type:Number
    }
});
exports.equipmentModel = mongoose.model('equipment',equipment);
