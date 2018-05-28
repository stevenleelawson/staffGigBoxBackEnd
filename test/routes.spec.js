const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const { app, database } = require('../server');

chai.use(chaiHttp);

describe('Client Routes', () => {
  // it('should return the homepage', (done) => {
  //   chai.request(app)
  //     .get('/')
  //     .then(response => {
  //       response.should.have.status(200);
  //       response.should.be.html;
  //       done()
  //     })
  // });

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

  it('POST event should return an error if required properties are missing', (done) => {
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

  it('POST staff should return an error if required properties are missing', (done) => {
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


}); 