const express = require('express');
const app = express();

var bodyParser = require('body-parser')

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.locals.title = 'Staff Gig Box';

app.get('/', (request, response) => {

});

app.get('/api/v1/staff', (request, response) => {
  database('staff').select()
    .then(staff => {
      response.status(200).json(staff)
    })
    .catch(error => {
      response.status(500).json({error})
    })
})

app.get('/api/v1/events', (request, response) => {
  database('events').select()
    .then(events => {
      response.status(200).json(events)
    })
    .catch(error => {
      response.status(500).json({error})
    })
})

app.get('/api/v1/events/:id', (request, response) => {
  database('events').where('id', request.params.id).select()
    .then(event => {
      if (event.length) {
        response.status(200).json(event) 
      } else {
        response.status(404).json('No matches found')
      }
    })
    .catch(error => response.status(500).json({ error }))
})

app.get('/api/v1/staff/:id', (request, response) => {
  database('staff').where('id', request.params.id).select()
    .then(staff => {
      if (staff.length) {
        response.status(200).json(staff)
      } else {
        response.status(404).json('No matches found')
      }
    })
    .catch(error => response.status(500).json({ error }))
})


app.get('/api/v1/schedule', (request, response) => {
  database('staff_events').select()
    .then(schedule => response.status(200).json(schedule))
    .catch(error => response.status(500).json({ error }))
})

app.post('/api/v1/staff', (request, response) => {
  const staff = request.body;
  const keys = ['name', 'bartender', 'barback', 'bar_manager', 'ass_bar_manager', 'beer_bucket']
  for (let requiredParameter of keys) {
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

app.delete('/api/v1/staff/:id', (request, response) => {
  database('staff').where('id', request.params.id).del()
    .then(staff => {
      if (staff) {
        response.status(200).json(`Deleted ${request.params.id}`)
      } else {
        response.status(404).json(`Delete failed, Id not found`)
      }
    })
    .catch(error => {
      response.status(500).json({error})
    })
})

app.delete('/api/v1/events/:id', (request, response) => {
  database('events').where('id', request.params.id).del()
    .then(events => {
      if (events) {
        response.status(200).json(`Deleted ${request.params.id}`)
      } else {
        response.status(404).json(`Delete failed, Id not found`)
      }
    })
    .catch(error => {
      response.status(500).json({error})
    })
})

app.post('/api/v1/schedule', (request, response) => {

  const schedule = request.body;
  const keys = ['event_id', 'staff_id']
  for (let requiredParameter of keys) {
    if (schedule[requiredParameter] === undefined) {
      return response
        .status(422)
        .send({
          error: `You are missing a ${requiredParameter} property`
        })
    }
  }

  database('staff_events').insert(schedule, keys)
    .then(schedule => {
      response.status(201).json(schedule[0])
    })
    .catch(error => {
      response.status(500).json()
    })
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on port ${app.get('port')}`)
})

module.exports = app;
