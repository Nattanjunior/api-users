import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import z from "zod"
import bcrypt from "bcrypt";


export async function RoutesPublic(app: FastifyInstance) {
  // Cadastro
  app.post('/cadastro', async (req, res) => {
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
      res.status(201)
      return { message: "user create sucess!", user }

    } catch (error) {
      console.log(error)
      res.status(500)
    }
  })

  // Login
  app.post('/login', async (req, res) => {
    try {
      const bodySchema = z.object({
        email: z.string().email(),
        password: z.string(),
      })

      const { email, password } = bodySchema.parse(req.body)

      // Verifica se o usuário existe dentro do banco
      const userLogin = await prisma.user.findUnique({
        where: {
          email
        }
      })

      if (!userLogin) {
        return res.status(404).send({ message: 'User not found!' })
      }

      // Compara a senha do banco com oque o usuário digitou 
      const isMatch = await bcrypt.compare(password, userLogin.password)

      if (!isMatch) {
        return res.status(400).send({ message: 'Invalid password!' })
      }

      return res.status(200).send({ message: 'Login successful!', userLogin });

    } catch (error) {
      console.log(error)
      res.status(500)
    }
  })
}

// fnatanieljunior
//  aYpEWPXKuH8ZYXNs
//