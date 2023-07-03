// Select The Start Game Button
document.querySelector(".control-buttons span").onclick = function () {
  // Prompt Window To Ask For Name
  let yourName = prompt("What's Your Name ?");
  // If Name Is Empty
  if (yourName == null || yourName == "") {
    // Set Name To UnKnown
    document.querySelector(".name span").innerHTML = "UnKnown";
  } else {
    // Set Name To Your Name
    document.querySelector(".name span").innerHTML = yourName;
  }

  // Remove Splash Screen
  document.querySelector(".control-buttons").remove();
  countdown(90);
};

// Effect Duration
let duration = 700;

// Select Blocks Container
let blocksContainer = document.querySelector(".memory-game-blocks");
// Create Array From Game Blocks
let blocks = Array.from(blocksContainer.children);
// Create Range Of Keys
let orderChange = [...Array(blocks.length).keys()];
shuffle(orderChange);

// Add Order Css Property To Game Blocks
blocks.forEach((block, index) => {
  block.style.order = orderChange[index];

  // Add Click Event
  block.addEventListener("click", function () {
    // Triggeer The flip Block Function
    filpBlock(block);
  });
});
// Flip Block Function
function filpBlock(selectedBlock) {
  // Add Class is-flipped
  selectedBlock.classList.add("is-flipped");

  // Collect All Flipped Cards
  let allFlippedBlocks = blocks.filter((flipedBlock) =>
    flipedBlock.classList.contains("is-flipped")
  );

  // If Theres Two Selected Blocks
  if (allFlippedBlocks.length == 2) {
    // Stop Clicking Function
    stopClicking();

    // Check Matched Block Function
    CheckMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

// Stop Clicking Function
function stopClicking() {
  // Add Class No Clicking on main Main Container
  blocksContainer.classList.add("no-clicking");

  setTimeout(() => {
    // Remove Class No Clicking on After The Duration
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

// Check Matched Block Function
function CheckMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");

  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
    document.getElementById("Success").play();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
    document.getElementById("fail").play();
  }
}

// Shuffle Function
function shuffle(array) {
  // Setting Vars
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    // Get Random Number
    random = Math.floor(Math.random() * current);
    // Decrease Length By One
    current--;

    // [1] Save Current Element in Stash
    temp = array[current];
    // [2] Current Element = Random Element
    array[current] = array[random];
    // [3] Random Element = Get Element From Stash
    array[random] = temp;
  }
  return array;
}
function goodGame() {
  let div = document.createElement("div");
  let divText = document.createTextNode("You Win");
  div.appendChild(divText);

  div.className = "correct";

  document.body.appendChild(div);
}
let countdownElement = document.querySelector(".countdown");
let countdownInterval;

function countdown(duration) {
  let minutes, seconds;
  countdownInterval = setInterval(() => {
    minutes = parseInt(duration / 60);
    seconds = parseInt(duration % 60);

    minutes = minutes > 10 ? `0${minutes}` : minutes;
    seconds = minutes > 10 ? `0${seconds}` : seconds;

    countdownElement.innerHTML = `${minutes}:${seconds}`;
    let allFlipped = blocks.filter((flipedBlock) =>
      flipedBlock.classList.contains("has-match")
    );
    if (allFlipped.length == blocks.length) {
      clearInterval(countdownInterval);
      goodGame();
    }
    if (--duration < 0) {
      clearInterval(countdownInterval);
      blocksContainer.classList.add("stopped");
      badGame();
    }
  }, 700);
}

function badGame() {
  let div = document.createElement("div");
  let divText = document.createTextNode("You loss");
  div.appendChild(divText);

  div.className = "wrong";

  document.body.appendChild(div);
}
