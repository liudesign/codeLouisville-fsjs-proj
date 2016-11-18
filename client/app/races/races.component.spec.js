'use strict';

describe('Component: RacesComponent', function() {
  // load the controller's module
  beforeEach(module('races'));

  var RacesComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    RacesComponent = $componentController('races', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
