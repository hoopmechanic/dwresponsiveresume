const Mustache = require('mustache');

$(() => {
  $.getJSON('js/data.json', (data) => {
    const jsonData = data;
    for (let gloop = 0; gloop < jsonData.software.groups.group.length; gloop++) {
      for (const key in jsonData.software.groups.group[gloop].groupitems) {
        for (let c = 0; c < jsonData.software.groups.group[gloop].groupitems.length; c++) {
          const level = jsonData.software.groups.group[gloop].groupitems[c].level;
          let leveldot = '';
          let output = '';
          const jsonGroupItem = jsonData.software.groups.group[gloop].groupitems[c];
          for (let item = 1; item <= 5; item++) {
            leveldot = `leveldot${item}`;
            if (item <= level) {
              output = 'fa fa-circle';
            } else {
              output = 'fa fa-circle-thin';
            }
           jsonGroupItem[leveldot] = output;
          }

          switch (level) {
            case 1:
              output = 'Poor';
              break;
            case 2:
              output = 'Needs Work';
              break;
            case 3:
              output = 'Good';
              break;
            case 4:
              output = 'Very Good';
              break;
            default:
              output = 'Excellent';
              break;
          }
          jsonGroupItem.leveltext = output;
        }
      }
    }
    const template = $('#softwaretpl').html();
    const html = Mustache.to_html(template, jsonData);
    $('#software-list').html(html);
  }); //getJSON
}); //function
