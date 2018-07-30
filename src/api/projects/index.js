const router = require("express").Router();
const builds = require("./builds");
const { store, addProject, dropProject, updateProject } = require("../../models/projects/index");


router.get("/", (req, res) => {
  res.status(200).json(store.getState());
});

router.post("/", (req, res) => {
  const { project } = req.body;
  if(project){
    store.dispatch(addProject(project));
    const allProjects = store.getState().projects;
    const resProject = allProjects.filter( resProject => resProject.url === project.url)[0];
    res.status(200).json(resProject);
  } else {
    res.status(400).json({result: "broooo, stop being a douche"});
  }
});

router.get("/:projectId", (req, res) => {
  const { projectId } = req.params;
  const allProjects = store.getState().projects;
  const project = allProjects.filter( project => project.id === projectId);
  res.status(200).json(project[0]);
});

router.delete("/:projectId", (req, res) => {
  const { projectId } = req.params;
  store.dispatch(dropProject(projectId));
  res.status(200).json(store.getState());
});

router.patch("/:projectId", (req, res) => {
  const { projectId } = req.params;
  const { project } = req.body;
  store.dispatch(updateProject(projectId, project));
  // TODO edit a projects information. Make sure to validate whats being sent!
  res.status(200).json(store.getState());
});

router.use("/:projectId/builds", builds);

module.exports = router;
