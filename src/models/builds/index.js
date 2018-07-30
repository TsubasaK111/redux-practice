// const redux = require("redux");
const shortid = require('shortid');
const { Stack } = require("immutable");

const addBuild = (projectId, build) => ({
  type: "ADD_BUILD",
  projectId,
  build,
});


const buildReducer = (buildsState = [], action) => {
  if (buildsState === []) console.log(`buildsState is empty: action`, action)
  
  switch (action.type) {
    case "ADD_BUILD": {
      const newBuild = {
        ...action.build,
        id: shortid.generate(),
        projectId: action.projectId
      };
      return [...buildsState, newBuild];
    }
    default:
      return buildsState;
  }
};


module.exports = { buildReducer, addBuild };