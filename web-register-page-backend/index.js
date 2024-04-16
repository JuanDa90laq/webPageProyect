import express from "express"
import sql from './db.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
const port = 5000

class Persona {
  constructor(id, nombre, edad, ciudad) {
    this.id = id;
    this.nombre = nombre;
    this.edad = edad;
    this.ciudad = ciudad;
  }

  static buscarPorId(id, arrayPersonas) {
    return arrayPersonas.find(persona => persona.id == id);
  }
}

const personas = [
  new Persona(1, 'Carlos', 30, 'Bogotá'),
  new Persona(2, 'Luisa', 25, 'Medellín'),
  new Persona(3, 'Andrés', 40, 'Cali'),
  new Persona(4, 'Laura', 35, 'Barranquilla'),
  new Persona(5, 'Santiago', 28, 'Cartagena'),
  new Persona(6, 'Valentina', 33, 'Bucaramanga'),
  new Persona(7, 'Camilo', 22, 'Pereira'),
  new Persona(8, 'Ana', 29, 'Manizales'),
  new Persona(9, 'Mateo', 45, 'Santa Marta'),
  new Persona(10, 'Isabela', 31, 'Villavicencio')
];

const buscarPersona = async (name) => {
  const user = await sql`
    select name, age
    from public.emp_data
    where name = ${name}
  `
  return user
};

app.get('/', (req, res) => {
  const responseObj = {
    imagen: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde, quaerat! Maiores obcaecati nisi eaque odit facilis voluptatum iusto inventore quis, amet enim exercitationem necessitatibus eligendi sequi eum perspiciatis. Nihil, odit!'
  }
  res.header("Access-Control-Allow-Origin", "*");
  console.log('aca devolvemos el objecto con el que estamos mostrando info en el index', responseObj)
  res.json(responseObj)
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
