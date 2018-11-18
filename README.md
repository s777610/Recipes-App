# Recipes-App

1. This project was built by Javascript, HTML5, CSS.<br>
2. Using Babel to covert ES6 to ES5 in order to be executed on all browsers.<br>
3. This project follows the MVC module, MVC stand for Model–view–controller.<br>
4. Models can deal with the server, which is Food API in this case, and internal logic.<br>
5. Views are able to handle UI, such as buttons, images, HTML markup, and so on. In addition, views can deal with DOM, event, etc.<br>
6. The models and views cannot interact directly, that is why we need the controller to be a middleman. Therefore, the App would be more maintainable and clean.<br>
7. Finally, I used webpack to bundle all files.<br>
8. I took an online tutorial on Udemy and came out with this project.<br>
 

## Installation
Create package.json
```
npm init
```

Install webpack
```
npm install webpack --save-dev
```

Install webpack command-line interface
```
npm install webpack-cli --save-dev
```

Reload server automatically
```
npm run start
```

For development mode
```
npm run dev
```

For production mode
```
npm run build
```

Install babel
```
npm install --save-dev @babel/core @babel/preset-env
npm install babel-loader --save-dev
```
Install polyfill
```
npm install --save @babel/polyfill
```

