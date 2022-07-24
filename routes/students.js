var express = require("express");
var router = express.Router();

const knex = require("../db/knex");

router.get("/", async function (req, res, next) {
  try {
    const students = await knex("students").select();
    return res.json(students).status(200);
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
});

router.get("/:id", async function (req, res, next) {
  const id = req.params.id;
  try {
    const student = await knex("students").select().where("id", id);
    return res.status(200).json(student);
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
});

router.post("/", async function (req, res, next) {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;

  await knex("students")
        .insert({ first_name, last_name })
        .then((id) => {
          knex("students").select({
            id: "id",
            first_name: "first_name",
            last_name: "last_name",
          })
         return res.json({ success: true, message: "Student added!" });
        })
        .catch((err) => {
          console.log(err);
          return res.status(400).json({ success: false, message: "Cannot post new entry." });
        });
});

router.put('/:id', async function(req, res, next) {
  const id = req.params.id;
  const new_first_name = req.body.first_name;
  const new_last_name = req.body.last_name;
  try {
    await knex("students")
          .select()
          .where("id", id)
          .update({
            first_name: new_first_name,
            last_name: new_last_name
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
    await knex('students')
          .where("id", id)
          .del()
    res.status(200).json({message: 'Record deleted successfully!'});
  }
  
  catch(err) {
    return res.status(400).json({success: false, message: err.message});
  }
})

module.exports = router;
