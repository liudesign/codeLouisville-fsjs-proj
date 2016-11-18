'use strict';

var app = require('../..');
import request from 'supertest';

var newRace;

describe('Race API:', function() {
  describe('GET /api/races', function() {
    var races;

    beforeEach(function(done) {
      request(app)
        .get('/api/races')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          races = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(races).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/races', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/races')
        .send({
          name: 'New Race',
          info: 'This is the brand new race!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newRace = res.body;
          done();
        });
    });

    it('should respond with the newly created race', function() {
      expect(newRace.name).to.equal('New Race');
      expect(newRace.info).to.equal('This is the brand new race!!!');
    });
  });

  describe('GET /api/races/:id', function() {
    var race;

    beforeEach(function(done) {
      request(app)
        .get(`/api/races/${newRace._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          race = res.body;
          done();
        });
    });

    afterEach(function() {
      race = {};
    });

    it('should respond with the requested race', function() {
      expect(race.name).to.equal('New Race');
      expect(race.info).to.equal('This is the brand new race!!!');
    });
  });

  describe('PUT /api/races/:id', function() {
    var updatedRace;

    beforeEach(function(done) {
      request(app)
        .put(`/api/races/${newRace._id}`)
        .send({
          name: 'Updated Race',
          info: 'This is the updated race!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedRace = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRace = {};
    });

    it('should respond with the original race', function() {
      expect(updatedRace.name).to.equal('New Race');
      expect(updatedRace.info).to.equal('This is the brand new race!!!');
    });

    it('should respond with the updated race on a subsequent GET', function(done) {
      request(app)
        .get(`/api/races/${newRace._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let race = res.body;

          expect(race.name).to.equal('Updated Race');
          expect(race.info).to.equal('This is the updated race!!!');

          done();
        });
    });
  });

  describe('PATCH /api/races/:id', function() {
    var patchedRace;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/races/${newRace._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Race' },
          { op: 'replace', path: '/info', value: 'This is the patched race!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedRace = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedRace = {};
    });

    it('should respond with the patched race', function() {
      expect(patchedRace.name).to.equal('Patched Race');
      expect(patchedRace.info).to.equal('This is the patched race!!!');
    });
  });

  describe('DELETE /api/races/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/races/${newRace._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when race does not exist', function(done) {
      request(app)
        .delete(`/api/races/${newRace._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
