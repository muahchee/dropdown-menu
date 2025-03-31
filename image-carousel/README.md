# Image Carousel

## Install

`npm install @muahchee/image-carousel`

## Syntax

### HTML

```
<div class="frame">
    <div>
        <div class="slide-container">
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
        </div>
    </div>
</div>

```

put images in slide-container

### Javascript

```
import { ImageCarousel } from "@muahchee/image-carousel"

new ImageCarousel(frame, slideContainer, frameWidth, arrowDistance, wantSlideshow, slideshowTimerMs).create();

```

- `frame` = div.frame (querySelector)
- `slideContainer` = div.slide-container (querySelector)
- `frameWidth` = (px) image and frame width
- `arrowDistance` = (%) constrols how far away the next and previous arrow are from the left and right edge of the frame.
- `wantSlideshow` = (true/false) toggle slideshow. Default is true
- `slideshowTimerMs` = (number) controls how many milliseconds to change image. Doesnt do anything if wantSlideshow is false. Default is 2300.

### Customise buttons/circles

replace image files with the new image but same name


