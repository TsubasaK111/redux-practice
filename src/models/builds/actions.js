const addBuild = (projectId, build) => ({
  type: "ADD_BUILD",
  projectId,
  build,
});

module.exports = { addBuild }