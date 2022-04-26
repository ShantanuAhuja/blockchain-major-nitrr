require("dotenv").config();
const express = require("express");
const cookie = require("cookie");
const app = express();
const path = require("path");
const hbs = require("hbs");
const Register = require("./models/register");
const hospitalregisteration = require("./models/hospitalregister");
const realestateregisteration = require("./models/realestate");
const port = process.env.PORT || 3000;
const { json } = require("express");
//require("./db/conn");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");
const mongoose = require("mongoose");
const DB = 'mongodb+srv://shantanuahuja:shantanu2904@cluster0.kr2zp.mongodb.net/userInformation?retryWrites=true&w=majority';

mongoose.connect(DB, {
	useNewUrlParser: true,
	useUnifiedTopology: true

}).then(() => {
	console.log(`atlas succesful`)
}).catch((err) => {
	console.log(err);
})


// setting up connection to server at port 3000

const static_path = path.join(__dirname, "../public/");
const template_path = path.join(__dirname, "../templates/views");

//partials for calling a component which is to be used many times
const partial_path = path.join(__dirname, "../templates/partials");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(static_path));


//setting view engine to handlebars(hbs) file
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partial_path);




//directing to pages when user visites in following links
app.get("/", (req, res) => {
	res.render("index");
})

app.get("/register", (req, res) => {
	res.render("register");
})

app.get("/hospital", (req, res) => {
	res.render("hospital");
})

app.get("/option", (req, res) => {
	res.render("option");
})

app.get("/realestate", (req, res) => {
	res.render("realestate");
})

app.get("/about", (req, res) => {
	res.render("about")
})

app.get("/logout", (req, res) => {
	res.render("index");
})



// API when logout button is clicked




//API for inserting a data when user fills the form

app.post("/register", async (req, res) => {
	try {
		const password = req.body.password;
		const cpassword = req.body.confirmpassword;

		if (password === cpassword) {
			const registration = new Register({

				fname: req.body.fname,
				username: req.body.username,
				aadhar: req.body.aadhar,
				age: req.body.age,
				gender: req.body.gender,
				blood: req.body.blood,
				password: req.body.password,
				confirmpassword: req.body.confirmpassword,
			})






			const registered = await registration.save();
			res.status(201).render("index");
		}
		else {
			res.render("passwordprob");
		}
	} catch (error) {
		res.status(400).send(error);
	}
})



//API for when user logins into the form

app.post("/", async (req, res) => {
	try {
		const usernam = req.body.username;
		const password = req.body.password;
		const registerusername = await Register.findOne({ username: usernam });
		const isMatch = await bcrypt.compare(password, registerusername.password);


		if (isMatch) {
			res.status(201).render("option", { name: registerusername.fname });
		}

		else {
			res.send("Incorrect Password");
		}
	} catch (error) {
		res.status(400).send("Invalid Username or Password");
	}
})




// Inserting hospital registration data into database

app.post("/hospital", async (req, res) => {
	try {
		const hospiregister = new hospitalregisteration({
			fullname: req.body.fullname,
			contactno: req.body.contactno,
			aadhar: req.body.aadhar,
			age: req.body.age,
			gender: req.body.gender,
			blood: req.body.blood,
			weight: req.body.weight,
			symptoms: req.body.symptoms,
			chronicdisease: req.body.chronicdisease,
			oldprescription: req.body.oldprescription
		})
		const registered = await hospiregister.save();
		res.status(201).render("hospsucc", {
			name: registered.fullname,
			contact: registered.contactno,
			aadhar: registered.aadhar,
			age: registered.age,
			gender: registered.gender,
			blood: registered.blood,
			weight: registered.weight,
			symptoms: registered.symptoms,
			chronicdisease: registered.chronicdisease,
			oldprescription: registered.oldprescription
		});
	} catch (error) {
		res.status(400).send(error);
	}
})




// Inserting Real Estate registration data into database

app.post("/realestate", async (req, res) => {
	try {
		const realesregister = new realestateregisteration({
			ownername: req.body.ownername,
			contactno: req.body.contactno,
			area: req.body.area,
			pprice: req.body.pprice,
			location: req.body.location,
			possessiondate: req.body.possessiondate,
			propimg1: req.body.propimg1,
			propimg2: req.body.propimg2
		})
		const realregistered = await realesregister.save();

		res.status(201).render("realsucc", {
			ownername: realregistered.ownername,
			contactno: realregistered.contactno,
			area: realregistered.area,
			pprice: realregistered.pprice,
			location: realregistered.location,
			possessiondate: realregistered.possessiondate,
			propimg1: realregistered.propimg1,
			propimg2: realregistered.propimg2
		});
	} catch (error) {
		res.status(400).send(error);
	}
})


app.listen(port, () => {
	console.log(`Server is running at ${port}`);
});

