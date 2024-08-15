import fastify from "fastify"
import { RoutesPublic } from "./routes/public"
const app = fastify()

app.register(RoutesPublic)

app.listen({
  port:3000
})
.then(()=>{
  console.log('Server running http:/localhost:3000')
})
