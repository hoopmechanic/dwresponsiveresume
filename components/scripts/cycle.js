const $ = require('jquery');
const jqueryCycle = require('jquery-cycle');


$(() => {
  $('#icons').cycle({
      fx: 'fade',
      pause: 1,
      speed: 500,
      timeout: 10000
  }); // cycle object
}); //function
