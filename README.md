# Backend API for the makeitMVP ecosystem - By Team MergeIntegration

## 0. Getting Started

1. Clone Repo, and `cd into the '/functions' directory`
2. Run `npm install`
3. On the Firebase Console **->Go to Communiti Project -> Project Settings -> Service ccounts -> Generate New Private Key**
4. Rename the downloaded json file to _"serviceAccount.json"_ and add it to the `./functions/src/config` directory. **This file is the private key, and must be kept confidential. It is already added to the .gitignore file.**
5. Install VS Code [Prettier Extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
6. Run `npm run start` on the _/functions_ folder.
7. To open up the local Firebase Emulator UI visit [ http://127.0.0.1:4000/](http://127.0.0.1:4000/)
8. To access the interactive Swagger API Docs, visit [http://127.0.0.1:5001/communiti-630fc/us-central1/api/docs/](http://127.0.0.1:5001/communiti-630fc/us-central1/api/docs/)
9. Test the default public endpoints using the UI, see created documents on the firestore Emulator.

## 1. Naming Conventions:

- Use camelCase for variable and function names.
- Use PascalCase for class names and interface names.
- Use camelCase for interface members.
- Use PascalCase for type names and enum names.
- Name files with camelCase (for example, `myFile.tsx` or `views.tsx`)

## 2. Git Workflow and Conventions

The project enforces the [Conventional Commits](https://www.conventionalcommits.org/) specification. This means that all your commit messages must be formatted according to the specification. To help you write commit messages, the project uses [Commitizen](https://github.com/commitizen/cz-cli), an interactive CLI that guides you through the commit process.

To commit new changes simply run `npm run commit` instead of `git commit -m`. This will open an interactive CLI.

The Collaborative Workflows we'll be following can be summarized in these two guides:

- [GitFlow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
- [Feature Branch Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)

### Step by step workflow for working on a new feature or bug fix:

1. Run `git checkout develop`
2. Fetch the latest changes from the remote by running `git pull`
3. Checkout a new branch with the following naming format **dev-<user>-<feature>** _(e.g. `git checkout -b dev-christian-oauth`)_
4. Make updates and new additions in the previously created branch
5. When the feature or bug-fix is complete, run `git checkout develop`
6. Run `git pull` again fetch any updates from the dev branch
7. Checkout your local working branch `git checkout dev-christian-oauth`
8. Run `git merge develop` to locally merge your branch with the updated dev branch
9. If there are no conflicts, simply run `git push --set-upstream origin dev-christian-oauth` and go to [github](https://github.com/makeitMVPadmin/Communiti-Platform/pulls), create a new Pull request. Important note: **Set base branch to Dev**.

_If you ran into conflicts, there are several ways to resolve this._

## 3. Tech Stack

Our API will be completely Serverless harnessing the power of [Firestore](https://firebase.google.com/docs/firestore), [Cloud Functions](https://firebase.google.com/docs/functions), Node.js, and [Express.js](https://expressjs.com/)
