# Workshop

## How to use Formik

- [x] Create a form with handler
- [x] Create a form with Formik
- [ ] Find explanation:
  - [ ] When to use it
  - [ ] When not to use it

## Pros

- Have a standard well explained on their website
- Inputs have to be in the form
- Save a lot of state management for long forms
- Only have to define `handleSubmit` method

## Weakness

- Makes it harder to have a form with the shape of a table due to HTML restrictions
- Makes it harder for beginner to understand a regular form
- Add complexity if we want exotic behaviour like handling other component props

## When to use it

- Have a lot of for m with multiple inputs (more than 3)

## When not to use it

- When you want a really custom form and absolutely want to use some specific tags like `<table />`
