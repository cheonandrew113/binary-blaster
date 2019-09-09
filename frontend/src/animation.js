// document.addEventListener("DOMContentLoaded", () => {
//   const bg = document.getElementById("game-screen");
//   let target = `<div style="position: relative;"><link style="position: relative;" href="#" class="target-link"><img style="height: 75px; width: auto;" src="http://plug.nyc/wp-content/uploads/2019/09/target.png" class="target" alt=""></link href="#"></div>`;

//   bg.insertAdjacentHTML("afterbegin", target);
// });

let loopBeat;
let rand;
let rand2;
let counter = 0;
const colors = [
  "#60d394",
  "#d3606",
  "#c060d3",
  "#d3d160",
  "#606bd3",
  "#60c2d3"
];

loopBeat = new Tone.Loop(event, "16n");
// set BPM
Tone.Transport.bpm.value = 100;
Tone.Transport.start();
loopBeat.start(0);

let lastBeat;
const visual = document.querySelector(".visual");

const createBalls = () => {
  const balls = document.createElement("div");
  balls.style.left = `${rand * 1000}px`;
  balls.style.right = `${rand * 1000}px`;
  balls.style.backgroundColor = colors[counter];

  visual.appendChild(balls);
  balls.style.backgroundColor = colors[counter];

  balls.animate(
    [
      // keyframes
      { transform: "translateY(0px)" },
      { transform: "translateY(-300px)" }
      // { backgroundPositionX: "left" }
    ],
    {
      // timing options
      duration: 1000,
      iterations: Infinity
    },
    {
      direction: "alternate"
    }
  );

  balls.addEventListener("animationend", function() {
    balls.removeChild("div");
  });
};

function event() {
  //

  let currentBeat = Tone.Transport.position.split(":");
  if (currentBeat[0] !== lastBeat) {
    createBalls();
    counter += 1;
    rand = Math.random();
    rand2 = Math.random();
    console.log(`This is counter:${counter}`);
    console.log(`This is rand2:${rand2}`);
    console.log(`This is rand:${rand}`);
    console.log(currentBeat[0]);
  }
  if (counter > 5) {
    counter = 0;
  }

  lastBeat = currentBeat[0];
}
