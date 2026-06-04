import React from 'react';
import type { Page, SlideMeta, DesignSystem } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';

// Same design system tokens
export const design: DesignSystem = {
  palette: {
    bg: '#fdfbf7',
    text: '#1e293b',
    accent: '#0d9488',
  },
  fonts: {
    display: '"Outfit", "Noto Sans TC", system-ui, -apple-system, sans-serif',
    body: '"Inter", "Noto Sans TC", system-ui, -apple-system, sans-serif',
  },
  typeScale: {
    hero: 150,
    body: 36,
  },
  radius: 12,
};

const palette = {
  bg: 'var(--osd-bg, #fdfbf7)',
  text: 'var(--osd-text, #1e293b)',
  accent: 'var(--osd-accent, #0d9488)',
  accentMuted: '#ccfbf1',
  orange: '#ea580c',
  orangeLight: '#ffedd5',
  border: '#e2e8f0',
  muted: '#64748b',
  white: '#ffffff',
};

const font = {
  sans: 'var(--osd-font-body)',
  display: 'var(--osd-font-display)',
  mono: '"JetBrains Mono", "SF Mono", ui-monospace, Menlo, monospace',
};

const fill = {
  width: '100%',
  height: '100%',
  background: 'var(--osd-bg, #fdfbf7)',
  color: 'var(--osd-text, #1e293b)',
  fontFamily: 'var(--osd-font-body)',
  letterSpacing: '-0.01em',
  overflow: 'hidden',
  position: 'relative' as const,
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=Noto+Sans+TC:wght@400;500;700;900&display=swap');
  @keyframes textbook-fadeUp {
    from { opacity: 0; transform: translateY(15px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .es-fadeUp { 
    opacity: 0; 
    animation: textbook-fadeUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; 
  }
`;

const Styles = () => <style>{styles}</style>;

// Verbatim theme components
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

const TextbookHeader = ({ title, subtitle, unit = '單元 4' }: { title: string; subtitle?: string; unit?: string }) => (
  <div style={{ position: 'relative', zIndex: 2, marginBottom: 28 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <span
        style={{
          fontFamily: font.sans,
          fontSize: 20,
          color: palette.accent,
          letterSpacing: '0.12em',
          fontWeight: 700,
          background: palette.accentMuted,
          padding: '6px 16px',
          borderRadius: 6,
        }}
      >
        {unit}
      </span>
      {subtitle && (
        <span
          style={{
            fontFamily: font.sans,
            fontSize: 20,
            color: palette.orange,
            fontWeight: 700,
            background: palette.orangeLight,
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
        fontFamily: font.display,
        fontSize: 60,
        fontWeight: 800,
        color: palette.text,
        margin: '12px 0 0 0',
        letterSpacing: '-0.02em',
      }}
    >
      {title}
    </h2>
    <div
      style={{
        height: 3,
        background: `linear-gradient(90deg, ${palette.accent} 0%, ${palette.accentMuted} 70%, transparent 100%)`,
        marginTop: 10,
        borderRadius: 2,
      }}
    />
  </div>
);

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
        fontFamily: font.sans,
        fontSize: 18,
        color: palette.muted,
        borderTop: `2px dashed ${palette.border}`,
        paddingTop: 16,
        zIndex: 2,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: palette.accent }} />
        <span style={{ fontWeight: 600 }}>{subtitle}</span>
      </div>
      <div style={{ fontFamily: font.mono, letterSpacing: '0.08em', fontWeight: 600 }}>
        PAGE <span style={{ color: palette.accent, fontSize: 20 }}>{String(current).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
      </div>
    </div>
  );
};

const Panel = ({ title, children, delay = 0 }: { title?: string; children: React.ReactNode; delay?: number }) => (
  <div
    className="es-fadeUp"
    style={{
      background: palette.white,
      border: `2px solid ${palette.border}`,
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
          fontFamily: font.display,
          fontSize: 30,
          color: palette.accent,
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          fontWeight: 800,
        }}
      >
        <span style={{ color: palette.orange }}>◆</span> {title}
      </h3>
    )}
    <div style={{ fontSize: 25, lineHeight: 1.5, color: palette.text }}>
      {children}
    </div>
  </div>
);

// Demo Slides
const DemoCover: Page = () => (
  <div style={fill}>
    <Styles />
    <TextbookBg />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '140px 120px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        zIndex: 2,
      }}
    >
      <div className="es-fadeUp" style={{ animationDelay: '0.1s' }}>
        <span
          style={{
            fontFamily: font.sans,
            fontSize: 24,
            color: palette.accent,
            letterSpacing: '0.2em',
            border: `2px solid ${palette.accent}`,
            padding: '8px 24px',
            borderRadius: 8,
            fontWeight: 700,
          }}
        >
          主題預覽範例
        </span>
      </div>

      <div style={{ margin: '40px 0' }}>
        <h1
          className="es-fadeUp"
          style={{
            fontFamily: font.display,
            fontSize: 100,
            lineHeight: 1.1,
            fontWeight: 900,
            margin: 0,
            color: palette.text,
            animationDelay: '0.3s',
            letterSpacing: '-0.03em',
          }}
        >
          Warm Textbook
          <br />
          <span style={{ color: palette.accent }}>溫暖清新教科書風格</span>
        </h1>
        <p
          className="es-fadeUp"
          style={{
            marginTop: 36,
            fontSize: 30,
            color: palette.muted,
            maxWidth: 1000,
            lineHeight: 1.5,
            animationDelay: '0.5s',
          }}
        >
          這是一個專為學術、教學及知識分享設計的簡報主題。採用舒適的奶油底色與格線點設計，長時間閱讀不疲勞。
        </p>
      </div>

      <div style={{ height: 40 }} />
    </div>
  </div>
);

const DemoContent: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <div style={{ position: 'relative', zIndex: 2, padding: '100px 120px 140px 120px' }}>
      <TextbookHeader title="版面編排展示" subtitle="內容頁面" />
      
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 40, marginTop: 40 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Panel title="左側重點論述" delay={0.1}>
            此主題支援乾淨的單欄或雙欄版面。卡片元件具有極佳的層次感，並運用點狀背景增添書寫質感。
          </Panel>
          <Panel title="細緻的視覺焦點" delay={0.25}>
            鴨羽綠為主要強調色，佐以溫暖的焦橘色做為強調提示標記，十分適合作為重點批註。
          </Panel>
        </div>

        <Panel title="圖文對照區" delay={0.4}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              右側面板可以放置幾何圖形、代數演算步驟或是說明文字。
            </div>
            <div
              style={{
                height: 180,
                background: palette.accentLight,
                border: `2.5px dashed ${palette.accent}`,
                borderRadius: design.radius,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 26,
                fontWeight: 700,
                color: palette.accent,
              }}
            >
              [ 幾何繪圖或視覺框放置區 ]
            </div>
          </div>
        </Panel>
      </div>
    </div>
    <TextbookFooter subtitle="學術與教學展示主題" />
  </div>
);

export const meta: SlideMeta = {
  title: 'Warm Textbook Theme Demo',
  createdAt: '2026-06-04T03:54:10Z',
};

export default [DemoCover, DemoContent] satisfies Page[];
