const shortid = require('shortid');
const actions = require("./actions");


const projectReducer = (projectsState = [], action) => {
  switch (action.type) {
    case "ADD_PROJECT": {
      const newProject = {
        ...action.project,
        id: shortid.generate()
      };

      return [...projectsState, newProject];
    }
    case "DROP_PROJECT": {
      const newProjects = projectsState.filter(project => project.id !== action.projectId);

      return newProjects;
    }
    case "UPDATE_PROJECT": {
      const newProjects = [...projectsState];
      const projectIndex = newProjects.findIndex(project => project.id === action.projectId);
      const updatedProject = { ...newProjects[projectIndex], ...action.project }

      newProjects[projectIndex] = updatedProject;

      return newProjects;
    }
    default:
      return projectsState;
  }
};


module.exports = { projectReducer, ...actions };