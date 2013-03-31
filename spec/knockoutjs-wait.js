describe('KnockoutJS-Wait', function() {
  var container, slow_runner;

  beforeEach(function() {
    container      = $('<div class="container" data-bind="text: count()"> </div>');
    slow_container = $('<div class="slow-container" data-bind="text: slow_count()"> </div>');

    container.appendTo('body');
    slow_container.appendTo('body');

    slow_runner = new SlowRunnerViewModel();

    ko.applyBindings(slow_runner);
  });

  afterEach(function() {
    container.remove();
    slow_container.remove();
  });

  describe('Configuration', function() {
    it('has no content by default', function() {
      expect(container.html()).toBe('0');
    });

    it('has a value that mirrors our number of items', function() {
      slow_runner.count(5);
      expect(container.html()).toBe('5');
      expect(slow_container.html()).toBe('5');
    });

    it('has a synchronisation problem when modifying HTML', function() {
      container.html('5');
      expect(container.html()).toBe('5');
      expect(slow_container.html()).toBe('0');
    });
  });

  describe('Listening Process', function() {
    it('defines a listener', function() {
      expect(ko.bindingsApplied()).toBeTruthy();
    });

    it('tells when bindings are still executing', function() {
      container.html('5');
      expect(slow_container.html()).toBe('0');
      expect(ko.bindingsApplied()).toBeFalsy();
    });
  });
});
