# 20 signs AI built your site, and 6 steps to premium

From zerowing.in/premium. Tick each one off before you ship.

## The 20 signs

- [ ] **1. Arrows on every button.** "Order KOVA One â†’", "Explore specs â†—". Claude reaches for â†’, GPT for â†—. Instead: Plain button labels. The button shape already says click.
- [ ] **2. Little dots between words.** "Titanium Â· Spatial Â· 60h Battery Â· Free Shipping". They're called interpuncts. Instead: One real sentence: "Milled titanium with 60-hour battery and free delivery."
- [ ] **3. Overusing eyebrows.** Tiny all-caps labels ("HOW IT WORKS") above every heading. On 93% of AI pages. Instead: Let the heading open the section on its own.
- [ ] **4. Cream backgrounds.** Warm beige page. Often exactly #F4F1EA. Instead: White, or a colour taken from the product itself.
- [ ] **5. One italic word in the headline.** "Sound worth *feeling*." One emotional italic word, on half of AI sites. Instead: Same font, same style. Emphasis comes from size, not italics.
- [ ] **6. Sparkle icons.** âœ¨ on the buttons, even when nothing about the product is AI. Instead: Cut them. Use an icon only when it explains something.
- [ ] **7. Everything in a card.** Every box wrapped in a border. Gemini's favourite. Instead: Group with space and alignment. Card only what you can click.
- [ ] **8. The word quiet.** "Engineered for your quiet mornings." Claude loves it. Instead: Delete it. Say what the product does.
- [ ] **9. Numbered sections.** 01, 02, 03 on features that have no order. On 17% of AI pages. Instead: Number only real sequences.
- [ ] **10. Pulsing green dots.** "â— Shipping live from Zurich." Every AI page is "live". Instead: Show status only if it's real and someone needs it.
- [ ] **11. Blurry glows behind the hero.** A soft gradient orb behind the headline. Light with no source. Instead: Real light, from a real photo.
- [ ] **12. Instrument Serif.** AI's go-to display font right now. Instead: Pick one type family on purpose and use it everywhere.
- [ ] **13. Colored left borders.** Thick coloured bars on quotes. Claude's callout look. Instead: Let the quote stand on size and space.
- [ ] **14. Three icon cards in a row.** Icon, title, one line, times three. The biggest tell of all. Instead: Show the real product: a studio macro of the headphones.
- [ ] **15. Pills above the headline.** A badge saying "New" or "v2.4" over the hero. Instead: If something is new, say it in the headline.
- [ ] **16. The word real.** "Real acoustics for real listeners." Real is doing zero work. Instead: A fact: "Hand-matched 40mm beryllium drivers, calibrated individually in Zurich."
- [ ] **17. Made up stats.** 99.9% acoustic purity, 12M+ hours streamed. Never measured. Instead: Measured specs: 40mm driver, 248g, 5â€“40kHz.
- [ ] **18. Two word sentences.** "Pure sound. Every moment." GPT's favourite rhythm. Instead: One plain sentence: "Tuned flat in Zurich so nothing colors your mix."
- [ ] **19. Sections fading on scroll.** Slide up, fade in, repeat everywhere. Instead: Let content just be there. Save motion for one moment.
- [ ] **20. Dithered photos.** Photos turned into dot patterns. Fake-crafted dots. Instead: Use the crisp, full-colour photo.

## Clean is not premium: 6 steps

1. **Monumental type scale** Clean pages are forgettable because nothing is big. One bold typeface, edge to edge, is a decision. How: Set the product name in one heavy face at about 92% of the viewport width.
2. **Image over text. Break the Z-axis.** Text behind, product in front: the page gets real depth instead of sitting flat. How: Float a cutout of the hero product dead centre, overlapping the headline (title z-index 1, cutout z-index 2).
3. **Studio light. Real shadow.** Glows with no source look fake. One light from one direction looks expensive. How: One directional key light from 45Â° overhead, and a grounded contact shadow under the product.
4. **Swiss grid. 60% empty space.** Premium pages say less and leave room. How: Pin real specs to the corners on a 12-column grid and keep about 60% of the hero empty.
5. **Liquid glass control dock** Buttons scattered around the hero are clutter. How: One small frosted-glass dock: colour swatches, price, one Pre-order button.
6. **One living hero moment** Motion everywhere is noise. One moment is a signature. How: Only the product moves: a slow float and one metallic light sweep across it.

## The rest of the page

