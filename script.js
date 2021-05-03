const RESTRICTED_STUDENT = [
  {
    id: 28,
    seats: [35],
  },
  {
    id: 30,
    seats: [31, 32, 33, 34],
  },
];

let students;

function reset() {
  students = [];

  const STUDENT_INFO = [
    { name: { zh: "方怡惜", en: "Xixi" }, id: 1 },
    { name: { zh: "毛語霏", en: "Fiona" }, id: 2 },
    { name: { zh: "王嘉杰", en: "Kenny" }, id: 3 },
    { name: { zh: "石夏騰", en: "Yannis" }, id: 4 },
    { name: { zh: "何雯怡", en: "Ellen" }, id: 5 },
    { name: { zh: "吳文豪", en: "Jimmy" }, id: 6 },
    { name: { zh: "李君愛", en: "Iris" }, id: 7 },
    { name: { zh: "李嘉敏", en: "Sally" }, id: 8 },
    { name: { zh: "李嘉濠", en: "Oscar" }, id: 9 },
    { name: { zh: "施均衡", en: "Ken" }, id: 10 },
    { name: { zh: "洪振熺", en: "Simon" }, id: 11 },
    { name: { zh: "孫嘉豪", en: "Billy" }, id: 12 },
    { name: { zh: "張心瑜", en: "Wing" }, id: 13 },
    { name: { zh: "張智謙", en: "William" }, id: 14 },
    { name: { zh: "張鎭揚", en: "Terry" }, id: 15 },
    { name: { zh: "梁僑丹", en: "Joan" }, id: 16 },
    { name: { zh: "陳卓恒", en: "Sam" }, id: 17 },
    { name: { zh: "陳涌興", en: "Manson" }, id: 18 },
    { name: { zh: "陳棉棉", en: "Icy" }, id: 19 },
    { name: { zh: "陳靜姸", en: "Mary" }, id: 20 },
    { name: { zh: "馮雅詩", en: "Rebecca" }, id: 21 },
    { name: { zh: "黃志昊", en: "Jay" }, id: 22 },
    { name: { zh: "黃志軒", en: "Jackson" }, id: 23 },
    { name: { zh: "黃俊軒", en: "Stephen  W." }, id: 24 },
    { name: { zh: "黃奕菲", en: "Vivi" }, id: 25 },
    { name: { zh: "黃廣源", en: "Hower" }, id: 26 },
    { name: { zh: "雷美琪", en: "Mickey" }, id: 27 },
    { name: { zh: "趙均浩", en: "Alex" }, id: 28 },
    { name: { zh: "歐陽源枝", en: "Ben" }, id: 29 },
    { name: { zh: "蔣嘉豪", en: "Malcolm" }, id: 30 },
    { name: { zh: "鄭傲軒", en: "Henry" }, id: 31 },
    { name: { zh: "鄭敬霖", en: "Michael" }, id: 32 },
    { name: { zh: "龍梓城", en: "Stephen  L." }, id: 33 },
    { name: { zh: "謝卓熹", en: "Ardee" }, id: 34 },
    { name: { zh: "關琪琪", en: "Elieen" }, id: 35 },
    { name: { zh: "蘇澤棠", en: "Paco" }, id: 36 },
  ];

  while (STUDENT_INFO.length) {
    const i = Math.floor(Math.random() * STUDENT_INFO.length);
    students.push(STUDENT_INFO[i]);
    STUDENT_INFO.splice(i, 1);
  }
}

const $canvas = document.querySelector("#canvas");
const ctx = $canvas.getContext("2d");

$canvas.width = 1100;
$canvas.height = 720;

let offset = 0;

function draw() {
  const { width: w, height: h } = $canvas;
  const gap = 0.01 * w;
  const pad = 2 * gap;
  const bigGap = 4 * gap;
  const sw = (w - gap * 5 - bigGap * 2 - pad * 2) / 6; // seat width
  const sh = (h - gap * 5 - pad * 2) / 6; // seat height

  ctx.save();
  ctx.fillStyle = "#eee";
  ctx.fillRect(0, 0, w, h);
  ctx.translate(pad, pad);

  const shuffled = students.slice(offset).concat(students.slice(0, offset));

  RESTRICTED_STUDENT.forEach((student) => {
    const i = shuffled.findIndex((s) => s.id === student.id);
    const j = student.seats[Math.floor(Math.random() * student.seats.length)];
    const k = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = k;
  });

  shuffled.forEach((student, idx) => {
    const x = idx % 6;
    const y = Math.floor(idx / 6);

    ctx.save();
    ctx.translate(x * (sw + gap) + Math.floor(x / 2) * bigGap, y * (sh + gap));

    ctx.save();
    ctx.shadowColor = "#bbb";
    ctx.shadowBlur = 4;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, sw, sh);
    ctx.restore();

    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.translate(sw / 2, sh * (2 / 5));

    ctx.font =
      sh / 3 +
      "px -apple-system, BlinkMacSystemFont, '맑은 고딕', 'Malgun Gothic', '微軟正黑體', 'Microsoft JhengHei', '微軟雅黑體', 'Microsoft YaHei', 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
    ctx.fillStyle = "#111";
    ctx.fillText(student.name.zh, 0, 0);

    ctx.translate(0, sh / 3);
    ctx.font =
      sh / 6 +
      "px -apple-system, BlinkMacSystemFont, '맑은 고딕', 'Malgun Gothic', '微軟正黑體', 'Microsoft JhengHei', '微軟雅黑體', 'Microsoft YaHei', 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
    ctx.fillStyle = "#888";
    ctx.fillText(student.name.en + " (" + student.id + ")", 0, 0);
    ctx.restore();

    ctx.restore();
  });

  ctx.restore();
  offset = ++offset % shuffled.length;
}

reset();

setInterval(draw, 1000 / 20);
draw();

function snapshot() {
  const imgLink = document.createElement("a");
  imgLink.download =
    "better_seat." + new Date().toISOString().substr(0, 10) + ".png";
  imgLink.href = $canvas.toDataURL();
  imgLink.click();
}

function lucky() {
  document.querySelector("#reset-cat").classList.add("slide");
  document.querySelector("#reset-btn").disabled = true;

  reset();

  setTimeout(() => {
    document.querySelector("#reset-cat").classList.remove("slide");
    document.querySelector("#reset-btn").disabled = false;
  }, 1000);
}
