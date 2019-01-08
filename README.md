# \<etools-dialog\>

Simple dialog element

## Usage

In order for this component to work properly please first run

```bash
$ npm install --save web-animations-js
```
and then include `web-animations-next-lite.min.js` in your index.html file.

```html
<link rel="import" href="../scripts/web-animations.html">
```

```html
<etools-dialog size="md" opened="[[opened]]"
  on-close="onCloseActionHandler" dialog-title="Some title">
      Dialog content goes here... as text or html
</etools-dialog>
```

```javascript
onCloseActionHandler: function(event) {
  if (event.detail.confirmed === true) {
    // ok action
  } else {
    // cancel action
  }
}
```

Install & serve element locally to view demo and documentation

## Install
TODO: create npm package
```bash
$ npm i --save unicef-polymer/etools-dialog#branch_name
```

## Linting the code

Install local npm packages (run `npm install`)
Then just run the linting task

```bash
$ npm run lint
```

## Preview element locally
Install needed dependencies by running: `$ bower install`.
Make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. Then run `$ polymer serve` to serve your element application locally.

## Running Tests
TODO: improve and add more tests
```
$ polymer test
```
