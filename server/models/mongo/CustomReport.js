const mongoose = require('mongoose');

const _document_name = "CustomReport";

let DocumentSchema = mongoose.Schema({
	dataset_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Dataset'
    },
	user_id : {
		type : String,
    },
    event_id : {
		type : String,
    },
	organization_id : {
		type : String
    },
    name : {
		type : String,
		required : true,
    },
    attributes : {
		type : Array ,
		required : true
    },
	created_at: {
		type: Date,
		default: Date.now,
	}
});


module.exports = mongoose.model(_document_name, DocumentSchema);


