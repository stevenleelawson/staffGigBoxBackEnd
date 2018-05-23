const express = require('express');
const app = express();

var bodyParser = require('body-parser')

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());

app.locals.title = 'Staff Gig Box';

app.get('/', (request, response) => {

});

app.get('/api/v1/staff', (request, response) => {
  database('staff').select()
    .then(staff => {
      response.status(200).json(staff)
    })
    .catch(error => {
      response.status(500).json()
    })
})

app.get('/api/v1/events', (request, response) => {
  database('events').select()
    .then(events => {
      response.status(200).json(events)
    })
    .catch(error => {
      response.status(500).json()
    })
})

app.post('/api/v1/staff', (request, response) => {
  const staff = request.body;
  const keys = ['name', 'bartender', 'barback', 'bar_manager', 'ass_bar_manager', 'beer_bucket']
  for (let requiredParameter of keys) {
    console.log(staff[requiredParameter])
    if (staff[requiredParameter] === undefined) {
      return response
        .status(422)
        .send({
          error: `You are missing a ${requiredParameter} property`
        })
    }
  }

  database('staff').insert(staff, keys)
    .then(staff => {
      response.status(201).json(staff[0])
    })
    .catch(error => {
      response.status(500).json()
    })
})

app.post('/api/v1/events', (request, response) => {
  const events = request.body;
  const keys = ['name', 'venue', 'date', 'time', 'bartenders', 'barbacks', 'bar_manager', 'ass_bar_manager', 'beer_bucket']
  for (let requiredParameter of keys) {
    console.log(events[requiredParameter])
    if (events[requiredParameter] === undefined) {
      return response
        .status(422)
        .send({
          error: `You are missing a ${requiredParameter} property`
        })
    }
  }

  database('events').insert(events, keys)
    .then(events => {
      response.status(201).json(events[0])
    })
    .catch(error => {
      response.status(500).json()
    })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on port ${app.get('port')}`)
})

module.exports = app;
