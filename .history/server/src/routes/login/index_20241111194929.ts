const express = require('express');
/*const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');*/

const usuarioModel = require('../../models/usuario')
const app = express();

// Rota de login
app.post('/get', async (req: any, res:any) => {

    const { username, password } = req.body;

    console.log('1. login ', username, password)

    const achou = await usuarioModel.findUnique({
      where: {
        username
      }
    })

    console.log('achou? ', achou)

    if (achou) {
      
    } else {
      const senhaValida = await bcrypt.compare('examplePassword', usuario.senha);
      if (!senhaValida) {
        console.log('Senha incorreta');
      } else {
        console.log('Usuário autenticado com sucesso');
      }
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

   req.status(200).send({})
});

module.exports = app;