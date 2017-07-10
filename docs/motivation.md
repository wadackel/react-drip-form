---
title: Motivation
previous:
  link: ../
  title: Quick Start
next:
  link: ../tutorial/
  title: Tutorial
---


## HoC Based API

```javascript
// Field Component
import { dripFormField } from 'react-drip-form';

const MyField = () => {/* ... */};

export default dripFormField({/* options */})(MyField);


// Form Component
import { dripForm } from 'react-drip-form';

const MyForm = () => {/* ... */};

export default dripForm({/* options */})(MyForm);
```

`react-drip-form` is a HoC-based API that passes the necessary props.  
By using Hoc and separating **Behavior** and **View**, you can freely decide the structure of HTML and styling with.

Also, "Render according to Props" This flow adapts to React's philosophy.  
Learning cost is lowered by approaching React standard API.

However, it may be difficult to create components such as `<textarea>` and `<select>`, as well as Checkbox and Radio from scratch. (Prototype project etc.)

In such a case, you can quickly proceed with development by using the [default component](todo) or using the [component set for UI framework](todo).



## The form state is managed by form

A Form created using `react-drip-form` has a role of returning a valid values.  
It is not involved in the application state.

Whatever way you manage application states, you can integrate with `react-drip-form`.  
`Flux`, `redux`, `MobX` and `rx`.



## Validator is a separate package

Validator used by `react-drip-form` is a separate package called [drip-form-validator](https://github.com/tsuyoshiwada/drip-form-validator).

This has the following advantages.

* Since it operates in standalone, it can be used with View libraries other than React.
* You can use the same Validator with Server-Side.




## Covers from prototype to production

* Many validations. (you can customize as well!)
* There are few design restrictions.
* Free component design.
* Many UI framework components.
* Support for i18n with custom error messages.

Because there are advantages like the above, it is a prototype so you want to make it quickly, you can realize the desire to make firmly because it is a production.

