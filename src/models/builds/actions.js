const startBuild = (projectId, build) => ({
  type: "START_BUILD",
  projectId,
  build,
});

const finishBuild = (projectId, buildId) => ({
  type: "FINISH_BUILD",
  projectId,
  buildId,
});

module.exports = { startBuild, finishBuild }