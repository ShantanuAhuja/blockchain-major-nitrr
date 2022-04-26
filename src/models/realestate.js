const mongoose = require("mongoose");

// schema for RealEstate registration
const realestateregister = new mongoose.Schema({

	ownername: {
		type: String,
		required: true
	},
	contactno: {
		type: String,
		required: true

	},
	location: {
		type: String,
		required: true,

	},
	possessiondate: {
		type: Date,
		required: true
	},
	area: {
		type: Number,
		required: true
	},
	pprice: {
		type: Number,
		required: true
	},
	propimg1:
	{
		data: Buffer,
		contentType: String
	},
	propimg2:
	{
		data: Buffer,
		contentType: String
	}
});

const realestateregisteration = new mongoose.model("RealEstateDetails", realestateregister);

module.exports = realestateregisteration;
