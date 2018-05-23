
exports.seed = function(knex, Promise) {
  return knex('staff_events').del()
    .then(function () {
      return knex('staff_events').insert([
        {
          event_id: 1,
          staff_id: 1
        },
        {
          event_id: 1,
          staff_id: 2
        },
        {
          event_id: 1,
          staff_id: 3
        },
        {
          event_id: 2,
          staff_id: 1
        }
      ]);
    });
};
