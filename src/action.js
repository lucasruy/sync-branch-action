const core = require('@actions/core')
const github = require('@actions/github')

const setVariablesValues = require('./set-variables-values')
const getPullsListByBranch = require('./get-pulls-list')
const createNewPullRequest = require('./create-new-pull')

async function run() {
  const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN')
  const SOURCE_BRANCH = core.getInput('SOURCE_BRANCH')
  const DESTINATION_BRANCH = core.getInput('DESTINATION_BRANCH')

  const octokit = github.getOctokit(GITHUB_TOKEN)
  const { repository } = github.context.payload

  core.info('Starting process to make a new pull request...')

  try {
    const { repositoryValues, pullRequestValues } = setVariablesValues(repository)

    const openPullRequest = await getPullsListByBranch(octokit, {
      ...repositoryValues,
      head: SOURCE_BRANCH,
    })

    if (!openPullRequest) {
      await createNewPullRequest(octokit, {
        ...repositoryValues,
        ...pullRequestValues,
        head: SOURCE_BRANCH,
        base: DESTINATION_BRANCH,
      })
      return
    }

    core.info(`A pull request has already been opened to update the ${DESTINATION_BRANCH} branch`)
    core.setOutput("PULL_REQUEST_URL", openPullRequest.url)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run();
