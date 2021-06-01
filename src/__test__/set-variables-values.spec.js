jest.mock('@actions/core')

const core = require('@actions/core')
const setVariablesValues = require('../set-variables-values')

describe('setVariablesValues', () => {
    let repository = {}

    beforeAll(() => {
        jest.spyOn(core, 'info').mockImplementation(jest.fn())
        jest.spyOn(core, 'getInput').mockImplementation((inputName) => {
            if (inputName == 'PULL_REQUEST_TITLE') return 'Pull request title';
            if (inputName == 'PULL_REQUEST_BODY') return 'Pull request body';
            if (inputName == 'SOURCE_BRANCH') return 'develop';
            if (inputName == 'DESTINATION_BRANCH') return 'main';
        })

        repository = {
            name: 'same-owner',
            owner: {
                login: 'same-login'
            }
        }
    })

    afterAll(() => {
        jest.restoreAllMocks()
    })

    test('Set variables used inside of action', async () => {
        const data = await setVariablesValues(repository)
        const expectedValue = {
            repositoryValues: {
                repo: 'same-owner',
                owner: 'same-login'
            },
            pullRequestValues: {
                title: 'Pull request title',
                body: 'Pull request body'
            }
        }

        expect(data).toEqual(expectedValue)
    })
})
