const fs = require('fs');
const path = require('path');

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

   const filePath = path.join(__dirname, '..', '/book/data.json');

   if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, `[\n ${ JSON.stringify(newBook) } \n]`);
      return res.status(201).send('Livro salvo com sucesso!');
   } 

   let books = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
   books.push(newBook);
   fs.writeFileSync(filePath, `[\n ${ books.map(book => JSON.stringify(book)).join(',\n ') } \n]`);
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