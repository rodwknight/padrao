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

  res.status(200).send({ token, nome: usuario.nome, usuarioId: usuario.id })
});

app.post('/register', async (req: any, res: any) => {

  const username = 'rodw'
  const password = '123'
  const nome = 'Rodrigo Widmann'
  const empresaId = '274806d7-896e-465f-8c59-8c3d15243929'

  /*const { username, password } = req.body;

  // Validação básica de entrada
  if (!username || !password) {
    return res.status(400).send({ error: 'Username e password são obrigatórios.' });
  }*/

  // Verificar se o usuário já existe
  const usuarioExistente = await usuarioModel.findFirst({ username });
  if (usuarioExistente) {
    return res.status(400).send({ error: 'Username já existe.' });
  }

  // Hashing da senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Criar o novo usuário
  const novoUsuario = await usuarioModel.create( {
      username,
      password: hashedPassword,
      nome,
      empresaId
    }
  );

  res.status(201).send({ message: 'Usuário criado com sucesso', usuarioId: novoUsuario.id });
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