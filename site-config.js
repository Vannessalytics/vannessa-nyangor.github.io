/*
  Vannessa Nyang'or Portfolio — EASY EDIT CONFIG
  =================================================
  Routine image/video updates should NOT require HTML or CSS edits.

  PROFILE PHOTO
  - Replace the root file named: vannessa-profile.png
  - Recommended source size: 1200 x 1200 px (square PNG).
  - The site automatically crops it into the 128 x 128 circular frame.

  PROJECT COVER IMAGES
  - Replace the matching PNG in the repository root.
  - Recommended size for every project image: 1600 x 900 px (16:9 PNG).
  - Keep important content near the center because cards and hero areas use cover cropping.
  - The package includes the same temporary placeholder image under all five filenames.
    Replace each file later without changing any code.

  VIDEOS
  - Replace only the videoUrl value for the project below.
  - Normal YouTube URLs work: youtube.com/watch?v=..., youtu.be/..., /shorts/..., or /embed/...
  - A real temporary YouTube video is loaded on every case-study page for testing.

  SOCIAL LINKS
  - Add your LinkedIn URL below when ready.
*/

window.PORTFOLIO_CONFIG = {
  profileImage: "vannessa-profile.png",
  resumeFile: "Vannessa-Nyangor-Resume.docx",

  contact: {
    email: "vannessa.nyangor@gmail.com",
    linkedinUrl: "",
    githubUrl: "https://github.com/Vannessalytics"
  },

  projects: {
    realEstatePublisher: {
      coverImage: "project-real-estate.png",
      videoUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw"
    },

    appsScriptLocator: {
      coverImage: "project-apps-script-locator.png",
      videoUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw"
    },

    serviceScheduling: {
      coverImage: "project-service-scheduling.png",
      videoUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw"
    },

    tankStatus: {
      coverImage: "project-tank-status.png",
      videoUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw"
    },

    invoiceAutomation: {
      coverImage: "project-invoice-automation.png",
      videoUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw"
    }
  }
};
