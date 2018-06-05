const chai = require('chai');
const should = chai.should(); // eslint-disable-line
const chaiHttp = require('chai-http');
const { app, database } = require('../server');

chai.use(chaiHttp);

describe('Client Routes', () => {

  it('should return a 404 for a route that doesnt exist', (done) => {
    chai.request(app)
      .get('/sadpath')
      .then(response => {
        response.should.have.status(404);
        done()
      })
  })
});

describe('API Routes', () => {

  beforeEach( async () => {
    await database.migrate.rollback()
    await database.migrate.latest()
    await database.seed.run()
  })

  it('should GET all the staff', (done) => {
    chai.request(app)
      .get('/api/v1/staff')
      .end( (error, response) => {
        response.should.be.json;
        response.should.have.status(200);
        response.body[0].should.be.an('object');
        response.body[0].should.have.property('id', 1);
        response.body[0].should.have.property('name', 'TK');
        response.body[0].should.have.property('bartender', true);
        response.body[0].should.have.property('barback', false);
        response.body[0].should.have.property('bar_manager', true);
        response.body[0].should.have.property('ass_bar_manager', true);
        response.body[0].should.have.property('beer_bucket', false);
        done()
      })
  });

  it('should GET all the staff by a specific id', (done) => {
    chai.request(app)
      .get('/api/v1/staff/1')
      .end( (error, response) => {
        response.should.be.json;
        response.should.have.status(200);
        response.body[0].should.be.an('object');
        response.body[0].should.have.property('id', 1);
        response.body[0].should.have.property('name', 'TK');
        response.body[0].should.have.property('bartender', true);
        response.body[0].should.have.property('barback', false);
        response.body[0].should.have.property('bar_manager', true);
        response.body[0].should.have.property('ass_bar_manager', true);
        response.body[0].should.have.property('beer_bucket', false);
        done()
      })
  });

  it('should GET all the events', (done) => {
    chai.request(app)
      .get('/api/v1/events')
      .end( (error, response) => {
        response.should.be.json;
        response.should.have.status(200);
        response.body[0].should.be.an('object');
        response.body[0].should.have.property('id', 1);
        response.body[0].should.have.property('venue', 'Gothic');
        response.body[0].should.have.property('name', 'Sparklehorse');
        response.body[0].should.have.property('date', '05/16/18');
        response.body[0].should.have.property('time', '7:00 pm');
        response.body[0].should.have.property('bartenders', 4);
        response.body[0].should.have.property('barbacks', 1);
        response.body[0].should.have.property('bar_manager', true);
        response.body[0].should.have.property('ass_bar_manager', false);
        response.body[0].should.have.property('beer_bucket', false);
        done()
      })
  });

  it('should GET an event by id', (done) => {
    chai.request(app)
      .get('/api/v1/events/1')
      .end( (error, response) => {
        response.should.be.json;
        response.should.have.status(200);
        response.body[0].should.be.an('object');
        response.body[0].should.have.property('id', 1);
        response.body[0].should.have.property('venue', 'Gothic');
        response.body[0].should.have.property('name', 'Sparklehorse');
        response.body[0].should.have.property('date', '05/16/18');
        response.body[0].should.have.property('time', '7:00 pm');
        response.body[0].should.have.property('bartenders', 4);
        response.body[0].should.have.property('barbacks', 1);
        response.body[0].should.have.property('bar_manager', true);
        response.body[0].should.have.property('ass_bar_manager', false);
        response.body[0].should.have.property('beer_bucket', false);
        done()
      })
  });

  it('should get all the schedules', (done) => {
    chai.request(app)
      .get('/api/v1/schedule')
      .end((error, response) => {
        response.should.be.json;
        response.should.have.status(200);
        response.body[0].should.be.an('object');
        response.body[0].should.have.property('staff_id', 1);
        response.body[0].should.have.property('event_id', 1);
        response.body[0].should.have.property('id', 1);
        done()
      })
  })

  it('should POST a new event to the database', (done) => {
    const eventObj = {
      ass_bar_manager: true,
      bar_manager: true,
      barbacks: 2,
      bartenders: 8,
      beer_bucket: true,
      date: "05/12/18",
      name: "Billy Prince Billy",
      time: "6:00 pm",
      venue: "Ogden Theatre"
    }

    chai.request(app)
      .post('/api/v1/events')
      .send(eventObj)
      .end((error, response) => {
        response.should.be.json
        response.should.have.status(201)
        response.body.should.be.an('object')
        response.body.should.have.property('id', 4)
        response.body.should.have.property('name', 'Billy Prince Billy')
        response.body.should.have.property('venue', 'Ogden Theatre')
        response.body.should.have.property('date', '05/12/18')
        response.body.should.have.property('time', '6:00 pm')
        response.body.should.have.property('ass_bar_manager', true)
        response.body.should.have.property('bar_manager', true)
        response.body.should.have.property('barbacks', 2)
        response.body.should.have.property('bartenders', 8)
        response.body.should.have.property('beer_bucket', true)
        done()
      })
  })

  it('POST if req props are missing', (done) => {
    chai.request(app)
      .post('/api/v1/events')
      .send({ name: 'Billy Prince Billy' })
      .end((error, response) => {
        response.should.be.json
        response.should.have.status(422)
        response.body.should.equal('You are missing a venue property')
        done()
      })
  })


  it('should POST new staff to the database', (done) => {
    const staffObj = {
      ass_bar_manager: true,
      bar_manager: false,
      barback: false,
      bartender: true,
      beer_bucket: false,
      name: "Jared"
    }

    chai.request(app)
      .post('/api/v1/staff')
      .send(staffObj)
      .end((error, response) => {
        response.should.be.json
        response.should.have.status(201)
        response.body.should.be.an('object')
        response.body.should.have.property('id', 14)
        response.body.should.have.property('name', 'Jared')
        response.body.should.have.property('ass_bar_manager', true)
        response.body.should.have.property('bar_manager', false)
        response.body.should.have.property('barback', false)
        response.body.should.have.property('bartender', true)
        response.body.should.have.property('beer_bucket', false)
        done()
      })
  })

  it('POST staff error if req props are missing', (done) => {
    chai.request(app)
      .post('/api/v1/staff')
      .send({ name: 'Jared' })
      .end((error, response) => {
        response.should.be.json
        response.should.have.status(422)
        response.body.should.equal('You are missing a bartender property')
        done()
      })
  })

  it('should POST a new schedule to the database', (done) => {
    const staffEventObj = {
      event_id: 2,
      staff_id: 7,
      role: 'Bartender'
    }

    chai.request(app)
      .post('/api/v1/schedule')
      .send(staffEventObj)
      .end((error, response) => {
        response.should.be.json
        response.should.have.status(201)
        response.body.should.be.an('object')
        response.body.should.have.property('id', 7)
        response.body.should.have.property('event_id', 2)
        response.body.should.have.property('staff_id', 7)
        response.body.should.have.property('role', 'Bartender')
        done()
      })
  })

  it('POST schedule error if req props are missing', (done) => {
    chai.request(app)
      .post('/api/v1/schedule')
      .send({ event_id: 2 })
      .end((error, response) => {
        response.should.be.json
        response.should.have.status(422)
        response.body.should.equal('You are missing a staff_id property')
        done()
      })
  })

  it('should DELETE an event from the database', (done) => {
    chai.request(app)
      .del('/api/v1/events/3')
      .end((error, response) => {
        response.should.have.status(200)
        response.body.should.be.an('string')
        response.body.should.equal('Deleted event id: 3')
        done()
      })
  })

  it('should error message if !event when trying to DELETE', (done) => {
    chai.request(app)
      .del('/api/v1/events/1711')
      .end((error, response) => {
        response.should.have.status(404)
        response.body.should.be.an('string')
        response.body.should.equal('Delete failed, event not found')
        done()
      })
  })

  it('should DELETE staff from the database', (done) => {
    chai.request(app)
      .del('/api/v1/staff/13')
      .end((error, response) => {
        response.should.have.status(200)
        response.body.should.be.an('string')
        response.body.should.equal('Deleted staff id: 13')
        done()
      })
  })

  it('should delete a staff_id from the database', (done) => {
    chai.request(app)
      .del('/api/v1/schedule/3')
      .end((error, response) => {
        response.should.have.status(200)
        response.body.should.be.an('string')
        response.body.should.equal('Deleted staff_event id: 3')
        done()
      })
  })

  it('should error if !staff_id when trying to DELETE', (done) => {
    chai.request(app)
      .del('/api/v1/schedule/1711')
      .end((error, response) => {
        response.should.have.status(404)
        response.body.should.be.an('string')
        response.body.should.equal('Delete failed, staff_event id not found')
        done()
      })
  })

  it('should error if !staff when trying to DELETE', (done) => {
    chai.request(app)
      .del('/api/v1/staff/1711')
      .end((error, response) => {
        response.should.have.status(404)
        response.body.should.be.an('string')
        response.body.should.equal('Delete failed, staff not found')
        done()
      })
  })

});
