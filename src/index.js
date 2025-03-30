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
    this.slideContainer.style.width = `${this.frameWidth}px`
    this.slideContainer.style.overflow = "none";
    this.slideContainer.style.transform = `translateX(0)`;

    this.slideContainer.parentElement.style.overflow = "hidden"

    this.previousButton = document.createElement("button");
    this.previousButton.textContent = "←";
    (this.previousButton.className = "previous-btn"),
      (this.previousButton.style.position = "absolute");
    this.previousButton.style.left = "-15%";
    this.previousButton.style.top = "50%";

    this.nextButton = document.createElement("button");
    this.nextButton.textContent = "→";
    (this.nextButton.className = "next-btn"),
      (this.nextButton.style.position = "absolute");
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

  _getCurrentTranslateXValue() {
    const slideContainerStyle = window.getComputedStyle(this.slideContainer);
    const currentTransformMatrix =
      slideContainerStyle.getPropertyValue("transform");
    const matrixValues = currentTransformMatrix
      .match(/matrix.*\((.+)\)/)[1]
      .split(", ");

    const translateXValue = matrixValues[4];

    return Number(translateXValue);
  }

  _next() {
    const xValue = this._getCurrentTranslateXValue();

    if (this.currentSlide < this.slides.length) {
      this.slideContainer.style.transform = `translateX(${-this.frameWidth + xValue}px)`;
      this.currentSlide += 1;
      this._hideImg();
      return this.slideContainer;
    }

    this.currentSlide = 1;
    this._hideImg();
    this.slideContainer.style.transform = `translateX(0)`;
  }

  _previous() {
    const xValue = this._getCurrentTranslateXValue();

    if (this.currentSlide > 1) {
      this.slideContainer.style.transform = `translateX(${this.frameWidth + xValue}px)`;
      this.currentSlide -= 1;
      this._hideImg();
      return this.slideContainer;
    }

    this.currentSlide = this.slides.length;
    this._hideImg();
    this.slideContainer.style.transform = `translateX(${-this.frameWidth * (this.currentSlide - 1)}px)`;
  }

  create() {
    this._structure();
    this._numberSlides();
    this._hideImg();

    this.nextButton.addEventListener("click", () => {
      this._next();
    });

    this.previousButton.addEventListener("click", () => {
      this._previous();
    });
  }
}

new ImageCarousel(frame, slideContainer, 300).create();
