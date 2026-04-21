(function initCommonComponentRequirements() {
  const root = document.querySelector(".requirements-modal-root");
  const openButton = document.querySelector("[data-open-requirements]");
  const title = document.querySelector(".requirements-title");
  const actions = document.querySelector(".requirements-actions");
  const content = document.querySelector(".requirements-content");
  const status = document.querySelector("[data-requirements-status]");
  const copyButton = document.querySelector("[data-copy-requirements]");
  const saveButton = document.querySelector("[data-save-requirements]");
  const closeButtons = document.querySelectorAll("[data-close-requirements]");

  if (!root || !openButton || !content) return;

  const storageKey = "Y12_COMMON_COMPONENT_REQUIREMENTS";
  const components = [
    {
      key: "topbar",
      title: "顶部栏",
      text: "组件名称：顶部栏\n\n组件用途：作为全站统一的顶部导航区域，承载品牌展示、搜索、分类、下载和账号入口。\n\n主要展示内容：产品 Logo、产品名称、搜索栏、全部分类按钮、APP 下载按钮、登录或个人中心入口。\n\n关键交互：点击产品 Logo 或产品名称返回首页；点击全部分类进入全部分类页；点击 APP 下载作为下载入口；未登录时点击登录打开登录弹窗；登录后点击个人中心显示账号下拉。\n\n状态与限制：全站所有页面顶部栏样式保持一致；左上角只显示产品 Logo 与产品名称，不展示产品简介；移动端需要保证搜索和账号入口不被遮挡。"
    },
    {
      key: "searchbar",
      title: "搜索栏",
      text: "组件名称：搜索栏\n\n组件用途：用于输入关键词并进入搜索结果页。\n\n主要展示内容：搜索图标、关键词输入框、搜索按钮，默认占位文案为“搜索关键字”。\n\n关键交互：输入关键词后点击搜索按钮跳转搜索结果页；输入关键词后按回车同样跳转；输入为空时不触发跳转。\n\n状态与限制：搜索栏在全站顶部栏中保持一致；搜索按钮使用橙色主按钮风格；输入框聚焦时可展示搜索下拉框。"
    },
    {
      key: "auth-modal",
      title: "登录 / 注册弹窗",
      text: "组件名称：登录 / 注册弹窗\n\n组件用途：提供前端模拟登录和注册入口。\n\n主要展示内容：登录弹窗包含账号、密码输入框、注册按钮和登录按钮；注册弹窗包含账号、密码、确认密码输入框和注册按钮。\n\n关键交互：未登录时点击顶部栏登录按钮打开登录弹窗；登录输入为空时提示“输入账号和密码”；点击登录成功后顶部栏入口变为个人中心并关闭弹窗；登录弹窗点击注册切换到注册弹窗；注册按钮点击后注册弹窗消失并显示登录入口。\n\n状态与限制：弹窗风格与全站 UI 保持一致；登录态保存在本地浏览器；当前版本不接入真实后端接口。"
    },
    {
      key: "account-menu",
      title: "个人中心下拉",
      text: "组件名称：个人中心下拉\n\n组件用途：登录后提供用户相关功能入口。\n\n主要展示内容：观看历史、我的点赞、退出账号。\n\n关键交互：登录后顶部栏显示个人中心；点击个人中心展开下拉框；点击观看历史跳转观看历史页；点击我的点赞跳转我的点赞页；点击退出账号打开退出确认弹窗；点击页面空白处收起下拉框。\n\n状态与限制：未登录时不显示个人中心下拉；打开其他浮层时应收起个人中心下拉。"
    },
    {
      key: "logout-modal",
      title: "退出账号确认弹窗",
      text: "组件名称：退出账号确认弹窗\n\n组件用途：避免用户误触退出账号。\n\n主要展示内容：确认文案“确认退出当前账号吗？”、取消按钮、确认退出按钮。\n\n关键交互：点击个人中心下拉中的退出账号打开弹窗；点击取消关闭弹窗并保持登录态；点击确认退出后清除本地登录态，顶部栏恢复登录入口。\n\n状态与限制：确认退出按钮使用红色强调；弹窗不展示右上角关闭按钮；弹窗层级高于普通页面内容。"
    },
    {
      key: "menu-bar",
      title: "顶部菜单栏",
      text: "组件名称：顶部菜单栏\n\n组件用途：提供全站主要内容分类导航。\n\n主要展示内容：首页、帖子类菜单、视频类菜单、一级菜单 E、示例菜单勿点。\n\n关键交互：点击首页跳转首页；点击帖子类菜单进入帖子列表页；点击视频类菜单进入视频列表页；点击一级菜单 E 展示二级菜单；菜单项鼠标悬浮时高亮；当前页面对应菜单保持选中态。\n\n状态与限制：菜单名称不允许换行；菜单过多时通过左右切换按钮横向查看；全站菜单栏样式需要与首页保持一致。"
    },
    {
      key: "menu-e-dropdown",
      title: "一级菜单 E 下拉",
      text: "组件名称：一级菜单 E 下拉\n\n组件用途：为一级菜单 E 提供二级菜单入口。\n\n主要展示内容：二级菜单 E-1、二级菜单 E-2、二级菜单 E-3。\n\n关键交互：点击或触发一级菜单 E 后展示下拉框；点击任意二级菜单跳转视频列表页；点击页面空白处关闭下拉框。\n\n状态与限制：下拉框必须显示在菜单栏上方层级，不被广告或内容区域遮挡；展开下拉时不改变当前页面主菜单选中态。"
    },
    {
      key: "top-ads",
      title: "顶部广告栏",
      text: "组件名称：顶部广告栏\n\n组件用途：在全站页面顶部展示广告入口。\n\n主要展示内容：横向排列的广告图标和广告名称，广告名称显示在广告图标下方。\n\n关键交互：广告位作为展示入口，可预留点击跳转能力。\n\n状态与限制：全站页面都需要展示顶部广告栏；广告样式与首页保持一致；广告数量较多时保持横向排列和可视区域稳定。"
    },
    {
      key: "bottom-ads",
      title: "底部广告栏",
      text: "组件名称：底部广告栏\n\n组件用途：在页脚上方展示合作广告或站外入口。\n\n主要展示内容：黑色广告卡片、圆形图标、广告名称、右侧进入图标。\n\n关键交互：广告卡片作为功能入口，支持后续配置跳转链接。\n\n状态与限制：全站所有页面都需要展示；位置固定在主体内容之后、页脚之前；视觉风格保持黑色卡片样式。"
    },
    {
      key: "footer",
      title: "页脚",
      text: "组件名称：页脚\n\n组件用途：展示站点底部基础信息和功能入口。\n\n主要展示内容：产品名称、联系客服、官方群组、商务合作。\n\n关键交互：联系客服、官方群组、商务合作均作为功能按钮入口处理。\n\n状态与限制：页脚在全站页面保持统一；页脚上方必须保留底部广告栏；不展示产品简介。"
    },
    {
      key: "dynamic-card",
      title: "动态内容卡片",
      text: "组件名称：动态内容卡片\n\n组件用途：用于展示帖子/动态类内容，是首页、帖子列表、搜索结果、全部分类、观看历史和我的点赞中的通用内容卡片。\n\n主要展示内容：动态封面、动态标题、发布者信息、上架时间和动态标签。\n\n关键交互：点击卡片进入动态详情页；鼠标悬浮卡片时展示选中效果；点击动态标签进入搜索结果页并选中帖子分类。\n\n状态与限制：全局动态内容卡片样式需要保持一致；卡片封面比例与首页动态卡片保持一致；不展示额外简介文案；列表页中动态卡片需要适配 5 行 5 列布局并保证信息完整。"
    },
    {
      key: "video-card",
      title: "视频内容卡片",
      text: "组件名称：视频内容卡片\n\n组件用途：用于展示视频类内容，是首页、视频列表、搜索结果、全部分类、观看历史、我的点赞和视频详情推荐区中的通用内容卡片。\n\n主要展示内容：视频封面、播放量、点赞量、视频标题和视频标签。\n\n关键交互：点击卡片进入视频详情页；鼠标悬浮卡片时展示选中效果；点击视频标签进入搜索结果页并选中视频分类。\n\n状态与限制：视频封面比例为 16:9；播放量显示在封面左下角，点赞量显示在封面右下角，均使用 icon + 数字形式；视频卡片不展示上架时间；标签需要缩小并尽量在一行内展示。"
    }
  ];

  const injectStyle = () => {
    if (document.getElementById("commonComponentRequirementsStyle")) return;
    const style = document.createElement("style");
    style.id = "commonComponentRequirementsStyle";
    style.textContent = `
      .requirements-float { z-index: 180; }
      .requirements-modal-root { z-index: 260; }
      .requirements-modal.common-components-modal { width: min(100%, 980px); }
      .common-requirements-layout { display: grid; grid-template-columns: 220px minmax(0, 1fr); gap: 16px; align-items: stretch; }
      .common-requirements-tabs { display: flex; flex-direction: column; gap: 8px; max-height: 54vh; overflow: auto; padding-right: 4px; }
      .common-requirements-tab {
        min-height: 42px;
        padding: 0 14px;
        border: 1px solid var(--line);
        border-radius: 999px;
        background: rgba(255,255,255,.88);
        color: var(--muted);
        font-weight: 800;
        text-align: left;
        cursor: pointer;
        white-space: nowrap;
      }
      .common-requirements-tab:hover,
      .common-requirements-tab.active {
        color: #fff;
        border-color: transparent;
        background: linear-gradient(135deg, var(--brand), var(--brand-deep));
        box-shadow: 0 12px 24px rgba(255,106,0,.18);
      }
      .requirements-content.common-requirements-editor {
        display: block;
        min-height: 420px;
        max-height: 54vh;
        overflow: auto;
        padding: 18px;
        border: 1px solid var(--line);
        border-radius: 22px;
        background: rgba(255,255,255,.86);
        color: var(--text);
        line-height: 1.8;
        white-space: pre-wrap;
        outline: none;
      }
      .requirements-content.common-requirements-editor:focus {
        border-color: rgba(255,122,0,.48);
        box-shadow: 0 0 0 4px rgba(255,122,0,.12);
      }
      @media (max-width: 780px) {
        .common-requirements-layout { grid-template-columns: 1fr; }
        .common-requirements-tabs { flex-direction: row; max-height: none; overflow-x: auto; padding-bottom: 4px; }
        .common-requirements-tab { flex: 0 0 auto; }
        .requirements-content.common-requirements-editor { min-height: 360px; max-height: 48vh; }
      }
    `;
    document.head.appendChild(style);
  };

  const loadStore = () => {
    try {
      const value = JSON.parse(localStorage.getItem(storageKey) || "{}");
      return value && typeof value === "object" ? value : {};
    } catch (error) {
      return {};
    }
  };

  let store = loadStore();
  let activeKey = components[0].key;

  const setStatus = (message, type) => {
    if (!status) return;
    status.textContent = message;
    status.classList.toggle("is-success", type === "success");
    status.classList.toggle("is-error", type === "error");
  };

  const persistCurrent = (silent) => {
    try {
      store[activeKey] = content.innerText.trim();
      localStorage.setItem(storageKey, JSON.stringify(store));
      if (!silent) setStatus("当前组件说明已保存。", "success");
      return true;
    } catch (error) {
      if (!silent) setStatus("保存失败，请检查浏览器本地存储权限。", "error");
      return false;
    }
  };

  const getText = (key) => {
    const item = components.find((component) => component.key === key);
    return store[key] || item?.text || "";
  };

  const renderTabs = () => {
    const tabs = root.querySelector(".common-requirements-tabs");
    if (!tabs) return;
    tabs.innerHTML = components.map((component) => (
      `<button class="common-requirements-tab${component.key === activeKey ? " active" : ""}" type="button" data-common-requirement-tab="${component.key}">${component.title}</button>`
    )).join("");
  };

  const renderContent = (key) => {
    activeKey = key;
    content.textContent = getText(key);
    renderTabs();
    const label = components.find((component) => component.key === key)?.title || "通用组件";
    setStatus(`正在编辑：${label}。修改后点击“保存文案”。`, "");
  };

  const setupModal = () => {
    injectStyle();
    openButton.textContent = "通用组件说明";
    if (title) title.textContent = "通用组件说明";
    if (copyButton) copyButton.textContent = "复制说明";
    if (saveButton) saveButton.textContent = "保存文案";
    root.querySelector(".requirements-modal")?.classList.add("common-components-modal");
    content.classList.add("common-requirements-editor");
    content.setAttribute("contenteditable", "true");
    content.setAttribute("spellcheck", "false");

    let layout = root.querySelector(".common-requirements-layout");
    let tabs = root.querySelector(".common-requirements-tabs");
    if (!layout) {
      layout = document.createElement("div");
      layout.className = "common-requirements-layout";
      tabs = document.createElement("div");
      tabs.className = "common-requirements-tabs";
      content.parentNode.insertBefore(layout, content);
      layout.appendChild(tabs);
      layout.appendChild(content);
    }
    if (actions && !root.querySelector("[data-common-copy-note]")) {
      const note = document.createElement("span");
      note.dataset.commonCopyNote = "true";
      note.style.color = "var(--muted)";
      note.style.fontSize = ".86rem";
      note.textContent = "按 Tab 编辑通用组件说明";
      actions.insertBefore(note, actions.firstChild);
    }
    renderContent(activeKey);
  };

  setupModal();

  openButton.addEventListener("click", () => {
    store = loadStore();
    renderContent(activeKey);
  });

  root.addEventListener("click", (event) => {
    const tab = event.target.closest("[data-common-requirement-tab]");
    if (!tab) return;
    event.preventDefault();
    event.stopPropagation();
    persistCurrent(true);
    renderContent(tab.dataset.commonRequirementTab);
  });

  saveButton?.addEventListener("click", () => {
    persistCurrent(false);
  });

  copyButton?.addEventListener("click", () => {
    window.setTimeout(() => {
      copyButton.textContent = "复制说明";
    }, 1500);
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => persistCurrent(true));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && root.classList.contains("open")) {
      persistCurrent(true);
    }
  });
})();
