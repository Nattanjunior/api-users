import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const JWT_SECRET = process.env.JWT_SECRET as string

const auth = async (req: Request, res: Response, next: NextFunction) => {

  const token = req.headers.authorization
  console.log(token)

  if (!token) {
    return res.status(401).json({ message: 'Acesso Negado' })
  }

  try {
    const decode = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET)
    console.log(decode)
  } catch (error) {
    return res.status(401).json({message: 'Tokem inválido'})
  }
  next()
}

export default auth