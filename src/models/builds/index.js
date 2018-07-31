const shortid = require('shortid');
const actions = require("./actions");

class Build {
  constructor(buildsState, addBuildAction) {
    for (var prop in addBuildAction.build) {
      this[prop] = addBuildAction.build[prop];
    }

    this.buildStatus = "Running";
    this.output = "Donezo!";
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
    case "START_BUILD": {
      const newBuild = new Build(buildsState, action);
      return [...buildsState, newBuild];
    }

    case "FINISH_BUILD": {
      let finishedBuild = buildsState.filter(build => {
        return build.id === action.buildId && build.projectId === action.projectId
      })[0];

      finishedBuild.buildStatus = Math.random() > 0.5 ? "Failed" : "Success";
      return [...buildsState, finishedBuild];
    }

    default:
      return buildsState;
  }
};


module.exports = { buildReducer, ...actions };