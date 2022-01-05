# \<json-keyslist>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation

```bash
npm i json-keyslist
```

## Usage

```html
<script type="module">
  import 'json-keyslist/json-keyslist.js';
</script>

<json-keyslist id="json-keyslist1"></json-keyslist>
```

## Properties

- **id**: Id of the component used to indentify itself. Type String
- **title**: To show like a head of list. Type String
- **mainKey**: Main key of json data to show. Type String
- **jsonData**: Json with data to show keys in a list. Type Object
- **jsonDataKeys**: Array with keys to show in a list. Type Array
- **selectedItem**: Value of item selected. Type String

## Events

### Dispatched Events

- **wc-ready**: Dispatch event when the webcomponent is ready, after the first render. The event detail has **id**, **componentName** and **component**, with the webcomponent instance, properties.
- **json-keyslist-selected-item**: Dispatch event when an item is selected. The event detail has **mainKey** and **selectedItem** properties.

### Listening for events

- **json-keyslist-data-changed**: Listen for this event to get notified when the data changes. The event detail has mainKey and data properties. Expect the **jsonData** to be an array of objects and the **mainKey** to be the key of the object.

## Theming

- **--json-keyslist-text-color** .Default #000
- **--json-keyslist-background-color** .Default #fff
- **--json-keyslist-width** .Default 100%
- **--json-keyslist-link-margin** .Default 0.5rem
- **--json-keyslist-link-border-bottom** .Default 1px solid #000
- **--json-keyslist-link-color** .Default #000
- **--json-keyslist-link-font-size** .Default 16px
- **--json-keyslist-link-font-weight** .Default normal
- **--json-keyslist-link-font-family** .Default verdana
- **--json-keyslist-selected-link-color** .Default #333
- **--json-keyslist-selected-link-font-weight** .Default bold
- **--json-keyslist-selected-link-background-color** .Default #a0a0a0
- **--json-keyslist-title-font-size**. Default 1.5rem
- **--json-keyslist-title-background-color**. Default #000
- **--json-keyslist-title-color**. Default #fff

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

## Testing with Web Test Runner

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```

## Demoing with Storybook

To run a local instance of Storybook for your component, run

```bash
npm run storybook
```

To build a production version of Storybook, run

```bash
npm run storybook:build
```

## Tooling configs

For most of the tools, the configuration is in the `package.json` to minimize the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`
