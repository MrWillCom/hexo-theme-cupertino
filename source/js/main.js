;(() => {
  try {
  var navEl = document.getElementById('theme-nav')
  if (!navEl) throw new Error('No nav');
  
  // 为导航项添加索引
  function updateNavItemIndices() {
    const navItems = document.querySelectorAll('#theme-nav .nav-item');
    navItems.forEach((item, index) => {
      item.style.setProperty('--index', index);
    });
  }
  
  // 初始化时更新索引
  updateNavItemIndices();
  
  navEl.addEventListener('click', e => {
    if (window.innerWidth <= 600) {
      // 点击前更新索引，确保 TOC 项也有索引
      updateNavItemIndices();
      
      if (!document.body.classList.contains('nav-open')) {
        document.body.style.setProperty(
          '--open-height',
          48 +
            document.querySelector('#theme-nav .nav-items').clientHeight +
            'px',
        )
      }

      document.body.classList.toggle('nav-open')
    } else {
      document.body.style.removeProperty('--open-height')
      document.body.classList.remove('nav-open')
    }
  })

  window.addEventListener('resize', () => {
    if (document.body.classList.contains('nav-open')) {
      // 调整大小时更新索引
      updateNavItemIndices();
      
      document.body.style.setProperty(
        '--open-height',
        48 +
          document.querySelector('#theme-nav .nav-items').clientHeight +
          'px',
      )
    }
    if (window.innerWidth > 600) {
      document.body.style.removeProperty('--open-height')
      document.body.classList.remove('nav-open')
    }
  })

  if (document.getElementById('theme-color-scheme-toggle')) {
    var themeColorSchemeToggleEl = document.getElementById(
      'theme-color-scheme-toggle',
    )
    var options = themeColorSchemeToggleEl.getElementsByTagName('input')

    for (const option of options) {
      if (option.value == document.body.dataset.colorScheme) {
        option.checked = true
      }
      option.addEventListener('change', ev => {
        var value = ev.target.value
        ThemeCupertino.ColorScheme.set(value)
        for (const o of options) {
          if (o.value != value) {
            o.checked = false
          }
        }
      })
    }
  }

  if (document.body.attributes['data-rainbow-banner']) {
    var shown = false
    switch (document.body.attributes['data-rainbow-banner-shown'].value) {
      case 'always':
        shown = true
        break
      case 'auto':
        shown =
          new Date().getMonth() + 1 ==
          parseInt(
            document.body.attributes['data-rainbow-banner-month'].value,
            10,
          )
        break
      default:
        break
    }
    if (shown) {
      var banner = document.createElement('div')

      banner.style.setProperty(
        '--gradient',
        `linear-gradient(90deg, ${document.body.attributes['data-rainbow-banner-colors'].value})`,
      )
      banner.classList.add('rainbow-banner')

      navEl.after(banner)
    }
  }

  // TOC 生成逻辑 - 确保 DOM 完全解析后执行
  function initTOC() {
    var tocEnabled = document.body.dataset.toc === 'true' || document.body.attributes['data-toc']?.value === 'true';
    if (!tocEnabled) return;

    // 首先移除所有现有的 TOC 容器
    const existingMobileToc = document.querySelector('.toc-nav-item');
    if (existingMobileToc) {
      existingMobileToc.remove();
    }
    
    const existingDesktopToc = document.querySelector('aside .toc');
    if (existingDesktopToc) {
      existingDesktopToc.parentElement.remove();
    }

    const content = document.getElementsByClassName('content')[0]
    if (!content) return;

    const maxDepth = document.body.dataset.tocMaxDepth || 2;

    var headingSelector = ''
    for (var i = 1; i <= maxDepth; i++) {
      headingSelector += 'h' + i + ','
    }
    headingSelector = headingSelector.slice(0, -1)
    const headings = Array.from(content.querySelectorAll(headingSelector))

    var source = headings
      .map(heading => ({
        html: heading.innerHTML,
        href:
          heading.getElementsByClassName('headerlink')[0]?.attributes['href']
            .value ?? null,
      }))
      .filter(heading => heading.href)

    const toc = document.createElement('div')
    toc.classList.add('toc')
    
    // 添加回到顶部按钮
    const topItem = document.createElement('p');
    const topLink = document.createElement('a');
    topLink.href = '#main-content';
    topLink.innerHTML = '回到顶部';
    topItem.appendChild(topLink);
    toc.appendChild(topItem);

    for (const i in source) {
      const item = document.createElement('p')
      const link = document.createElement('a')
      link.href = source[i].href
      link.innerHTML = source[i].html
      // 检查 headerlink 元素是否存在
      const headerlink = link.getElementsByClassName('headerlink')[0];
      if (headerlink) {
        link.removeChild(headerlink);
      }
      item.appendChild(link)
      toc.appendChild(item)
    }

    const commentsSection = document.getElementById('comments');
    const hasHeadings = source.length > 0;
    
    if (commentsSection) {
      const commentsItem = document.createElement('p');
      const commentsLink = document.createElement('a');
      commentsLink.href = '#comments';
      commentsLink.innerHTML = '评论区';
      commentsItem.appendChild(commentsLink);
      toc.appendChild(commentsItem);
    }
    
    // 所有屏幕尺寸统一使用 aside TOC 贴边浮动样式
    const tocContainer = document.createElement('aside')
    tocContainer.appendChild(toc)
    
    if (hasHeadings || commentsSection || true) { // 即使没有标题也显示 TOC（包含回到顶部按钮）
      const postEl = document.getElementsByClassName('post')[0];
      const metaEl = postEl?.getElementsByClassName('meta')[0];
      if (metaEl) {
        metaEl.after(tocContainer)
        
        // 添加 TOC 展开/收起功能
        tocContainer.addEventListener('click', function(e) {
          e.stopPropagation();
          this.classList.toggle('toc-expanded');
          // 点击展开时移除 toc-no-hover，确保可以正常展开
          this.classList.remove('toc-no-hover');
        });
        
        // 点击空白区域收起 TOC
        document.addEventListener('click', function(e) {
          if (!tocContainer.contains(e.target)) {
            tocContainer.classList.remove('toc-expanded');
          }
        });
      }
    }
  }
  
  // 监听屏幕尺寸变化，重新调整 TOC 位置
  window.addEventListener('resize', () => {
    // 重新初始化 TOC
    initTOC();
    setTimeout(initScrollSpy, 100);
  });

  // Scroll Spy: 滚动时高亮当前区域的 TOC 项
  function initScrollSpy() {
    const tocContainer = document.querySelector('aside .toc');
    if (!tocContainer) return;

    const tocLinks = tocContainer.querySelectorAll('a');
    if (tocLinks.length === 0) return;

    // 滚动预览：滚动时滑出，停止4秒后收回
    const tocAside = tocContainer.closest('aside');

    const sections = [];
    tocLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        sections.push({ el: target, link: link });
      }
    });

    if (sections.length === 0) return;

    let activeLink = null;

    function updateActiveSection() {
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      let currentSection = null;

      // 找到第一个位置超过滚动位置 1/3 视口高度的 section
      const threshold = viewportHeight * 0.33;
      
      for (let i = 0; i < sections.length; i++) {
        const el = sections[i].el;
        const offsetTop = el.getBoundingClientRect().top + scrollTop;
        
        if (offsetTop <= scrollTop + threshold) {
          currentSection = sections[i];
        } else {
          break;
        }
      }

      // 全部清除再设置，确保任何时候只有一个高亮
      tocLinks.forEach(l => l.classList.remove('active'));
      
      if (currentSection) {
        currentSection.link.classList.add('active');
        activeLink = currentSection.link;
      } else {
        activeLink = null;
      }
    }

    // 点击 TOC 链接后更新高亮
    tocLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault(); // 阻止默认行为
        e.stopPropagation(); // 阻止事件冒泡
        
        // 获取目标位置并平滑滚动
        const href = link.getAttribute('href');
        if (href && href !== '#') {
          const target = document.querySelector(href);
          if (target) {
            const offsetTop = target.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        }
        
        // 移除焦点，防止 focus 状态导致双高亮
        link.blur();
        
        // 多次延迟执行，覆盖整个滚动动画过程
        [100, 300, 600].forEach(delay => {
          setTimeout(updateActiveSection, delay);
        });
        
        // 点击跳转后保持 TOC 展开，让用户可以继续看到滚动高亮
        // 用户可以点击空白区域或再次点击 TOC 来收起
      }, { capture: true }); // 使用捕获阶段，确保最先执行
    });

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    updateActiveSection();

    // 滚动预览：滚动时滑出，停止4秒后收回
    if (tocAside) {
      let peekTimer = null;

      function showPeek() {
        if (!tocAside.classList.contains('toc-expanded')) {
          tocAside.classList.add('toc-peek');
        }
        clearTimeout(peekTimer);
        peekTimer = setTimeout(() => {
          tocAside.classList.remove('toc-peek');
        }, 400);
      }

      window.addEventListener('scroll', showPeek, { passive: true });

      // 点击展开时清除定时器并移除 peek 状态
      tocAside.addEventListener('click', () => {
        clearTimeout(peekTimer);
        tocAside.classList.remove('toc-peek');
      });
    }
  }

  // 确保 DOM 完全解析后执行 TOC 初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initTOC();
      setTimeout(initScrollSpy, 100);
    });
  } else {
    initTOC();
    setTimeout(initScrollSpy, 100);
  }

  const heroEl = document.querySelector('.hero.exit-while-scroll')
  if (heroEl) {
    const updateHeroHeight = () => {
      heroEl.style.setProperty('--current-hero-height', heroEl.clientHeight)
    }

    updateHeroHeight()
    window.addEventListener('resize', updateHeroHeight)
  }

  // 代码块复制按钮
  const codeBlocks = document.querySelectorAll('.highlight')
  codeBlocks.forEach(block => {
    // 创建复制按钮
    const copyButton = document.createElement('button')
    copyButton.className = 'copy-button'
    copyButton.innerHTML = '<i class="bi bi-clipboard"></i><span>复制</span>'

    // 函数：检查是否应该居中
    const checkButtonPosition = () => {
      const lines = block.querySelectorAll('.code pre .line')
      const preElement = block.querySelector('.code pre')
      const codeElement = block.querySelector('.code')
      const isSingleLine = lines.length === 1
      
      // 检查水平滚动条 - 检查多个层级
      let hasHorizontalScroll = false
      if (preElement) {
        hasHorizontalScroll = preElement.scrollWidth > preElement.clientWidth
      }
      if (!hasHorizontalScroll && codeElement) {
        hasHorizontalScroll = codeElement.scrollWidth > codeElement.clientWidth
      }
      if (!hasHorizontalScroll) {
        const tableElement = block.querySelector('table')
        if (tableElement) {
          hasHorizontalScroll = tableElement.scrollWidth > tableElement.clientWidth
        }
      }

      // 检查 overflow-x 样式
      if (!hasHorizontalScroll && preElement) {
        const overflowX = window.getComputedStyle(preElement).overflowX
        if (overflowX === 'auto' || overflowX === 'scroll') {
          hasHorizontalScroll = true
        }
      }

      console.log('Code block check:', {
        lines: lines.length,
        isSingleLine,
        hasHorizontalScroll,
        preScrollWidth: preElement?.scrollWidth,
        preClientWidth: preElement?.clientWidth,
        codeScrollWidth: codeElement?.scrollWidth,
        codeClientWidth: codeElement?.clientWidth,
        tableScrollWidth: block.querySelector('table')?.scrollWidth,
        tableClientWidth: block.querySelector('table')?.clientWidth
      })

      // 单行且无滚动：居中；多行或有滚动：右上角
      if (isSingleLine && !hasHorizontalScroll) {
        copyButton.classList.add('single-line')
      } else {
        copyButton.classList.remove('single-line')
      }
    }

    // 延迟检查，确保 DOM 渲染完成
    setTimeout(checkButtonPosition, 100)
    setTimeout(checkButtonPosition, 500)

    // 监听窗口大小变化
    window.addEventListener('resize', checkButtonPosition)

    // 使用 ResizeObserver 监听代码块大小变化
    const preElement = block.querySelector('.code pre')
    if (preElement) {
      const resizeObserver = new ResizeObserver(checkButtonPosition)
      resizeObserver.observe(preElement)
    }

    // 获取代码内容（排除行号 gutter）
    // Hexo highlight.js 生成的结构: table > tr > td.gutter + td.code > pre > code
    let codeElement = block.querySelector('.code pre code') || block.querySelector('.code pre')
    // 如果没有 .code 结构，尝试普通结构
    if (!codeElement) {
      codeElement = block.querySelector('pre code') || block.querySelector('pre')
    }
    if (!codeElement) return

    copyButton.addEventListener('click', async () => {
      const codeText = codeElement.innerText

      try {
        await navigator.clipboard.writeText(codeText)
        copyButton.innerHTML = '<i class="bi bi-check2"></i><span>已复制</span>'
        copyButton.classList.add('copied')

        setTimeout(() => {
          copyButton.innerHTML = '<i class="bi bi-clipboard"></i><span>复制</span>'
          copyButton.classList.remove('copied')
        }, 2000)
      } catch (err) {
        // 降级方案：使用 execCommand
        const textarea = document.createElement('textarea')
        textarea.value = codeText
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)

        copyButton.innerHTML = '<i class="bi bi-check2"></i><span>已复制</span>'
        copyButton.classList.add('copied')

        setTimeout(() => {
          copyButton.innerHTML = '<i class="bi bi-clipboard"></i><span>复制</span>'
          copyButton.classList.remove('copied')
        }, 2000)
      }
    })

    block.appendChild(copyButton)
  })
  } catch(e) {
    console.error('main.js error:', e);
  }
})()
