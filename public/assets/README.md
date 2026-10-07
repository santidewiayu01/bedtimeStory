# Official asset folders (pending download from Google Drive)

This environment cannot reach Google Drive, so none of the official
MiniLemon assets from the brief have been downloaded yet. Every asset
slot in the Hero currently renders `<AssetPlaceholder>` (a dashed box)
instead. Download each Drive folder below and drop its files into the
matching local folder — no renaming needed, HeroLayers.jsx will be
wired up to load whatever's actually there once you confirm filenames.

| Drive folder            | Local folder                | Used by |
|--------------------------|------------------------------|---------|
| Logo                      | `public/assets/branding/`    | `src/components/layout/Navbar.jsx` (`Logo`) |
| Background ilustrasi Hero | `public/assets/hero/background/` | `HeroLayers.jsx` — Layer 1 (background) |
| Dekorasi Hero             | `public/assets/hero/decoration/` | `HeroLayers.jsx` — Layer 2 (midground) and Layer 3 (foreground) decorative elements |
| Visual teaser cards       | `public/assets/stories/`     | `src/components/ui/StoryCard.jsx` / `VideoCard.jsx` (Story/Video homepage sections — outside the Hero) |
| Icon                      | `public/assets/icons/`       | general UI icons (outside the Hero) |
| Icon Science              | `public/assets/science/`     | `src/components/ui/ScienceCard.jsx` (Science homepage section — outside the Hero) |

## Not covered by any Drive folder yet

The brief's Layer 4 ("FOCAL — Minilemon / main character") has no
matching Drive folder in the brief — flag this to the design team.
Until it exists, `HeroLayers.jsx`'s focal layer stays an
`<AssetPlaceholder>` in `public/assets/hero/foreground/` (closest
existing bucket).

## Swapping a placeholder for a real image

Each spot in `HeroLayers.jsx` is documented inline with exactly which
`<AssetPlaceholder>` to replace with an `<img>` tag once the file
exists — see the comment at the top of that file.
