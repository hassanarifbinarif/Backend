// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'postgresql',
    connection: {          // local database server.
      database: 'todos',
      user:     'postgres',
      password: 'nicetry'
    },
  }

};