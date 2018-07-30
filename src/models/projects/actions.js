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

module.exports = { addProject, dropProject, updateProject }