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

new ImageCarousel(frame, slideContainer, frameWidth, wantSlideshow, slideshowTimerMs).create();

```

- `frame` = div.frame
- `slideContainer` = div.slide-container
- `frameWidth` = (px) image and frame width
- `wantSlideshow` = (true/false) toggle slideshow
- `slideshowTimerMs` = (number) how many milliseconds to change image. Doesnt do anything if wantSlideshow is false.

### Customise buttons/circles

replace image files with the new image but same name


