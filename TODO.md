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

- ## [ ] Pages

  - [x] LandingPage

    - will have information about the project
    - buttons that trigger a modal with either a form to register or login

  - [x] RegisterPage
    - register form
  - [x] LoginPage
    - login form
  - [x] Dashboard

- ## [ ] Components

  - [x] Button
    - will contain text and onClick prop
  - [x] ChnanelInfo
    - will contain channel name / member username
  - [x] ChannelList
    - contains list of all the user's channels
  - [x] CreateChannelForm
    - form which contains inputs fields to create a new channel
  - [x] CreateWorkspaceForm
    - contains form with inputs to create a new wokspace
  - [x] Dialog
    - will contain information to get the users attention(form errors)
  - [x] EditChannelTopic
    - contains the form to add/update channel topic
  - [x] Footer
    - contain my name and the year
  - [x] Form
    - FormGroup
      - wrapper component for fieldset element used to combine related form information
    - FormInput
      - wrapper components for input and label elements
    - FormCheckbox
      - checkbox styled as it appears in Slack
  - [x] Header
    - prop to define the heading(h1...h6)
  - [x] Icon
    - using font icons
  - [x] Image
    - wrapper for image
  - [x] Modal
    - will contain forms to
      - register
      - log in
      - edit channel form
      - create channel form
      - create workspace form
  - [x] Navbar
    - will contain the logo and name of the project
    - NavbarItem
      - to be nested inside Navbar
  - [x] Paragraph

    - wrapper for either p, span, or div tag with styles

  - [x] Placeholder

    - will be rendered in place for loading data

  - [x] TeammatesInfo
    - contain infomation about the current teammate
  - [x] TeammatesList

    - contains list of workspace teammates

  - [x] WorkspaceInfo
    - conatains wokspace name
  - [x] WokspaceList
    - aside tag in the Dashboard which contains workspaces
  - [x] WorkspaceSidebar
    - parent for ChannelList TeammatesList
