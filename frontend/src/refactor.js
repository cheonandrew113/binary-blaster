document.querySelector("#start").addEventListener("click", () => {
  // VARIABLES
  let screenWidth = document.body.clientWidth;
  let randomWidth = screenWidth * Math.random();
  randomWidth = Math.trunc(randomWidth);

  let loopBeat;
  let counter = 0;
  //   let time;
  let lastBeat;
  let score = 0;
  const colors = [
    "#60d394",
    "#d3606",
    "#c060d3",
    "#d3d160",
    "#606bd3",
    "#60c2d3"
  ];

  // Set timer
  const timerContainer = document.querySelector("h2");
  time = 0;
  setInterval(function() {
    time += 1;
    console.log(`Time:${time}`);
    timerContainer.innerText = `Timer: ${time}`;
  }, 1000);

  // DOCUMENT QUERIES
  const visual = document.querySelector(".visual");
  const scoreContainer = document.querySelector("h1");

  // HELPER FUNCTIONS
  const randomWidthFunc = () => {
    let num = screenWidth * Math.random();

    return Math.trunc(num);
  };

  setInterval(function() {
    randomWidthFunc();
  }, 3000);

  // LOGS
  console.log(`randon nm: ${randomWidth}`);

  // set BPM
  loopBeat = new Tone.Loop(event, "16n");
  Tone.Transport.bpm.value = 5;
  Tone.Transport.start();
  loopBeat.start(0);

  const createRoundTarget = randomNum => {
    const target = document.createElement("div");
    target.id = "round-target";
    target.backgroundImage =
      "http://plug.nyc/wp-content/uploads/2019/09/target.png";

    target.style.left = `${randomWidthFunc()}px`;
    // target.style.right = `${randomNum}px`;

    setInterval(function() {
      console.log(target.getBoundingClientRect().y);

      //   let yPos = target.getBoundingClientRect().y;
      if (target.getBoundingClientRect().y < 600) {
        target.style.height = "40px";
        target.style.width = "40px";
      } else if (target.getBoundingClientRect().y < 300) {
        target.style.height = "30px";
        target.style.width = "30px";
      } else if (target.getBoundingClientRect().y < 150) {
        target.style.height = "20px";
        target.style.width = "20px";
      } else {
        target.style.height = "50px";
        target.style.width = "50px";
      }
    }, 10);

    // setInterval(function() {
    //   let yPos = target.getBoundingClientRect().y;
    //   console.log(yPos);

    //   switch (yPos) {
    //     case yPos < 600:
    //       target.style.height = "40px";
    //       target.style.width = "40px";

    //     case yPos < 350:
    //       target.style.height = "30px";
    //       target.style.width = "30px";

    //     case yPos < 200:
    //       target.style.height = "20px";
    //       target.style.width = "20px";
    //       break;
    //     default:
    //       break;
    //   }
    // }, 10);

    target.addEventListener("click", function(e) {
      console.log(e.target.id);
      switch (e.target.id) {
        case "round-target":
          console.log("targeted");
          e.target.remove();
          score += 1;

          // update score
          scoreContainer.innerText = `Your score: ${score}`;
          console.log(`Your score is: ${score}`);
          createRoundTarget(randomWidth);
          break;
        default:
          break;
      }
    });

    // Initial animation
    target.animate(
      [
        // keyframes
        { transform: "translateY(661px)" },
        { transform: "translateY(130px)" }
      ],
      {
        // timing options
        duration: 5000,
        iterations: Infinity
      },
      {
        direction: "alternate"
      }
    );

    visual.appendChild(target);
  };

  function event() {
    //
    let currentBeat = Tone.Transport.position.split(":");
    if (currentBeat[0] !== lastBeat) {
      createRoundTarget(randomWidth);
      counter += 1;
      randomWidth = Math.trunc(randomWidth);

      console.log(`This is counter:${counter}`);

      console.log(currentBeat[0]);
    }
    if (counter > 5) {
      counter = 0;
    }
    lastBeat = currentBeat[0];
  }

  function randomWidthGenerator() {
    if (randomWidth === randomWidth) {
      randomWidth = Math.trunc(randomWidth);
      createRoundTarget(randomWidth);

      console.log(`This is counter:${counter}`);
      console.log(currentBeat[0]);
    }
  }
});
