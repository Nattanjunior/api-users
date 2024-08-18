import express from 'express'
import { prisma } from "../lib/prisma";

const router = express.Router()

router.get('/listusers', async (req, res) => {
  try {
    const usersList = await prisma.user.findMany()

    res.status(200).json({ message: "Users successfully listed", usersList })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Faliled on server" })
  }
})

export { router as RoutesPrivate }

