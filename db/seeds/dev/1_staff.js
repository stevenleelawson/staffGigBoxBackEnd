
exports.seed = function(knex, Promise) {
  return knex('staff').del()
    .then(function () {
      return knex('staff').insert([
        {
          name: 'Jim Jarmandy',
          bartender: true,
          barback: false,
          bar_manager: false,
          ass_bar_manager: true,
          beer_bucket: false
        },
        {
          name: 'Dathrl Cheesehad',
          bartender: true,
          barback: false,
          bar_manager: true,
          ass_bar_manager: true,
          beer_bucket: false
        },
        {
          name: 'Malachai Dumbfoot',
          bartender:false,
          barback: true,
          bar_manager: false,
          ass_bar_manager: false,
          beer_bucket: false
        }
      ]);
    });
};
