const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;

// Swagger configuration
const swaggerDefinition = {
  info: {
    title: 'Maior Número Inteiro API',
    version: '1.0.0',
    description: 'Encontre o maior número inteiro em um array.',
  },
  basePath: '/',
};

const options = {
  swaggerDefinition,
  apis: ['./app.js'], // Caminho para o arquivo que contém as rotas
};

const swaggerSpec = swaggerJSDoc(options);

// Middleware para servir a documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /findMaxInteger:
 *   post:
 *     summary: Encontra o maior número inteiro em um array.
 *     description: Recebe uma lista numérica e retorna o maior número inteiro.
 *     parameters:
 *       - in: body
 *         name: numbers
 *         description: Lista de números.
 *         required: true
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *     responses:
 *       200:
 *         description: Maior número inteiro encontrado.
 */
app.post('/findMaxInteger', (req, res) => {
  const numbers = req.body;

  if (!numbers || !Array.isArray(numbers) || numbers.length === 0) {
    return res.status(400).json({ error: 'A lista de números é inválida ou vazia.' });
  }

  const maxInteger = Math.max(...numbers.filter(Number.isInteger));

  res.json({ maxInteger });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
