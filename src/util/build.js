const Promise = require("bluebird");
const Queue = require("queue");


const buildProject = async (projectId, buildNumber) => {
  await Promise.delay(3000); // Please leave this in to simulate load

  // TODO Set build status to "Running" in app state!

  // super complex build logic following, check out project, run yarn test etc etc
  await Promise.delay(3000); // Do not modify this timing

};

module.exports = {
  triggerBuild,
};
