/**
 * Get a filtered list of opened pull requests by branch.
 * @function
 * @param {InstanceType} octokit Instance of octokit library
 * @param {Object} params Object with params to filter pulls list
 * @property {String} params.owner The repository owner user name
 * @property {String} params.repo The repository name
 * @property {String} params.head The name of branch to use to filter pulls list
 * @returns {Object} Object with opened pull request or undefined.
 */
async function getPullsListByBranch (octokit, params) {
    const { data } = await octokit.rest.pulls.list(params)
    return data.find(pull => pull.state === 'open')
}

module.exports = getPullsListByBranch
