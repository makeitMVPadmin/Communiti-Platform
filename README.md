# Backend API for the makeitMVP ecosystem - By MergeIntegration

## 0. Getting Started

1. Clone Repo
2. Run `npm install`
3. Create a `.env` file at the root of the project with the following variables: (apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId).
4. You can get the values of these by going to the **Firebase Console -> Communiti -> Project Settings -> Service ccounts -> Generate New Private Key**
5. Rename the downloaded json file to _"serviceAccounts.js"_ and add it to the `./functions/src/config` folder
6. Install VS Code [Prettier Extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
7. Run `npm run start`
8. To open up the local Firebase Emulator UI visit [ http://127.0.0.1:4000/](http://127.0.0.1:4000/)
9. To access the interactive Swagger Docs, visit [http://127.0.0.1:5001/communiti-630fc/us-central1/api/docs/](http://127.0.0.1:5001/communiti-630fc/us-central1/api/docs/)
10. Test the default public endpoints using the interactive UI, and see created documents on the firestore Emulator

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
7. Checkout your local working branch `git checkout -b dev-christian-oauth`
8. Run `git merge develop` to locally merge your branch with the updated dev branch
9. If there are no conflicts, simply run `git push --set-upstream origin dev-christian-oauth` and go to [github](https://github.com/makeitMVPadmin/Communiti-Platform/pulls), create a new Pull request. Important note: **Set base branch to Dev**.

_If you ran into conflicts, there are several ways to resolve this._

## 3. Tech Stack

Our API will be completely Serverless harnessing the power of [Firestore](https://firebase.google.com/docs/firestore), [Cloud Functions](https://firebase.google.com/docs/functions), Node.js, and [Express.js](https://expressjs.com/)
