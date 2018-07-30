const redux = require("redux");
const initState = [{
  "id": "hykjdLm", // TODO: string generated with shortid
  "name": "vscode",
  "url": "git@github.com:Microsoft/vscode.git",
  "buildCommand": "yarn && yarn test",
  "language": "JavaScript"
}]

const addProject = project => ({
  type: "ADD_PROJECT",
  project
});

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PROJECT":
      return [...state, action.project]
    default:
      return state;
  }
};

const store = redux.createStore(
  projectReducer,
  initState
);

module.exports = { store, addProject };