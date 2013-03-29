function SlowRunnerViewModel() {
  this.count = ko.observable(0);

  this.slow_count = ko.computed(function() {
    this.sleep(100);
    return this.count();
  }, this);
};

SlowRunnerViewModel.prototype.sleep = function(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
};
