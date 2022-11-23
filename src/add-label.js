const core = require('@actions/core')

/**
 * addLabel
 * --------------------
 * Add label to newly created pull request. In case the label doesn't exist, create it.
 *
 * @param {Instance} octokit Instance of octokit library
 * @param {Number} prNumber Recently created branch number
 * @param {Object} params Object with params to filter pulls list
 * @property {String} params.owner Repository owner user name
 * @property {String} params.repo Repository name
 * @property {String} params.body Pull request body content
 * @property {String} params.title Pull request title
 * @property {String} params.label Pull request label
 * @property {String} params.head Branch where you want to pull the new code
 * @property {String} params.base Branch you want to update
 */
async function addLabel({octokit, params, prNumber}) {
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

  const labels = data?.label ? label : newLabel

  await octokit.rest.issues.addLabels({
    owner,
    repo,
    issue_number: prNumber,
    labels: [labels]
  })

  core.info(`Label "${labels}" added successfully to pull request #${prNumber}!`)
}

module.exports = addLabel
