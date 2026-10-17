"use strict";
const lessons = [
  {
    id: "morning",
    title: "صباح مختلف",
    english: "A fresh morning",
    category: "الحياة اليومية",
    description: "ابدأ يومك مع لينا وتعلّم كلمات تستخدمها كل صباح.",
    symbol: "☀",
    tint: "#ecebd7",
    accent: "#a38e46",
    story:
      "Lina wakes up early. She opens the window and sees the sun. She makes a cup of tea and reads a book. Today is a new day. Lina feels happy.",
    translation:
      "تستيقظ لينا مبكرًا. تفتح النافذة وترى الشمس. تُعدّ كوبًا من الشاي وتقرأ كتابًا. اليوم يوم جديد. تشعر لينا بالسعادة.",
    words: [
      ["early", "مبكرًا"],
      ["window", "نافذة"],
      ["happy", "سعيد"],
    ],
    question: "What does Lina drink?",
    answers: ["Coffee", "Tea", "Juice"],
    correct: 1,
  },
  {
    id: "cafe",
    title: "لقاء في المقهى",
    english: "At the little café",
    category: "المحادثات البسيطة",
    description: "رافق عمر إلى المقهى واكتشف كيف تطلب مشروبك المفضّل.",
    symbol: "☕",
    tint: "#f0e2d6",
    accent: "#a36e49",
    story:
      'Omar walks to a small café. He says, "Hello! Can I have a coffee, please?" The waiter smiles. "Of course!" Omar sits near the door and waits for his friend.',
    translation:
      "يمشي عمر إلى مقهى صغير. يقول: «مرحبًا! هل يمكنني الحصول على قهوة، من فضلك؟» يبتسم النادل ويقول: «بالطبع!» يجلس عمر بالقرب من الباب وينتظر صديقه.",
    words: [
      ["waiter", "نادل"],
      ["friend", "صديق"],
      ["small", "صغير"],
    ],
    question: "Who does Omar wait for?",
    answers: ["His teacher", "His brother", "His friend"],
    correct: 2,
  },
  {
    id: "garden",
    title: "حديقة صغيرة",
    english: "Something to grow",
    category: "العالم من حولك",
    description: "اكتشف حديقة نور وتعلّم كلمات عن الطبيعة والاهتمام بها.",
    symbol: "❧",
    tint: "#dfe9df",
    accent: "#5a815f",
    story:
      "Noor has a small garden. Every day, she gives water to the flowers. A little bird visits her garden. It sings in the tree. Noor loves this quiet place.",
    translation:
      "لدى نور حديقة صغيرة. تسقي الأزهار كل يوم. يزور حديقتها عصفور صغير ويغرد على الشجرة. تحب نور هذا المكان الهادئ.",
    words: [
      ["garden", "حديقة"],
      ["bird", "عصفور"],
      ["quiet", "هادئ"],
    ],
    question: "Where does the bird sing?",
    answers: ["In the tree", "In the house", "In the café"],
    correct: 0,
  },
];
const englishContent = [
  {
    category: "Everyday moments",
    description:
      "Meet Lina and start the day with a few useful everyday words.",
    definitions: [
      "before the usual time",
      "an opening that lets in light",
      "feeling good or pleased",
    ],
  },
  {
    category: "Simple conversations",
    description:
      "Join Omar at a cozy café and learn how to order a favorite drink.",
    definitions: [
      "a person who serves food and drinks",
      "someone you like and know well",
      "not big",
    ],
  },
  {
    category: "The world around us",
    description:
      "Step into Noor’s garden and discover the words for a quieter world.",
    definitions: [
      "a place for growing plants",
      "an animal with feathers and wings",
      "making very little noise",
    ],
  },
];
lessons.forEach((lesson, index) =>
  Object.assign(lesson, englishContent[index]),
);
const helpToggle = document.querySelector("#arabic-toggle");
let arabicHelp = false;
try {
  arabicHelp = localStorage.getItem("istory.arabic-help") === "true";
} catch {
  /* Use the default if storage is unavailable. */
}
function updateHelp() {
  document.body.classList.toggle("show-arabic", arabicHelp);
  helpToggle.setAttribute("aria-pressed", String(arabicHelp));
}
helpToggle.addEventListener("click", () => {
  arabicHelp = !arabicHelp;
  updateHelp();
  try {
    localStorage.setItem("istory.arabic-help", String(arabicHelp));
  } catch {
    /* The current-page preference still works. */
  }
});
updateHelp();
const storageKey = "istory.completed.v1";
let completed = new Set();
try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
  if (Array.isArray(saved))
    completed = new Set(
      saved.filter((id) => lessons.some((lesson) => lesson.id === id)),
    );
} catch {
  /* Progress is optional when storage is unavailable. */
}
const grid = document.querySelector("#lesson-grid");
const dialog = document.querySelector("#lesson-dialog");
const form = document.querySelector("#quiz-form");
const feedback = document.querySelector("#feedback");
let activeLesson = null;
function renderProgress() {
  document.querySelector("#completed").textContent = completed.size;
  document.querySelector("#words").textContent = lessons
    .filter((lesson) => completed.has(lesson.id))
    .reduce((sum, lesson) => sum + lesson.words.length, 0);
  const bar = document.querySelector("#progress-bar");
  bar.value = completed.size;
  bar.textContent = `${completed.size} of ${lessons.length}`;
  document.querySelector("#progress-label").textContent = completed.size
    ? `You’ve completed ${completed.size} of ${lessons.length} stories. Keep growing!`
    : "Your first chapter is waiting";
  if (!grid.children.length)
    grid.innerHTML = lessons
      .map(
        (lesson, index) =>
          `<article class="lesson" style="--tint:${lesson.tint};--accent:${lesson.accent}"><div class="lesson-art"><span class="lesson-number" dir="ltr">CHAPTER 0${index + 1}</span><span class="lesson-symbol" aria-hidden="true">${lesson.symbol}</span></div><div class="lesson-body"><span class="eyebrow">${lesson.category}</span><h3>${lesson.english}</h3><p class="arabic-help lesson-title-ar" lang="ar" dir="rtl">${lesson.title}</p><p class="lesson-description">${lesson.description}</p><div class="lesson-bottom"><span>5 min · 3 words</span><button type="button" data-lesson="${lesson.id}">${completed.has(lesson.id) ? "✓ Review story" : "Read story →"}</button></div></div></article>`,
      )
      .join("");
  for (const button of grid.querySelectorAll("[data-lesson]")) {
    button.textContent = completed.has(button.dataset.lesson)
      ? "✓ Review story"
      : "Read story →";
  }
}
grid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-lesson]");
  if (!button) return;
  activeLesson = lessons.find((lesson) => lesson.id === button.dataset.lesson);
  document.querySelector("#dialog-title").textContent = activeLesson.english;
  document.querySelector("#dialog-label").textContent = activeLesson.category;
  document.querySelector("#story-text").textContent = activeLesson.story;
  document.querySelector("#translation").textContent = activeLesson.translation;
  document.querySelector("#vocabulary").innerHTML = activeLesson.words
    .map(
      ([word, meaning], index) =>
        `<span class="vocab"><b lang="en">${word}</b><span>${activeLesson.definitions[index]}</span><span class="arabic-help" lang="ar" dir="rtl">${meaning}</span></span>`,
    )
    .join("");
  document.querySelector("#question").textContent = activeLesson.question;
  document.querySelector("#answers").innerHTML = activeLesson.answers
    .map(
      (answer, index) =>
        `<label class="answer"><input type="radio" name="answer" value="${index}" required><span lang="en">${answer}</span></label>`,
    )
    .join("");
  feedback.textContent = "";
  feedback.className = "";
  dialog.querySelector("details").open = false;
  dialog.showModal();
});
document
  .querySelector("#close-dialog")
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("close", () => {
  if (activeLesson)
    grid
      .querySelector(`[data-lesson="${activeLesson.id}"]`)
      .focus({ preventScroll: true });
});
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const answer = new FormData(form).get("answer");
  if (answer === null || !activeLesson) return;
  if (Number(answer) !== activeLesson.correct) {
    feedback.className = "error";
    feedback.textContent =
      "Not quite yet. Take another look at the story and try again.";
    return;
  }
  completed.add(activeLesson.id);
  feedback.className = "success";
  feedback.textContent =
    "Well done! Story complete — three new words to take with you.";
  try {
    localStorage.setItem(storageKey, JSON.stringify([...completed]));
  } catch {
    feedback.textContent += " Progress could not be saved in this browser.";
  }
  renderProgress();
});
renderProgress();
