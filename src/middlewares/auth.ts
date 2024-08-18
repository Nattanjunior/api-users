import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const JWT_SECRET = process.env.JWT_SECRET as string

const auth = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req)
  next()
}

export default auth