# \<etools-dialog\>

Simple dialog element.
Main features:

- simple dialog with configurable properties and 2 style themes (check demo for details)
- loading message functionality for cases when dialog data is saved
- dynamic dialog creation utility (ex: warning/confirmation messages displayed in dialogs)

## Usage

In order for this component to work properly please first run

```bash
$ npm install --save web-animations-js
```

and then include `web-animations-next-lite.min.js` in your index.html file.

```html
<link rel="import" href="../scripts/web-animations.html" />
```

Simple dialog:

```html
<etools-dialog size="md" opened="[[opened]]" on-close="onCloseActionHandler" dialog-title="Some title">
  Dialog content goes here... as text or html
</etools-dialog>
```

```javascript
onCloseActionHandler(e);
{
  if (e.detail.confirmed === true) {
    // ok action
  } else {
    // cancel action
  }
}
```

Install & serve element locally to view demo and detailed documentation.

## Install

```bash
$ npm i --save @unicef-polymer/etools-dialog
```

## Linting the code

Install local npm packages (run `npm install`)
Then just run the linting task

```bash
$ npm run lint
```

## Preview element locally

Install needed dependencies by running: `$ npm install`.
Make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. Then run `$ polymer serve` to serve your element application locally.

## Running Tests

TODO: improve and add more tests

```
$ polymer test
```

## Styling

| Custom property                                                                            | Description                                   | Default |
| ------------------------------------------------------------------------------------------ | --------------------------------------------- | ------- |
| `--etools-dialog-confirm-btn-text-color`                                                   | dialog confirmation button default text color | `#fff`  |
| `etools-dialog::part(ed-title)` -> :part(title)                                            | etools-dialog title shadow part               | `{}`    |
| `etools-dialog::part(ed-button-styles)` -> shouldn't be needed, but there is :part(footer) | etools-dialog button shadow part              | `{}`    |
| `etools-dialog::part(ed-scrollable)` -> :part(panel)                                       | etools-dialog scrollable shadow part          | `{}`    |

## Circle CI

Package will be automatically published after tag push (`git tag 1.2.3` , `git push --tags`). Tag name must correspond to SemVer (Semantic Versioning) rules.  
Examples:

| Version match      | Result   |
| ------------------ | -------- |
| `1.2.3`            | match    |
| `1.2.3-pre`        | match    |
| `1.2.3+build`      | match    |
| `1.2.3-pre+build`  | match    |
| `v1.2.3-pre+build` | match    |
| `1.2`              | no match |

You can see more details [here](https://rgxdb.com/r/40OZ1HN5)
