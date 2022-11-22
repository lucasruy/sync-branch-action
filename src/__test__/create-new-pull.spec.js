jest.mock('@actions/core')

const Octokit = require('../__mocks__/octokit')
const core = require('@actions/core')

const octokit = Octokit()
const createNewPullRequest = require('../create-new-pull')

describe('createNewPullRequest', () => {
    let params = {}

    beforeAll(() => {
        jest.spyOn(core, 'info').mockImplementation(jest.fn())
        jest.spyOn(core, 'setOutput').mockImplementation(jest.fn())

        params = {
            head: 'main',
            base: 'develop',
            body: 'some-body',
            repo: 'some-repo',
            owner: 'some-owner',
            title: 'some-title',
            label: 'ci'
        }
    })

    afterAll(() => {
        jest.restoreAllMocks()
    })

    test('Create a new pull request', async () => {
        const data = await createNewPullRequest(octokit, params)
        const expectedValue = {
            number: 1,
            url: 'https://api.github.com/repos/sbsrnt/Hello-World/pulls/1',
            title: "Update README",
            labels: ['ci']
        }

        expect(data).toEqual(expectedValue)
    })
})
