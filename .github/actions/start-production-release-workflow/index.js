const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const token = core.getInput("gh_token", { required: true });
    const ref = core.getInput("ref", { required: true });
    const run_id = core.getInput("run_id", { required: true });

    console.log("+++++ref", ref);
    console.log("+++++run_id", run_id);

    // get the commit SHA from the ref
    // const sha = await revParse(ref);

    // set up github client
    const octokit = github.getOctokit(token);

    // create new release with release notes (or placeholder)
    core.debug(
      `call: octokit.rest.actions.listWorkflowRunsForRepo(${JSON.stringify({
        ...github.context.repo,
      })})`
    );
    const {
      data,
    } = await octokit.rest.actions.listWorkflowRunsForRepo({
      ...github.context.repo,
    });
    core.debug(`return: ${JSON.stringify({ data })}`);

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
