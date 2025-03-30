const slideContainer = document.querySelector(".slide-container");
const frame = document.querySelector(".frame");

class ImageCarousel {
  constructor(frame, slideContainer, frameWidth) {
    this.frame = frame;
    this.slideContainer = slideContainer;
    this.slides = this.slideContainer.children;
    this.frameWidth = frameWidth;
    this.currentSlide = 0
  }

  _structure() {
    this.frame.style.maxWidth = this.frameWidth;
    // this.frame.style.overflow = "hidden"
    this.frame.style.position = "relative";

    this.slideContainer.style.display = "flex";
    this.slideContainer.style.alignItems = "center";

    this.previousButton = document.createElement("button");
    this.previousButton.textContent = "←";
    this.previousButton.style.position = "absolute";
    this.previousButton.style.left = "-15%";
    this.previousButton.style.top = "50%";

    this.nextButton = document.createElement("button");
    this.nextButton.textContent = "→";
    this.nextButton.style.position = "absolute";
    this.nextButton.style.right = "-15%";
    this.nextButton.style.top = "50%";

    this.frame.appendChild(this.previousButton);
    this.frame.appendChild(this.nextButton);
  }

  _numberSlides() {
    const slideArr = [];
    this.slideContainer.childNodes.forEach((slide) => {
      if (slide.src) {
        slideArr.push(slide);
      }
    });
    for (let i = 0; i < slideArr.length; i++){
      slideArr[i].setAttribute("slideNumber", i);
    }
    return slideArr
  };

  _next() {

 
  }

  create() {
    this._structure();
    this._numberSlides();
  }
}

new ImageCarousel(frame, slideContainer, "300px").create();
