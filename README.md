# Angular Input Focus Attribute Directive
This package is for handling focus on html elements in Angular apps. It is tightly coupled with the DOM but safe to use in server-side rendering settings since we are checking to make sure the directive is running in a browser before using any DOM-specific functions.

[![NPM](https://img.shields.io/npm/v/angular-input-focus.svg)](https://www.npmjs.com/package/angular-input-focus)
[![Build Status](https://img.shields.io/appveyor/ci/DeanPDX/angular-input-focus.svg)](https://ci.appveyor.com/project/DeanPDX/angular-input-focus)
[![Test Status](https://img.shields.io/appveyor/tests/DeanPDX/angular-input-focus.svg)](https://ci.appveyor.com/project/DeanPDX/angular-input-focus/build/tests)
[![Code Coverage](https://img.shields.io/codecov/c/github/DeanPDX/angular-input-focus.svg)](https://codecov.io/gh/DeanPDX/angular-input-focus)
[![Issues](https://img.shields.io/github/issues/DeanPDX/angular-input-focus)](https://img.shields.io/github/issues/DeanPDX/angular-input-focus)
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
Here are some standard use cases.

### Autofocus
For autofocus-like functionality, you can set `libFocus` to true (or a condition):

```html
<!-- Focus First name when control is rendered -->
First name: <input type="text" name="fname" [libFocus]="true">
Last name: <input type="text" name="lname">
```

### Focus using an EventEmitter
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

Whenever your `focusEvent` emits a value, your element will focus/blur depending on whether the emitted value is `true` or `false`. You can find a working example of this in the [tester app](https://github.com/DeanPDX/angular-input-focus/blob/c65380d9bd1ad5ad0c43c4abf5d6312015c622b6/src/app/app.component.ts#L14) for the project.

### Focus last element with dynamic elements
You don't need to use `EventEmitter` for this. Simply set `libFocus` to a conditional boolean value:

```typescript
rows = ['First', 'Second'];

addRow() {
  this.rows.push('');
}

shouldFocusRow(index: number): boolean {
  return index + 1 === this.rows.length;
}

trackByIndex(index, row) {
  return index;
}
```

And in your template:

```html
<button (click)="addRow()">Add row</button>

<!-- Important to use trackBy to prevent stuttering on input. -->
<div *ngFor="let row of this.rows; let i = index; trackBy: trackByIndex">
  <input id="row{{ i }}" [libFocus]="shouldFocusRow(i)" [(ngModel)]="rows[i]" />
</div>
```

It's important in general to use `trackBy` for dynamic inputs to avoid UI stutter as you're typing. Here's [a working StackBlitz example](https://stackblitz.com/edit/angular-ivy-thgjm2?file=src%2Fapp%2Fapp.component.ts) you can run and modify.

### Note on skipChangeDetection

If you're using [Angular Material](https://material.angular.io/), Change Detection needs to run after setting focus because Angular Material tracks focus; otherwise you will get the dreaded `ExpressionChangedAfterItHasBeenCheckedError` exception. If you are using native HTML inputs, you can skip change detection by setting `[skipChangeDetection]="true"`.

## Development

The main app (`angular-input-focus-tester`) is for testing the `angular-input-focus` library in the `projects` folder. Run `ng serve` to build and serve the test app.

To publish a new version of the library to [NPM](https://www.npmjs.com/), run `npm run publish-lib`. This will do the following:

* Run `npm version patch` to create a new patch.
* Build the library.
* Copy readme/license from the main project to the library.
* Publish the patch on NPM.