'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('races', {
      url: '/races',
      template: '<races></races>'
    });
}
