# Backend API for the makeitMVP ecosystem - By MergeIntegration

## 1. Naming Conventions:

- Use camelCase for variable and function names.
- Use PascalCase for class names and interface names.
- Use camelCase for interface members.
- Use PascalCase for type names and enum names.
- Name files with camelCase (for example, ebsVolumes.tsx or storage.tsb)

## 2. Lint Rules and Code Formatting:

ESLint statically analyzes the code to quickly find issues. Prettier is a code formatter that dynamically updates code to adhere to certain formatting rules.

Resources: [What is a Linter ?](https://www.testim.io/blog/what-is-a-linter-heres-a-definition-and-quick-start-guide/), [ESlint](https://typescript-eslint.io/), [Prettier](https://prettier.io/docs/en/)

## 3. Git Workflow and Conventions

The project enforces the [Conventional Commits](https://www.conventionalcommits.org/) specification. This means that all your commit messages must be formatted according to the specification. To help you write commit messages, the project uses [Commitizen](https://github.com/commitizen/cz-cli), an interactive CLI that guides you through the commit process.

To commit new changes simply run `npm run commit` instead of `git commit -m`.

## 4. Naming Conventions

- Use camelCase for variable and function names.
- Use PascalCase for class names and interface names.
- Use camelCase for interface members.
- Use PascalCase for type names and enum names.
- Name files with camelCase (for example, `myFile.tsx` or `views.tsx`)

## 5. Tech Stack

Our API will be completely Serverless harnessing the power of [Firestore](https://firebase.google.com/docs/firestore), [Cloud Functions](https://firebase.google.com/docs/functions), [API Getaway](https://cloud.google.com/api-gateway), and Typescript.

Here's a **[Short Guide](https://docs.aws.amazon.com/prescriptive-guidance/latest/best-practices-cdk-typescript-iac/typescript-best-practices.html#naming-conventions)** about the best practices for working with Typescript.

If you check out the Firestore [REST API specification](https://firebase.google.com/docs/firestore/reference/rest/#rest-resource:-v1.projects.databases.documents) and compare it to the structure of the [endpoints for cloud functions](https://cloud.google.com/functions/docs/calling/http#url). You will notice two divergent patterns, the former follows a resource naming structure, and the latter has urls that are action oriented. So in order to create a fully serverless API solution that adheres to RESTful principles and provides a consistent, easy to use interface for the frontend teams, we can use API getaway, this would allow us to create a unified interface that can route requests to either Firestore or Cloud Functions.
