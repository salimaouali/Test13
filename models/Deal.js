// importer mongoose
var mongoose = require('mongoose');

// passer en parametre un obj qui contient les différents champs 
var dealSchema = new mongoose.Schema({
	name : String,
	prix : Number,
	lien : String,
	description : String,
	picture : String,
	dateFin : Date
});

var Deal = mongoose.model('Deal', dealSchema);
module.exports = Deal; //exporter mon model
