import bcrypt from 'bcryptjs';

const password = "admin123";
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);
console.log("Hashed password:", hash);
