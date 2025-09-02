const { readData } = require("./dataManager");

function searchBookBy(req, res) {
   const { by, searchTerm } = req.query;

   if(!by || by.trim() === '') {
      return res.status(400).send('Parâmetro de busca não fornecido.');
   }

   const validSearches = ['title', 'author', 'year', 'genre'];

   if(!validSearches.includes(by)) {
      return res.status(400).send('Parâmetro de busca inválido. Use title, author, year ou genre.');
   }

   const books = readData();
   if (!books || books.length === 0) {
      return res.status(404).send('Nenhum livro cadastrado.');
   }

   const matchedBooks = books.filter((book) => 
      book[by] && book[by].toString().toLowerCase().includes(searchTerm.toLowerCase())
   );

   if(matchedBooks.length === 0) {
      return res.status(404).send('Nenhum livro encontrado com o critério de busca fornecido.');
   }

   return res
      .status(200)
      .send(matchedBooks.map((book) => `
         ID: ${ book.id }
         Título: ${ book.title }
         Autor: ${ book.author }
         Ano: ${ book.year }
         Gênero: ${ book.genre } 
      `).join('\n'));
}

module.exports = searchBookBy;