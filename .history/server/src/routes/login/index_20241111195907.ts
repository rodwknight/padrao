const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usuarioModel = require('../../models/usuario')
const app = express();

// Rota de login
app.post('/get', async (req: any, res:any) => {

    const { username, password } = req.body;

    console.log('1. login ', username, password)

    const usuario = await usuarioModel.findUnique({
      where: {
        username
      }
    })

    if (usuario) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const senhaValida = await bcrypt.compare(hashedPassword, usuario.senha);
      if (!senhaValida) {
        return res.status(401).send('Credenciais inválidas.');
      }
    } else {
      return res.status(401).send('Credenciais inválidas.');
    }

  // Verificação do usuário
  /*const user = users.find(u => u.username === username);
  if (!user) return res.status(401).send('Credenciais inválidas.');

  // Comparação da senha
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).send('Credenciais inválidas.');

  // Geração do token JWT
  const token = jwt.sign({ id: user.id }, 'secreta', { expiresIn: '1h' });

   res.json({ token });*/

   const secretKey = 'supersecretkey';
   // Gerar um token JWT
   const token = jwt.sign({ userId: usuario.id, username: usuario.id }, secretKey, { expiresIn: '1h' });

   req.status(200).send({token})
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