const DB = require("../db");
const usersCollection = DB.collection("users");

// console.log(usersCollection.find({}));
// console.log(`User Collections are: ${usersCollection}`);

const validator = require("validator");

let User = function (data) {
  this.data = data;
  this.errors = [];
};

User.prototype.cleanUp = function () {
  if (typeof this.data.username != "string") {
    this.data.username = "";
  }
  if (typeof this.data.email != "string") {
    this.data.email = "";
  }
  if (typeof this.data.password != "string") {
    this.data.email = "";
  }

  // get rid of any other properties
  this.data = {
    username: this.data.username.trim().toLowerCase(),
    email: this.data.email.trim().toLowerCase(),
    password: this.data.password,
  };
};

User.prototype.validate = function () {
  if (this.data.username == "") {
    this.errors.push("Username cannot be empty");
  }
  if (this.data.username.length < 3) {
    this.errors.push("Username should be more than 3 characters ");
  }
  if (this.data.username.length > 15) {
    this.errors.push("Username cannot exceed 25 characters ");
  }
  if (
    this.data.username != "" &&
    !validator.isAlphanumeric(this.data.username)
  ) {
    this.errors.push("Username can only contain numbers and letters");
  }
  if (!validator.isEmail(this.data.email)) {
    this.errors.push("You must provide a valid email");
  }
  if (this.data.password == "") {
    this.errors.push("password cannot be empty");
  }
  if (this.data.password.length > 0 && this.data.password.length < 10) {
    this.errors.push("Password must be atleast 10 characters");
  }
  if (this.data.password.length > 50) {
    this.errors.push("Password cannot exceed 50 characters");
  }
};

User.prototype.login = async function (callback) {
  this.cleanUp();
  const attemptedUser = await usersCollection.findOne({
    username: this.data.username,
  });
  if (attemptedUser && attemptedUser.password == this.data.password) {
    callback("Congrats, logged in");
  } else {
    callback("Invalid Username or Password");
  }
};

User.prototype.register = function () {
  // Step1: Validate user data
  this.cleanUp();
  this.validate();

  // Step2: Only If there are no validation erros
  // Then save the user data into db
  if (!this.errors.length) {
    // usersCollection.collection("users").insertOne(this.data);
    usersCollection.insertOne(this.data);
  }
};

module.exports = User;
