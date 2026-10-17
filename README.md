# istory

An English-first learning website built with HTML, CSS, and JavaScript. Three beginner stories include vocabulary, comprehension quizzes, and optional Arabic support.

## Run locally

Python 3 is the only runtime requirement. No application packages, build step, accounts, or API keys are needed.

```sh
cd /workspace/istory
python3 -m http.server 3000 --bind 0.0.0.0
```

## Learning features

- English navigation, stories, vocabulary definitions, and feedback.
- The **مساعدة بالعربية** button toggles Arabic guidance, story titles, and vocabulary meanings. The preference persists across reloads.
- Arabic story translations are always available through the translation disclosure inside each lesson.
- Quizzes require an answer, allow retries, and count each completed story once.
- Completion progress is saved in this browser, without cross-device synchronization.
- Dialogs support the close button and Escape, and restore focus to the lesson button.
- Responsive layouts and reduced-motion preferences are supported. Optional Google Fonts fall back to system fonts.

## Validation

```sh
node --check app.js
curl --fail http://127.0.0.1:3000/
```

Browser validation was performed in Chromium: every navigation link and button, all three quizzes, incorrect-answer retries, required-answer validation, duplicate prevention, reload persistence, Arabic help and translations, closing and focus restoration, and layouts at 320, 390, 580, 768, and 1024 pixels. The app also works when the optional font request is unavailable.
