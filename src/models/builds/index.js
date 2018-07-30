const shortid = require('shortid');

const addBuild = (projectId, build) => ({
  type: "ADD_BUILD",
  projectId,
  build,
});

class Build {
  constructor(buildsState, addBuildAction) {
    for (var prop in addBuildAction.build) {
      this[prop] = addBuildAction.build[prop];
    }
    
    this.id = shortid.generate();
    this.projectId = addBuildAction.projectId;
    this.buildNumber = this.getBuildNumber(buildsState);
  }

  getBuildNumber(buildsState) {
    let previousBuild = buildsState
      .filter(build => build.projectId === this.projectId)
      .slice()
      .pop();

    if (!previousBuild || !previousBuild["buildNumber"]) {
      return 1;
    } else {
      return previousBuild["buildNumber"] + 1;
    }
  }
}

const buildReducer = (buildsState = [], action) => {
  switch (action.type) {
    case "ADD_BUILD": {
      const newBuild = new Build(buildsState, action);
      return [...buildsState, newBuild];
    }
    default:
      return buildsState;
  }
};


module.exports = { buildReducer, addBuild };