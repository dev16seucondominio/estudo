(function(){
  angular.module('myApp').lazy
  .factory("indexFactory", [
    function() {
      base_obj = {
      }
      return base_obj;
    },
  ])
}).call(this);
