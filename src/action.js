const core = require('@actions/core');
const github = require('@actions/github');

// Criar validação para verificar se pull request já existe

async function run() {
  const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN')
  const SOURCE_BRANCH = core.getInput('SOURCE_BRANCH')
  const DESTINATION_BRANCH = core.getInput('DESTINATION_BRANCH')
  const PULL_REQUEST_TITLE = core.getInput('PULL_REQUEST_TITLE')
  const PULL_REQUEST_BODY = core.getInput('PULL_REQUEST_BODY')

  const octokit = github.getOctokit(GITHUB_TOKEN)
  const { repository } = github.context.payload

  console.log('Start making a new pull request process...')

  console.log('repository.owner.login:', repository.owner.login)
  console.log('repository.name:', repository.name)
  console.log('DESTINATION_BRANCH:', DESTINATION_BRANCH)
  console.log('SOURCE_BRANCH:', SOURCE_BRANCH)

  try {
    const title = PULL_REQUEST_TITLE || `
      update: ${DESTINATION_BRANCH} to ${SOURCE_BRANCH}
    `
    const body = PULL_REQUEST_BODY || `
      This is an automatic Pull Request to keep ${SOURCE_BRANCH} up to date with ${DESTINATION_BRANCH}!
    `

    if (!SOURCE_BRANCH || !DESTINATION_BRANCH) {
      throw new Error('You need to enter a valid value in the "SOURCE_BRANCH" and "DESTINATION_BRANCH" fields.')
    }

    const data = await octokit.rest.pulls.create({
      owner: repository.owner.login,
      repo: repository.name,
      head: DESTINATION_BRANCH,
      base: SOURCE_BRANCH,
      title,
      body,
    })

    console.log('data:', data)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run();