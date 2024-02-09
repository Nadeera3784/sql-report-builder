const mongoose = require('mongoose');

const _document_name = "Dataset";

let DocumentSchema = mongoose.Schema({
    name : {
		type : String,
		required : true,
    },
    attributes : {
		type : Array ,
		required : true
    },
	table : {
		type : String,
		required : true
	},
	query_select : {
		type : Array,
	},
	query_join  : {
		type : String,
	},
	query_where : {
		company_field : String,
		event_field : String,
		default_field : String,
		event : Boolean,
		company : Boolean,
		default : Boolean
	},
	query_count : {
		type : String
	},
	query_analytic: {
		select : String,
		group  : String
	}, 
	created_at: {
		type: Date,
		default: Date.now,
	}
});


module.exports = mongoose.model(_document_name, DocumentSchema);


