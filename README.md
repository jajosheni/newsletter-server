# Iliria Newsletter

## Server side of a digital newsletter.
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
