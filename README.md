# Dwayne Washington Responsive Resume

[![Dwayne Washington Responsive Resume image](https://s3-us-west-1.amazonaws.com/dwaynewashington.com/static/media/dwresume.jpg)](http://dwaynewashington.com)

## About the project

Welcome to my responsive resume site. This site is a full stack project built with CSS, HTML, and JavaScript. It features a Node.js and NPM installation using a Gulp workflow to process SASS, HTML and Javascript files. This workflow has been designed to process files for both the development and the production environments. All the files needed for production are minified and saved in the appropriate folders to be deployed to a production server.

In addition, the workflow has a number of automated tasks. As changes are made to SASS files, the CSS is automatically processed, saved to the CSS folder and sent to the browser. Likewise, changes to HTML or Javascript files, are also processed and immediately sent to the browser for preview. Browserify is used to load Mustache.js and jQuery libraries as dependent modules.

The data for the Software section is uploaded from a JSON file and displayed in HTML using a Mustache.js script. Modifications are made to the JSON data to create a list of software items grouped by category. The expertise level indicators are generated from a single value stored in the JSON data. The coding can be found in the template.js file located in the components/scripts folder. JQuery cycle is used to create a slideshow of icons, from the Devsicons collection, to illustrate my skills in the Primary Skills section. The About link in the menu features custom Javascript that loads an overlay to display the about text.

This site is fully responsive changing from a two column to a stacked design as the size of the viewport is adjusted. It is hosted on a Amazon Web Services S3 bucket. The files for the complete project are posted on my GitHub repository. Click the GitHub link in the main menu to navigate to my repository.

[Click here](https://s3-us-west-1.amazonaws.com/dwaynewashington.com/static/media/dwresume.pdf) to download a PDF version of my resume.

I hope you enjoy this project!!!

For more information, please contact me at [dwash@xplosv.com](mailto:dwash@xplosv.com). I look forward to working with you.
