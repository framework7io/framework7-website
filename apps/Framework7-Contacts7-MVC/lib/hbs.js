define(["handlebars"], function (Handlebars) {
  Handlebars = Handlebars || this.Handlebars;
  var templateExtension = ".hbs";

  return {

    pluginBuilder: "./hbs-builder",

    // http://requirejs.org/docs/plugins.html#apiload
    load: function (name, parentRequire, onload, config) {

      // Get the template extension.
      var ext = (config.hbs && config.hbs.templateExtension ? config.hbs.templateExtension : templateExtension);

      // In browsers use the text-plugin to the load template. This way we
      // don't have to deal with ajax stuff
      parentRequire(["text!" + name + ext], function (raw) {
        // Just return the compiled template
        onload(Handlebars.compile(raw));
      });

    }

  };
});
