import sheet from "./site-header-element.css" with { type: "css" };

export class SiteHeaderElement extends HTMLElement {
  #internals = this.attachInternals();

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.#internals.role = "banner";
    this.shadowRoot.adoptedStyleSheets = [sheet];
    this.shadowRoot.innerHTML = html`
      <a href="/">Nathan Knowler</a>
      <nav><ul>
        <li><a href="/">Welcome</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
    `;
    for (const anchor of this.shadowRoot.querySelectorAll("a")) {
      if (anchor.href === location.href) {
        anchor.ariaCurrent = "page";
      }
    }
  }
}

function html(strings, ...expressions) {
  return String.raw({ raw: strings }, ...expressions);
}
