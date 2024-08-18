import express from 'express'
import { prisma } from "../lib/prisma";

const router = express.Router()

import z from "zod"

import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as string

// Cadastro
router.post('/cadastro', async (req, res) => {
  try {
    const bodySchema = z.object({
      email: z.string().email(),
      name: z.string(),
      password: z.string(),
    })

    const { email, name, password } = bodySchema.parse(req.body)

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashPassword,
      }
    })

    return res.status(201).json({ message: "user create sucess!", user })

  } catch (error) {
    console.log(error)
    res.status(500)
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string(),
    })

    const { email, password } = bodySchema.parse(req.body)
    // Busca o usuário  no banco de dados
    const userLogin = await prisma.user.findUnique({
      where: {
        email
      }
    })

    // Verifica se o usuário existe dentro do banco
    if (!userLogin) {
      return res.status(404).json({ message: 'User not found!' })
    }

    // Compara a senha do banco com oque o usuário digitou 
    const isMatch = await bcrypt.compare(password, userLogin.password)

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password!' })
    }

    // gerar token
    const token = jwt.sign({ id: userLogin.id }, JWT_SECRET, { expiresIn: '7d' })

    return res.status(200).json({ message: 'Login successful!', token });

  } catch (error) {
    console.log(error)
    res.status(500)
  }
})


export { router as RoutesPublic }

// fnatanieljunior
//  aYpEWPXKuH8ZYXNs
// para gerar um jwt_secret(chave segura):  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"