const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usuarioModel = require('../../models/usuario')
const app = express();

// Rota de login
app.post('/get', async (req: any, res: any) => {

  const { username, password } = req.body;
  const usuario = await usuarioModel.findFirst({ username })

  if (usuario) {

    const senhaValida = await bcrypt.compare(password, usuario.password);
    if (!senhaValida) {
      return res.status(401).send({ error: 'Credenciais inválidas.' });
    }
  } else {
    return res.status(401).send({ error: 'Credenciais inválidas.' });
  }

  const secretKey = 'supersecretkey';
  // Gerar um token JWT
  const token = jwt.sign({ userId: usuario.id, username: usuario.username }, secretKey, { expiresIn: '1h' });

  res.status(200).send({ token })
});

module.exports = app;

/*
// Verificar um token JWT
jwt.verify(token, secretKey, (err, decoded) => {
  if (err) {
    console.error('Token inválido:', err.message);
  } else {
    console.log('Token válido, dados decodificados:', decoded);
  }
});
*/