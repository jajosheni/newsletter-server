# Iliria Newsletter

<a href="https://github.com/jajosheni/iliria-mobile"><img src="https://img.shields.io/badge/mobile-app-ff00ff.svg"/></a>
<img src="https://img.shields.io/badge/node-JS-68a063.svg"/>
<img src="https://img.shields.io/badge/express-JS-gray.svg"/>
<img src="https://img.shields.io/badge/mongo-DB-589636.svg"/>
<img src="https://img.shields.io/badge/jade-PUG-brown.svg"/>
<p align="left">
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
``` URL = /api ```

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


```
USERS:
  GET   /users           | List all users
  POST  /users           | Create a user
```

#### NOTE:
  1. Replace Google API key with your own at `/routes/api/pushNotif.js` (I might delete my google firebase project sometime in the future).
  
