const createResponse = () => Promise.resolve({
    data: {
        number: 134,
        url: 'https://api.github.com/repos/octocat/Hello-World/pulls/134',
        title: "Amazing new feature",
    }
})

const listResponse = () => Promise.resolve({
    data: [
        {
            number: 134,
            url: 'https://api.github.com/repos/octocat/Hello-World/pulls/134',
            title: "Amazing new feature",
            state: "open"
        },
        {
            number: 135,
            url: 'https://api.github.com/repos/octocat/Hello-World/pulls/135',
            title: "Amazing new feature",
            state: "close"
        }
    ]
})

const mockedValue = () => {
    return {
        rest: {
            pulls: {
                create: jest.fn().mockImplementation(createResponse),
                list: jest.fn().mockImplementation(listResponse)
            }
        }
    }
}

const Octokit = jest.fn().mockImplementation(mockedValue)

module.exports = Octokit
