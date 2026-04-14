const lenis = new Lenis({
  // 禁用 hash 处理，防止点击带 hash 的链接时改变地址栏
  prevent: (e) => {
    // 如果点击的是 TOC 链接，阻止 Lenis 处理
    if (e.target.closest('.toc a')) {
      return true;
    }
    return false;
  }
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)
