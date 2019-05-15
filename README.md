##### create app
```
> npx create-react-app .
```

##### add packages
```
> yarn add axios connected-react-router history react-redux react-router redux redux-actions redux-thunk
> yarn add axios-mock-adapter enzyme enzyme-adapter-react-16 eslint fetch-mock prettier redux-mock-store eslint-plugin-prettier eslint-config-prettier eslint-config-airbnb flow-bin --dev
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