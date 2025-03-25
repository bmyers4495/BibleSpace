// imports
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { pool } from "../types/authTypes";


// register user
export const registerUserController = async (req: Request, res: Response) => {
  try {
    const {email, password, username}= req.body;
    const query = {
      text: 'INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *',
      values: [username, email, password]
    }
    const result = await pool.query(query)
    res.status(201).json({
      message: "User registered successfully",
      user: result.rows[0],
      token: jwt.sign({ userId: result.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    })
  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
      error: error.message
    })
  }
}
