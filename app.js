(function () {
  "use strict";
  const profile = window.PROFILE;
  if (!profile) return;
  const $ = (selector) => document.querySelector(selector);
  const make = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const safeURL = (value) => {
    try { const url = new URL(value); return url.protocol === "https:" || url.protocol === "http:" ? url.href : null; }
    catch { return null; }
  };
  document.querySelectorAll("[data-name]").forEach((node) => { node.textContent = profile.name; });
  document.querySelectorAll("[data-initials]").forEach((node) => { node.textContent = profile.initials; });
  document.querySelectorAll("[data-field]").forEach((node) => { if (profile[node.dataset.field]) node.textContent = profile[node.dataset.field]; });
  document.title = profile.name + " — Portfolio";
  $("#year").textContent = new Date().getFullYear();
  const email = String(profile.email).trim();
  $("#email-link").textContent = email;
  $("#email-link").href = "mailto:" + encodeURIComponent(email);
  profile.social.forEach((social) => {
    const url = safeURL(social.url);
    if (!url) return;
    const link = make("a", "", social.label);
    link.href = url; link.target = "_blank"; link.rel = "noopener noreferrer";
    $("#social-links").append(link);
  });
  profile.skills.forEach((skill, index) => {
    const row = make("div", "skill-row");
    const content = make("div"); content.append(make("h3", "", skill.title), make("p", "", skill.tools));
    row.append(make("span", "skill-index", String(index + 1).padStart(2, "0")), content);
    $("#skill-list").append(row);
  });
  const dialog = $("#project-dialog");
  let lastProjectButton;
  profile.projects.forEach((project) => {
    const card = make("article", "project-card");
    const art = make("div", "project-art art-" + (['web', 'data', 'notes'].includes(project.art) ? project.art : 'web'));
    art.setAttribute("aria-hidden", "true");
    art.append(make("span", "", project.category), make("strong", "", project.visual), make("div", "project-code", project.code));
    const body = make("div", "project-body");
    const button = make("button", "project-button", "Xem chi tiết");
    button.type = "button";
    button.setAttribute("aria-label", "Xem chi tiết: " + project.title);
    button.addEventListener("click", () => {
      lastProjectButton = button;
      $("#dialog-title").textContent = project.title;
      $("#dialog-category").textContent = project.category + " / " + project.year;
      $("#dialog-description").textContent = project.description;
      $("#dialog-learning").textContent = project.learning;
      $("#dialog-tags").replaceChildren(...project.tags.map((tag) => make("span", "", tag)));
      const url = safeURL(project.url);
      const link = $("#dialog-link"); link.hidden = !url;
      if (url) link.href = url; else link.removeAttribute("href");
      dialog.showModal();
    });
    body.append(make("p", "project-meta", project.category + " · " + project.year), make("h3", "", project.title), make("p", "", project.summary), button);
    card.append(art, body); $("#project-list").append(card);
  });
  $(".dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener("close", () => { if (lastProjectButton) lastProjectButton.focus(); });
  const menu = $(".menu-toggle");
  const navigation = $("#navigation");
  const closeMenu = () => { menu.setAttribute("aria-expanded", "false"); navigation.classList.remove("is-open"); };
  menu.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", String(open)); navigation.classList.toggle("is-open", open);
  });
  navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") { closeMenu(); menu.focus(); } });
  const desktop = window.matchMedia("(min-width: 761px)");
  desktop.addEventListener("change", closeMenu);
  $("#copy-email").addEventListener("click", async () => {
    const status = $("#copy-status");
    try { await navigator.clipboard.writeText(email); status.textContent = "Đã sao chép email."; }
    catch {
      const range = document.createRange(); range.selectNodeContents($("#email-link"));
      const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
      status.textContent = "Email đã được chọn. Nhấn Ctrl+C (hoặc ⌘C) để sao chép.";
    }
  });
})();
