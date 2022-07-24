var express = require('express');
var router = express.Router();

const knex = require('../db/knex');

/* GET home page. */
router.get('/', async function(req, res, next) {
    try {
        const books = await knex('books').select();
        return res.json(books).status(200);
    }

    catch {
        return res.status(400).json({message: 'Some error occured!'});
    }

});

router.get("/:id", async function (req, res, next) {
    const id = req.params.id;
    try {
      const book = await knex("books").select().where("id", id);
      return res.status(200).json(book);
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
});

router.post("/", async function (req, res, next) {
    const book_name = req.body.book_name;
    const author = req.body.author;
    const borrowed_by = req.body.borrowed_by;
    const date_of_borrow = req.body.date_of_borrow;
    const return_date = req.body.return_date;
  
    await knex("books")
          .insert({ book_name, author, borrowed_by, date_of_borrow, return_date })
          .then((id) => {
            knex("books").select({
              id: "id",
              book_name: "book_name",
              author: "author",
              borrowed_by: "borrowed_by",
              date_of_borrow: "date_of_borrow",
              return_date: "return_date"
            })
           return res.json({ success: true, message: "Book added!" });
          })
          .catch((err) => {
            console.log(err);
            return res.status(400).json({ success: false, message: "Cannot post new entry." });
          });
});
  
router.put('/:id', async function(req, res, next) {
    const id = req.params.id;
    const new_book_name = req.body.book_name;
    const new_author_name = req.body.author;
    const new_borrowed_by = req.body.borrowed_by;
    const new_date_of_borrow = req.body.date_of_borrow;
    const new_return_date = req.body.return_date;

    try {
      await knex("books")
            .select()
            .where("id", id)
            .update({
                book_name: new_book_name,
                author: new_author_name,
                borrowed_by: new_borrowed_by,
                date_of_borrow: new_date_of_borrow,
                return_date: new_return_date,
            })
      res.status(200).json({message: 'Successfully updated record!'});
    }
    catch(err) {
      return res.status(400).json({success: false, message: err.message});
    }
})
  
router.delete('/:id', async function(req, res, next) {
    const id = req.params.id;
    try {
      await knex('books')
            .where("id", id)
            .del()
      res.status(200).json({message: 'Record deleted successfully!'});
    }
    
    catch(err) {
      return res.status(400).json({success: false, message: err.message});
    }
  })

module.exports = router;
