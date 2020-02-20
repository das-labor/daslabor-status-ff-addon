/* eslint-env webextensions */

const UPDATE_INTERVAL_MINUTES = 5;

let labor_status = '';

function update_labor_status() {
  fetch("https://das-labor.org/status/status.php?status")
    .then((response) => {
      return response.text();
    })
    .then((text) => {
      labor_status = text;

      let iconName = '';
      switch (labor_status) {
        case "CLOSED":
          iconName = 'laborlogo_closed';
          break;
        case "OPEN":
          iconName = 'laborlogo_open';
          break;
        default:
          iconName = 'laborlogo';
      }

      browser.browserAction.setIcon({ 'path': 'icons/' + iconName + '_32.png'});
    });
  
  console.log("Laborstatus: " + labor_status);
}

// check status on Addon start
update_labor_status();

/* check status every 5 minutes
*/
setInterval(function() {
  update_labor_status();
}, 1000 * 60 * UPDATE_INTERVAL_MINUTES);