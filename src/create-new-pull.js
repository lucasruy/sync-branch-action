const core = require('@actions/core')

/**
 * createNewPullRequest
 * --------------------
 * Create a new pull request inside your repository based to params passed to this function.
 * 
 * @param {Instance} octokit Instance of octokit library
 * @param {Object} params Object with params to filter pulls list
 * @property {String} params.owner Repository owner user name
 * @property {String} params.repo Repository name
 * @property {String} params.body Pull request body content
 * @property {String} params.title Pull request title
 * @property {String} params.head Branch where you want to pull the new code
 * @property {String} params.base Branch you want to update
 * 
 * @returns {Object} Object with opened pull request or undefined.
 */
 async function createNewPullRequest (octokit, params) {
    const { data: createdPullRequest } = await octokit.rest.pulls.create(params)

    core.info(`Pull request #${createdPullRequest.number} created successfully!`)
    core.setOutput("PULL_REQUEST_URL", createdPullRequest.url)

    return createdPullRequest
}

module.exports = createNewPullRequest
