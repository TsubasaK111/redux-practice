const Promise = require("bluebird");
const Queue = require("queue");
const { store, startBuild, finishBuild } = require("../models");

const queue = Queue();
queue.autostart = true;
queue.concurrency = 1;

const buildProject = async (projectId, build) => {
  console.log(`buildProject called...`);
  await Promise.delay(3000); // Simulating load

  store.dispatch(startBuild(projectId, build));
  console.log(`dispatched...`);

  // super complex build logic following, check out project, run yarn test etc etc
  await Promise.delay(3000); // Simulate more load
  console.log(`delay is over...`);

  const resBuilds = store
    .getState()
    .builds
    .filter(build => build.projectId === projectId);

  const resBuild = resBuilds[resBuilds.length - 1];

  store.dispatch(finishBuild(projectId, resBuild.id));
};

const triggerBuild = async (projectId, build) => {
  // TODO add this new build to application state!
  // You also have to get the new build number assigned to it here.
  const buildNumber = -1; // Needs to be gotten from state!
  queue.push(() => buildProject(projectId, build));
};

module.exports = {
  triggerBuild,
};