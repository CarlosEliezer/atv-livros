const { readData, writeData } = require("./dataManager");

function postBook(req, res) {
   if(!validateBook(req)) {
      return res.status(400).send('Dados do livro incompletos.');
   }

   if(!validateYear(req.body.year)) {
      return res.status(400).send('Ano do livro inválido.');
   }

   const newBook = {
      id: Date.now(),
      title: req.body.title,
      author: req.body.author,
      year: req.body.year,
      genre: req.body.genre
   }

   const books = readData();
   console.log(books);

   if (!books) {
      writeData([newBook]);
      return res.status(201).send('Livro salvo com sucesso!');
   } 

   books.push(newBook);
   writeData(books);
   return res.status(201).send('Livro salvo com sucesso!');
}

function validateBook(req) {
   // Valida se o corpo da requisição contém todas as propriedades necessárias
   if(!req.body || !req.body.title || !req.body.author || !req.body.year || !req.body.genre) {
      return false;
   }

   return true;
}

function validateYear(year) {
   year = parseInt(year);
   const currentYear = new Date().getFullYear();

   if(isNaN(year) || year < 0 || year > currentYear) {
      return false;
   }
   
   return true;
}

module.exports = postBook;