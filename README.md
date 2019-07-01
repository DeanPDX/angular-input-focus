# Angular Input Focus Attribute Directive
This package is for handling focus on html elements in Angular apps. It is tightly coupled with the DOM but safe to use in server-side rendering settings since we are checking to make sure the directive is running in a browser before using any DOM-specific functions.

## Installation
Install using NPM:

```bash
npm install angular-input-focus --save
```

Next, import the module in your application module:

```typescript
import { AngularInputFocusModule } from 'angular-input-focus';

@NgModule({
  imports: [AngularInputFocusModule]
})
```

Now you're ready to use the directive in your project.

## Usage
For autofocus-like functionality, use like this:

```html
<!-- Focus First name when control is rendered -->
First name: <input type="text" name="fname" [libFocus]="true">
Last name: <input type="text" name="lname">
 ```

You can also pass an `EventEmitter<boolean>` as `setFocus` like so:

```typescript
export class MyComponent {
    // We will pass this to the directive in our view
    focusEvent = new EventEmitter<boolean>();
    setFocus() {
        this.focusEvent.emit(true);
    }
}
```

```html
<input [libFocus]="false" [setFocus]="focusEvent">`
```

Whenever your `focusEvent` emits a value, your element will focus/blur depending on whether the emitted value is `true` or `false`.

## Development

The main app (`angular-input-focus-tester`) is for testing the `angular-input-focus` library in the `projects` folder. Run `ng serve` to build and serve the test app.

To publish a new version of the library to [NPM](https://www.npmjs.com/), run `npm run publish-lib`. This will do the following:

* Run `npm version patch` to create a new patch.
* Build the library.
* Copy readme/license from the main project to the library.
* Publish the patch on NPM.