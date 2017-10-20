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
* noPadding: Boolean, default: false
* dialogTitle: String, default: ''
* cancelBtnText: String, default: 'Cancel'
* okBtnText: String, default: 'Ok'
* hideConfirmBtn: Boolean, default: false,
* disableConfirmBtn: Boolean, default: false,
* theme: String, default: 'default', possible values: 'default', 'confirmation'
* size: String, default: 'sm', possible values: 'sm', 'md', 'lg'
* keepDialogOpen , confirmBtnClickedCallback, showSpinner, spinnerText - Used to avoid dialog closing when confirm btn is clicked and to show a spinner inside the modal while the confirmBtnClickedCallback method executes
* noAutoFocus: Boolean, default:false . Binded to noAutoFocus property of the iron-overlay-behaviour. When false, it's used to set the focus on the item from which the event to open the overlay originated and if that's empty to the element that has the `autofocus` attribute. We set this to `true` when the modal contains an iron-dropdown (which also uses iron-overlay-behavior) to avoid a bug in IE which consists of the dropdown's overlay no longer closing after being opened.

## Styling

Custom property | Description | Default
 ----------------|-------------|----------
 `--etools-dialog-borders-color` | Borders color | `#dedede`
 `--etools-dialog-title` | Mixin applied to dialog title | `{}`


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
