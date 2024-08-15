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
        data:{
          email,
          name,
          password: hashPassword,
        }
      })
      res.status(201)
      return { message: "user create sucess!", user }
      
    } catch (error) {
      console.log(error)
    }
  })
}

// fnatanieljunior
//aYpEWPXKuH8ZYXNs
//