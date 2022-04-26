const mongoose = require("mongoose");

// schema for hospital registration
const hospitalregister = new mongoose.Schema({

	fullname: {
		type: String,
		required: true
	},
	contactno: {
		type: String,
		required: true
	},
	aadhar: {
		type: Number,
		required: true,
		unique: true,
		minlength: 12
	},
	age: {
		type: Number,
		required: true
	},
	blood: {
		type: String,
		required: true
	},
	symptoms: {
		type: String,
		required: true
	},
	weight: {
		type: Number,
		required: true

	},
	gender: {
		type: String,
		required: true
	},

	chronicdisease:
	{
		data: Buffer,
		contentType: String
	},
	oldprescription:
	{
		data: Buffer,
		contentType: String
	}





});

const hospitalregisteration = new mongoose.model("hospitaldetails", hospitalregister);

module.exports = hospitalregisteration;
