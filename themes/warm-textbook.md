---
name: Warm Textbook
description: A clean, academic presentation theme featuring a warm cream background, slate charcoal text, duck-feather teal accents, and subtle dotted grid math paper background.
---

# Warm Textbook

## Palette

| Role | Value | Notes |
| --- | --- | --- |
| bg | `#fdfbf7` | page background (warm cream) |
| text | `#1e293b` | primary text (slate charcoal) |
| accent | `#0d9488` | primary accents, tags (duck-feather teal) |
| accentMuted | `#ccfbf1` | tag backgrounds, highlight blocks |
| orange | `#ea580c` | secondary accent (burnt orange for math callouts) |
| orangeLight | `#ffedd5` | orange highlight backgrounds |
| border | `#e2e8f0` | soft panel borders |
| muted | `#64748b` | secondary text, page numbers |
| white | `#ffffff` | panel surface background |

## Typography

- Display font: `"Outfit", "Noto Sans TC", system-ui, -apple-system, sans-serif`
- Body font: `"Inter", "Noto Sans TC", system-ui, -apple-system, sans-serif`
- Type-scale:
  - Hero title: 150 px
  - Body text: 36 px

## Layout

- Content padding: `100px 120px 140px 120px` (or standard 120 px all around)
- Alignment: left-aligned, structured grids or flex boxes
- Background: grid/dotted graph paper design

## Fixed components

### TextbookBg

```tsx
const TextbookBg = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      background: 'var(--osd-bg, #fdfbf7)',
      boxSizing: 'border-box',
      border: '16px solid #e2e8f0',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)',
        backgroundSize: '32px 32px',
        opacity: 0.45,
        pointerEvents: 'none',
      }}
    />
  </div>
);
```

### TextbookHeader

```tsx
const TextbookHeader = ({ title, subtitle, unit = '單元 4' }: { title: string; subtitle?: string; unit?: string }) => (
  <div style={{ position: 'relative', zIndex: 2, marginBottom: 28 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <span
        style={{
          fontFamily: 'var(--osd-font-body)',
          fontSize: 20,
          color: 'var(--osd-accent)',
          letterSpacing: '0.12em',
          fontWeight: 700,
          background: '#ccfbf1',
          padding: '6px 16px',
          borderRadius: 6,
        }}
      >
        {unit}
      </span>
      {subtitle && (
        <span
          style={{
            fontFamily: 'var(--osd-font-body)',
            fontSize: 20,
            color: '#ea580c',
            fontWeight: 700,
            background: '#ffedd5',
            padding: '6px 16px',
            borderRadius: 6,
          }}
        >
          {subtitle}
        </span>
      )}
    </div>
    <h2
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 60,
        fontWeight: 800,
        color: 'var(--osd-text)',
        margin: '12px 0 0 0',
        letterSpacing: '-0.02em',
      }}
    >
      {title}
    </h2>
    <div
      style={{
        height: 3,
        background: `linear-gradient(90deg, var(--osd-accent) 0%, #ccfbf1 70%, transparent 100%)`,
        marginTop: 10,
        borderRadius: 2,
      }}
    />
  </div>
);
```

### TextbookFooter

```tsx
import { useSlidePageNumber } from '@open-slide/core';

const TextbookFooter = ({ subtitle = '幾何性質基本性質' }: { subtitle?: string }) => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        bottom: 50,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'var(--osd-font-body)',
        fontSize: 18,
        color: '#64748b',
        borderTop: '2px dashed #e2e8f0',
        paddingTop: 16,
        zIndex: 2,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: 'var(--osd-accent)' }} />
        <span style={{ fontWeight: 600 }}>{subtitle}</span>
      </div>
      <div style={{ fontFamily: 'monospace', letterSpacing: '0.08em', fontWeight: 600 }}>
        PAGE <span style={{ color: 'var(--osd-accent)', fontSize: 20 }}>{String(current).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
      </div>
    </div>
  );
};
```

### Panel (Text Container Card)

```tsx
const Panel = ({ title, children, delay = 0 }: { title?: string; children: React.ReactNode; delay?: number }) => (
  <div
    className="es-fadeUp"
    style={{
      background: '#ffffff',
      border: '2px solid #e2e8f0',
      borderRadius: 'var(--osd-radius)',
      padding: '28px 36px',
      boxShadow: '0 8px 24px rgba(100, 116, 139, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      animationDelay: `${delay}s`,
    }}
  >
    {title && (
      <h3
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 30,
          color: 'var(--osd-accent)',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          fontWeight: 800,
        }}
      >
        <span style={{ color: '#ea580c' }}>◆</span> {title}
      </h3>
    )}
    <div style={{ fontSize: 25, lineHeight: 1.5, color: 'var(--osd-text)' }}>
      {children}
    </div>
  </div>
);
```

## Motion

- Philosophy: Subtle transition animations (smooth fade and vertical offset).
- CSS Animations to inject:

```css
@keyframes textbook-fadeUp {
  from { opacity: 0; transform: translateY(15px); }
  to   { opacity: 1; transform: translateY(0); }
}
.es-fadeUp { 
  opacity: 0; 
  animation: textbook-fadeUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; 
}
```

## Aesthetic

The aesthetic is inspired by premium Taiwanese and Japanese educational design. It avoids stark blackboard colors, instead utilizing warm paper tones and comfortable low-contrast grids for high legibility and soft classroom visual comfort. Rounded panel corners are supported, while gradients and emojis should be avoided.

## Example usage

```tsx
const Content: Page = () => (
  <div style={{ width: '100%', height: '100%', padding: '100px 120px 140px 120px', position: 'relative' }}>
    <TextbookBg />
    <TextbookHeader title="對角與對邊的幾何性質" subtitle="核心觀念" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
      <Panel title="定義" delay={0.1}>
        兩組對邊分別平行的四邊形，稱為平行四邊形。
      </Panel>
      <Panel title="性質" delay={0.25}>
        對邊等長、對角相等。
      </Panel>
    </div>
    <TextbookFooter />
  </div>
);
```
