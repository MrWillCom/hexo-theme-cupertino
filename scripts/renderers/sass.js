const sass = require('sass')

const renderer = data => {
  try {
    const result = sass.compile(data.path)
    return result.css
  } catch (error) {
    console.error(error)
    throw error
  }
}

hexo.extend.renderer.register('scss', 'css', renderer)
hexo.extend.renderer.register('sass', 'css', renderer)
