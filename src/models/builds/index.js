// const redux = require("redux");
const shortid = require('shortid');


const addBuild = (projectId, build) => ({
  type: "ADD_BUILD",
  projectId,
  build,
});

const buildReducer = (buildsState = [], action) => {
  switch (action.type) {
    case "ADD_BUILD": {
      const newBuild = {
        ...action.build,
        id: shortid.generate()
      };

      return [...buildsState.builds, newBuild];
    }
    default:
      return buildsState;
  }
};

// const store = redux.createStore(
//   buildReducer,
//   initState
// );

// module.exports = { store, addBuild };
module.exports = { buildReducer, addBuild };