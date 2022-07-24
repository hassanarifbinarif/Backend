/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('books').del()
  await knex('books').insert([
    {id: 1, book_name: 'Mathematics', author: 'Arif', borrowed_by: '',},
    {id: 2, book_name: 'Mathematics', author: 'Shah', borrowed_by: 'Arif',},
    {id: 3, book_name: 'Mathematics', author: 'Arshad', borrowed_by: '',}
  ]);
};
