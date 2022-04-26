const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// defining schema of the collection
const userRegistration = new mongoose.Schema({

	fname: {
		type: String,
		required: true
	},
	aadhar: {
		type: Number,
		required: true,
		unique: true,
		minlength: 12
	},
	gender: {
		type: String,
		required: true
	},
	blood: {
		type: String,
		required: true
	},
	age: {
		type: Number,
		required: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	confirmpassword: {
		type: String,
		required: true
	},

	tokens: [
		{
			token: {
				type: String,
				required: true
			}
		}
	]





});


// generating tokens for user authentication and logout purpose

userRegistration.methods.generateAuthToken = async function () {
	try {
		console.log(this._id);
		const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
		this.tokens = this.tokens.concat({ token: token });
		await this.save();

		return token;
	}
	catch (error) {
		res.send(error);
		console.log(error);
	}
}


// securing database password using bcrypt hashing for the purpose of hacking

userRegistration.pre("save", async function (next) {
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 10);
		this.confirmpassword = await bcrypt.hash(this.confirmpassword, 10);

	}
	next();
});


//create collection
const Register = new mongoose.model("Details", userRegistration);

module.exports = Register;


