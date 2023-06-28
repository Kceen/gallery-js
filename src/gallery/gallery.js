export const initGallery = ({
  imagesUrls,
  animationType,
  autoplay,
  autoplayIntervalDuration,
  loop,
}) => {
  let currentImageIndex = 0;
  let prevImageIndex = 0;

  const gallery = document.getElementsByClassName("gallery")[0];
  const galleryContent = document.getElementsByClassName("gallery-content")[0];
  galleryContent.classList.add(`gallery-content--${animationType}`);
  const thumbnails = document.getElementsByClassName("thumbnails")[0];
  const closeButton = document.getElementsByClassName("close-button")[0];

  for (let i = 0; i < imagesUrls.length; i++) {
    const image = document.createElement("img");
    image.src = imagesUrls[i];
    const thumbnail = image.cloneNode();

    image.classList.add("image");
    const attributeDraggable = document.createAttribute("draggable");
    attributeDraggable.value = "true";
    image.attributes.setNamedItem(attributeDraggable);
    if (i === 0) {
      image.classList.add("image--first", "visible");
    }
    if (i === imagesUrls.length - 1) {
      image.classList.add("image--last");
    }

    galleryContent.appendChild(image);
    thumbnails.appendChild(thumbnail);
  }

  const isFirstIndex = () => {
    return currentImageIndex === 0;
  };
  const getFirstIndex = () => {
    return 0;
  };
  const getLastIndex = () => {
    return imagesUrls.length - 1;
  };
  const isLastIndex = () => {
    return currentImageIndex === imagesUrls.length - 1;
  };
  const getMaxSize = () => {
    return imagesUrls.length;
  };

  const changeCurrentImage = () => {
    document.getElementsByClassName("numbering")[0].textContent = `${
      currentImageIndex + 1
    }/${getMaxSize()}`;

    if (animationType === "flip") {
      galleryContent.children[prevImageIndex].classList.remove("visible");
      const timeoutId = setTimeout(() => {
        galleryContent.children[currentImageIndex].classList.add("visible");
        clearTimeout(timeoutId);
      }, 500);
      return;
    }
    galleryContent.children[prevImageIndex].classList.remove("visible");
    galleryContent.children[currentImageIndex].classList.add("visible");
  };

  const changeCurrentThumbnail = () => {
    thumbnails.children[currentImageIndex].style.border = "2px solid white";
    thumbnails.children[currentImageIndex].style.transform = "scale(1.1)";
    thumbnails.children[currentImageIndex].style.transformOrigin = "bottom";
    thumbnails.children[prevImageIndex].style.border = "";
    thumbnails.children[prevImageIndex].style.transform = "";

    // IN THIS CASE POSITION THE IMAGE IN THE CENTER
    if (currentImageIndex > 3 && currentImageIndex < getMaxSize() - 4) {
      const translateAmount =
        -(
          (thumbnails.children[currentImageIndex].clientWidth + 4) *
            currentImageIndex -
          thumbnails.clientWidth / 2
        ) -
        thumbnails.children[currentImageIndex].clientWidth / 2;

      thumbnails.style.transform = `translateX(${translateAmount}px)`;

      return;
    }

    // IN THIS CASE POSITION THE IMAGE IN THE END
    if (currentImageIndex > getMaxSize() - 5) {
      thumbnails.style.transform = `translateX(-${
        thumbnails.children[currentImageIndex].clientWidth * getMaxSize() +
        getMaxSize() * 4 -
        thumbnails.clientWidth
      }px)`;

      return;
    }

    // IN THIS CASE POSITION THE IMAGE ON THE START
    thumbnails.style.transform = `translateX(0)`;
  };

  const handleNextPage = () => {
    if (isLastIndex()) {
      if (loop) {
        currentImageIndex = getFirstIndex();
        prevImageIndex = getLastIndex();
      } else {
        return;
      }
    } else {
      const currentImageIndexTemp = currentImageIndex;
      prevImageIndex = currentImageIndexTemp;
      currentImageIndex++;
    }

    changeCurrentImage();
    changeCurrentThumbnail();
  };

  const handlePrevPage = () => {
    if (isFirstIndex()) {
      if (loop) {
        currentImageIndex = getLastIndex();
        prevImageIndex = getFirstIndex();
      } else {
        return;
      }
    } else {
      const currentImageIndexTemp = currentImageIndex;
      prevImageIndex = currentImageIndexTemp;
      currentImageIndex--;
    }

    changeCurrentThumbnail();
    changeCurrentImage();
  };

  const nextButton = document.getElementsByClassName("next-button")[0];
  const prevButton = document.getElementsByClassName("prev-button")[0];

  document.getElementsByClassName("numbering")[0].textContent = `${
    currentImageIndex + 1
  }/${getMaxSize()}`;

  nextButton.addEventListener("click", () => {
    handleNextPage();
  });

  prevButton.addEventListener("click", () => {
    handlePrevPage();
  });

  closeButton.addEventListener("click", () => {
    document.exitFullscreen();
  });

  thumbnails.addEventListener("click", (e) => {
    for (let i = 0; i < thumbnails.children.length; i++) {
      if (thumbnails.children[i] === e.target) {
        // IF INDEX IS ALREADY SELECTED, DO NOTHING
        if (i === currentImageIndex) {
          return;
        }

        const currentImageIndexTemp = currentImageIndex;
        prevImageIndex = currentImageIndexTemp;
        currentImageIndex = i;

        changeCurrentThumbnail();
        changeCurrentImage();
      }
    }
  });

  galleryContent.addEventListener("click", (e) => {
    gallery.requestFullscreen().then(() => {
      changeCurrentThumbnail();
    });
  });

  document.onfullscreenchange = () => {
    if (!document.fullscreenElement) {
      changeCurrentThumbnail();
    }
  };

  document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowRight") {
      handleNextPage();
    }
  });

  document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") {
      handlePrevPage();
    }
  });

  for (const image of galleryContent.children) {
    image.addEventListener("ondragstart", (e) => {
      console.log(e);
    });
  }

  if (autoplay) {
    const intervalId = setInterval(() => {
      nextButton.click();
      if (loop) {
        return;
      }
      if (currentImageIndex === imagesUrls.length - 1) {
        clearInterval(intervalId);
      }
    }, autoplayIntervalDuration || 2000);
  }
};
