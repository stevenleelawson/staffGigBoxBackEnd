exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('staff', (table) => {
      table.increments('id').primary();
      table.string('google_id')
      table.string('name');
      table.boolean('bartender');
      table.boolean('barback');
      table.boolean('bar_manager');
      table.boolean('ass_bar_manager');
      table.boolean('beer_bucket');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('events', (table) => {
      table.increments('id').primary();
      table.string('venue');
      table.string('name');
      table.string('date');
      table.string('time');
      table.integer('bartenders');
      table.integer('barbacks');
      table.boolean('bar_manager');
      table.boolean('ass_bar_manager');
      table.boolean('beer_bucket');

      table.timestamps(true, true)
    }),

    knex.schema.createTable('staff_events', (table) => {
      table.increments('id').primary();
      table.integer('event_id').references('events.id');
      table.integer('staff_id').references('staff.id');
      table.string('role');

      table.timestamps(true, true)
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('staff_events'),
    knex.schema.dropTable('staff'),
    knex.schema.dropTable('events')
  ])
};
