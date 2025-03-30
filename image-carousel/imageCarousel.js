const previousArrow = new URL(
  "./carousel-icon/arrow-left.svg",
  import.meta.url,
);
const nextArrow = new URL("./carousel-icon/arrow-right.svg", import.meta.url);
const blankCircle = new URL(
  "./carousel-icon/blank-circle.svg",
  import.meta.url,
);
const filledCircle = new URL(
  "./carousel-icon/filled-circle.svg",
  import.meta.url,
);

exports.ImageCarousel = class ImageCarousel {
  constructor(
    frame,
    slideContainer,
    frameWidth,
    wantSlideshow = true,
    slideshowTimerMs = 2300,
  ) {
    this.frame = frame;
    this.slideContainer = slideContainer;
    this.slides = this.slideContainer.children;
    this.frameWidth = frameWidth;
    this.currentSlide = 1;
    this.wantSlideshow = wantSlideshow;
    this.slideshowTimerMs = slideshowTimerMs;

    this.slideArr = [];
    this.slideContainer.childNodes.forEach((slide) => {
      if (slide.src) {
        this.slideArr.push(slide);
      }
    });
  }

  _structure() {
    this.frame.style.maxWidth = `${this.frameWidth}px`;
    this.frame.style.display = "grid";
    this.frame.style.position = "relative";

    this.slideContainer.style.display = "flex";
    this.slideContainer.style.alignItems = "center";
    this.slideContainer.style.width = `${this.frameWidth}px`;
    this.slideContainer.style.overflow = "none";
    this.slideContainer.style.transform = `translateX(0)`;

    this.slideContainer.parentElement.style.overflow = "hidden";

    this.slideArr.forEach((img) => (img.style.width = `${this.frameWidth}px`));

    this.previousButton = document.createElement("button");
    this.previousButton.className = "previous-btn";
    this.previousButton.style.position = "absolute";
    this.previousButton.style.left = "-15%";
    this.previousButton.style.top = "50%";

    this.previousButtonImg = document.createElement("img");
    this.previousButtonImg.src = previousArrow;
    this.previousButtonImg.style.width = "15px";

    this.previousButton.appendChild(this.previousButtonImg);

    this.nextButton = document.createElement("button");
    this.nextButton.className = "next-btn";
    this.nextButton.style.position = "absolute";
    this.nextButton.style.right = "-15%";
    this.nextButton.style.top = "50%";

    this.nextButtonImg = document.createElement("img");
    this.nextButtonImg.src = nextArrow;
    this.nextButtonImg.style.width = "15px";

    this.navCircles = document.createElement("div");
    this.navCircles.className = "nav-circles";
    this.navCircles.style.position = "absolute";
    this.navCircles.style.bottom = "-30px";
    this.navCircles.style.justifySelf = "center";

    this.nextButton.appendChild(this.nextButtonImg);

    this.frame.appendChild(this.previousButton);
    this.frame.appendChild(this.nextButton);
    this.frame.appendChild(this.navCircles);
  }
  _jumpToSlide(currentCircle) {
    const currentCircleNumber = currentCircle.getAttribute("slidecircle");
    const targetSlideXValue = -(this.frameWidth * (currentCircleNumber - 1));
    this.slideContainer.style.transform = `translateX(${targetSlideXValue}px)`;
    this.currentSlide = Number(currentCircleNumber);
    this._hideImg();
    this._syncNavCircle();
  }

  _createNavCircles() {
    for (let i = 1; i < this.slideArr.length + 1; i++) {
      const singleNavCircle = document.createElement("img");
      singleNavCircle.src = blankCircle;
      singleNavCircle.style.width = "10px";
      singleNavCircle.setAttribute("slidecircle", i);
      singleNavCircle.addEventListener("click", () => {
        this._jumpToSlide(singleNavCircle);
      });
      this.navCircles.appendChild(singleNavCircle);
    }
  }

  _syncNavCircle() {
    //reset circles
    this.navCircles.childNodes.forEach((circle) => {
      circle.src = blankCircle;
    });
    const currentCircle = this.navCircles.querySelector(
      `[slidecircle = "${this.currentSlide}"]`,
    );
    currentCircle.src = filledCircle;
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
      this._syncNavCircle();
      return this.slideContainer;
    }

    this.currentSlide = 1;
    this._hideImg();
    this._syncNavCircle();
    this.slideContainer.style.transform = `translateX(0)`;
  }

  _previous() {
    const xValue = this._getCurrentTranslateXValue();

    if (this.currentSlide > 1) {
      this.slideContainer.style.transform = `translateX(${this.frameWidth + xValue}px)`;
      this.currentSlide -= 1;
      this._hideImg();
      this._syncNavCircle();
      return this.slideContainer;
    }

    this.currentSlide = this.slides.length;
    this._hideImg();
    this._syncNavCircle();
    this.slideContainer.style.transform = `translateX(${-this.frameWidth * (this.currentSlide - 1)}px)`;
  }

  create() {
    this._structure();
    this._numberSlides();
    this._hideImg();
    this._createNavCircles();
    this._syncNavCircle();

    this.nextButton.addEventListener("click", () => {
      this._next();
    });

    this.previousButton.addEventListener("click", () => {
      this._previous();
    });

    if (this.wantSlideshow === true) {
      setInterval(() => {
        this._next();
      }, this.slideshowTimerMs);
    }
  }
}

