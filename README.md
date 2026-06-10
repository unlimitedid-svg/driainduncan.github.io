# Dr Iain Duncan — Website

Multi-page professional website for Dr Iain Duncan, Diagnostic Imaging Physician and Medical Director at ultrasoundCBR, Canberra.

Hosted via GitHub Pages.

---

## Files

| File | Purpose |
|------|---------|
| `index.html` | Homepage |
| `patients.html` | Patient information hub |
| `msk-ultrasound.html` | Musculoskeletal Ultrasound explainer |
| `corticosteroid.html` | Corticosteroid injections FAQ |
| `prp.html` | Platelet-Rich Plasma injections (patient info) |
| `research.html` | Research & publications overview |
| `prp-review-2025.html` | Full 2025 PRP in Osteoarthritis review |
| `style.css` | Shared stylesheet (colours, fonts, layout — used by every page) |
| `README.md` | This file |

---

## Site structure

```
Home (index.html)
├── For Patients (patients.html)
│   ├── MSK Ultrasound (msk-ultrasound.html)
│   ├── Corticosteroid Injections (corticosteroid.html)
│   └── PRP Injections (prp.html)
└── Research (research.html)
    └── PRP Review 2025 (prp-review-2025.html)
```

All pages share the same navigation, colours, and styling via `style.css`.

---

## How to update content

All content lives in the HTML files. Open any file in a text editor (Notepad, TextEdit, VS Code) and find the section you want to change.

### Changing text on a page
Simply find the text inside the HTML and edit it. Text lives between tags like `<p>...</p>` or `<h2>...</h2>`.

### Adding a new patient information page
1. Copy an existing page (e.g. `prp.html`) and rename it
2. Update the title, heading, and content
3. Add a link to it on `patients.html`

### Adding a new news item on the homepage
Open `index.html` and find `id="news"`. Each news item looks like:
```html
<div class="news-item">
  <div class="news-date">
    <div class="month">Jul</div>
    <div class="year">2024</div>
  </div>
  <div class="news-content">
    <h4>Headline</h4>
    <p>Description text.</p>
  </div>
</div>
```
Copy and paste a block, then edit the dates, headline, and text.

### Adding a PDF download
1. Create a folder in your repository called `downloads/`
2. Upload your PDF (e.g. `shoulder-anatomy.pdf`)
3. Open `patients.html` and update the link `<a href="#">Shoulder Anatomy</a>` to `<a href="downloads/shoulder-anatomy.pdf">Shoulder Anatomy</a>`

### Adding a new research article
1. Copy `prp-review-2025.html` and rename it (e.g. `new-article.html`)
2. Edit the title, headings, and body
3. Add a card on `research.html` linking to it

---

## Colours

The site uses two Pantone colours, defined in `style.css`:

| Colour | Pantone | Hex |
|--------|---------|-----|
| Bright teal (accents) | 7465 C | `#2BC4B6` |
| Deep teal (buttons, headings) | 7474 C | `#007681` |

To change a colour globally, open `style.css` and edit the `:root` block at the top. The change applies to every page automatically.

```css
:root {
  --teal-bright: #2BC4B6;  /* Pantone 7465 C */
  --teal-deep:   #007681;  /* Pantone 7474 C */
  ...
}
```

---

## Deploying changes

1. Edit the file locally OR directly on GitHub by clicking the pencil (edit) icon
2. Commit the changes
3. GitHub Pages will publish the update within a minute or two

---

## Custom domain (`driainduncan.com.au`)

To point your domain to GitHub Pages:

1. In your repository, go to **Settings → Pages**
2. Under **Custom domain**, enter `driainduncan.com.au` and save
3. With your domain registrar, add the following DNS records:

```
Type: A     Name: @    Value: 185.199.108.153
Type: A     Name: @    Value: 185.199.109.153
Type: A     Name: @    Value: 185.199.110.153
Type: A     Name: @    Value: 185.199.111.153
Type: CNAME Name: www  Value: unlimitedid-svg.github.io
```

DNS changes can take up to 24 hours to propagate.

---

*Site built with plain HTML and CSS. No frameworks, no dependencies, no build tools required.*
