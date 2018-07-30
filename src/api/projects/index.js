const router = require("express").Router();
const builds = require("./builds");
const { store, addProject, dropProject } = require("../../models/projects/index");


router.get("/", (req, res) => {
  res.status(200).json(store.getState());
});

router.post("/", (req, res) => {
  const { project } = req.body;
  store.dispatch(addProject(project));
  res.status(200).json(store.getState());
});

router.get("/:projectId", (req, res) => {
  const { projectId } = req.params;
  const allProjects = store.getState();
  res.status(200).json(allProjects[projectId]);
});

router.patch("/:projectId", (req, res) => {
  const { projectId } = req.params;
  const { project } = req.body;
  // TODO edit a projects information. Make sure to validate whats being sent!
  res.status(418).json({ message: "Not Implemented" });
});

router.delete("/:projectId", (req, res) => {
  const { projectId } = req.params;
  console.log(projectId);
  store.dispatch(dropProject(projectId));
  res.status(200).json(store.getState());
});

router.use("/:projectId/builds", builds);

module.exports = router;
