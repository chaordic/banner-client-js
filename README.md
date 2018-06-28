# banner-client-js
Front end Banner SDK for Linx Banner API customers

## Installation

### CDN
```html
<script src="//unpkg.com/linx-banner-client-js"></script>
```

There will be created a property called **banner** in global linx object.

```javascript
const LinxBanner = linx.banner;
// or
const LinxBanner = window.linx.banner;
```

### npm

```sh
npm install --save linx-banner-client-js
```

It should be called this way:
```javascript

const LinxBanner = require('linx-banner-client-js');
// or
import * as LinxBanner from 'linx-banner-client-js';
```

## Usage

### getRecommendations
#### Parameters
  * options (object)
    * **page**(string): current page. Ex: home, product, category, subcategory, cart.
    * **source**(string): device of user. Ex: app, desktop, mobile.
    * **deviceId**(string): device identifier.
    * **showLayout**(boolean): whether or not bring layout properties previously set. Default: `false`.

PS: *options* parameter is not required, neither any of these properties.

#### Example
```javascript
LinxBanner.getRecommendations({
  page: 'home',
  source: 'desktop',
  deviceId: 'usr2018abc',
  showLayout: true,
})
  .then((banners) => {
    console.log('Banners: ', banners);
  })
  .catch((error) => {
    console.error('Banners error: ', error);
  });
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

PS: Do not forget the tests ;)

## Test

Run test command:

```sh
npm test
```

## Release
* [Login npm](https://docs.npmjs.com/cli/adduser)

* Run release command:
  ```sh
  npm run release
  ```


## Changelog

[CHANGELOG](CHANGELOG.md)

## License

[MIT](LICENSE)
