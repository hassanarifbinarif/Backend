/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('students', table => {
        table.increments('id');
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();

    })
    .createTable('books', table => {
        table.increments('id');
        table.string('book_name').notNullable();
        table.string('author').notNullable();
        table.string('borrowed_by');
        table.timestamp('date_of_borrow');
        table.timestamp('return_date');
    })
 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('students').dropTableIfExists('books'); 
};
