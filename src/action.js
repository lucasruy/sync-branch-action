const core = require('@actions/core')
const github = require('@actions/github')

const getPullsListByBranch = require('./get-pulls-list')

// Criar validação para verificar se pull request já existe

async function run() {
  const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN')
  const SOURCE_BRANCH = core.getInput('SOURCE_BRANCH')
  const DESTINATION_BRANCH = core.getInput('DESTINATION_BRANCH')
  const PULL_REQUEST_TITLE = core.getInput('PULL_REQUEST_TITLE')
  const PULL_REQUEST_BODY = core.getInput('PULL_REQUEST_BODY')

  const octokit = github.getOctokit(GITHUB_TOKEN)
  const { repository } = github.context.payload

  core.info('Starting process to make a new pull request...')

  try {
    const repo = repository.name
    const owner = repository.owner.login

    const title = PULL_REQUEST_TITLE || `
      update: ${DESTINATION_BRANCH} to ${SOURCE_BRANCH}
    `
    const body = PULL_REQUEST_BODY || `
      This is an automatic Pull Request to keep ${DESTINATION_BRANCH} up to date with ${SOURCE_BRANCH}!
    `

    if (!SOURCE_BRANCH || !DESTINATION_BRANCH) {
      throw new Error('You need to enter a valid value in the "SOURCE_BRANCH" and "DESTINATION_BRANCH" fields.')
    }

    const openPullRequest = await getPullsListByBranch(octokit, {
      owner,
      repo,
      head: SOURCE_BRANCH,
    })

    if (!openPullRequest) {
      const { data: createdPullRequest } = await octokit.rest.pulls.create({
        owner,
        repo,
        body,
        title,
        head: SOURCE_BRANCH,
        base: DESTINATION_BRANCH,
      })
  
      core.info(`Pull request #${createdPullRequest.number} created successfully!`)
      core.setOutput("PULL_REQUEST_URL", createdPullRequest.url)
      return
    }

    core.info(`A pull request has already been opened to update the ${DESTINATION_BRANCH} branch`)
    core.setOutput("PULL_REQUEST_URL", openPullRequest.url)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run();