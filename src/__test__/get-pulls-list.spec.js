jest.mock('@actions/core')

const Octokit = require('../__mocks__/octokit')
const core = require('@actions/core')

const octokit = Octokit()
const getPullsListByBranch = require('../get-pulls-list')

describe('getPullsListByBranch', () => {
    let params = {}
    let pullRequestValues = {
        title: 'Pull request title',
        body: 'Pull request body'
    }

    beforeAll(() => {
        jest.spyOn(core, 'info').mockImplementation(jest.fn())
        jest.spyOn(core, 'setOutput').mockImplementation(jest.fn())

        params = {
            head: 'main',
            base: 'develop',
            repo: 'some-repo',
            owner: 'some-owner',
            body: 'Pull request body',
            title: 'Pull request title',
        }
    })

    afterAll(() => {
        jest.restoreAllMocks()
    })

    test('When there is no open sync pull request', async () => {
        const data = await getPullsListByBranch(octokit, {
            pullRequestValues,
            params
        })

        expect(data).toEqual(false)
    })
})
