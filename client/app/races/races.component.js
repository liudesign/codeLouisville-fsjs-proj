'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './races.routes';

export class RacesComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
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
