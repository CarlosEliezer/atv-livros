const fs = require('fs');
const path = require('path');

function getDeckById(req, res) {
   const { id } = req.params;

   if (!id || id.trim() === '') {
      return res.status(400).send('Nenhum ID de livro fornecido.');
   }

   const filePath = path.join(__dirname, '..', '/book/data.json');

   if (!fs.existsSync(filePath)) {
      return res.status(404).send('Nenhum livro cadastrado.');
   }

   const books = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

   if (books.length === 0) {
      return res.status(404).send('Nenhum livro cadastrado.');
   }

   const book = books.find((book) => book.id === parseInt(id));

   if (!book) {
      return res.status(404).send(`Nenhum livro encontrado com o ID ${ id }.`);
   }

   return res
      .status(200)
      .send(`
         Livro com ID ${ id } encontrado!

            Título: ${ book.title }
            Autor: ${ book.author }
            Ano: ${ book.year }
            Gênero: ${ book.genre } 
      `);
}

module.exports = getDeckById;