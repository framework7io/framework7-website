Framework7-Contacts7-MVC
========================

This app shows you example of using beautiful mobile framework - Framework7 in MVC way for building data-driven contacts application.

##### Additional js libraries:
 - Handlebars - templating library (http://handlebarsjs.com/)
 - RequireJS - for asynchronous javascript modules loading (http://requirejs.org/)
 - Additional RequireJS plugins for handlebars templates loading: 
    - text (https://github.com/requirejs/text)
    - hbs (https://github.com/epeli/requirejs-hbs)
 - Lodash (http://lodash.com/) - additional optional library for easy array manipulation
 
And amazing mobile-icons library:
 - ionicons (http://ionicons.com/) 
 

Some notes about "how it works".
-----

Application entry point: app.js file. 
It's used for RequireJs and Framework7 initial configuration. 
Also it starts application routing.

Router has two methods:
+ ```Router.init()``` - initialize routing - handle Framework7 page events - pageBeforeInit and pageBeforeAnimation.
More about Framework7 page events here:
http://www.idangero.us/framework7/docs/pages.html#page-events

+ ```Router.load(contollerName, query)``` - load selected controller, query - optional object with some parameters
This method is useful for loading in already rendered page (for example popup)


Suggested application code structure is convenient, especially for large projects:
``` js/moduleName1/moduleName1View.js
 js/moduleName1/moduleName1Controller.js
 js/moduleName1/some_templates.hbs
 js/router.js
 js/model.js
```

License
----

MIT
