(function initRequirementsLinkModal() {
  const notionUrl = "https://www.notion.so/Y12-3497db3145c380b1b4e0ca9e5476d239?source=copy_link";

  const injectStyle = () => {
    if (document.getElementById("requirementsLinkModalStyle")) return;
    const style = document.createElement("style");
    style.id = "requirementsLinkModalStyle";
    style.textContent = `
      .requirements-content.requirements-link-only,
      .home-requirements-content.requirements-link-only {
        display: block;
        padding: 22px;
        border: 1px solid var(--line);
        border-radius: 22px;
        background: rgba(255,255,255,.86);
      }
      .requirements-link-card {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        min-height: 72px;
        padding: 0 18px;
        border-radius: 18px;
        background: linear-gradient(135deg, rgba(255,122,0,.12), rgba(255,255,255,.94));
        color: var(--text);
        font-weight: 900;
        word-break: break-all;
      }
      .requirements-link-card:hover {
        color: var(--brand);
        box-shadow: 0 14px 28px rgba(255,106,0,.14);
      }
      .requirements-actions .requirements-copy,
      .requirements-actions .requirements-save,
      [data-home-requirements-status],
      [data-requirements-status] {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  };

  const setupModal = ({ rootSelector, openSelector, titleSelector, contentSelector, buttonText }) => {
    const root = document.querySelector(rootSelector);
    const openButton = document.querySelector(openSelector);
    const title = root?.querySelector(titleSelector);
    const content = root?.querySelector(contentSelector);
    if (!root || !openButton || !content) return;

    openButton.textContent = buttonText;
    if (title) title.textContent = "需求说明";
    content.removeAttribute("contenteditable");
    content.removeAttribute("spellcheck");
    content.classList.add("requirements-link-only");
    content.innerHTML = `<a class="requirements-link-card" href="${notionUrl}" target="_blank" rel="noopener noreferrer">${notionUrl}</a>`;

    openButton.addEventListener("click", () => {
      content.innerHTML = `<a class="requirements-link-card" href="${notionUrl}" target="_blank" rel="noopener noreferrer">${notionUrl}</a>`;
    });
  };

  injectStyle();
  setupModal({
    rootSelector: ".requirements-modal-root",
    openSelector: "[data-open-requirements]",
    titleSelector: ".requirements-title",
    contentSelector: ".requirements-content",
    buttonText: "需求说明"
  });
  setupModal({
    rootSelector: ".home-requirements-modal-root",
    openSelector: "[data-open-home-requirements]",
    titleSelector: ".requirements-title",
    contentSelector: ".home-requirements-content",
    buttonText: "需求说明"
  });
})();
