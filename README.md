# Dr Iain Duncan — Website

Personal professional website for Dr Iain Duncan, Diagnostic Imaging Physician and Medical Director at ultrasoundCBR, Canberra.

Hosted via GitHub Pages at [driainduncan.com.au](https://driainduncan.com.au)

---

## Files

| File | Purpose |
|------|---------|
| `index.html` | The entire website — all content, styles, and layout in one file |
| `README.md` | This file |

---

## How to update content

All content lives in `index.html`. Open it in any text editor (Notepad, TextEdit, VS Code, etc.) and find the section you want to change.

### Changing the hero headline
Search for:
```
Diagnostic imaging with a <em>clinical focus</em>
```
Edit the text between the `<h1>` tags.

### Changing the About text
Search for:
```
id="about"
```
The bio paragraphs follow immediately after. Edit the text inside the `<p class="about-text">` tags.

### Updating the quote
Search for:
```
about-quote
```
Edit the text inside the `<blockquote>` tag.

### Adding or editing a Specialties card
Search for:
```
id="specialties"
```
Each card looks like this:
```html
<div class="service-card">
  <div class="service-icon">🦴</div>
  <h4>Card Title</h4>
  <p>Card description text.</p>
</div>
```
Copy an existing card block to add a new one, or edit the title and description text directly.

### Adding a news item
Search for:
```
id="news"
```
Each news item looks like this:
```html
<div class="news-item">
  <div class="news-date">
    <div class="month">Jul</div>
    <div class="year">2024</div>
  </div>
  <div class="news-content">
    <h4>Item headline</h4>
    <p>Item description.</p>
  </div>
</div>
```
Copy and paste a block, then update the month, year, headline, and description.

### Updating the ultrasoundCBR banner
Search for:
```
banner-section
```
Edit the `<h2>` and `<p>` text as needed.

---

## Colours

The site uses two Pantone colours:

| Colour | Pantone | Hex |
|--------|---------|-----|
| Bright teal (accents) | 7465 C | `#2BC4B6` |
| Deep teal (buttons, headings) | 7474 C | `#007681` |

To change a colour globally, open `index.html` and find the `:root` block near the top. Edit the hex values there and the change will apply throughout the entire site.

```css
:root {
  --teal-bright: #2BC4B6;  /* Pantone 7465 C */
  --teal-deep:   #007681;  /* Pantone 7474 C */
  ...
}
```

---

## Deploying changes

1. Edit `index.html` locally
2. Go to your GitHub repository
3. Click on `index.html` → click the pencil (edit) icon → paste your updated content → click **Commit changes**
4. GitHub Pages will automatically publish the update within a minute or two

---

## Domain setup

To point `driainduncan.com.au` to GitHub Pages:

1. In your repository, go to **Settings → Pages**
2. Under **Custom domain**, enter `driainduncan.com.au` and save
3. With your domain registrar, add the following DNS records:

```
Type: A     Name: @    Value: 185.199.108.153
Type: A     Name: @    Value: 185.199.109.153
Type: A     Name: @    Value: 185.199.110.153
Type: A     Name: @    Value: 185.199.111.153
Type: CNAME Name: www  Value: yourgithubusername.github.io
```

DNS changes can take up to 24 hours to propagate.

---

*Site built with plain HTML and CSS. No frameworks, no dependencies, no build tools required.*
