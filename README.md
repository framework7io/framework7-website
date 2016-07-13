Framework7-Website
==================
Framework7's website to use these docs offline

http://framework7.io

## Gulp

Run `npm install` under root dir to install npm packages.
And then, you can use grunt to compile less and jade files, read more about [Gulp](http://gulpjs.com/).

gulp tasks list

- `gulp server`: run website on local server
- `gulp jade`: build jade files to html
- `gulp less`: build less files to css
- `gulp build`: build both jade and less files

By default all static resources refer to CDN host. To use local resources (for dev purpose only), you can call same gulp tasks with ` -local` argument
- `gulp jade -local`: build jade files to html and use local resources instead of CDN
- `gulp build -local`: build jade and less files use local resources instead of CDN
- `gulp server -local`: run website on local server and use local resoureses with next builds

## Contributing

All HTML and CSS changes should be commited to `src/` files only!