- **Point at the part.** A spec list is a claim. A product that stays still while each part is explained in turn makes people look at the thing you sell. How: Open with one sentence at 48px and leave most of the band empty. Then pin a big three-quarter view on the left 55% and let three short chapters scroll past on the right; the chapter level with the product lights its part with a 1px line.
- **Crop past the frame.** A photo that fits neatly in a rounded box is a thumbnail. A photo too big for the screen feels like an object you could touch. How: Run one extreme close-up of the material edge to edge, so the frame cuts the product off, with a single small caption in one corner. No headline on it.
- **Split, don't stack.** Heading, text, photo, all centred, section after section. Every section looks the same, so none of them registers. How: Pair real close-up photos with text in asymmetric 7/5 and 4/8 splits, and give each split one verifiable metric set huge, with how it was measured under it.
- **Footnote every number.** Made-up stats have no source. Real ones do, and a footnote is how a reader knows you measured it. Apple footnotes everything. How: Put every spec in a Swiss table: horizontal 1px rules only, mono labels on the left, real values on the right, a superscript on each measured number and the test conditions printed underneath.
- **Hang the quote.** A small centred testimonial reads as filler. Set huge, a review is the loudest proof on the page. How: Set the best review at 48px, left aligned, with the opening mark hung in the margin and one muted attribution line. No box, no bar, no stars.
- **End on the product.** Four columns of links and a newsletter box end the page on admin. The last thing people see should be the thing you sell. How: Close with one quiet strip: name, finish choice, price and one plain solid button between two hairlines. Then the brand name edge to edge as the footer.

## The Z-axis recipe

```css
.hero-title {
  font-size: clamp(6rem, 18vw, 12rem);
  z-index: 1;
}
.hero-cutout {
  position: relative;
  z-index: 2; /* overlaps headline */
}
```

## The prompt

Paste this before you ask Claude, Cursor, v0 or any AI to design a page:

```
You are designing a product web page. Part 1: avoid these 20 signs that make a page look AI-built:

1. No arrow characters (â†’ â†— â€º) inside buttons or links.
2. No interpuncts (Â·) used as separators. Write normal sentences.
3. No small uppercase eyebrow labels above headings.
4. No cream or beige page backgrounds (#F4F1EA and friends).
5. Do not italicise a single word in a headline for emphasis.
6. No âœ¨ or sparkle icons anywhere.
7. Do not wrap every item in a bordered card. Group with spacing and alignment.
8. Do not use the word "quiet" (or "calm", "effortless") as decoration.
9. No 01 / 02 / 03 numbering on sections or features.
10. No pulsing green "live" status dots.
11. No blurred glow blobs or gradient orbs behind content.
12. Do not use Instrument Serif for headlines. Use one type family across the page.
13. No coloured left-border bars on quotes or callouts.
14. No row of three icon cards. Show the real product instead.
15. No badge pills above the headline.
16. Do not use the word "real" for emphasis. Use a specific fact.
17. No invented statistics. Only numbers you can source.
18. No strings of two-word sentences in headings or copy.
19. No fade-up-on-scroll animation on every section.
20. No dithered or halftone effects on photos.

Part 2: clean is not premium. Then build the hero in these 6 steps, in order:

1. Set the product name in one bold typeface, scaled edge to edge (about 92% of the viewport width).
2. Float a cutout of the product dead centre over the headline: type behind, product in front.
3. Use one directional key light and a grounded contact shadow under the product. No glows.
4. Pin real specs to the corners on a 12-column grid and keep about 60% of the hero empty.
5. Put every control in one small frosted-glass dock (swatches, price, one button). Nothing else.
6. Save motion for one moment: a slow float and one light sweep on the product. Nothing else animates.

Part 3: then build every section below the hero, in this order, with these 6 tips. Keep one continuous background with no seams or divider bands between sections, a strict 12-column grid, 140 to 200px between sections on desktop, and only two text colours (ink and one muted tone). No eyebrows above headings, no 3-column icon grids, no bordered stat cards, no coloured left borders, no fade-up on every section.

1. Below the hero, open with a one-sentence thesis band (40 to 56px, about 70% empty). Then a 55/45 sticky dissection: the product pinned on one side, three short chapters scrolling past, each lighting its part with a 1px line.
2. Use one full-bleed, edge-to-edge macro of the product's material with a single small corner caption. No headline, no rounded box.
3. Never stack heading, text and photo centred. Use asymmetric 7/5 and 4/8 splits that pair a real close-up photo with one verifiable metric each.
4. Put the specs in a Swiss hairline table: horizontal 1px rules only, mono labels left, real specs right, and footnote every measured number with its test conditions. No stat cards.
5. Set one review as an oversized pull-quote (44 to 52px) with the opening mark hung in the margin and one muted attribution line. No box, no left bar, no stars.
6. End on a quiet conversion strip (price, finish choice, one plain solid button) above an edge-to-edge oversized wordmark. No link columns, no newsletter box.

Z-axis layering for step 2 of part 2:
.hero-title {
  font-size: clamp(6rem, 18vw, 12rem);
  z-index: 1;
}
.hero-cutout {
  position: relative;
  z-index: 2; /* overlaps headline */
}

Before you finish, check the page against all 20 signs, all 6 steps and the rest-of-page tips, and fix anything that slipped in.
```