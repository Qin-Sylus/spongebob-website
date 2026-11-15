/*
 * 演示页面公共脚本
 * 本作品是纯静态站点，没有后端服务。这里统一拦截页面内所有表单的提交行为，
 * 阻止 <form action=""> 触发的页面刷新，改为在页面底部弹出轻提示。
 */
(function () {
  var MSG_DEMO = '演示页面，无后端';

  // 轻提示：纯 JS 实现，样式内联，不依赖第三方库也不改动现有 CSS
  function toast(msg) {
    var box = document.createElement('div');
    box.textContent = msg;
    box.style.cssText = 'position:fixed;left:50%;bottom:48px;transform:translateX(-50%);'
      + 'padding:12px 26px;background:rgba(20,20,20,.88);color:#ffd43b;font-size:15px;'
      + 'letter-spacing:1px;border-radius:26px;box-shadow:0 6px 18px rgba(0,0,0,.25);'
      + 'z-index:9999;opacity:0;transition:opacity .25s ease,transform .25s ease;'
      + 'pointer-events:none;';
    document.body.appendChild(box);

    requestAnimationFrame(function () {
      box.style.opacity = '1';
      box.style.transform = 'translateX(-50%) translateY(-8px)';
    });
    setTimeout(function () {
      box.style.opacity = '0';
      box.style.transform = 'translateX(-50%)';
      setTimeout(function () { box.remove(); }, 300);
    }, 2200);
  }

  // 被拦截的输入框：排除 submit / reset / button
  function isEmptyField(form) {
    var fields = form.querySelectorAll('input, textarea');
    for (var i = 0; i < fields.length; i++) {
      var type = (fields[i].type || '').toLowerCase();
      if (type === 'submit' || type === 'reset' || type === 'button') continue;
      if (fields[i].value.trim() === '') return true;
    }
    return false;
  }

  // 统一拦截提交：任何表单都不会真正发出请求
  document.addEventListener('submit', function (e) {
    e.preventDefault();
    var form = e.target;
    toast(isEmptyField(form) ? '请先填写完整的表单信息' : MSG_DEMO);
  });

  // 重置按钮被点击时给个反馈，避免"点了没反应"的观感
  document.addEventListener('reset', function () {
    toast('表单已重置');
  });
})();