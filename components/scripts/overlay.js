(function () {
  // Select the node
  const clickedNode = document.querySelector('.mainmenu a[href="#"]');

  clickedNode.addEventListener('click', (e) => {
    // make sure the about link was clicked
    if (e.target.text === 'About') {
      // add overlay to body
      const aboutOverlay = document.createElement('div');
      aboutOverlay.id = 'overlay';
      document.body.appendChild(aboutOverlay);

      // set overlay stylesheet
      aboutOverlay.style.position = 'absolute';
      aboutOverlay.style.top = 0;
      aboutOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
      aboutOverlay.style.cursor = 'pointer';

      // resize and position
      aboutOverlay.style.width = `${window.innerWidth}px`;
      aboutOverlay.style.height = `${window.innerHeight}px`;
      aboutOverlay.style.top = `${window.pageYOffset}px`;
      aboutOverlay.style.left = `${window.pageXOffset}px`;

      // adjust the CSS for the about text div
      const aboutTextDiv = document.querySelector('#about-text');
      aboutTextDiv.style.display = 'block';
      aboutTextDiv.style.position = 'absolute';
      aboutTextDiv.style.padding = '30px';
      aboutTextDiv.style.backgroundColor = 'white';
      aboutTextDiv.style.width = '400px';
      aboutTextDiv.style.height = '600px';
      aboutTextDiv.style.overflow = 'auto';
      aboutTextDiv.style.border = '3px solid black';
      aboutTextDiv.style.zIndex = '6000';

      // adjust the CSS for the Close message span
      const aboutCloseMessage = document.querySelector('#close-message');
      aboutCloseMessage.style.position = 'absolute';
      aboutCloseMessage.style.color = 'white';
      aboutCloseMessage.style.top = '10px';
      aboutCloseMessage.style.right = '10px';
      aboutCloseMessage.style.padding = '10px';
      aboutCloseMessage.style.backgroundColor = '#cc2936';

      // adjust the CSS for the Text title
      const aboutTitle = document.querySelector('#about-text h2');
      aboutTitle.style.color = '#26547c';
      aboutTitle.style.fontSize = '1.4em';

      // center overlay and display to screen
      centerText(aboutTextDiv, 400, 600);
      aboutOverlay.appendChild(aboutTextDiv);

      // handle click on text to remove overlay
      aboutTextDiv.addEventListener('click', () => {
        if (aboutOverlay) {
          aboutTextDiv.style.display = 'none';
          document.body.appendChild(aboutTextDiv);

          // stop the event handlers
          window.addEventListener('scroll', window, false);
          window.addEventListener('resize', window, false);

          aboutOverlay.parentNode.removeChild(aboutOverlay);
        }
      }, false);

      // handle browser scroll overlay adjustments
      window.addEventListener('scroll', () => {
        if (aboutOverlay) {
          aboutOverlay.style.top = `${window.pageYOffset}px`;
          aboutOverlay.style.left = `${window.pageXOffset}px`;
        }
      }, false);

      // handle browser window resize overlay adjustments
      window.addEventListener('resize', () => {
        if (aboutOverlay) {
          aboutOverlay.style.width = `${window.innerWidth}px`;
          aboutOverlay.style.height = `${window.innerHeight}px`;
          aboutOverlay.style.top = `${window.pageYOffset}px`;
          aboutOverlay.style.left = `${window.pageXOffset}px`;
          centerText(aboutTextDiv, 400, 600);
        }
      }, false);
    } // target the About menu item in the main menu
  }, false); // menu link is clicked
}()); // self executing

// center overlay on screen
function centerText(theTextBox, thewidth, theheight) {
  const myDifX = (window.innerWidth - thewidth) / 2;
  const myDifY = (window.innerHeight - theheight) / 2;

  theTextBox.style.top = `${myDifY}px`;
  theTextBox.style.left = `${myDifX}px`;

  return theTextBox;
}
