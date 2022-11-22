const createResponse = () => Promise.resolve({
    data: {
        number: 1,
        url: 'https://api.github.com/repos/sbsrnt/Hello-World/pulls/1',
        title: "Update README",
        labels: ['ci'],
    }
})

const listResponse = () => Promise.resolve({
    data: [
        {
            number: 1,
            url: 'https://api.github.com/repos/sbsrnt/Hello-World/pulls/1',
            title: "Update README",
            labels: ['ci'],
            state: "open"
        },
        {
            number: 2,
            url: 'https://api.github.com/repos/sbsrnt/Hello-World/pulls/2',
            title: "Update README",
            labels: ['ci'],
            state: "close"
        }
    ]
})

const createLabelResponse = () => Promise.resolve({
    data: {
        name: "ci"
    }
})

const getLabelResponse = () => Promise.resolve({
    data: {
        name: "ci"
    }
})

const addLabelsToPrResponse = () => Promise.resolve({
    data: [
        {
            name: 'ci'
        }
    ]
})


const mockedValue = () => {
    return {
        rest: {
            pulls: {
                create: jest.fn().mockImplementation(createResponse),
                list: jest.fn().mockImplementation(listResponse)
            },
            issues: {
                getLabel: jest.fn().mockImplementation(getLabelResponse),
                createLabel: jest.fn().mockImplementation(createLabelResponse),
                addLabels: jest.fn().mockImplementation(addLabelsToPrResponse)
            }
        }
    }
}

const Octokit = jest.fn().mockImplementation(mockedValue)

module.exports = Octokit
