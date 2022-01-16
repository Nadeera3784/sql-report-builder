const mongoose = require('mongoose');

const _document_name = "ScheduleReport";

let DocumentSchema = mongoose.Schema({
	custom_report_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'CustomReport'
    },
	user_id : {
		type : String,
		required : true
    },
    email : {
		type : String
    },
    date : {
		type : String,
		required : true,
    },
	status : {
		type : String,
		enum : ['queued','sent'],
        default: 'queued',
		required : true,
    },
	created_at: {
		type: Date,
		default: Date.now,
	}
});


module.exports = mongoose.model(_document_name, DocumentSchema);


