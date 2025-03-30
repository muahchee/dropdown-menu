const slideContainer = document.querySelector(".slide-container");
const frame = document.querySelector(".frame");

class ImageCarousel {
  constructor(frame, slideContainer, frameWidth) {
    this.frame = frame;
    this.slideContainer = slideContainer;
    this.slides = this.slideContainer.children;
    this.frameWidth = frameWidth;
    this.currentSlide = 1;

    this.slideArr = [];
    this.slideContainer.childNodes.forEach((slide) => {
      if (slide.src) {
        this.slideArr.push(slide);
      }
    });
  }

  _structure() {
    this.frame.style.maxWidth = `${this.frameWidth}px`;
    this.frame.style.position = "relative";

    this.slideContainer.style.display = "flex";
    this.slideContainer.style.alignItems = "center";
    this.slideContainer.style.overflow = "none";

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
    for (let i = 1; i < this.slideArr.length + 1; i++) {
      this.slideArr[i - 1].setAttribute("slideNumber", i);
    }
    return this.slideArr;
  }

  _hideImg() {
    const currentSlideImg = this.slideContainer.querySelector(
      `[slidenumber = "${this.currentSlide}"]`,
    );
    currentSlideImg.style.visibility = "visible";

    this.slideArr.forEach((node) => {
      if (
        node.getAttribute("slidenumber") !==
        currentSlideImg.getAttribute("slidenumber")
      ) {
        node.style.visibility = "hidden";
      }
    });
  }

  _next() {
    if (this.currentSlide < this.slides.length) {
      this.slideContainer.style.transform = `translateX(-${this.frameWidth * this.currentSlide}px)`;

      this.currentSlide += 1;
      this._hideImg()
      console.log(this.currentSlide);
      return this.slideContainer;
    }

    this.currentSlide = 1;
    this._hideImg()
    this.slideContainer.style.transform = `translateX(0)`;
    console.log(this.currentSlide);
  }

  create() {
    this._structure();
    this._numberSlides();
    this._hideImg();

    this.nextButton.addEventListener("click", () => {
      this._next();
    });

    
  }
}

new ImageCarousel(frame, slideContainer, 300).create();
