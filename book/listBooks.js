const fs = require('fs');
const path = require('path');

function listBooks(req, res) {
   const filePath = path.join(__dirname, '..', '/book/data.json');

   if (!fs.existsSync(filePath)) {
      return res.status(404).send('Nenhum livro cadastrado.');
   }

   const books = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
   if (books.length === 0) {
      return res.status(404).send('Nenhum livro cadastrado.');
   }

   return res
      .status(200)
      .send(books.map(book => `
         ID: ${ book.id }
         Título: ${ book.title }
         Autor: ${ book.author }
         Ano: ${ book.year }
         Gênero: ${ book.genre } 
      `).join('\n'));
}

module.exports = listBooks;