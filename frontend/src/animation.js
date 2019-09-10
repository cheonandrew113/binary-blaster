// document.addEventListener("DOMContentLoaded", () => {
//   const bg = document.getElementById("game-screen");
//   let target = `<div style="position: relative;"><link style="position: relative;" href="#" class="target-link"><img style="height: 75px; width: auto;" src="http://plug.nyc/wp-content/uploads/2019/09/target.png" class="target" alt=""></link href="#"></div>`;

//   bg.insertAdjacentHTML("afterbegin", target);
// });
let screenWidth = document.body.clientWidth;
let randomWidth = screenWidth * Math.random();
randomWidth = Math.trunc(randomWidth);
// const randomWidth = () => {
//   let num = screenWidth * Math.random();

//   Math.trunc(num);
// };
console.log(`rand: ${randomWidth}`);

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
let time;

loopBeat = new Tone.Loop(event, "16n");
// set BPM
Tone.Transport.bpm.value = 5;
Tone.Transport.start();
loopBeat.start(0);

let lastBeat;
const visual = document.querySelector(".visual");

let score = 0;

const createRoundTarget = () => {
  const target = document.createElement("div");
  target.id = "round-target";

  target.style.left = `${randomWidth}px`;
  target.style.right = `${randomWidth}px`;

  visual.appendChild(target);
  // target.style.backgroundColor = colors[counter];

  target.animate(
    [
      // keyframes
      { transform: "translateY(0px)" },
      { transform: "translateY(-100px)" }
      // { height: "25px" }
    ],
    {
      // timing options
      duration: 2000,
      iterations: Infinity
    },
    {
      direction: "alternate"
    }
  );
  document.addEventListener("click", function(e) {
    switch (e.target.id) {
      case "round-target":
        console.log("targeted");
        e.target.remove();
        score += 1;
        console.log(`score is: ${score}`);
        createRoundTarget();
        break;
      default:
        break;
    }
    // console.log(e.target);
    // target.removeChild("div");
  });
  target.addEventListener("animationend", function() {
    target.removeChild("div");
  });
};

function event() {
  //

  let currentBeat = Tone.Transport.position.split(":");
  if (currentBeat[0] !== lastBeat) {
    createRoundTarget();
    counter += 1;
    randomWidth = Math.trunc(randomWidth);
    // rand = Math.random();
    // rand2 = Math.random();
    console.log(`This is counter:${counter}`);
    // console.log(`This is rand2:${rand2}`);
    // console.log(`This is rand:${rand}`);
    console.log(currentBeat[0]);
  }
  if (counter > 5) {
    counter = 0;
  }

  lastBeat = currentBeat[0];
}
