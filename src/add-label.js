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
 * @property {String} params.label Pull request label
 * @property {String} params.head Branch where you want to pull the new code
 * @property {String} params.base Branch you want to update
 *
 * @returns {Object} Object with opened pull request or undefined.
 */
async function addLabel ({octokit, params, prNumber}) {
  const {owner, repo, label} = params;
  const {data} = await octokit.rest.issues.getLabel({owner, repo, name: label})

  let newLabel;
  if(!data.label) {
    const {title} = await octokit.rest.issues.createLabel({
      owner,
      repo,
      name: data.label,
    });
    core.info(`Label ${title} created successfully!`)
    newLabel = title;
  }

  await octokit.rest.issues.addLabels({
    owner,
    repo,
    issue_number: prNumber,
    labels: label
  })

  core.info(`Label "${data.label ? label : newLabel}" added successfully to pull request #${prNumber}!`)
}

module.exports = addLabel
