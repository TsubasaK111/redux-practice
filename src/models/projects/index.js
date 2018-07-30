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

const updateProject = (projectId, project) => ({
  type: "UPDATE_PROJECT",
  projectId,
  project
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
    case "UPDATE_PROJECT": {
      const newState = [...state];
      const projectIndex = newState.findIndex(project => project.id === action.projectId);
      const updatedProject = { ...state[projectIndex], ...action.project }
      
      newState[projectIndex] = updatedProject;

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

module.exports = { store, addProject, dropProject, updateProject };