const redux = require("redux");
const shortid = require('shortid');

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

const dropProject = projectId => ({
  type: "DROP_PROJECT",
  projectId
});


const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PROJECT": {
      const newProject = {
        ...action.project,
        id: shortid.generate()
      };
      return [...state, newProject];
    }
    case "DROP_PROJECT": {
      const newState = state.filter(project => project.id !== action.projectId);

      return newState;
    }
    default:
      return state;
  }
};

const store = redux.createStore(
  projectReducer,
  initState
);

module.exports = { store, addProject, dropProject };