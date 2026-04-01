# 💌 Ifra Date Proposal — Playful Edition v2

## Files
```
ifra-date-v2/
├── index.html   — Page structure
├── style.css    — Playful styling & animations
├── app.js       — All interactivity & config
└── photos/      — Put Ifra's photos here (create this folder)
    ├── i.jpg
    ├── f.jpg
    ├── r.jpg
    └── a.jpg
```

## Adding Photos

1. Create a `photos/` folder inside `ifra-date-v2/`
2. Add your photos (jpg, png, webp all work)
3. Open `app.js`, find the `CONFIG.letters` section and change:

```js
I: { photo: null }
// to:
I: { photo: "photos/i.jpg" }
```

## Customise Captions & Messages

In `app.js`, edit `CONFIG.letters[X].caption` for each letter.

Edit `CONFIG.noMessages` to change the funny messages that appear when she clicks No.

## Running It

Just open `index.html` in a browser. No setup needed!

If photos don't load (browser security), use a local server:
```bash
cd ifra-date-v2
python -m http.server 8080
# open http://localhost:8080
```

## What's New in v2
- 🎨 Bold, colourful playful design (Fredoka One font)
- 🎊 Confetti bursts on Yes (and even on No!)
- 🌈 Floating background shapes animation
- 😂 10 funny messages when she clicks No
- 🟢 Green checkmark appears on revealed letters
- 🫧 Colour-coded letter buttons (pink, purple, teal, yellow)
- 🎉 Animated blob celebration on Yes screen with rainbow text
- 💥 Bouncy, springy button animations throughout
