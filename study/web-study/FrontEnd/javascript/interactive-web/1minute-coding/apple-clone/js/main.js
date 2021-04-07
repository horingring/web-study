(() => {
  let yOffset = 0; //window.pageYOffset 대신 쓸 변수
  let prevScrollHeight = 0; //현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; //현재 활성화된(눈 앞에 보고 있는) 씬(scroll-section)
  let enterNewScene = false; //새로운 scene이 시작된 순간 true

  let acc = 0.1;
  let delayedYOffset = 0;
  let rafId;
  let rafState;

  const sceneInfo = [
    {
      //0
      type: "sticky",
      heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-0"),
        messageA: document.querySelector("#scroll-section-0 .main-message.a"),
        messageB: document.querySelector("#scroll-section-0 .main-message.b"),
        messageC: document.querySelector("#scroll-section-0 .main-message.c"),
        messageD: document.querySelector("#scroll-section-0 .main-message.d"),
        canvas: document.querySelector("#video-canvas-0"),
        context: document.querySelector("#video-canvas-0").getContext("2d"),
        videoImages: [],
      },
      values: {
        videoImageCount: 300,
        imageSequence: [0, 299],
        canvas_opacity_out: [1, 0, { start: 0.9, end: 1 }],

        messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
        messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
        messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
        messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],

        messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
        messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
        messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
        messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],

        messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
        messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
        messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
        messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],

        messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
        messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
        messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
        messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
      },
    },
    {
      //1
      type: "normal",
      // heightNum: 5, //type normal에서는 필요 없음
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-1"),
      },
    },
    {
      //2
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-2"),
        messageA: document.querySelector("#scroll-section-2 .main-message.a"),
        messageB: document.querySelector("#scroll-section-2 .desc-message.b"),
        messageC: document.querySelector("#scroll-section-2 .desc-message.c"),
        pinB: document.querySelector("#scroll-section-2 .pin.b"),
        pinC: document.querySelector("#scroll-section-2 .pin.c"),
        canvas: document.querySelector("#video-canvas-1"),
        context: document.querySelector("#video-canvas-1").getContext("2d"),
        videoImages: [],
      },
      values: {
        videoImageCount: 960,
        imageSequence: [0, 959],
        canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
        canvas_opacity_out: [1, 0, { start: 0.9, end: 1 }],

        messageA_opacity_in: [0, 1, { start: 0.15, end: 0.2 }],
        messageB_opacity_in: [0, 1, { start: 0.6, end: 0.65 }],
        messageC_opacity_in: [0, 1, { start: 0.87, end: 0.92 }],

        messageA_opacity_out: [1, 0, { start: 0.4, end: 0.45 }],
        messageB_opacity_out: [1, 0, { start: 0.68, end: 0.73 }],
        messageC_opacity_out: [1, 0, { start: 0.95, end: 1 }],

        messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
        messageB_translateY_in: [20, 0, { start: 0.6, end: 0.65 }],
        messageC_translateY_in: [20, 0, { start: 0.87, end: 0.92 }],

        messageA_translateY_out: [0, -20, { start: 0.4, end: 0.45 }],
        messageB_translateY_out: [0, -20, { start: 0.68, end: 0.73 }],
        messageC_translateY_out: [0, -20, { start: 0.95, end: 1 }],

        pinB_scaleY_in: [0.5, 1, { start: 0.6, end: 0.65 }],
        pinC_scaleY_in: [0.5, 1, { start: 0.87, end: 0.92 }],
      },
    },
    {
      //3
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-3"),
        canvasCaption: document.querySelector(".canvas-caption"),
        canvas: document.querySelector(".image-blend-canvas"),
        context: document.querySelector(".image-blend-canvas").getContext("2d"),
        imagesPath: [
          "./images/blend-image-1.jpg",
          "./images/blend-image-2.jpg",
        ],
        images: [],
      },
      values: {
        rect1X: [0, 0, { start: 0, end: 0 }],
        rect2X: [0, 0, { start: 0, end: 0 }],
        rectStartY: 0,
        blendHeight: [0, 0, { start: 0, end: 0 }],
        canvas_scale: [0, 0, { start: 0, end: 0 }],
        canvasCaption_opacity: [0, 1, { start: 0, end: 0 }],
        canvasCaption_translateY: [20, 0, { start: 0, end: 0 }],
      },
    },
  ];

  function setCanvasImages() {
    let imgElem;
    for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
      imgElem = new Image(); //== document.createElement('img');
      imgElem.src = `./video/001/IMG_${6726 + i}.JPG`;
      sceneInfo[0].objs.videoImages.push(imgElem);
    }

    let imgElem2;
    for (let i = 0; i < sceneInfo[2].values.videoImageCount; i++) {
      imgElem2 = new Image(); //== document.createElement('img');
      imgElem2.src = `./video/002/IMG_${7027 + i}.JPG`;
      sceneInfo[2].objs.videoImages.push(imgElem2);
    }

    let imgElem3;
    for (let i = 0; i < sceneInfo[3].objs.imagesPath.length; i++) {
      imgElem3 = new Image();
      imgElem3.src = sceneInfo[3].objs.imagesPath[i];
      sceneInfo[3].objs.images.push(imgElem3);
    }
  }

  function checkMenu() {
    if (yOffset >= document.querySelector(".global-nav").offsetHeight) {
      document.body.classList.add("local-nav-sticky");
    } else {
      document.body.classList.remove("local-nav-sticky");
    }
  }

  function setLayout() {
    //각 스크롤 섹션의 높이 세팅
    for (let i = 0; i < sceneInfo.length; i++) {
      if (sceneInfo[i].type === "sticky") {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      } else if (sceneInfo[i].type === "normal") {
        sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
      }
      sceneInfo[
        i
      ].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    yOffset = window.pageYOffset;
    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute("id", `show-scene-${currentScene}`);

    const heightRatio = window.innerHeight / 1080;
    sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
  }

  function calcValues(values, currentYOffset) {
    let rv;
    //현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;

    if (values.length === 3) {
      // start ~ end 사이에 애니메이션 실행

      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;
      if (
        currentYOffset >= partScrollStart &&
        currentYOffset <= partScrollEnd
      ) {
        rv =
          ((currentYOffset - partScrollStart) / partScrollHeight) *
            (values[1] - values[0]) +
          values[0];
      } else if (currentYOffset < partScrollStart) {
        rv = values[0];
      } else if (currentYOffset > partScrollEnd) {
        rv = values[1];
      }
    } else {
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }
    return rv;
  }

  function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;
    // console.log(currentScene);
    switch (currentScene) {
      case 0:
        // console.log("0 play");
        // let sequence = Math.round(
        //   calcValues(values.imageSequence, currentYOffset)
        // );
        // objs.context.drawImage(objs.videoImages[sequence], 0, 0);
        objs.canvas.style.opacity = calcValues(
          values.canvas_opacity_out,
          currentYOffset
        );

        //A(IN: 0.1-0.2   OUT: 0.25-0.3)
        if (scrollRatio < 0.22) {
          objs.messageA.style.opacity = calcValues(
            values.messageA_opacity_in,
            currentYOffset
          );
          objs.messageA.style.transform = `translateY(${calcValues(
            values.messageA_translateY_in,
            currentYOffset
          )}%)`;
        } else if (scrollRatio > 0.22) {
          objs.messageA.style.opacity = calcValues(
            values.messageA_opacity_out,
            currentYOffset
          );
          objs.messageA.style.transform = `translateY(${calcValues(
            values.messageA_translateY_out,
            currentYOffset
          )}%)`;
        }

        //B(IN: 0.3-0.4   OUT: 0.45-0.5)
        if (scrollRatio < 0.42) {
          objs.messageB.style.opacity = calcValues(
            values.messageB_opacity_in,
            currentYOffset
          );
          objs.messageB.style.transform = `translateY(${calcValues(
            values.messageB_translateY_in,
            currentYOffset
          )}%)`;
        } else if (scrollRatio > 0.42) {
          objs.messageB.style.opacity = calcValues(
            values.messageB_opacity_out,
            currentYOffset
          );
          objs.messageB.style.transform = `translateY(${calcValues(
            values.messageB_translateY_out,
            currentYOffset
          )}%)`;
        }

        //C(IN: 0.5-0.6   OUT: 0.65-0.7)
        if (scrollRatio < 0.62) {
          objs.messageC.style.opacity = calcValues(
            values.messageC_opacity_in,
            currentYOffset
          );
          objs.messageC.style.transform = `translateY(${calcValues(
            values.messageC_translateY_in,
            currentYOffset
          )}%)`;
        } else if (scrollRatio > 0.62) {
          objs.messageC.style.opacity = calcValues(
            values.messageC_opacity_out,
            currentYOffset
          );
          objs.messageC.style.transform = `translateY(${calcValues(
            values.messageC_translateY_out,
            currentYOffset
          )}%)`;
        }

        //D(IN: 0.7-0.8   OUT: 0.85-0.9)
        if (scrollRatio < 0.82) {
          objs.messageD.style.opacity = calcValues(
            values.messageD_opacity_in,
            currentYOffset
          );
          objs.messageD.style.transform = `translateY(${calcValues(
            values.messageD_translateY_in,
            currentYOffset
          )}%)`;
        } else if (scrollRatio > 0.82) {
          objs.messageD.style.opacity = calcValues(
            values.messageD_opacity_out,
            currentYOffset
          );
          objs.messageD.style.transform = `translateY(${calcValues(
            values.messageD_translateY_out,
            currentYOffset
          )}%)`;
        }

        break;
      case 1:
        // console.log("1 play");
        break;
      case 2:
        // console.log("2 play");
        // let sequence2 = Math.round(
        //   calcValues(values.imageSequence, currentYOffset)
        // );
        // objs.context.drawImage(objs.videoImages[sequence2], 0, 0);
        if (scrollRatio < 0.5) {
          //in
          objs.canvas.style.opacity = calcValues(
            values.canvas_opacity_in,
            currentYOffset
          );
        } else {
          //out
          objs.canvas.style.opacity = calcValues(
            values.canvas_opacity_out,
            currentYOffset
          );
        }

        //A (IN:0.25-0.3 OUT:0.4-0.45)
        // 객체.opacity = 값;
        if (scrollRatio < 0.35) {
          objs.messageA.style.opacity = calcValues(
            values.messageA_opacity_in,
            currentYOffset
          );
          objs.messageA.style.transform = `translateY(${calcValues(
            values.messageA_translateY_in,
            currentYOffset
          )}%)`;
        } else if (scrollRatio > 0.35) {
          objs.messageA.style.opacity = calcValues(
            values.messageA_opacity_out,
            currentYOffset
          );
          objs.messageA.style.transform = `translateY(${calcValues(
            values.messageA_translateY_out,
            currentYOffset
          )}%)`;
        }

        //B (IN:0.6-0.65 OUT:0.68-0.73)
        if (scrollRatio < 0.66) {
          objs.messageB.style.opacity = calcValues(
            values.messageB_opacity_in,
            currentYOffset
          );
          objs.messageB.style.transform = `translateY(${calcValues(
            values.messageB_translateY_in,
            currentYOffset
          )}%)`;
          objs.pinB.style.transform = `scaleY(${calcValues(
            values.pinB_scaleY_in,
            currentYOffset
          )})`;
        } else if (scrollRatio > 0.66) {
          objs.messageB.style.opacity = calcValues(
            values.messageB_opacity_out,
            currentYOffset
          );
          objs.messageB.style.transform = `translateY(${calcValues(
            values.messageB_translateY_out,
            currentYOffset
          )}%)`;
        }

        //C (IN:0.87-0.92 OUT:0.95-1)
        if (scrollRatio < 0.93) {
          objs.messageC.style.opacity = calcValues(
            values.messageC_opacity_in,
            currentYOffset
          );
          objs.messageC.style.transform = `translateY(${calcValues(
            values.messageC_translateY_in,
            currentYOffset
          )}%)`;
          objs.pinC.style.transform = `scaleY(${calcValues(
            values.pinC_scaleY_in,
            currentYOffset
          )})`;
        } else if (scrollRatio > 0.93) {
          objs.messageC.style.opacity = calcValues(
            values.messageC_opacity_out,
            currentYOffset
          );
          objs.messageC.style.transform = `translateY(${calcValues(
            values.messageC_translateY_out,
            currentYOffset
          )}%)`;
        }

        //
        // section-3에서 나타날 캔버스를 미리 나타나게 하기
        if (scrollRatio > 0.9) {
          /*  브라우저가 어떤 사이즈든
            canvas 사이즈가 브라우저를 꽉 채우도록 하기
          */
          const objs = sceneInfo[3].objs;
          const values = sceneInfo[3].values;

          let widthRatio = window.innerWidth / objs.canvas.width;
          let heightRatio = window.innerHeight / objs.canvas.height;

          let canvasScaleRatio;
          if (widthRatio <= heightRatio) {
            //브라우저 사이즈가 홀쭉(세로로 길쭉)할 경우
            canvasScaleRatio = heightRatio;
          } else {
            //브라우저 사이즈가 납작(가로로 길쭉)할 경우
            canvasScaleRatio = widthRatio;
          }

          objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
          objs.context.fillStyle = "white";
          objs.context.drawImage(objs.images[0], 0, 0);

          const recalculatedInnerWidth =
            document.body.offsetWidth / canvasScaleRatio;
          const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;

          const whiteRectWidth = recalculatedInnerWidth * 0.15;
          values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
          values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
          values.rect2X[0] =
            values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
          values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

          //좌우 흰색 박스 그리기
          objs.context.fillRect(
            values.rect1X[0],
            0,
            whiteRectWidth,
            recalculatedInnerHeight
          );
          objs.context.fillRect(
            values.rect2X[0],
            0,
            whiteRectWidth,
            recalculatedInnerHeight
          );
        }

        break;
      case 3:
        // console.log("3 play");

        let step = 0;

        /*  브라우저가 어떤 사이즈든
            canvas 사이즈가 브라우저를 꽉 채우도록 하기
        */

        let widthRatio = window.innerWidth / objs.canvas.width;
        let heightRatio = window.innerHeight / objs.canvas.height;

        let canvasScaleRatio;
        if (widthRatio <= heightRatio) {
          //브라우저 사이즈가 홀쭉(세로로 길쭉)할 경우
          canvasScaleRatio = heightRatio;
        } else {
          //브라우저 사이즈가 납작(가로로 길쭉)할 경우
          canvasScaleRatio = widthRatio;
        }

        objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
        objs.context.fillStyle = "white";
        objs.context.drawImage(objs.images[0], 0, 0);

        const recalculatedInnerWidth =
          document.body.offsetWidth / canvasScaleRatio;
        const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;

        if (values.rectStartY === 0) {
          values.rectStartY =
            objs.canvas.offsetTop +
            (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2;
          values.rect1X[2].start = window.innerHeight / 2 / scrollHeight;
          values.rect2X[2].start = window.innerHeight / 2 / scrollHeight;
          values.rect1X[2].end = values.rectStartY / scrollHeight;
          values.rect2X[2].end = values.rectStartY / scrollHeight;
        }

        const whiteRectWidth = recalculatedInnerWidth * 0.15;
        values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
        values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
        values.rect2X[0] =
          values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
        values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

        //좌우 흰색 박스 그리기
        // objs.context.fillRect(
        //   values.rect1X[0],
        //   0,
        //   whiteRectWidth,
        //   recalculatedInnerHeight
        // );
        // objs.context.fillRect(
        //   values.rect2X[0],
        //   0,
        //   whiteRectWidth,
        //   recalculatedInnerHeight
        // );
        objs.context.fillRect(
          parseInt(calcValues(values.rect1X, currentYOffset)),
          0,
          whiteRectWidth,
          recalculatedInnerHeight
        );
        objs.context.fillRect(
          parseInt(calcValues(values.rect2X, currentYOffset)),
          0,
          whiteRectWidth,
          recalculatedInnerHeight
        );

        if (scrollRatio < values.rect1X[2].end) {
          step = 1;
          // console.log("캔버스 닿기 전");
          objs.canvas.classList.remove("sticky");
        } else {
          step = 2;
          // console.log("캔버스 닿은 후");
          // 이미지 블렌드
          // blendHeight: [0, 0, { start: 0, end: 0 }]
          values.blendHeight[0] = 0;
          values.blendHeight[1] = objs.canvas.height;
          values.blendHeight[2].start = values.rect1X[2].end;
          values.blendHeight[2].end = values.rect1X[2].end + 0.2;
          const blendHeight = calcValues(values.blendHeight, currentYOffset);

          objs.context.drawImage(
            objs.images[1],
            0,
            objs.canvas.height - blendHeight,
            objs.canvas.width,
            objs.canvas.height,
            0,
            objs.canvas.height - blendHeight,
            objs.canvas.width,
            objs.canvas.height
          );

          objs.canvas.classList.add("sticky");
          objs.canvas.style.top = `${-(
            (objs.canvas.height - objs.canvas.height * canvasScaleRatio) /
            2
          )}px`;

          if (scrollRatio > values.blendHeight[2].end) {
            //축소 시작
            values.canvas_scale[0] = canvasScaleRatio;
            values.canvas_scale[1] =
              document.body.offsetWidth / (1.5 * objs.canvas.width);
            values.canvas_scale[2].start = values.blendHeight[2].end;
            values.canvas_scale[2].end = values.blendHeight[2].end + 0.2;

            objs.canvas.style.transform = `scale(${calcValues(
              values.canvas_scale,
              currentYOffset
            )})`;
            objs.canvas.style.marginTop = 0;
          }

          if (
            scrollRatio > values.canvas_scale[2].end &&
            values.canvas_scale[2].end > 0
          ) {
            step = 3;
            objs.canvas.classList.remove("sticky");
            objs.canvas.style.marginTop = `${scrollHeight * 0.4}px`;

            values.canvasCaption_opacity[2].start = values.canvas_scale[2].end;
            values.canvasCaption_opacity[2].end =
              values.canvasCaption_opacity[2].start + 0.1;

            values.canvasCaption_translateY[2].start =
              values.canvasCaption_opacity[2].start;
            values.canvasCaption_translateY[2].end =
              values.canvasCaption_opacity[2].end;

            objs.canvasCaption.style.opacity = calcValues(
              values.canvasCaption_opacity,
              currentYOffset
            );

            objs.canvasCaption.style.transform = `translate3d(0, ${calcValues(
              values.canvasCaption_translateY,
              currentYOffset
            )}%, 0)`;
          }
        }

        break;
    }
  }

  function scrollLoop() {
    prevScrollHeight = 0;
    enterNewScene = false;

    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (
      delayedYOffset >
      prevScrollHeight + sceneInfo[currentScene].scrollHeight
    ) {
      currentScene++;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
      enterNewScene = true;
    }

    if (delayedYOffset < prevScrollHeight) {
      enterNewScene = true;
      if (currentScene === 0) return; //브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
      currentScene--;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

    if (enterNewScene) return;

    playAnimation();
  }

  function loop() {
    delayedYOffset = delayedYOffset + (yOffset - delayedYOffset) * acc;

    if (!enterNewScene) {
      const currentYOffset = delayedYOffset - prevScrollHeight;
      const objs = sceneInfo[currentScene].objs;
      const values = sceneInfo[currentScene].values;
      if (currentScene === 0 || currentScene === 2) {
        let sequence = Math.round(
          calcValues(values.imageSequence, currentYOffset)
        );
        if (objs.videoImages[sequence]) {
          objs.context.drawImage(objs.videoImages[sequence], 0, 0);
        }
      }
    }

    rafId = requestAnimationFrame(loop);

    if (Math.abs(yOffset - delayedYOffset) < 1) {
      cancelAnimationFrame(rafId);
      rafState = false;
    }
  }

  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;
    scrollLoop();
    checkMenu();

    if (!rafState) {
      requestAnimationFrame(loop);
      rafState = true;
    }
  });

  // window.addEventListener('DOMContentLoaded', setLayout);
  window.addEventListener("load", () => {
    document.body.classList.remove("before-load");

    setLayout();
    sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 600) {
      setLayout();
    }
    sceneInfo[3].values.rectStartY = 0;
  });
  window.addEventListener("orientationchange", setLayout);

  document.querySelector(".loading").addEventListener("transitionend", (e) => {
    document.body.removeChild(e.currentTarget);
  });

  setCanvasImages();
})();
