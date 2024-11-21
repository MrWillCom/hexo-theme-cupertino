# Search

Search features are enabled by default, but requires a few steps to make it available.

1. Run
  ```sh
  # [hexo-generator-search](https://github.com/wzpan/hexo-generator-search)
  $ npm install hexo-generator-search --save
  ```
2. Add these lines to blog configuration `_config.yml`:
  ```yml
  search:
    path: search.json
    content: false
  ```
3. Add the search.json file to blog root directory, the following is an example:
  ```json
  [
    {
        "url": "/articles/Article-1-Title",
        "title": "Article-1-Title",
        "tags": ["tag1", "tag2"]
    },
    {
        "url": "/articles/Article-2-Title",
        "title": "Article-2-Title",
        "tags": ["tag1", "tag2"]
    },
  ]
  ```
4. Add new search page so that Hexo will generate it.
  ```sh
  $ hexo new page 'search'
  ```
1. Replace all its content with:
  ```markdown
  ---
  type: search
  ---
  ```

Done! Your search page is ready at `/search/`.
