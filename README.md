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

## Preview element locally
Install needed dependencies by running: `$ bower install`.
Make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. Then run `$ polymer serve` to serve your element application locally.

## Running Tests

```
$ polymer test
```
