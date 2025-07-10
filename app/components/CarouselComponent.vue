<template>
  <div class="trusted-section">
    <div class="container mx-auto px-6 py-12">
      <!-- Header Text -->
      <div class="text-center mb-8">
        <p
          class="text-secondary-600 dark:text-secondary-300 md:text-xl font-medium sm:text-md"
        >
          Technologies I Use
        </p>
        <div class="flex items-center justify-center mt-4">
          <div
            class="h-px w-148 bg-gradient-to-r from-transparent via-gray-400 dark:via-gray-500 to-transparent"
          ></div>
        </div>
      </div>

      <!-- Carousel Container -->
      <div class="carousel-wrapper">
        <Carousel
          :items-to-show="8"
          :transition="7000"
          :autoplay="500"
          :pauseAutoplayOnHover="false"
          :mouse-drag="false"
          :touch-drag="false"
          :wrapAround="true"
          :wrap-around="true"
          :gap="60"
          class="logo-carousel"
        >
          <Slide v-for="(logo, index) in logos" :key="index">
            <div class="logo-slide">
              <img
                class="logo-container w-15 h-15 object-contain opacity-60 grayscale dark:invert dark:opacity-80 transition-all duration-300"
                :src="logo.src"
                :alt="logo.name"
                :title="logo.name"
              />
            </div>
          </Slide>
        </Carousel>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import svgImage1 from "/svg-image-1.svg";
import svgImage2 from "/svg-image-2.svg";
import svgImage3 from "/svg-image-3.svg";
import svgImage4 from "/svg-image-4.svg";
import svgImage5 from "/svg-image-5.svg";
import svgImage6 from "/svg-image-6.svg";
import svgImage7 from "/svg-image-7.svg";
import svgImage8 from "/svg-image-8.svg";
import svgImage9 from "/svg-image-9.svg";
import svgImage10 from "/svg-image-10.svg";
import svgImage11 from "/svg-image-11.svg";
import svgImage13 from "/svg-image-13.svg";

// Logo data with inline SVGs
const logos = [
  {
    name: "Next.js",
    src: svgImage1,
  },
  {
    name: "NestJS",
    src: svgImage2,
  },
  {
    name: "Vue.js",
    src: svgImage3,
  },
  {
    name: "React",
    src: svgImage4,
  },
  {
    name: "Typescript",
    src: svgImage5,
  },
  {
    name: "Angular",
    src: svgImage6,
  },
  {
    name: "Python",
    src: svgImage7,
  },
  {
    name: "Nuxt.js",
    src: svgImage8,
  },
  {
    name: "JavaScript",
    src: svgImage9,
  },
  {
    name: "Figma",
    src: svgImage10,
  },
  {
    name: "Framer",
    src: svgImage11,
  },
  {
    name: "Node.js",
    src: svgImage13,
  },
];
</script>

<style scoped>
.carousel-wrapper {
  overflow: hidden;
}

.logo-carousel {
  width: 100%;
}

.logo-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
}

.logo-container {
  width: 60px;
  height: 60px;
  transition: all 0.3s ease;
}

/* Light mode: make logos dark gray */
.logo-container {
  filter: brightness(0) saturate(100%);
}

/* Dark mode: make all logos white regardless of original color */
.dark .logo-container {
  filter: brightness(0) saturate(100%) invert(1);
}

@media (max-width: 640px) {
  .logo-container {
    width: 40px;
    height: 40px;
  }

  .logo-slide {
    height: 60px;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .logo-container {
    width: 50px;
    height: 50px;
  }

  .logo-slide {
    height: 70px;
  }
}
</style>
