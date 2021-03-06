# Angular Input Focus Attribute Directive
This package is for handling focus on html elements in Angular apps. It is tightly coupled with the DOM but safe to use in server-side rendering settings since we are checking to make sure the directive is running in a browser before using any DOM-specific functions.

[![NPM](https://img.shields.io/npm/v/angular-input-focus.svg)](https://www.npmjs.com/package/angular-input-focus)
[![Build Status](https://img.shields.io/appveyor/ci/DeanPDX/angular-input-focus.svg)](https://ci.appveyor.com/project/DeanPDX/angular-input-focus)
[![Test Status](https://img.shields.io/appveyor/tests/DeanPDX/angular-input-focus.svg)](https://ci.appveyor.com/project/DeanPDX/angular-input-focus/build/tests)
[![Code Coverage](https://img.shields.io/codecov/c/github/DeanPDX/angular-input-focus.svg)](https://codecov.io/gh/DeanPDX/angular-input-focus)
[![Dependencies Status](https://img.shields.io/david/DeanPDX/angular-input-focus.svg)](https://david-dm.org/DeanPDX/angular-input-focus)
[![License](https://img.shields.io/github/license/DeanPDX/angular-input-focus.svg)](https://github.com/DeanPDX/angular-input-focus/blob/master/LICENSE)

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
For autofocus-like functionality, you can set `libFocus` to true (or a condition):

```html
<!-- Focus First name when control is rendered -->
First name: <input type="text" name="fname" [libFocus]="true">
Last name: <input type="text" name="lname">
```

You can also pass an `EventEmitter<boolean>` to the `setFocus` input. Imagine a component called `MyComponent`:

```typescript
export class MyComponent {
    // We will pass this to the directive in our view
    focusEvent = new EventEmitter<boolean>();
    // When called, will set the focus on our input
    setFocus() {
        this.focusEvent.emit(true);
    }
}
```

In the template for `MyComponent`:

```html
<input [libFocus]="false" [setFocus]="focusEvent">`
```

Whenever your `focusEvent` emits a value, your element will focus/blur depending on whether the emitted value is `true` or `false`.

If you're using [Angular Material](https://material.angular.io/), Change Detection needs to run after setting focus because Angular Material tracks focus; otherwise you will get the dreaded `ExpressionChangedAfterItHasBeenCheckedError` exception. If you are using native HTML inputs, you can skip change detection by setting `[skipChangeDetection]="true"`.

## Development

The main app (`angular-input-focus-tester`) is for testing the `angular-input-focus` library in the `projects` folder. Run `ng serve` to build and serve the test app.

To publish a new version of the library to [NPM](https://www.npmjs.com/), run `npm run publish-lib`. This will do the following:

* Run `npm version patch` to create a new patch.
* Build the library.
* Copy readme/license from the main project to the library.
* Publish the patch on NPM.