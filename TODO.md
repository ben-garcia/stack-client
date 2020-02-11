# TODO

> The Plan

- ## [x] Development Environment

  - [x] Create React App
    - [x] tsconfig.json
  - [x] ESLint
    - airbnb style guide
  - [x] Stylelint
    - lint sass
  - [x] Prettier
    - should play nice with ESLint
  - [x] Testing
    - create-react-app comes with jest
    - testing-library/react
  - [x] Husky && lint-staging
    - should pass testing and linting

- ## [x] Setup

  - [x] Redux
    - state management
    - [x] react-redux
    - [x] redux-saga
      - handling asynchronize actions
    - [x] create store
    - [x] create actions
    - [x] create reducers
    - [x] create sagas
  - [x] React Router
    - routing
    - creating a router folder

- ## Pages

  - [x] LandingPage

    - will have information about the project
    - buttons that trigger a modal with either a form to register or login

  - [x] RegisterPage
    - register form
  - [x] LoginPage
    - login form
  - [x] Dashboard

- ## Components
  - [x] Button
    - will contain text and onClick prop
  - [x] Header
    - prop to define the heading(h1...h6)
  - [x] Image
    - wrapper for image
  - [x] Navbar
    - will contain the logo and name of the project
    - NavbarItem
      - to be nested inside Navbar
  - [x] Paragraph
    - wrapper for p tag with styles
  - [x] Icon
    - using font icons
  - [x] Form
    - FormGroup
      - wrapper component for fieldset element used to combine related form information
    - FormInput
      - wrapper components for input and label elements
  - [x] Modal
    - will contain forms to
      - register
      - log in
  - [x] Footer
    - contain my name and the year
  - [ ] Dashboard
    - only accessed if the user is logged in
    - contains all the users workspaces
  - [ ] Workspace
    - will contain the name of the workspace
    - will contain all the channels the associated with it
    - will contain the members
    - will contain the messages
  - [ ] Channel
    - contain the messages for the channel
    - will contain an input where users can type in messages
  - [ ] Placeholder
    - will be rendered in place for loading data
