function SlowRunnerViewModel() {
  this.count = ko.observable(0);

  this.slow_count = ko.computed(function() {
    return this.count();
  }, this).extend({ throttle: 50 });
};
