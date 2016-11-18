'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var raceCtrlStub = {
  index: 'raceCtrl.index',
  show: 'raceCtrl.show',
  create: 'raceCtrl.create',
  upsert: 'raceCtrl.upsert',
  patch: 'raceCtrl.patch',
  destroy: 'raceCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var raceIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './race.controller': raceCtrlStub
});

describe('Race API Router:', function() {
  it('should return an express router instance', function() {
    expect(raceIndex).to.equal(routerStub);
  });

  describe('GET /api/races', function() {
    it('should route to race.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'raceCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/races/:id', function() {
    it('should route to race.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'raceCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/races', function() {
    it('should route to race.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'raceCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/races/:id', function() {
    it('should route to race.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'raceCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/races/:id', function() {
    it('should route to race.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'raceCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/races/:id', function() {
    it('should route to race.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'raceCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
