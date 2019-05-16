#### About 

technologies:
- React + Redux-thunk + Flow
- Tests (TDD)

Used visual code extensions:
- Flow Language Support (ext install flowtype.flow-for-vscode)
- ES7 React/Redux/GraphQL/React-Native snippets (ext install flowtype.flow-for-vscode)
- ESLint (ext install dbaeumer.vscode-eslint)
- Yarn (ext install gamunu.vscode-yarn)
- Material Icon Theme (ext install pkief.material-icon-theme)
- Markdown Preview Enhanced (ext install shd101wyy.markdown-preview-enhanced)
- File Name Search (ext install shawn.file-name-search

#### Createing app
```
> npx create-react-app .
```

##### add packages
```
> yarn add axios connected-react-router history react-redux react-router redux redux-actions redux-thunk
> yarn add axios-mock-adapter expect enzyme enzyme-adapter-react-16 eslint fetch-mock prettier redux-mock-store eslint-plugin-prettier eslint-config-prettier eslint-config-airbnb flow-bin --dev
```

##### init flow
> yarn flow init

add to packages.json > scripts:
```
"flow": "flow"
```

add extension 'Flow Language Support' to visual code 
Launch VS Code Quick Open (Ctrl+P) and paste:
```
> ext install flowtype.flow-for-vscode
```