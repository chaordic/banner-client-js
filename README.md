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
<script src="https://cdn.jsdelivr.net/npm/@linx-impulse/banner-client-js/dist/linx-banner.min.js"></script>
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

Using some module bundler like Webpack, it should be called this way:
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
    * **showLayout**(boolean): whether or not bring layout properties previously set. Default: `false`.
    * **userId**(string): the user identifier, used to personalize slides even when user access a new device.
    * **homologation**(boolean): enable banner homologation. With this feature enabled the disabled banners will be sent on api response.
    * **timeout**(number): defines a timeout for request in milliseconds.
    * **categories**(array): list of categories of the page. This information is used by api to apply the exhibition rules for banners.
    * **product**(object): object containing product data. Useful for product pages.
    * **tags**(array): array of tags of the page.
    * **url**(string): url of the page.

PS: *options* parameter is not required, neither any of these properties.

#### Example
```javascript
LinxBanner.getRecommendations({
  page: 'home',
  source: 'desktop',
  showLayout: true,
  userId: 'user01',
})
  .then((banners) => {
    console.log('Banners: ', banners);
  })
  .catch((error) => {
    console.error('Banners error: ', error);
  });
```

```javascript
LinxBanner.getRecommendations({
  page: 'product',
  source: 'mobile',
  showLayout: true,
  product: {
    id: 'prod001',
  },
  url: 'https://www.yourdomain/product/prod001'
})
  .then((banners) => {
    console.log('Banners: ', banners);
  })
  .catch((error) => {
    console.error('Banners error: ', error);
  });
```

```javascript
LinxBanner.getRecommendations({
  page: 'subcategory',
  source: 'desktop',
  homologation: true,
  showLayout: true,
  categories: [
    { id: 'cat01', parents: null },
    { id: 'cat02', parents: [ 'cat01' ] },
  ],
  tags: [
    { id: 'tag01' },
    { id: 'tag02' },
    { id: 'tag03' },
  ],
  url: 'https://www.yourdomain/category/cat01/cat02'
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
