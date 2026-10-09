# Clutch Code — Motion & UX Specification Table

| Element / Area | Trigger | Target Properties | Duration | Easing | Fallback / Reduced-Motion Behavior |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Global Page View** | Route Navigation | `opacity: 0 -> 1`, `transform: translateY(8px -> 0)` | 250ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Instant display (0ms), no transform |
| **Scroll Progress Bar** | Window Scroll | `transform: scaleX(0 -> 1)` (pinned under header) | Real-time | Linear | Hidden / static |
| **Sticky Header** | Scroll > 24px | `padding: 18px -> 12px`, `backdrop-filter: blur(16px)` | 250ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Instant state switch |
| **Section Cells & Cards** | Viewport Entry (once) | `opacity: 0 -> 1`, `transform: translateY(16px -> 0)` | 500ms | `cubic-bezier(0.2, 0.9, 0.1, 1)` | Instant full opacity, no transform |
| **Primary Buttons** | Hover / Focus | Sheen sweep pseudo-element + 1px lift | 180ms | `cubic-bezier(0.2, 0.9, 0.1, 1)` | Border/color change only |
| **Primary Buttons** | Active / Click | `transform: scale(0.98)` | 100ms | Ease-out | No scale transform |
| **Card Spotlight / Tilt** | Mouse Move (`pointer: fine`) | `transform: perspective(1000px) rotateX/Y(<= 3deg)` + radial glow | Smooth | Spring/Ease | Disabled on touch or reduced motion |
| **Console HUD Tabs** | Auto-rotate (4s) / Click | Active indicator progress line + crossfade panel | 350ms | `cubic-bezier(0.2, 0.9, 0.1, 1)` | Static panel change |
| **Work Filter Chips** | Click | Active pill indicator shift + card opacity transition | 250ms | `cubic-bezier(0.2, 0.9, 0.1, 1)` | Immediate display of matching cards |
| **ClutchKart POS & FAQs** | Click | Accordion expand / collapse + plus icon 45deg rotation | 300ms | `cubic-bezier(0.2, 0.9, 0.1, 1)` | Instant show/hide |
| **Form Inputs** | Focus / Blur | Border highlight `--brand` + focus ring `--brand-glow` | 150ms | Ease-out | Static outline |
