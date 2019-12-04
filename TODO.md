# TODO

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

- ## [ ] Setup

  - [ ] Redux
    - state management
    - [ ] react-redux
    - [ ] redux-saga
      - handling asynchronize actions
    - [ ] create store
    - [ ] create actions
    - [ ] create reducers
    - [ ] create sagas
  - [ ] React Router
    - routing
    - creating a router folder

- ## Pages

  - [ ] LandingPage
    - will have information about the project
    - buttons to signup and login
  - [ ] Register
    - where a user can create an account
  - [ ] Login
    - user will enter their email/password

- ## Components
  - [ ] Navbar
    - will contain the logo and name of the project
    - [ ] if user is logged in
      - will contain log out buton
    - [ ] if user is not logged in
      - will contain login and register buttons
  - [ ] Footer
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
    - will be rendered in place of asynchronize data