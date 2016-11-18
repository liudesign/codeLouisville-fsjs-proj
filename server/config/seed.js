/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Race from '../api/race/race.model';
import User from '../api/user/user.model';

Race.find({}).remove()
  .then(() => {
    Race.create(
    {
        horsename: 'DevTooling',
        jockey: 'Jackey Speedy',
        trainer: 'Ken Steiner'
    }, {
        horsename: 'Node a Fool',
        jockey: 'Dave Juan',
        trainer: 'Saul Bright'
    }, {
        horsename: 'KenGoWild',
        jockey: 'Mikey Specter',
        trainer: 'Ken Winsome'
    }, {
        horsename: 'Betcha Can',
        jockey: 'Smoke Himsam',
        trainer: 'Joe Spike'
    }, {
        horsename: 'Winner takes all',
        jockey: 'Sam Junket',
        trainer: 'Pete Manny'
    }, {
        horsename: 'There be my winner',
        jockey: 'Colin Bigly',
        trainer: 'Herald Dee'
    });
  });

User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
