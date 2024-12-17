const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const app = express();
const cors = require('cors');
const port = 4000;

const client = new OAuth2Client('810536467947-12dulrflula728nocf21skrm3ae5s07l.apps.googleusercontent.com'); 
const router = require('./routes/index.js');
app.use(cors());
app.use(express.json());
app.use(router);


async function verifyToken(req, res, next) {
  const authorizationHeader = req.header('Authorization');
  if (!authorizationHeader) {
    return res.status(401).send('Unauthorized');
  }

  const token = authorizationHeader.replace('Bearer ', '');
  try {

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '810536467947-12dulrflula728nocf21skrm3ae5s07l.apps.googleusercontent.com',
    });

    const userData = ticket.getPayload(); 
    req.user = userData;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).send('Invalid token');
  }
}
app.get('/verify', verifyToken, (req, res) => {
  res.json({ message: `Hello, ${req.user.name}!` });
});

app.listen(port, () => {
  console.log("Servidor escuchando por el puerto:", port);
});