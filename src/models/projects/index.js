const redux = require("redux");
const shortid = require('shortid');

const initState = { projects: [] };

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

      return { projects: [...state.projects, newProject] };
    }
    case "DROP_PROJECT": {
      const newProjects = state.projects.filter(project => project.id !== action.projectId);

      return { projects: newProjects };
    }
    case "UPDATE_PROJECT": {
      const newProjects = [...state.projects];
      const projectIndex = newProjects.findIndex(project => project.id === action.projectId);
      const updatedProject = { ...newProjects[projectIndex], ...action.project }

      newProjects[projectIndex] = updatedProject;

      return { projects: newProjects };
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