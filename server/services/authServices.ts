// imports
import bcrypt from "bcrypt";
import type {User} from '../types/authTypes';
import { isValidEmail, isValidUsername,isValidPassword } from "../helpers/authHelpers";}


// register user
//
const registerUser = async(user: User) => {
  const email_query = {
    text: 'SELECT users'
  }
  const hashedPassword = await bcrypt.hash(user.password, 10);
  if (!isValidEmail(user.email)) {
    throw new Error("Invalid email format");
  }
  if (!isValidUsername(user.username)) {
    throw new Error("Invalid username format");
  }
  if (!isValidPassword(user.password)) {
    throw new Error("Invalid password format");
  }
  user.password = hashedPassword;
  user.username = user.username.toLowerCase();
  user.email = user.email.toLowerCase();
  return user

}
// login user

const loginUser = async (user: User) =>{

}


// logout user

//reset password

