import { FastifyInstance } from "fastify";

export async function RoutesPublic(app:FastifyInstance){
  // Cadastro
  app.get('/',(req, res)=>{
    return {message: "hello"}
  })

  app.post('/cadastro',(req,res)=>{
    const user = req.body
    res.status(201)
    return {message: "user create sucess!", user}
  }) 
}

// fnatanieljunior
//aYpEWPXKuH8ZYXNs
//