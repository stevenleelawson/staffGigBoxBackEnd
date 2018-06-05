exports.seed = function(knex, Promise) {
  return knex('staff_events').del()
    .then(function () {
      return knex('staff_events').insert([
        {
          event_id: 1,
          staff_id: 1,
          role: 'Bar Manager'
        },
        {
          event_id: 1,
          staff_id: 2,
          role: 'Bartender'
        },
        {
          event_id: 1,
          staff_id: 3,
          role: 'Barback'
        },
        {
          event_id: 2,
          staff_id: 3,
          role: 'Bar Manager'
        },
        {
          event_id: 2,
          staff_id: 4,
          role: 'Bartender'
        },
        {
          event_id: 2,
          staff_id: 5,
          role: 'Barback'
        }
      ]);
    });
};
