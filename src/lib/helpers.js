const bcrypt = require('bcryptjs');
const exhbs = require('express-handlebars');

const helpers = {};
let hbs = exhbs.create({})

hbs.handlebars.registerHelper('isData',(array)=>{
    return array.length > 0 ? true : false
})

helpers.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

helpers.matchPassword = async (password, savedPassword) => {
  try {
    return await bcrypt.compare(password, savedPassword);
  } catch (e) {
    console.log(e)
  }
};

module.exports = helpers;