const { readData }= require("./dataManager");

function listBooks(req, res) {
   const { page, limit } = req.query;
   
   if((!page || isNaN(parseInt(page))) || (!limit || isNaN(parseInt(limit)))) {
      return res.status(400).send('Parâmetros inválidos. Página e limite devem ser números.');
   }

   const books = readData();

   if (!books || books.length === 0) {
      return res.status(404).send('Nenhum livro cadastrado.');
   }

   const startIndex = (parseInt(page) - 1) * parseInt(limit);
   const endIndex = startIndex + parseInt(limit);

   if (startIndex >= books.length) {
      return res.status(400).send('Número de página muito alto.');
   }

   const paginatedBooks = books.slice(startIndex, endIndex);

   return res
      .status(200)
      .send(paginatedBooks.map(book => `
         ID: ${ book.id }
         Título: ${ book.title }
         Autor: ${ book.author }
         Ano: ${ book.year }
         Gênero: ${ book.genre } 
      `).join('\n'));
}

module.exports = listBooks;