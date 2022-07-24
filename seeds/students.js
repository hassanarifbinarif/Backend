/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('students').del()
  await knex('students').insert([
    {id: 1, first_name: 'Hassan', last_name: 'Arif'},
    {id: 2, first_name: 'Ahmad', last_name: 'Shah'},
    {id: 3, first_name: 'Jamshad', last_name: 'Arshad'}
  ]);
};
