
let dailyData = [];

let taskColors = {
  "Class": "#A0C4FF",
  "Homework": "#FFB7E8",
  "Chores": "#FFD166",
  "Youtube": "#C8A2FF"
};

let timeColors = {
  "Morning": "#F6C85F",
  "Afternoon": "#F4A261",
  "Evening": "#7B8FCB",
  "Night": "#7B8FCB"
};

let moodColors = {
  "Tired": "#A0A7B5",
  "Stressed": "#E78A8A",
  "Calm": "#83B99A",
  "Happy": "#E9B85D"
};

async function setup() {
  let canvas = createCanvas(900, 550);
  canvas.parent("canvas-holder");

  try {
    // Load daily task data
    let loadedData = await loadJSON("DailyTasks(Sheet1).json");

    // Convert the data into an array if necessary
    if (Array.isArray(loadedData)) {
      dailyData = loadedData;
    } else {
      dailyData = Object.keys(loadedData)
        .sort((a, b) => Number(a) - Number(b))
        .map(key => loadedData[key]);
    }

    console.log("Daily task data loaded:", dailyData);
    console.log("Number of days:", dailyData.length);

    redraw();

  } catch (error) {
    console.error("Error loading daily task data:", error);
  }
}

function draw() {
  background("#FFF8F0");

  // Title
  noStroke();
  fill("#4B3B40");
  textAlign(CENTER);
  textSize(30);
  text("A Week in Bloom", width / 2, 65);

  textSize(15);
  fill("#88777C");
  text("A flower for every day of my week", width / 2, 95);

  // Draw flowers for each day
  let spacing = 115;
  let startX = 105;

  for (let i = 0; i < dailyData.length; i++) {
    let x = startX + i * spacing;
    let y = 220;

    let day = dailyData[i].Day;
    let task = dailyData[i].Task;
    let time = dailyData[i].Time;
    let mood = dailyData[i].Mood;

    let taskColor = taskColors[task];
    let timeColor = timeColors[time];
    let moodColor = moodColors[mood];

    drawFlower(x, y, taskColor, timeColor, moodColor);

    // Day name
    fill("#4B3B40");
    textSize(14);
    text(day, x, 330);

    // Task, time, and mood
    fill("#88777C");
    textSize(12);
    text(task, x, 355);
    text(time, x, 375);
    text(mood, x, 395);
  }

  drawLegend();
}

function drawFlower(x, y, taskColor, timeColor, moodColor) {
  push();
  translate(x, y);

  // Stem
  stroke("#75966C");
  strokeWeight(4);
  line(0, 15, 0, 85);

  // Leaves
  noStroke();
  fill("#91B987");
  ellipse(-12, 55, 22, 10);
  ellipse(12, 70, 22, 10);

  // Draw eight petals
  for (let i = 0; i < 8; i++) {
    push();

    rotate(TWO_PI / 8 * i);

    // Alternate between time and mood colors
    if (i % 2 === 0) {
      fill(timeColor);
    } else {
      fill(moodColor);
    }

    noStroke();
    ellipse(0, -25, 18, 32);

    pop();
  }

  // Flower center represents the task
  fill(taskColor);
  noStroke();
  circle(0, 0, 20);

  pop();
}

function drawLegend() {
  fill("#4B3B40");
  noStroke();
  textAlign(CENTER);
  textSize(18);
  text("Task Color Legend (Flower Center)", width / 2, 455);

  let tasks = Object.keys(taskColors);
  let startX = 190;
  let spacing = 175;

  for (let i = 0; i < tasks.length; i++) {
    let x = startX + i * spacing;

    fill(taskColors[tasks[i]]);
    circle(x, 490, 17);

    fill("#4B3B40");
    textAlign(LEFT);
    textSize(13);
    text(tasks[i], x + 15, 495);
  }
}