const router = require("express").Router();
const builds = require("./builds");
const { store, addProject, dropProject, updateProject } = require("../../models");


router.get("/", (req, res) => {
  res.status(200).json({projects: store.getState().projects});
});

router.post("/", (req, res) => {
  const { project } = req.body;
  if (!project) res.status(400).send("broooo, stop being a douche");

  store.dispatch(addProject(project));
  const allProjects = store.getState().projects;
  const resProject = allProjects.filter(resProject => resProject.url === project.url)[0];
  res.status(200).json(resProject);
});

router.get("/:projectId", (req, res) => {
  const { projectId } = req.params;
  if (!projectId) res.status(400).send("broooo, stop being a douche");

  const allProjects = store.getState().projects;
  const project = allProjects.filter(project => project.id === projectId);
  res.status(200).json(project[0]);
});

router.delete("/:projectId", (req, res) => {
  const { projectId } = req.params;
  if (!projectId) res.status(400).send("broooo, stop being a douche");

  store.dispatch(dropProject(projectId));
  res.status(200).json(store.getState());
});

router.patch("/:projectId", (req, res) => {
  const { projectId } = req.params;
  const { project } = req.body;
  if (!projectId || !project) res.status(400).send("broooo, stop being a douche");

  store.dispatch(updateProject(projectId, project));
  res.status(200).json(store.getState());
});

router.use("/:projectId/builds", builds);

module.exports = router;
