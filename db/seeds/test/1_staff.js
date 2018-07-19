
exports.seed = function(knex, Promise) {
  return knex('staff').del()
    .then(function () {
      return knex('staff').insert([
        {
          name: 'TK',
          bartender: true,
          barback: false,
          bar_manager: true,
          ass_bar_manager: true,
          beer_bucket: false,
          google_id: '1pLSNLEaSVT7hvRa5q4Vyy37IIN1',
        },
        {
          name: 'Jared',
          bartender: true,
          barback: false,
          bar_manager: true,
          ass_bar_manager: true,
          beer_bucket: false,
          google_id: '1pLSNLEaSVT7hvRa5q4Vyy37IIN2'

        },
        {
          name: 'Steven',
          bartender: true,
          barback: false,
          bar_manager: true,
          ass_bar_manager: false,
          beer_bucket: false,
          google_id: '2HYCRfboJ0SlHJj9RouApgmSoxL2'
        },
        {
          name: 'Chrissy',
          bartender:true,
          barback: false,
          bar_manager: true,
          ass_bar_manager: true,
          beer_bucket: false,
          google_id: '1pLSNLEaSVT7hvRa5q4Vyy37IIN4'
        },
        {
          name: 'Matt Alessio',
          bartender: true,
          barback: false,
          bar_manager: true,
          ass_bar_manager: true,
          beer_bucket: false,
          google_id: '1pLSNLEaSVT7hvRa5q4Vyy37IIN1',
        },
        {
          name: 'Jesse Tafoya',
          bartender: true,
          barback: false,
          bar_manager: false,
          ass_bar_manager: false,
          beer_bucket: false,
          google_id: '1pLSNLEaSVT7hvRa5q4Vyy37IIN3'

        },
        {
          name: 'Ross',
          bartender:false,
          barback: true,
          bar_manager: false,
          ass_bar_manager: false,
          beer_bucket: false,
          google_id: '1pLSNLEaSVT7hvRa5q4Vyy37IIN4'
        },
        {
          name: 'Mitch',
          bartender: true,
          barback: false,
          bar_manager: false,
          ass_bar_manager: false,
          beer_bucket: false,
          google_id: '1pLSNLEaSVT7hvRa5q4Vyy37IIN1',
        },
        {
          name: 'Angie',
          bartender: true,
          barback: false,
          bar_manager: true,
          ass_bar_manager: true,
          beer_bucket: false,
          google_id: '1pLSNLEaSVT7hvRa5q4Vyy37IIN3'

        },
        {
          name: 'David Thompson',
          bartender:true,
          barback: false,
          bar_manager: false,
          ass_bar_manager: false,
          beer_bucket: false,
          google_id: '1pLSNLEaSVT7hvRa5q4Vyy37IIN4'
        },
        {
          name: 'Kevin',
          bartender:true,
          barback: false,
          bar_manager: true,
          ass_bar_manager: true,
          beer_bucket: false,
          google_id: '1pLSNLEaSVT7hvRa5q4Vyy37IIN4'
        },
        {
          name: 'Dermot',
          bartender: true,
          barback: false,
          bar_manager: false,
          ass_bar_manager: false,
          beer_bucket: false,
          google_id: '1pLSNLEaSVT7hvRa5q4Vyy37IIN1',
        },
        {
          name: 'Mike "Cube" Sherrill',
          bartender: true,
          barback: false,
          bar_manager: false,
          ass_bar_manager: false,
          beer_bucket: false,
          google_id: '1pLSNLEaSVT7hvRa5q4Vyy37IIN3'

        },
        {
          name: 'Dave',
          bartender:false,
          barback: true,
          bar_manager: false,
          ass_bar_manager: false,
          beer_bucket: false,
          google_id: '1pLSNLEaSVT7hvRa5q4Vyy37IIN4'
        },
        {
          name: 'Christina',
          bartender: true,
          barback: false,
          bar_manager: false,
          ass_bar_manager: false,
          beer_bucket: false,
          google_id: '1pLSNLEaSVT7hvRa5q4Vyy37IIN1',
        },
        {
          name: 'Gina',
          bartender: true,
          barback: false,
          bar_manager: false,
          ass_bar_manager: true,
          beer_bucket: false,
          google_id: '1pLSNLEaSVT7hvRa5q4Vyy37IIN3'

        },
        {
          name: 'Mikey',
          bartender:false,
          barback: true,
          bar_manager: false,
          ass_bar_manager: false,
          beer_bucket: false,
          google_id: '1pLSNLEaSVT7hvRa5q4Vyy37IIN4'
        },
        {
          name: 'Marcus',
          bartender: true,
          barback: false,
          bar_manager: false,
          ass_bar_manager: false,
          beer_bucket: false,
          google_id: '1pLSNLEaSVT7hvRa5q4Vyy37IIN1',
        },
        {
          name: 'Sweets',
          bartender: true,
          barback: false,
          bar_manager: false,
          ass_bar_manager: false,
          beer_bucket: false,
          google_id: '1pLSNLEaSVT7hvRa5q4Vyy37IIN3'

        },
        {
          name: 'Andrew',
          bartender:false,
          barback: true,
          bar_manager: false,
          ass_bar_manager: false,
          beer_bucket: false,
          google_id: '1pLSNLEaSVT7hvRa5q4Vyy37IIN4'
        },
        {
          name: 'Ashlea-Ann',
          bartender: true,
          barback: false,
          bar_manager: false,
          ass_bar_manager: false,
          beer_bucket: false,
          google_id: '1pLSNLEaSVT7hvRa5q4Vyy37IIN1',
        },
        {
          name: 'Careen',
          bartender: true,
          barback: false,
          bar_manager: false,
          ass_bar_manager: false,
          beer_bucket: false,
          google_id: '1pLSNLEaSVT7hvRa5q4Vyy37IIN3'

        },
        {
          name: 'Nick',
          bartender:false,
          barback: true,
          bar_manager: false,
          ass_bar_manager: false,
          beer_bucket: false,
          google_id: '1pLSNLEaSVT7hvRa5q4Vyy37IIN4'
        },
        {
          name: 'Blair',
          bartender: true,
          barback: false,
          bar_manager: false,
          ass_bar_manager: false,
          beer_bucket: false,
          google_id: '1pLSNLEaSVT7hvRa5q4Vyy37IIN1',
        },
        {
          name: 'Heather',
          bartender: true,
          barback: false,
          bar_manager: true,
          ass_bar_manager: true,
          beer_bucket: false,
          google_id: '1pLSNLEaSVT7hvRa5q4Vyy37IIN3'

        },
        {
          name: 'Devon',
          bartender:false,
          barback: true,
          bar_manager: false,
          ass_bar_manager: false,
          beer_bucket: false,
          google_id: '1pLSNLEaSVT7hvRa5q4Vyy37IIN4'
        },
        {
          name: 'Mario',
          bartender: true,
          barback: false,
          bar_manager: false,
          ass_bar_manager: false,
          beer_bucket: false,
          google_id: '1pLSNLEaSVT7hvRa5q4Vyy37IIN1',
        },
        {
          name: 'Stacy',
          bartender: true,
          barback: false,
          bar_manager: true,
          ass_bar_manager: true,
          beer_bucket: false,
          google_id: '1pLSNLEaSVT7hvRa5q4Vyy37IIN3'

        },
        {
          name: 'Billy',
          bartender:true,
          barback: false,
          bar_manager: false,
          ass_bar_manager: false,
          beer_bucket: false,
          google_id: '1pLSNLEaSVT7hvRa5q4Vyy37IIN4'
        },
        ,
        {
          name: 'Frank',
          bartender: true,
          barback: false,
          bar_manager: false,
          ass_bar_manager: false,
          beer_bucket: false,
          google_id: '1pLSNLEaSVT7hvRa5q4Vyy37IIN1',
        },
        {
          name: 'Abbie',
          bartender: true,
          barback: false,
          bar_manager: false,
          ass_bar_manager: false,
          beer_bucket: false,
          google_id: '1pLSNLEaSVT7hvRa5q4Vyy37IIN3'

        },
        {
          name: 'Neil',
          bartender:true,
          barback: false,
          bar_manager: false,
          ass_bar_manager: false,
          beer_bucket: false,
          google_id: '1pLSNLEaSVT7hvRa5q4Vyy37IIN4'
        },
        {
          name: 'Bob',
          bartender: true,
          barback: false,
          bar_manager: false,
          ass_bar_manager: false,
          beer_bucket: false,
          google_id: '1pLSNLEaSVT7hvRa5q4Vyy37IIN1',
        },
        {
          name: 'Dewey',
          bartender: true,
          barback: false,
          bar_manager: true,
          ass_bar_manager: true,
          beer_bucket: false,
          google_id: '1pLSNLEaSVT7hvRa5q4Vyy37IIN3'

        }
      ]);
    });
};