import sheet from "./site-footer-element.css" with { type: "css" };

export class SiteFooterElement extends HTMLElement {
  #internals = this.attachInternals();

  constructor() {
    super();
    this.#internals.role = "contentinfo";
    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets = [sheet];
    this.shadowRoot.innerHTML = html`
      <p><a href="https://github.com/knowler/knowler.dev">Code</a> and content by Nathan Knowler.</p>
      <p>Except if noted otherwise, content on this website is licensed under a <a rel="license" href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0 license</a>.</p>
    `;
  }
}

function html(strings, ...expressions) {
  return String.raw({ raw: strings }, ...expressions);
}
