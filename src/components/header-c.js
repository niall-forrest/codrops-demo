class Header extends HTMLElement {
  constructor() {
    super();
    this._rendered = false;
    this._clockInterval = null;
  }

  connectedCallback() {
    if (!this._rendered) {
      this.render();
      this._rendered = true;
      this.startClock();
      this.updateActiveLink();
    }
  }

  disconnectedCallback() {
    this._rendered = false;
    if (this._clockInterval) {
      clearInterval(this._clockInterval);
    }
  }

  startClock() {
    const clockEl = this.querySelector(".nav-clock");
    if (!clockEl) return;

    const update = () => {
      const now = new Date();
      const time = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      const zone = now
        .toLocaleTimeString("en-GB", { timeZoneName: "short" })
        .split(" ")
        .pop();
      clockEl.textContent = `${time} ${zone}`;
    };

    update();
    this._clockInterval = setInterval(update, 1000);
  }

  updateActiveLink() {
    const links = this.querySelectorAll(".nav-link");
    const path = window.location.pathname;
    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (href === path || (href === "/" && path === "/")) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  render() {
    this.innerHTML = /*html*/ `
      <nav class="nav">
        <div class="nav-brand overflow">
          <link-c href="/">DOCK.FM</link-c>
        </div>
        <div class="nav-right">
          <div class="nav-links">
            <a class="nav-link" href="/schedule">SCHEDULE</a>
            <a class="nav-link" href="/shows">SHOWS</a>
            <a class="nav-link" href="/stories">STORIES</a>
          </div>
          <div class="nav-clock"></div>
        </div>
      </nav>
    `;

    // Listen for navigation changes
    window.addEventListener("popstate", () => this.updateActiveLink());
    document.addEventListener("click", () => {
      requestAnimationFrame(() => this.updateActiveLink());
    });
  }
}

customElements.define("header-c", Header);
