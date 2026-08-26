# TODO

## Navbar Search Overlay (Khaadi-like)
- [ ] Update `src/components/Navbar.jsx`
  - [ ] Add `isSearchOpen` state
  - [ ] Add `searchInputRef` with `useRef`
  - [ ] Make existing search SVG open the overlay
  - [ ] Implement auto-focus on open with `useEffect`
  - [ ] Implement close on `Escape` key with `useEffect`
  - [ ] Implement close on top-right X button
  - [ ] Add overlay JSX (input + X)
- [ ] Update `src/components/Navbar.css`
  - [ ] Add fullscreen overlay styles + transitions
  - [ ] Style centered underlined input bar and uppercase placeholder
  - [ ] Style close X button (top-right)
- [ ] Verify behavior manually
  - [ ] Search icon opens overlay
  - [ ] Input autofocus works instantly
  - [ ] Escape closes overlay
  - [ ] X closes overlay

