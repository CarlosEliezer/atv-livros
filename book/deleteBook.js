const { readData, writeData } = require("./dataManager");

function deleteBook(req, res) {
   const { id } = req.params;
   if (!id || id.trim() === '') {
      return res.status(400).send('Nenhum ID de livro fornecido.');
   }

   const books = readData();
   if (!books || books.length === 0) {
      return res.status(404).send('Nenhum livro cadastrado.');
   }

   const bookIndex = books.findIndex((book) => book.id === parseInt(id));
   if (bookIndex === -1) {
      return res.status(404).send(`Nenhum livro encontrado com o ID ${ id }.`);
   }

   books.splice(bookIndex, 1);
   writeData(books);
   return res.status(200).send(`Livro com ID ${ id } deletado com sucesso!`);
}

module.exports = deleteBook;