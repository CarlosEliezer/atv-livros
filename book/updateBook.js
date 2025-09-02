const { readData, writeData } = require("./dataManager");

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

   const books = readData();
   if (!books || books.length === 0) {
      return res.status(404).send('Nenhum livro cadastrado.');
   }

   const bookIndex = books.findIndex((book) => book.id === parseInt(id));
   if(bookIndex === -1) {
      return res.status(404).send('Livro não encontrado.');
   }

   books[bookIndex][target] = req.body[target];
   writeData(books);
   return res.status(200).send('Livro atualizado com sucesso!');
}

module.exports = updateBook;