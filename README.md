# PICTOS web app

## Tasks:

* `yarn install`: install dependencies
* `yarn serve`: compile and live-reload assets
* `yarn build`: compile and optimize for production
* `yarn lint`: sniff and auto-correct code

## Naming stuff:

* Follow existing conventions; most stylistic choices are enforced through linting, make sure your code editor it's properly configured.
* Use [BEM](http://getbem.com/) for S/CSS selectors
* Use CSS variables. Prefix each variable with the property it defines
* For **views**, files should emulate WordPress conventions for templates (see [template hierarchy](https://wphierarchy.com/)), such as:
  + If the view shows the information of a single item: `ObjectSingle.vue`
  + If the view shows a list of items: `ObjectArchive.vue`

## Tools

### VS Code extensions:

* [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) - EditorConfig support
* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - Integrates ESLint JavasScript
* [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) - Vue tooling