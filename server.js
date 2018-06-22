const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.locals.title = 'Staff Gig Box';


app.get('/api/v1/staff', (request, response) => {
  database('staff').select()
    .then(staff => {
      response.status(200).json(staff);
    })
    .catch(error => {
      response.status(500).json({error});
    });
});

app.get('/api/v1/events', (request, response) => {
  database('events').select()
    .then(events => {
      response.status(200).json(events);
    })
    .catch(error => {
      response.status(500).json({error});
    });
});

app.get('/api/v1/events/:id', (request, response) => {
  database('events').where('id', request.params.id).select()
    .then(event => {
      if (event.length) {
        response.status(200).json(event);
      } else {
        response.status(404).json('No matches found');
      }
    })
    .catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/staff/:id', (request, response) => {
  database('staff').where('id', request.params.id).select()
    .then(staff => {
      if (staff.length) {
        response.status(200).json(staff);
      } else {
        response.status(404).json('No matches found');
      }
    })
    .catch(error => response.status(500).json({ error }));
});


app.get('/api/v1/schedule', (request, response) => {
  const { event_id } = request.query;

  if ( event_id ) {
    database('staff_events').where('event_id', event_id).select()
      .then(schedule => {
        if (schedule.length) {
          return response.status(200).json(schedule);
        } else {
          return response.status(404).json('No matches found');
        }
      })
      .catch(error => response.status(500)
        .json('Internal server error ' + error));

  } else {
    database('staff_events').select()
      .then(schedule => response.status(200).json(schedule))
      .catch(error => response.status(500).json({ error }));
  }

});

app.post('/api/v1/staff', (request, response) => {
  const staff = request.body;
  const keys = [
    'name',
    'bartender',
    'barback',
    'bar_manager',
    'ass_bar_manager',
    'beer_bucket'
  ];

  for (let requiredParameter of keys) {
    if (staff[requiredParameter] === undefined) {
      response.status(422)
      .json(`You are missing a ${requiredParameter} property`);
    }
  }

  database('staff').insert(staff, [...keys, 'id'])
    .then(staff => {
      response.status(201).json(staff[0]);
    })
    .catch(error => {
      response.status(500).json({error});
    });
});

app.post('/api/v1/events', (request, response) => {
  const events = request.body;
  const keys = [
    'name',
    'venue',
    'date',
    'time',
    'bartenders',
    'barbacks',
    'bar_manager',
    'ass_bar_manager',
    'beer_bucket'
  ];

  for (let requiredParameter of keys) {
    if (events[requiredParameter] === undefined) {
      response.status(422)
      .json(`You are missing a ${requiredParameter} property`);
    }
  }

  database('events').insert(events, [...keys, 'id'])
    .then(events => {
      response.status(201).json(events[0]);
    })
    .catch(error => {
      response.status(500).json({error});
    });
});

app.delete('/api/v1/staff/:id', (request, response) => {
  database('staff').where('id', request.params.id).del()
    .then(staff => {
      if (staff) {
        response.status(200).json(`Deleted staff id: ${request.params.id}`);
      } else {
        response.status(404).json(`Delete failed, staff not found`);
      }
    })
    .catch(error => {
      response.status(500).json({error});
    });
});

app.delete('/api/v1/events/:id', (request, response) => {
  database('events').where('id', request.params.id).del()
    .then(events => {
      if (events) {
        response.status(200).json(`Deleted event id: ${request.params.id}`);
      } else {
        response.status(404).json(`Delete failed, event not found`);
      }
    })
    .catch(error => {
      response.status(500).json({error});
    });
});

app.delete('/api/v1/schedule/:id', (request, response) => {
  database('staff_events').where('id', request.params.id).del()
    .then(staff_event => {
      if (staff_event) {
        response.status(200)
        .json(`Deleted staff_event id: ${request.params.id}`);
      } else {
        response.status(404).json('Delete failed, staff_event id not found');
      }
    });
});

app.post('/api/v1/schedule', (request, response) => {
  const schedule = request.body;
  const keys = ['event_id', 'staff_id', 'role'];

  for (let requiredParameter of keys) {
    if (schedule[requiredParameter] === undefined) {
      response.status(422)
      .json(`You are missing a ${ requiredParameter } property`);
    }
  }

  database('staff_events').insert(schedule, [...keys, 'id'])
    .then(schedule => response.status(201).json(schedule[0]))
    .catch(error => response.status(500).json({ error }))
});

app.put('/api/v1/schedule/:id', (request, response) => {
  const schedule = request.body;
  const keys = ['event_id', 'staff_id'];

  for (let requiredParameter of keys) {
    if (schedule[requiredParameter] === undefined) {
      response.status(422)
      .json(`You are missing a ${ requiredParameter } property`);
    }
  }

  database('staff_events').where('id', request.params.id)
    .update(schedule)
    .returning('*')
    .then(schedule => {
      if (!schedule.length) {
        return response.status(404).json('ID does not exist');
      } else {
        return response.status(201).json(schedule[0]);
      }
    })
    .catch(error => {
      response.status(500).json('Internal server error' + error);
    });
});

app.get('/api/v1/availability', (request, response) => {
  const { staff_id, date_unavailable } = request.query

  if ( staff_id && !date_unavailable ) {
    database('availability').where({ staff_id }).select()
      .then(availability => {
        if ( availability.length ) {
          return response.status(200).json(availability)
        } else {
          return response.status(404).json(false)
        }
      })
      .catch(error => response.status(500).json({ error }))
  } else if ( staff_id && date_unavailable ) {
    database('availability').where({ staff_id, date_unavailable }).select()
      .then(availability => {
        if ( availability.length ) {
          return response.status(200).json(availability)
        } else {
          return response.status(404).json(false)
        }
      })
      .catch(error => response.status(500).json({ error }))
  } else {
    database('availability').select()
      .then(availability => response.status(200).json(availability))
      .catch(error => response.status(500).json('Internal server error'))   
  }
})



app.post('/api/v1/availability', (request, response) => {
  const availability = request.body;
  const keys = ['staff_id', 'date_unavailable'];

  for (let requiredParameter of keys) {
    if (availability[requiredParameter] === undefined) {
      response.status(422)
      .json(`You are missing a ${requiredParameter} property`);
    }
  }

  database('availability').insert(availability, [...keys, 'id'])
    .then(availability => response.status(201).json(availability[0]))
    .catch(error => response.status(500).json({ error }))
})

app.delete('/api/v1/availability', (request, response) => {
  const { staff_id, date_unavailable } = request.query

  database('availability').where({ staff_id, date_unavailable }).del()
    .then(date => {
      if (date) {
        response.status(200).json(true)
      } else {
        response.status(404).json(false)
      }})
    .catch(error => response.status(500).json('Internal server error'))
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on port ${app.get('port')}`); // eslint-disable-line
});

module.exports = { app, database };
