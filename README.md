# banner-client-js

[![Version][version-svg]][package-url] [![CircleCI][circleci-svg]][circleci-url] [![License][license-image]][license-url] [![Downloads][downloads-image]][downloads-url] [![jsDelivr Hits][jsdelivr-badge]][jsdelivr-hits]

[circleci-svg]: https://circleci.com/gh/chaordic/banner-client-js.svg?style=svg
[circleci-url]: https://circleci.com/gh/chaordic/banner-client-js
[version-svg]: https://img.shields.io/npm/v/@linx-impulse/banner-client-js.svg?style=flat-square
[package-url]: https://npmjs.org/package/@linx-impulse/banner-client-js
[license-image]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: LICENSE.txt
[downloads-image]: https://img.shields.io/npm/dm/@linx-impulse/banner-client-js.svg?style=flat-square
[downloads-url]: http://npm-stat.com/charts.html?package=@linx-impulse/banner-client-js
[jsdelivr-badge]: https://data.jsdelivr.com/v1/package/npm/@linx-impulse/banner-client-js/badge
[jsdelivr-hits]: https://www.jsdelivr.com/package/npm/@linx-impulse/banner-client-js

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
npm install --save @linx-impulse/banner-client-js
```

It should be called this way:
```javascript

const LinxBanner = require('@linx-impulse/banner-client-js');
// or
import { BannerClient } from '@linx-impulse/banner-client-js';
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
