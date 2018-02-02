[![Build Status](https://travis-ci.org/seihmd/markdown-blog-loader.svg?branch=master)](https://travis-ci.org/seihmd/markdown-blog-loader)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/seihmd/markdown-blog-loader/blob/master/LICENSE)

# markdown-blog-loader
webpack loader for importing markdown file with front-matter.

# example

**awesome-post.md**
```
---
title: title of awesome post
tags: ['webpack', 'loader']
date: '2018-02-02'
---

# YEAH
```

``` js
import post from 'awesome-post.md';

/** post
{
  data: {
    title: 'title of awesome post',
    tags: ['webpack', 'loader'],
    date: '2018-02-02'
  },
  content: '# YEAH'
}
*/
```

# install

``` bash
npm install --save-dev markdown-blog-loader
```

``` bash
yarn add --dev markdown-blog-loader
```

# usage

**webpack.config.js**

``` js
{
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: 'markdown-blog-loader'
          }
        ]
      }
    ]
  }
};
```

# front-matter

supports 3 types

## yaml
```
---
title: title of awesome post
tags: ['webpack', 'loader']
date: '2018-02-02'
---
```

## json
```
--- json
{
  "title": "title of awesome post",
  "tags": ["webpack", "loader"],
  "date": "2018-02-02"
}
---
```

## js
```
--- js
{
  title: 'title of awesome post',
  tags: ['webpack', 'loader'],
  date: '2018-02-02'
}
---
```
