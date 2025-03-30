
import { ImageCarousel } from "@muahchee/image-carousel"


const slideContainer = document.querySelector(".slide-container");
const frame = document.querySelector(".frame");

new ImageCarousel (frame, slideContainer, 300).create();
