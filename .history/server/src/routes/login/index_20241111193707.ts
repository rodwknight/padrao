const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const unidadeModel = require('../../models/usuario')
const app = express();

app.use(cors());
app.use(bodyParser.json());


// Rota de login
app.post('/login', async (req, res) => {

  const { username, password } = req.body;

  console.log('1. login ', username, password)



  // Verificação do usuário
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).send('Credenciais inválidas.');

  // Comparação da senha
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).send('Credenciais inválidas.');

  // Geração do token JWT
  const token = jwt.sign({ id: user.id }, 'secreta', { expiresIn: '1h' });

  res.json({ token });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));