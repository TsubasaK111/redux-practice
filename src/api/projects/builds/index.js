const router = require("express").Router({ mergeParams: true });
const { store, startBuild, finishBuild } = require("../../../models");

const Promise = require("bluebird");

router.get("/", (req, res) => {
  const { projectId } = req.params;
  const allBuilds = store.getState().builds;
  const resBuilds = allBuilds.filter(build => build.projectId === projectId);
  res.status(200).json({ builds: resBuilds });
});

router.post("/", async (req, res) => {
  const { projectId } = req.params;
  const { build } = req.body;

  if (!projectId || !build) res.status(400).send("broooo, stop being a douche");

  await Promise.delay(3000);
  store.dispatch(startBuild(projectId, build));
  // super complex build logic following, check out project, run yarn test etc etc
  
  const resBuilds = store
    .getState()
    .builds
    .filter(build => build.projectId === projectId);
  const resBuild = resBuilds[resBuilds.length - 1];
  res.status(200).json({ build: resBuild });

  await Promise.delay(3000);
  store.dispatch(finishBuild(projectId, resBuild.id));
});

router.get("/latest", (req, res) => {
  const { projectId } = req.params;
  const resBuilds = store
    .getState()
    .builds
    .filter(build => build.projectId === projectId);
  const resBuild = resBuilds[resBuilds.length - 1];
  res.status(200).json({ build: resBuild });
});

router.get("/:buildId", (req, res) => {

  const { projectId, buildId } = req.params;
  const resBuilds = store
    .getState()
    .builds
    .filter(build => build.projectId === projectId)
    .filter(build => build.id === buildId);

  if (resBuilds.length === 0) res.status(400).send("broooo, stop being a douche");

  const resBuild = resBuilds[resBuilds.length - 1];
  res.status(200).json({ build: resBuild });

  // TODO Retrieve a single build from a project
  // res.status(418).json({ message: "Not Implemented" });
});

module.exports = router;
