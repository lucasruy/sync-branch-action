## Sync Branch Action
[![CI](https://github.com/LucasRuy/sync-branch-action/actions/workflows/ci.yml/badge.svg)](https://github.com/LucasRuy/sync-branch-action/actions/workflows/ci.yml)
![PR](https://img.shields.io/badge/PRs-welcome-blue)

An action to automate your branch update process. This action opens a pull request automatically for you whenever there are changes in a branch that you want to observe.

## Features
 - Open a pull request whenever there are changes to a branch you want to observe.
 - Before opening a new pull request, check if there is already an open one with the same purpose. If so, a new pull request is not opened.
 - If a pull request is already open and there are changes to the observed branch, those changes are automatically included in the pull request already open.
 - If `label` is provided and doesn't exist in the repository, action creates missing label. 

## Inputs
| Name               |     Type    |   Required  | Description                                                                                                                                                           |
|--------------------|    :----:   |    :----:   |-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| GITHUB_TOKEN       |    String   |     true    | User token to be associated with this pull request.                                                                                                                   |
| SOURCE_BRANCH      | String | true | Branch where you implemented your new code.                                                                                                                           |
| DESTINATION_BRANCH | String | true | Branch you want to send your new code.                                                                                                                                |
| PULL_REQUEST_TITLE | String | false | Standard title for your update pull request. Default is: `"update: sync ${DESTINATION_BRANCH} with ${SOURCE_BRANCH}`                                                  |
| PULL_REQUEST_BODY  | String | false | Content with description for your automated pull. Default is: `"This is an automatic Pull Request to keep ${DESTINATION_BRANCH} up to date with ${SOURCE_BRANCH}! 🔄"` |
| PULL_REQUEST_LABEL | String | false | Label for your automated pull. Default is: `""`                    |

## Outputs
|     Name     |     Type    |    Description    |
| --------------- |    :----:   | ----------------- |
| PULL_REQUEST_URL |    String   | The url of the generated pull request. |

## Usage example
Usage example for simple cases.
```
name: Update Branch

on:
  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Setup environment
        uses: actions/checkout@v2

      - name: Create update pull request
        uses: LucasRuy/sync-branch-action@v1.1.1
        with:
          GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}}
          SOURCE_BRANCH: 'main'
          DESTINATION_BRANCH: 'develop'
```

Example of use with customized title, description and label.
```
name: Update Branch

on:
  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Setup environment
        uses: actions/checkout@v2

      - name: Create update pull request
        uses: LucasRuy/sync-branch-action@v1.1.1
        with:
          GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}}
          SOURCE_BRANCH: 'main'
          DESTINATION_BRANCH: 'develop'
          PULL_REQUEST_TITLE: 'sync: keep branch develop updated'
          PULL_REQUEST_BODY: 'Custom body of my auto update pull request.'
          PULL_REQUEST_LABEL: 'ci'
```

## Next steps [to-do]
New possible features for this action. Ideas are welcome.
- Include the possibility of including in the description of the automatic PR, which branches or PR's merged into the observed branch.
- Support for multiple labels
