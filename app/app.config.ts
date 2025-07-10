export default defineAppConfig({
  global: {
    picture: {
      dark: "https://digital-resume-majdi-mokhtar.vercel.app/_next/image?url=%2Fmajdimokhtar.jpg&w=640&q=75",
      light:
        "https://digital-resume-majdi-mokhtar.vercel.app/_next/image?url=%2Fmajdimokhtar.jpg&w=640&q=75",
      alt: "My profile picture",
    },
    meetingLink: "https://cal.com/",
    email: "majdi.mokhtar@gmail.com",
    available: true,
  },
  ui: {
    colors: {
      primary: "blue",
      neutral: "neutral",
    },
  },
  uiPro: {
    pageHero: {
      slots: {
        container: "py-18 sm:py-24 lg:py-32",
        title: "mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl",
        description:
          "mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted",
      },
    },
  },
  footer: {
    credits: `Copyright © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [
      {
        icon: "i-simple-icons-github",
        to: "https://github.com/yourusername", // Replace with your GitHub URL
        target: "_blank",
        "aria-label": "GitHub Profile",
      },
      {
        icon: "i-simple-icons-linkedin",
        to: "https://linkedin.com/in/yourprofile", // Replace with your LinkedIn URL
        target: "_blank",
        "aria-label": "LinkedIn Profile",
      },
      {
        icon: "i-simple-icons-whatsapp",
        to: "https://wa.me/yourphonenumber", // Replace with your WhatsApp link
        target: "_blank",
        "aria-label": "WhatsApp Contact",
      },
    ],
  },
});
