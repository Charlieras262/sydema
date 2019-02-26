const mongoose = require('mongoose');
const {Schema} = mongoose;

const CareerSchema = new Schema({
    code: {type: String, required: true},
    name: {type: String, required: true},
    just: {type: String, required: true}
});

const Career = module.exports = mongoose.model('Career', CareerSchema);

module.exports.getCareerbyCode = function(id, callback){
    var query = {code: id};
    Career.findOne(query, callback);
}

module.exports.getCareerbyName = function(name, callback){
    var query = {name: name};
    Career.findOne(query, callback);
}