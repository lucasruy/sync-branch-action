jest.mock('@actions/core')

const Octokit = require('../__mocks__/octokit')
const core = require('@actions/core')

const octokit = Octokit()
const getPullsListByBranch = require('../get-pulls-list')

describe('getPullsListByBranch', () => {
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
        }
    })

    afterAll(() => {
        jest.restoreAllMocks()
    })

    test('Get already opened pull request', async () => {
        const data = await getPullsListByBranch(octokit, params)
        const expectedValue = {
            state: "open",
            title: "Amazing new feature",
            url: "https://api.github.com/repos/octocat/Hello-World/pulls/134",
            number: 134,
        }

        expect(data).toEqual(expectedValue)
    })
})
