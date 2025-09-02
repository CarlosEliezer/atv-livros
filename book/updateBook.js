const fs = require('fs');
const path = require('path');

const updateBook = (req, res) => {
   const { id } = req.params;

   if(!id || id.trim() === '') {
      return res.status(400).send('ID ou campo alvo não fornecido.');
   }

   if(!req.body || !req.body.target || req.body.target.trim() === '') {
      return res.status(400).send('Novo valor não fornecido.');
   }

   const validTargets = ['title', 'author', 'year', 'genre'];
   const target = req.body.target;
   if(!validTargets.includes(target)) {
      return res.status(400).send('Campo alvo inválido. Use title, author, year ou genre.');
   }

   const filePath = path.join(__dirname, '..', '/book/data.json');
   if (!fs.existsSync(filePath)) {
      return res.status(404).send('Nenhum livro cadastrado.');
   }
   
   let books = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
   if(books.length === 0) {
      return res.status(404).send('Nenhum livro cadastrado.');
   }

   const bookIndex = books.findIndex((book) => book.id === parseInt(id));
   if(bookIndex === -1) {
      return res.status(404).send('Livro não encontrado.');
   }

   books[bookIndex][target] = req.body[target];
   fs.writeFileSync(filePath, `[\n ${ books.map(book => JSON.stringify(book)).join(',\n ') } \n]`);
   return res.status(200).send('Livro atualizado com sucesso!');
}

module.exports = updateBook;