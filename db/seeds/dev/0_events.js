
exports.seed = function(knex, Promise) {
  return knex('events').del()
    .then(function () {
      return knex('events').insert([
        {
          venue: 'Gothic',
          name: 'Sparklehorse',
          date: 'Jul 4, 2018',
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
          date: 'Jul 20, 2018',
          time: '8:00 pm',
          bartenders: 3,
          barbacks: 1,
          bar_manager: true,
          ass_bar_manager: false,
          beer_bucket: false
        },
        {
          venue: 'Ogden',
          name: 'Billy Prince Billy',
          date: 'Jul 20, 2018',
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
