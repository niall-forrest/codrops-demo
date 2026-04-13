const metaConfig = {
  home: {
    title: "DOCK.FM / Belfast Underground Radio",
    description:
      "Underground electronic radio broadcasting from Belfast. Techno, ambient, experimental.",
  },
  schedule: {
    title: "LINEUP / DOCK.FM",
    description:
      "Weekly show schedule for Dock FM. Seven days, seven shows. Belfast underground electronic radio.",
  },
  shows: {
    title: "SHOWS / DOCK.FM",
    description:
      "Explore the shows on Dock FM. Techno, house, ambient, experimental. Belfast underground electronic radio.",
  },
  stories: {
    title: "STORIES / DOCK.FM",
    description:
      "Stories from the Belfast underground. Interviews, features, and dispatches from Dock FM.",
  },
};

export function updateMetaTags(namespace) {
  const meta = metaConfig[namespace];

  if (!meta) return;

  document.title = meta.title;
  updateOrCreateMeta("name", "description", meta.description);
}

function updateOrCreateMeta(attr, key, content) {
  let element = document.querySelector(`meta[${attr}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

export default { updateMetaTags, metaConfig };
