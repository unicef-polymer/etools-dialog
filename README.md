# \<etools-dialog\>

Simple dialog element

## Usage
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

Available attributes:
* opened: Boolean, default: false
* backdrop: Boolean, default: true
* modal: Boolean, default: true
* dialogTitle: String, default: ''
* cancelBtnText: String, default: 'Cancel'
* okBtnText: String, default: 'Ok'
* size: String, default: 'sm', possible values: 'sm', 'md', 'lg'

## Styling

Custom property | Description | Default
 ----------------|-------------|----------
 `--etools-dialog-borders-color` | Borders color | `#dedede`


## Install
```bash
$ bower install --save etools-dialog
```

## Linting the code

Innstall local npm packages (run `npm install`)
Then just run the linting task

```bash
$ npm run lint
```
You should also use polylint. If you don't have Polylint installed run `npm install -g polylint`.
Then just run the linter on each file you wish to check like so

```bash
$ polylint -i filename.html
```
At the moment polylint crashes if it encounters a missing import. If that happens, temporarily comment out such imports and run the command again.

## Preview element locally
Install needed dependencies by running: `$ bower install`.
Make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. Then run `$ polymer serve` to serve your element application locally.

## Running Tests

```
$ polymer test
```
