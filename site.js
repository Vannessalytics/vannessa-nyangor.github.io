document.addEventListener("DOMContentLoaded", () => {
  const config = window.PORTFOLIO_CONFIG || {};
  const nav = document.querySelector(".nav");
  const menuButton = document.querySelector(".menu");
  const navLinks = document.querySelector(".nav-links");

  function updateNavigationState() {
    if (nav) {
      nav.classList.toggle("scrolled", window.scrollY > 24);
    }
  }

  updateNavigationState();
  window.addEventListener("scroll", updateNavigationState, { passive: true });

  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => navLinks.classList.remove("open"));
    });
  }

  document.querySelectorAll("[data-rail]").forEach((railWrap) => {
    const rail = railWrap.querySelector(".rail");

    railWrap.querySelectorAll("[data-dir]").forEach((button) => {
      button.addEventListener("click", () => {
        if (!rail) return;

        const direction = button.dataset.dir === "right" ? 1 : -1;
        rail.scrollBy({
          left: rail.clientWidth * 0.82 * direction,
          behavior: "smooth"
        });
      });
    });
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    revealObserver.observe(element);
  });

  const cursorGlow = document.createElement("div");
  cursorGlow.className = "cursor-glow";
  document.body.appendChild(cursorGlow);

  window.addEventListener(
    "pointermove",
    (event) => {
      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;
    },
    { passive: true }
  );

  function getYouTubeId(url) {
    if (!url) return null;

    try {
      const parsed = new URL(url, window.location.href);
      const host = parsed.hostname.replace(/^www\./, "");

      if (host === "youtu.be") {
        return parsed.pathname.split("/").filter(Boolean)[0] || null;
      }

      if (host.endsWith("youtube.com")) {
        if (parsed.pathname === "/watch") {
          return parsed.searchParams.get("v");
        }

        const parts = parsed.pathname.split("/").filter(Boolean);
        const markerIndex = parts.findIndex((part) =>
          ["embed", "shorts", "live"].includes(part)
        );

        if (markerIndex !== -1 && parts[markerIndex + 1]) {
          return parts[markerIndex + 1];
        }
      }
    } catch (error) {
      return null;
    }

    return null;
  }

  function toYouTubeEmbedUrl(url) {
    const videoId = getYouTubeId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  }

  function applyProfileImage() {
    const profile = document.querySelector("[data-profile]");
    if (!profile) return;

    const image = profile.querySelector("img.profile");
    const fallback = profile.querySelector(".profile-fallback");
    const imageSource = config.profileImage || "vannessa-profile.png";

    if (!image) return;

    image.addEventListener("load", () => {
      profile.classList.add("has-profile-image");
      if (fallback) fallback.setAttribute("aria-hidden", "true");
    });

    image.addEventListener("error", () => {
      profile.classList.remove("has-profile-image");
      image.removeAttribute("src");
      if (fallback) fallback.setAttribute("aria-hidden", "false");
    });

    image.src = imageSource;
  }

  function applyProjectImages() {
    document.querySelectorAll("[data-project-key]").forEach((element) => {
      const projectKey = element.dataset.projectKey;
      const project = config.projects && config.projects[projectKey];
      const imageSource = project && project.coverImage;

      if (!imageSource) return;

      const imageProbe = new Image();
      imageProbe.onload = () => {
        element.style.setProperty("--project-image", `url('${imageSource}')`);
        element.classList.add("has-project-image");
      };
      imageProbe.onerror = () => {
        element.classList.remove("has-project-image");
      };
      imageProbe.src = imageSource;
    });
  }

  function renderProjectVideos() {
    document.querySelectorAll("[data-project-video]").forEach((frame) => {
      const projectKey = frame.dataset.projectVideo;
      const project = config.projects && config.projects[projectKey];
      const videoUrl = project && project.videoUrl;
      const embedUrl = toYouTubeEmbedUrl(videoUrl);

      if (!embedUrl) return;

      frame.innerHTML = "";

      const iframe = document.createElement("iframe");
      iframe.src = embedUrl;
      iframe.title = "Project demo video";
      iframe.loading = "lazy";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      iframe.allowFullscreen = true;

      frame.appendChild(iframe);
    });
  }

  function applyContactLinks() {
    const contact = config.contact || {};

    document.querySelectorAll("[data-link='email']").forEach((link) => {
      if (contact.email) {
        link.href = `mailto:${contact.email}`;
      }
    });

    document.querySelectorAll("[data-link='linkedin']").forEach((link) => {
      if (contact.linkedinUrl) {
        link.href = contact.linkedinUrl;
        link.removeAttribute("aria-disabled");
      } else {
        link.href = "#";
        link.setAttribute("aria-disabled", "true");
      }
    });

    document.querySelectorAll("[data-link='github']").forEach((link) => {
      if (contact.githubUrl) {
        link.href = contact.githubUrl;
      }
    });

    document.querySelectorAll("[data-resume-link]").forEach((link) => {
      link.href = config.resumeFile || "Vannessa-Nyangor-Resume.docx";
    });
  }

  applyProfileImage();
  applyProjectImages();
  renderProjectVideos();
  applyContactLinks();

  const year = document.querySelector("[data-year]");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
});
