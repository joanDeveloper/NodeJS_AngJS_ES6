var mongoose = require('mongoose');
var Category = mongoose.model('Category');
var h = undefined;
//Category.find().then(function(category){
    //console.log("cat",category);
    const promisify = query => new Promise((resolve, reject) => {
        query.exec((err, data) => {
          if (err) reject(err);
          else resolve(data);
        });
      });
    const books = [{
        title: "Harry Potter and the Sorcerer's stone",
        author: 'J.K. Rowling',
        protas:"10"
      },
      {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
        protas:"10"
      },
      {
        title: 'peli3',
        author: 'autor 3',
        protas:"10"
      }, 
      {
        title: 'peli4',
        author: 'autor 4',
        protas:"10"
      }
      
      ];
      /*Category.find().then(function(category){
        //module.exports =category;
        console.log("dasd",books);
        h = books;
        //h.push(books);
      }).catch();*/
      //module.exports = Category.find();
      //module.exports = Category.find().then(function(category){}).catch();
      //module.exports = books;
      module.exports = promisify(Category.find({}));
      //module.exports = books;
//}).catch();