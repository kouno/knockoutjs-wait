describe('KnockoutJS-Wait', function() {
  beforeEach(function() {
    container      = $('<div style="display: none" class="container" data-bind="text: count"> </div>');
    slow_container = $('<div style="display: none" class="slow-container" data-bind="text: slow_count"> </div>');
    count_setter   = $('<input style="display: none" class="count-setter" data-bind="value: count" value="" />');

    container.appendTo('body');
    slow_container.appendTo('body');
    count_setter.appendTo('body');

    slow_runner = new SlowRunnerViewModel();

    ko.applyBindings(slow_runner);
  });

  afterEach(function() {
    container.remove();
    slow_container.remove();
    count_setter.remove();
  });

  describe('Configuration', function() {
    it('has no content by default', function() {
      expect(container.html()).toBe('0');
    });

    it('has a value that mirrors our number of items', function() {
      slow_runner.count(5);
      expect(container.html()).toBe('5');
      expect(slow_container.html()).toBe('0');
    });

    it('processes slow_count after 50ms', function() {
      runs(function() {
        slow_runner.count(5);

        expect(slow_runner.slow_count()).toBe(0);
      });

      waits(50);

      runs(function() {
        expect(slow_runner.slow_count()).toBe(5);
      });
    });

    it('has a setter input for the count', function() {
      runs(function() {
        count_setter.val('5').change();

        expect(slow_runner.count()).toBe('5');
        expect(slow_runner.slow_count()).toBe(0);
      });

      waits(50);

      runs(function() {
        expect(slow_runner.count()).toBe('5');
        expect(slow_runner.slow_count()).toBe('5');
      });
    });
  });

  describe('Callbacks', function() { 
    it('has a setter input for the count', function() {
      runs(function() {
        count_setter.val('5').change();
        expect(ko.bindingsApplied).toBeFalsy();
      });

      waits(50);

      runs(function() {
        expect(ko.bindingsApplied).toBeTruthy();
      });
    });
  });
});
