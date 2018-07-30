const redux = require("redux");
const { combineReducers } = require("redux");
const builds = require("./builds");
const projects = require("./projects");

const masterReducer = combineReducers({
  builds: builds.buildReducer,
  projects: projects.projectReducer,
})

const initState = { projects: [], builds: [] };

const store = redux.createStore(
  masterReducer,
  initState
);

module.exports = { store, ...builds, ...projects }