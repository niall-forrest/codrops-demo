class Player extends HTMLElement {
  constructor() {
    super();
    this._rendered = false;
    this._playing = false;
    this._muted = false;
    this._volume = 0.8;
  }

  connectedCallback() {
    if (!this._rendered) {
      this.render();
      this._rendered = true;
      this.bindEvents();
    }
  }

  disconnectedCallback() {
    this._rendered = false;
  }

  bindEvents() {
    const playBtn = this.querySelector(".player-play");
    const volBtn = this.querySelector(".player-vol-btn");
    const volSlider = this.querySelector(".player-vol-slider");

    playBtn?.addEventListener("click", () => {
      this._playing = !this._playing;
      this.updatePlayState();
    });

    volBtn?.addEventListener("click", () => {
      this._muted = !this._muted;
      this.updateVolState();
    });

    volSlider?.addEventListener("input", (e) => {
      this._volume = e.target.value / 100;
      this._muted = this._volume === 0;
      this.updateVolState();
    });
  }

  updatePlayState() {
    const icon = this.querySelector(".player-play-icon");
    const statusText = this.querySelector(".player-status-text");
    if (this._playing) {
      icon.innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="4" height="12" rx="1" fill="currentColor"/><rect x="9" y="1" width="4" height="12" rx="1" fill="currentColor"/></svg>`;
      statusText.textContent = "PLAYING";
    } else {
      icon.innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 1L12.5 7L2.5 13V1Z" fill="currentColor"/></svg>`;
      statusText.textContent = "PAUSED";
    }
  }

  updateVolState() {
    const volIcon = this.querySelector(".player-vol-icon");
    const volSlider = this.querySelector(".player-vol-slider");

    if (this._muted || this._volume === 0) {
      volIcon.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`;
      if (volSlider) volSlider.value = 0;
    } else {
      volIcon.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 010 14.14"/><path d="M15.54 8.46a5 5 0 010 7.07"/></svg>`;
      if (volSlider) volSlider.value = this._volume * 100;
    }
  }

  checkMobileTicker() {
    const wrap = this.querySelector(".player-mobile-show");
    const inner = this.querySelector(".player-mobile-inner");
    if (!wrap || !inner) return;

    // Reset
    inner.classList.remove("player-mobile-ticker");
    wrap.classList.remove("is-overflowing");
    inner.innerHTML = inner.textContent.trim();

    if (inner.scrollWidth > wrap.clientWidth) {
      const text = inner.textContent.trim();
      inner.innerHTML = `<span>${text}</span><span>${text}</span>`;
      inner.classList.add("player-mobile-ticker");
      wrap.classList.add("is-overflowing");
    }
  }

  render() {
    this.innerHTML = /*html*/ `
      <div class="player-bar">
        <div class="player-left">
          <button class="player-play" aria-label="Play">
            <span class="player-play-icon">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 1L12.5 7L2.5 13V1Z" fill="currentColor"/>
              </svg>
            </span>
          </button>
          <div class="player-vol">
            <button class="player-vol-btn" aria-label="Mute">
              <span class="player-vol-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                  <path d="M19.07 4.93a10 10 0 010 14.14"/>
                  <path d="M15.54 8.46a5 5 0 010 7.07"/>
                </svg>
              </span>
            </button>
            <input type="range" class="player-vol-slider" min="0" max="100" value="80" aria-label="Volume" />
          </div>
          <div class="player-divider"></div>
          <div class="player-live-badge">
            <span class="player-live-dot"></span>
            LIVE
          </div>
          <div class="player-mobile-show">
            <div class="player-mobile-inner">DEEP CUTS W/ SÍOMHA</div>
          </div>
        </div>
        <div class="player-center">
          <span class="player-show-name">DEEP CUTS W/ SÍOMHA</span>
          <span class="player-show-sep">·</span>
          <span class="player-status-text">PAUSED</span>
        </div>
        <div class="player-right">
          <span class="player-brand">DOCK.FM</span>
        </div>
      </div>
    `;

    this.checkMobileTicker();
  }
}

customElements.define("player-c", Player);
