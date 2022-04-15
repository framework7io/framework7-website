# Framework7-Website

Framework7's website to use these docs offline

http://framework7.io

## Gulp

Run `npm install` under root dir to install npm packages.
And then, you can use gulp to compile less and pug files, read more about [Gulp](http://gulpjs.com/).

gulp tasks list

- `gulp server`: run website on local server
- `gulp pug`: build pug files to html
- `gulp less`: build less files to css
- `gulp build`: build both pug and less files

By default all static resources refer to CDN host. To use local resources (for dev purpose only), you can call same gulp tasks with ` -local` argument

- `gulp pug -local`: build pug files to html and use local resources instead of CDN
- `gulp build -local`: build pug and less files use local resources instead of CDN
- `gulp server -local`: run website on local server and use local resources with next builds

## Contributing

All HTML and CSS changes should be committed to `src/` files only!
