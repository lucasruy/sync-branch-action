const core = require('@actions/core')

/**
 * getPullsListByBranch
 * --------------------
 * Get a filtered list of opened pull requests by branch.
 * 
 * @function
 * @param {Instance} octokit Instance of octokit library
 * @param {Object} values Object with values to filter pulls list
 * @param {String} values.pullRequestValues Default pull request values
 * @param {String} values.pullRequestValues.title Default pull request title
 * @param {String} values.pullRequestValues.body Default pull request body
 * @param {String} values.params Object with values to filter pulls list
 * @param {String} values.params.owner The repository owner user name
 * @param {String} values.params.repo The repository name
 * @param {String} values.params.head The name of branch to use to filter pulls list
 * @returns {Object} Object with opened pull request or undefined.
 */
async function getPullsListByBranch (octokit, values) {
    const { pullRequestValues, params} = values

    core.info('Getting values to start search.')
    core.info('Verifying if already exist opened pull request.')

    try {
        const { data } = await octokit.rest.pulls.list(params)

        const hasSyncPullRequestOpen = data
            .filter(pull => pull.title === pullRequestValues.title)
            .length > 0

        return hasSyncPullRequestOpen
    } catch (error) {
        core.info('There was a problem fetching the pull request list:', error.message)
        return data.find(pull => pull.state === 'open')
    }
}

module.exports = getPullsListByBranch
