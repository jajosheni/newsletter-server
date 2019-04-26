# Iliria Newsletter

<a href="https://github.com/jajosheni/iliria-mobile"><img src="https://img.shields.io/badge/server-part-ff00ff.svg"/></a>
<img src="https://img.shields.io/badge/node-JS-68a063.svg"/>
<img src="https://img.shields.io/badge/express-JS-FB7774.svg"/>
<img src="https://img.shields.io/badge/mongo-DB-589636.svg"/>
<img src="https://img.shields.io/badge/jade-PUG-brown.svg"/>

<h4 align="center">Server side of a digital newsletter</h4>
<p align="center">
<img src="https://raw.githubusercontent.com/jajosheni/jajosheni.github.io/master/assets/sitepics/newsletter.png">
</p>

### Installation

```console
$ npm install
```
### Start Server
```console
$ npm start
```

### Implemented API
``` URL = http://localhost:3000/api ```

```
CATEGORIES:
  GET   /categories           | List all categories
  POST  /categories           | Create a category
  GET   /categories/new       | Render New category page
  GET   /categories/:category | Get articles by category name
  DEL   /categories/:category | Delete a category
```

```
ARTICLES:
  GET   /articles           | List all articles
  POST  /articles           | Create an article
  GET   /articles/new       | Render New article page
  GET   /articles/:id       | Get article by id
  PUT   /articles/:id       | Update article by id
  DEL   /articles/:id       | Delete article by id
  GET   /articles/:id/edit  | Render Edit article page
```
