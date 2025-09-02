const fs = require('fs');
const path = require('path');

function deleteBook(req, res) {
   const { id } = req.params;
   if (!id || id.trim() === '') {
      return res.status(400).send('Nenhum ID de livro fornecido.');
   }

   const filePath = path.join(__dirname, '..', '/book/data.json');
   if (!fs.existsSync(filePath)) {
      return res.status(404).send('Nenhum livro cadastrado.');
   }

   let books = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
   if (books.length === 0) {
      return res.status(404).send('Nenhum livro cadastrado.');
   }

   const bookIndex = books.findIndex((book) => book.id === parseInt(id));
   if (bookIndex === -1) {
      return res.status(404).send(`Nenhum livro encontrado com o ID ${ id }.`);
   }
   books.splice(bookIndex, 1);
   fs.writeFileSync(filePath, `[\n ${ books.map(book => JSON.stringify(book)).join(',\n ') } \n]`);
   return res.status(200).send(`Livro com ID ${ id } deletado com sucesso!`);
}

module.exports = deleteBook;