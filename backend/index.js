const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Importa y usa las rutas
app.use('/api/clientes', require('./routes/clientes'));
app.use('/api/productos', require('./routes/productos'));
// Puedes agregar más rutas aquí

app.get('/', (req, res) => {
  res.send('API Node.js conectada a Supabase/PostgreSQL!');
});

app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});