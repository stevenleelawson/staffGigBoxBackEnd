
exports.up = function(knex, Promise) {
	return Promise.all([
	  knex.schema.createTable('availability', (table) => {
	  	table.increments('id').primary()
	  	table.integer('staff_id').references('staff.id')
	  	table.string('date_unavailable')

	  	table.timestamps(true, true)
	  })
	])
};

exports.down = function(knex, Promise) {
  return Promise.all([
  	knex.schema.dropTable('availability')
  ])
};
