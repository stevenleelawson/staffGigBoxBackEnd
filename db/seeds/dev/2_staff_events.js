
exports.seed = function(knex, Promise) {
  return knex('staff_events').del()
    .then(function () {
      return knex('staff_events').insert([
        {
          event_id: 1,
          staff_id: 4
        },
        {
          event_id: 1,
          staff_id: 5
        },
        {
          event_id: 1,
          staff_id: 6
        },
        {
          event_id: 2,
          staff_id: 4
        }
      ]);
    });
};
