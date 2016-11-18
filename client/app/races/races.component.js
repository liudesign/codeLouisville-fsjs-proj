'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './races.routes';

export class RacesComponent {
  Races = [];
  newRace = '';
  /*@ngInject*/
  constructor() {
      this.$http = $http;
      this.socket = socket;

      $scope.$on('$destroy', function () {
          socket.unsyncUpdates('race');
      });
  }

    $onInit() {
        this.$http.get('/api/races')
            .then(response => {
                this.Races = response.data;
                this.socket.syncUpdates('race', this.Races);
            });
    }

    addThing() {
        if (this.newRace) {
            this.$http.post('/api/races', {
                name: this.newRace
            });
            this.newRace = '';
        }
    deleteThing(race)
    {
        this.$http.delete(`/api/races/${race._id}`);
    }
    }

}

export default angular.module('races', [uiRouter])
  .config(routes)
  .component('races', {
    template: require('./races.html'),
    controller: RacesComponent,
    controllerAs: 'racesCtrl'
  })
  .name;
