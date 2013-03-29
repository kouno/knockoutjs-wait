describe('KnockoutJS-Wait', function() {
  var container;

  beforeEach(function() {
    container = $('<div class="container" data-bind="text: count()"> </div>');
    container.appendTo('body');

    ko.applyBindings(SlowRunnerViewModel);
  });

  afterEach(function() {
    container.remove();
  });

  describe('Configuration', function () {
    it('has no content by default', function() {
      expect(container.html()).toBe("0");
    });

    it('has a value that mirrors our number of items', function() {
      SlowRunnerViewModel.count(5);

      expect(container.html()).toBe('5');
    })
  });

  describe('Listening Process', function() {
    it('defines a listener', function() {
      expect(ko.bindingsApplied()).toBeTruthy();
    });
  })
});
