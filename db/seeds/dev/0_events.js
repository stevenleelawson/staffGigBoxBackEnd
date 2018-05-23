
exports.seed = function(knex, Promise) {
  return knex('events').del()
    .then(function () {
      return knex('events').insert([
        {
          venue: 'Gothic',
          name: 'Sparklehorse',
          date: '05/16/18',
          time: '7:00 pm',
          bartenders: 4,
          barbacks: 1,
          bar_manager: true,
          ass_bar_manager: false,
          beer_bucket: false
        },
        {
          venue: 'Bluebird',
          name: 'Slim Cessna',
          date: '05/02/18',
          time: '8:00 pm',
          bartenders: 4,
          barbacks: 1,
          bar_manager: true,
          ass_bar_manager: false,
          beer_bucket: false
        },
        {
          venue: 'Ogden',
          name: 'Billy Prince Billy',
          date: '05/12/18',
          time: '6:00 pm',
          bartenders: 8,
          barbacks: 2,
          bar_manager: true,
          ass_bar_manager: true,
          beer_bucket: true
        }
      ]);
    });
};
