import express from "express"
import sql from './db.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
const port = 5000

const buscarPersona = async (name) => {
  const user = await sql`
    select name, age
    from public.emp_data
    where name = ${name}
  `
  return user
};

const getInitialInfo = async() => {
  const info = await sql`
    select *
    from public."configInit"
  `
  return info
}

app.get('/', async (req, res) => {
  const info = await getInitialInfo()
  res.header("Access-Control-Allow-Origin", "*");
  console.log('aca devolvemos el objecto con el que estamos mostrando info en el index', info[0])
  res.json(info[0])
})

app.post('/ingresar', (req, res) => {
  console.log(req.body)
  res.header("Access-Control-Allow-Origin", "*");
  console.log('estos son los datos que recibimos en el body de el frontend', req.body)
  res.json({success: true, message: 'Datos enviados correctamente'})
})

app.get('/consult', async (req, res) =>  {
  res.header("Access-Control-Allow-Origin", "*");
  const name = req.query.name
  console.log('este es el id que me llega del frontend', name)
  const persona = await buscarPersona(name)
  console.log('aca estamos devolviendo la persona con el mismo id', persona)
  res.json({success: true, data: persona})
})

app.listen(port, () => {
  console.log(`Servidor Corriendo en el puerto ${port}`)
})
