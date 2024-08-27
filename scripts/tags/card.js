const cardGrid = (args, content) => {
  return `<div class="card-grid">${hexo.render.renderSync({
    text: content,
    engine: 'nunjucks',
  })}</div>`
}

const card = (args, content) => {
  return `<div class="card">${hexo.render.renderSync({
    text: content,
    engine: 'nunjucks',
  })}</div>`
}

const cardCoverImg = args => {
  return `<div class="cover-img"><img src="${args[0]}" alt="${args[1]}"></div>`
}

const cardContent = (args, content) => {
  return `<div class="content">${hexo.render.renderSync({
    text: content,
    engine: 'nunjucks',
  })}</div>`
}

const cardContentTitle = args => {
  return `<p class="title">${hexo.render.renderSync({
    text: args[0],
    engine: 'nunjucks',
  })}</p>`
}

const cardContentDescription = args => {
  return `<p class="description">${hexo.render.renderSync({
    text: args[0],
    engine: 'nunjucks',
  })}</p>`
}

const cardActions = (args, content) => {
  return `<div class="actions">${hexo.render.renderSync({
    text: content,
    engine: 'nunjucks',
  })}</div>`
}

const cardActionsLeft = (args, content) => {
  return `<div class="left">${hexo.render.renderSync({
    text: content,
    engine: 'nunjucks',
  })}</div>`
}

const cardActionsRight = (args, content) => {
  return `<div class="right">${hexo.render.renderSync({
    text: content,
    engine: 'nunjucks',
  })}</div>`
}

hexo.extend.tag.register('cardGrid', cardGrid, { ends: true })
hexo.extend.tag.register('card', card, { ends: true })
hexo.extend.tag.register('cardCoverImg', cardCoverImg)
hexo.extend.tag.register('cardContent', cardContent, { ends: true })
hexo.extend.tag.register('cardContentTitle', cardContentTitle)
hexo.extend.tag.register('cardContentDescription', cardContentDescription)
hexo.extend.tag.register('cardActions', cardActions, { ends: true })
hexo.extend.tag.register('cardActionsLeft', cardActionsLeft, { ends: true })
hexo.extend.tag.register('cardActionsRight', cardActionsRight, { ends: true })
