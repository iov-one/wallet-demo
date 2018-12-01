# Forms
## Introduction
For handling forms we rely on [final-form](https://github.com/final-form/final-form) library and its wrapper for React ([react-final-form](https://github.com/final-form/react-final-form)).

Check the links for technical aspects but what react-form works on subscriptions to perform updated. By default, Fields subscribe for all props by default, so the Form and its Fields get notified for every single change, for knowing which events you are going to recieve check [FormState](https://github.com/final-form/final-form#formstate).

Basically you will play with two main components:
* [Form](https://github.com/final-form/react-final-form#form--reactcomponenttypeformprops): Component which handles all form's logic, onSubmit, initialValues, async validation at form level and subscription's elements mostly.
* [Field](https://github.com/final-form/react-final-form#field--reactcomponenttypefieldprops): Represents a wrapper for each input of the form. It connects with our own set of inputs widgets trough the component prop.

## Validation

Validation can be perform in two ways:
* form level: You can pass a function to <Form validate={myValidationFnc} ...>, it will be run againts the whole form. It is specially recomended for doing checks which involving more than one input.
* field level: You can send a set of validation rules at Field level. For checking if the field is required, is a number, value is in a range...

Each time form changes its state, validation rules are applied, and therefor errors are generated. It is developer decission to show those errors in the moment they want.

Note in the form state there is a [validating](https://github.com/final-form/final-form#validating-boolean) prop which is set to true when performing async validation.

## Placeholders

Placeholder is something used very often, it is directly related to input's low level properties, so for finding it we should go to the API of the component insterted in react-final-form's Field component. See [mui's TextField](https://material-ui.com/api/text-field/) for example.

When using it, remember Field does a prop-drill to its component, so you should declare the placeHolder when describing the Field and it will be passed to the rendered sub component (mui's textfield, mui's selectfield, mui's checkbox...).

## Usage
For having an idea about how to use it see:
```
<Form initialValues={...} validate={...} onSubmit={...}>
  <Field name="email" component={TextField} validate={required} />
  <Field name="password" type="password" component={TextField} />
  <Field name="agreement" component={Checkbox} />
  <Button type="submit">Go!</Button>
</Form>
```

For a real usage example, please check storybook.