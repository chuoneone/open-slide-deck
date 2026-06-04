import React from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { ImagePlaceholder, useSlidePageNumber } from '@open-slide/core';

import windowImg from './assets/window.png';
import eraserImg from './assets/eraser.png';
import buildingImg from './assets/building.png';


// ─── Panel-tweakable design tokens ────────────────────────────────────────────
// Edit live from the Design panel; consumed via `var(--osd-*)` in inline styles.
export const design: DesignSystem = {
  palette: {
    bg: '#fdfbf7',     // 溫慢奶油白
    text: '#1e293b',   // 板岩灰
    accent: '#0d9488', // 鴨羽綠
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

// ─── Local Style Constants ────────────────────────────────────────────────────
const palette = {
  bg: 'var(--osd-bg)',
  text: 'var(--osd-text)',
  accent: 'var(--osd-accent)',
  accentMuted: '#ccfbf1',
  accentLight: '#f0fdfa',
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
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
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
  @keyframes textbook-pulse {
    0%, 100% { transform: scale(1); }
    50%      { transform: scale(1.02); }
  }
  .es-fadeUp { 
    opacity: 0; 
    animation: textbook-fadeUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; 
  }
  .es-pulse {
    animation: textbook-pulse 2s ease-in-out infinite;
  }
`;

const Styles = () => <style>{styles}</style>;

// ─── Shared Layout Components ──────────────────────────────────────────────────
const TextbookBg = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      background: 'var(--osd-bg)',
      boxSizing: 'border-box',
      border: '16px solid #e2e8f0',
      overflow: 'hidden',
    }}
  >
    {/* Dotted grid paper pattern */}
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

const TextbookHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div style={{ position: 'relative', zIndex: 2, marginBottom: 28 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <span
        style={{
          fontFamily: font.sans,
          fontSize: 20,
          color: 'var(--osd-accent)',
          letterSpacing: '0.12em',
          fontWeight: 700,
          background: palette.accentMuted,
          padding: '6px 16px',
          borderRadius: 6,
        }}
      >
        單元 4 · 平行四邊形
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
        background: `linear-gradient(90deg, var(--osd-accent) 0%, ${palette.accentMuted} 70%, transparent 100%)`,
        marginTop: 10,
        borderRadius: 2,
      }}
    />
  </div>
);

const TextbookFooter = () => {
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
        <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: 'var(--osd-accent)' }} />
        <span style={{ fontWeight: 600 }}>國二幾何講義 · 平行四邊形基本性質</span>
      </div>
      <div style={{ fontFamily: font.mono, letterSpacing: '0.08em', fontWeight: 600 }}>
        PAGE <span style={{ color: 'var(--osd-accent)', fontSize: 20 }}>{String(current).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
      </div>
    </div>
  );
};

const Panel = ({
  title,
  children,
  style,
  delay = 0,
}: {
  title?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  delay?: number;
}) => (
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
      ...style,
    }}
  >
    {title && (
      <h3
        style={{
          fontFamily: font.display,
          fontSize: 30,
          color: 'var(--osd-accent)',
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
    <div style={{ fontSize: 25, lineHeight: 1.5, color: 'var(--osd-text)' }}>
      {children}
    </div>
  </div>
);

// ─── Custom Parallelogram SVG Component ───────────────────────────────────────
const ParallelogramSVG = ({
  width = 380,
  height = 200,
  skew = 80,
  labelA = 'A',
  labelB = 'B',
  labelC = 'C',
  labelD = 'D',
  labelO = '',
  showDiagonals = false,
  showHeight = false,
  shadeTriangle = '',
  annotations = [],
  rightAngle = false,
  customElements = null,
}: {
  width?: number;
  height?: number;
  skew?: number;
  labelA?: string;
  labelB?: string;
  labelC?: string;
  labelD?: string;
  labelO?: string;
  showDiagonals?: boolean;
  showHeight?: boolean;
  shadeTriangle?: string;
  annotations?: { pos: string; label: string; color?: string }[];
  rightAngle?: boolean;
  customElements?: React.ReactNode;
}) => {
  const ax = 60 + skew;
  const ay = 50;
  const dx = 380 + skew;
  const dy = 50;
  const bx = 60;
  const by = 250;
  const cx = 380;
  const cy = 250;
  
  const ox = (ax + cx) / 2;
  const oy = (ay + cy) / 2;

  let shadePath = '';
  if (shadeTriangle === 'AOB') {
    shadePath = `M ${ax} ${ay} L ${ox} ${oy} L ${bx} ${by} Z`;
  } else if (shadeTriangle === 'BOC') {
    shadePath = `M ${bx} ${by} L ${ox} ${oy} L ${cx} ${cy} Z`;
  } else if (shadeTriangle === 'COD') {
    shadePath = `M ${cx} ${cy} L ${ox} ${oy} L ${dx} ${dy} Z`;
  } else if (shadeTriangle === 'DOA') {
    shadePath = `M ${dx} ${dy} L ${ox} ${oy} L ${ax} ${ay} Z`;
  } else if (shadeTriangle === 'all') {
    shadePath = `M ${ax} ${ay} L ${dx} ${dy} L ${cx} ${cy} L ${bx} ${by} Z`;
  }

  return (
    <svg width={width} height={height} viewBox="0 0 500 300" style={{ overflow: 'visible' }}>
      {shadePath && (
        <path d={shadePath} fill="rgba(13, 148, 136, 0.12)" stroke="none" />
      )}

      {/* Main Parallelogram */}
      <path
        d={`M ${ax} ${ay} L ${dx} ${dy} L ${cx} ${cy} L ${bx} ${by} Z`}
        fill="none"
        stroke="var(--osd-text)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Diagonals */}
      {showDiagonals && (
        <>
          <line x1={ax} y1={ay} x2={cx} y2={cy} stroke="#64748b" strokeWidth="2.5" strokeDasharray="6 4" />
          <line x1={bx} y1={by} x2={dx} y2={dy} stroke="#64748b" strokeWidth="2.5" strokeDasharray="6 4" />
        </>
      )}

      {/* Right Angle marker for diagonals perpendicular */}
      {rightAngle && showDiagonals && (
        <path
          d={`M ${ox - 12} ${oy + 4} L ${ox - 8} ${oy + 14} L ${ox + 4} ${oy + 10}`}
          fill="none"
          stroke={palette.orange}
          strokeWidth="2.5"
        />
      )}

      {/* Height Dotted Indicator */}
      {showHeight && (
        <>
          <line x1={ax} y1={ay} x2={ax} y2={by} stroke={palette.orange} strokeWidth="2.5" strokeDasharray="4 4" />
          <path d={`M ${ax} ${by - 12} L ${ax + 12} ${by - 12} L ${ax + 12} ${by}`} fill="none" stroke={palette.orange} strokeWidth="2" />
        </>
      )}

      {customElements}

      {/* Vertex Circles */}
      <circle cx={ax} cy={ay} r="6" fill="var(--osd-accent)" />
      <circle cx={bx} cy={by} r="6" fill="var(--osd-accent)" />
      <circle cx={cx} cy={cy} r="6" fill="var(--osd-accent)" />
      <circle cx={dx} cy={dy} r="6" fill="var(--osd-accent)" />
      {showDiagonals && <circle cx={ox} cy={oy} r="6" fill={palette.orange} />}

      {/* Vertex Text Labels */}
      <text x={ax - 10} y={ay - 12} fontSize="28" fontWeight="bold" fill="var(--osd-text)" textAnchor="end">{labelA}</text>
      <text x={bx - 12} y={by + 20} fontSize="28" fontWeight="bold" fill="var(--osd-text)" textAnchor="end">{labelB}</text>
      <text x={cx + 12} y={by + 25} fontSize="28" fontWeight="bold" fill="var(--osd-text)" textAnchor="start">{labelC}</text>
      <text x={dx + 12} y={dy - 8} fontSize="28" fontWeight="bold" fill="var(--osd-text)" textAnchor="start">{labelD}</text>
      {showDiagonals && labelO && (
        <text x={ox} y={oy - 12} fontSize="26" fontWeight="bold" fill={palette.orange} textAnchor="middle">{labelO}</text>
      )}

      {/* Annotations */}
      {annotations.map((ann, i) => {
        let x = 0, y = 0;
        let align = 'middle';
        let color = palette.orange;

        if (ann.pos === 'AB') {
          x = (ax + bx) / 2 - 25;
          y = (ay + by) / 2;
          align = 'end';
        } else if (ann.pos === 'CD') {
          x = (cx + dx) / 2 + 25;
          y = (cy + dy) / 2;
          align = 'start';
        } else if (ann.pos === 'AD') {
          x = (ax + dx) / 2;
          y = ay - 20;
        } else if (ann.pos === 'BC') {
          x = (bx + cx) / 2;
          y = by + 30;
        } else if (ann.pos === 'height') {
          x = ax - 15;
          y = (ay + by) / 2;
          align = 'end';
        } else if (ann.pos === 'AO') {
          x = (ax + ox) / 2 - 12;
          y = (ay + oy) / 2 - 10;
        } else if (ann.pos === 'OC') {
          x = (ox + cx) / 2 + 15;
          y = (oy + cy) / 2 + 15;
        } else if (ann.pos === 'BO') {
          x = (bx + ox) / 2 - 12;
          y = (by + oy) / 2 + 15;
        } else if (ann.pos === 'OD') {
          x = (ox + dx) / 2 + 15;
          y = (oy + dy) / 2 - 10;
        } else if (ann.pos === 'angleA') {
          x = ax + 15;
          y = ay + 32;
          align = 'start';
          color = 'var(--osd-accent)';
        } else if (ann.pos === 'angleB') {
          x = bx + 32;
          y = by - 12;
          align = 'start';
          color = 'var(--osd-accent)';
        } else if (ann.pos === 'angleC') {
          x = cx - 20;
          y = cy - 22;
          align = 'end';
          color = 'var(--osd-accent)';
        } else if (ann.pos === 'angleD') {
          x = dx - 32;
          y = dy + 15;
          align = 'end';
          color = 'var(--osd-accent)';
        }

        return (
          <text key={i} x={x} y={y} fontSize="26" fontWeight="700" fill={ann.color || color} textAnchor={align}>
            {ann.label}
          </text>
        );
      })}
    </svg>
  );
};

// ─── Exercise Layout ──────────────────────────────────────────────────────────
const ExerciseLayout = ({
  question,
  diagram,
  solution,
  delay = 0,
}: {
  question: React.ReactNode;
  diagram?: React.ReactNode;
  solution: React.ReactNode;
  delay?: number;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '1.05fr 1fr',
      gap: 36,
      marginTop: 20,
      alignItems: 'start',
    }}
  >
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Panel title="題目情境" delay={delay}>
        {question}
      </Panel>
      {diagram && (
        <div
          className="es-fadeUp"
          style={{
            background: palette.white,
            border: `2px solid ${palette.border}`,
            borderRadius: 'var(--osd-radius)',
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 290,
            animationDelay: `${delay + 0.15}s`,
            boxShadow: '0 8px 24px rgba(100, 116, 139, 0.04)',
          }}
        >
          {diagram}
        </div>
      )}
    </div>
    <Panel title="解題思維 & 步驟" delay={delay + 0.3} style={{ borderLeft: `8px solid var(--osd-accent)` }}>
      {solution}
    </Panel>
  </div>
);

// ─── Slides Definitions ────────────────────────────────────────────────────────

// ─── Slide 1: Cover ──────────────────────────────────────────────────────────
const Cover: Page = () => (
  <div style={fill}>
    <Styles />
    <TextbookBg />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '140px 140px',
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
            color: 'var(--osd-accent)',
            letterSpacing: '0.2em',
            border: '2px solid var(--osd-accent)',
            padding: '8px 24px',
            borderRadius: 8,
            fontWeight: 700,
          }}
        >
          國中數學第四冊 · 幾何專題
        </span>
      </div>

      <div style={{ margin: '40px 0' }}>
        <h1
          className="es-fadeUp"
          style={{
            fontFamily: font.display,
            fontSize: 'var(--osd-size-hero)',
            lineHeight: 1.1,
            fontWeight: 900,
            margin: 0,
            color: 'var(--osd-text)',
            animationDelay: '0.3s',
            letterSpacing: '-0.03em',
          }}
        >
          單元 4-2：
          <br />
          <span style={{ color: 'var(--osd-accent)' }}>平行四邊形</span>
        </h1>
        <p
          className="es-fadeUp"
          style={{
            marginTop: 36,
            fontSize: 32,
            color: palette.muted,
            maxWidth: 1200,
            lineHeight: 1.5,
            animationDelay: '0.5s',
          }}
        >
          探索平行四邊形的對角、對邊、對角線性質與實戰判別法則。
        </p>
      </div>

      <div
        className="es-fadeUp"
        style={{
          animationDelay: '0.7s',
          display: 'flex',
          gap: 60,
          fontFamily: font.mono,
          fontSize: 22,
          color: palette.muted,
        }}
      >
        <span>
          <span style={{ color: 'var(--osd-accent)', fontWeight: 'bold' }}>★</span> 對邊對角相等
        </span>
        <span>
          <span style={{ color: 'var(--osd-accent)', fontWeight: 'bold' }}>★</span> 對角線平分面積
        </span>
        <span>
          <span style={{ color: 'var(--osd-accent)', fontWeight: 'bold' }}>★</span> 五大判別法則
        </span>
      </div>

      {/* Cover Side Illustration */}
      <div
        className="es-fadeUp"
        style={{
          position: 'absolute',
          right: 140,
          top: '32%',
          animationDelay: '0.6s',
        }}
      >
        <ParallelogramSVG
          width={400}
          height={240}
          skew={70}
          showDiagonals={true}
          labelO="O"
          annotations={[
            { pos: 'AD', label: 'AD // BC', color: 'var(--osd-accent)' },
            { pos: 'AB', label: 'AB // CD', color: 'var(--osd-accent)' }
          ]}
        />
      </div>
    </div>
  </div>
);

// ─── Slide 2: TOC ────────────────────────────────────────────────────────────
const TOC: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <div style={{ position: 'relative', zIndex: 2, padding: '100px 120px 140px 120px' }}>
      <TextbookHeader title="本章學習地圖" subtitle="目錄大綱" />
      
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 40,
          marginTop: 64,
        }}
      >
        {[
          {
            num: '01',
            title: '對角與對邊性質',
            desc: '探索對邊等長、對角相等以及鄰角互補等邊角基本定理與幾何推導。',
            color: 'var(--osd-accent)',
          },
          {
            num: '02',
            title: '對角線與面積關係',
            desc: '理解對角線互相平分的幾何意涵，以及對角線如何四等分平行四邊形面積。',
            color: palette.orange,
          },
          {
            num: '03',
            title: '平行四邊形的判別',
            desc: '學習如何在給定四邊形條件中，快速利用五大核心判別法則確認平行四邊形。',
            color: 'var(--osd-accent)',
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="es-fadeUp"
            style={{
              background: palette.white,
              border: `2px solid ${palette.border}`,
              borderRadius: 'var(--osd-radius)',
              padding: '40px 32px',
              boxShadow: '0 10px 30px rgba(100, 116, 139, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              animationDelay: `${0.2 + idx * 0.15}s`,
            }}
          >
            <div
              style={{
                fontFamily: font.display,
                fontSize: 60,
                fontWeight: 900,
                color: item.color,
                opacity: 0.85,
              }}
            >
              {item.num}
            </div>
            <h3
              style={{
                fontFamily: font.display,
                fontSize: 32,
                margin: 0,
                color: 'var(--osd-text)',
                fontWeight: 800,
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                fontSize: 24,
                lineHeight: 1.6,
                color: palette.muted,
                margin: 0,
              }}
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
    <TextbookFooter />
  </div>
);

// ─── Slide 3: Section 1 Divider ──────────────────────────────────────────────
const Section1Divider: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        padding: '0 120px',
      }}
    >
      <div
        className="es-fadeUp"
        style={{
          fontFamily: font.sans,
          fontSize: 24,
          color: 'var(--osd-accent)',
          background: palette.accentMuted,
          padding: '8px 24px',
          borderRadius: 8,
          fontWeight: 700,
          letterSpacing: '0.15em',
        }}
      >
        SECTION 01
      </div>
      <h1
        className="es-fadeUp"
        style={{
          fontFamily: font.display,
          fontSize: 90,
          fontWeight: 900,
          color: 'var(--osd-text)',
          margin: '32px 0 24px 0',
          textAlign: 'center',
          animationDelay: '0.2s',
        }}
      >
        平行四邊形的對角與對邊
      </h1>
      <p
        className="es-fadeUp"
        style={{
          fontSize: 30,
          color: palette.muted,
          textAlign: 'center',
          maxWidth: 900,
          lineHeight: 1.6,
          animationDelay: '0.4s',
        }}
      >
        學習如何利用「對邊等長」、「對角相等」、「鄰角互補」解決長度與角度的問題。
      </p>
    </div>
    <TextbookFooter />
  </div>
);

// ─── Slide 4: Section 1 Concepts ─────────────────────────────────────────────
const Section1Concepts: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <div style={{ position: 'relative', zIndex: 2, padding: '100px 120px 140px 120px' }}>
      <TextbookHeader title="對角與對邊的幾何性質" subtitle="核心觀念" />
      
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 48,
          marginTop: 36,
          alignItems: 'start',
        }}
      >
        {/* Left List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Panel title="什麼是平行四邊形？" delay={0.1}>
            定義：<strong>兩組對邊分別平行</strong>的四邊形，稱為平行四邊形。
            <br />
            記作「<strong>□ABCD</strong>」，讀作「平行四邊形 ABCD」。
          </Panel>
          
          <Panel title="邊角三大核心性質" delay={0.25}>
            <ul style={{ margin: 0, paddingLeft: 28 }}>
              <li><strong>性質 1：對邊等長</strong>
                <div style={{ color: palette.muted, fontSize: 22, marginTop: 4 }}>
                  AB = CD 且 AD = BC。
                </div>
              </li>
              <li style={{ marginTop: 12 }}><strong>性質 2：對角相等</strong>
                <div style={{ color: palette.muted, fontSize: 22, marginTop: 4 }}>
                  ∠A = ∠C 且 ∠B = ∠D。
                </div>
              </li>
              <li style={{ marginTop: 12 }}><strong>性質 3：鄰角互補</strong>
                <div style={{ color: palette.muted, fontSize: 22, marginTop: 4 }}>
                  ∠A + ∠B = 180°、∠B + ∠C = 180°、∠C + ∠D = 180°、∠D + ∠A = 180°。
                </div>
              </li>
            </ul>
          </Panel>
        </div>

        {/* Right Diagram & Life Example Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            className="es-fadeUp"
            style={{
              background: palette.white,
              border: `2px solid ${palette.border}`,
              borderRadius: 'var(--osd-radius)',
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: 280,
              animationDelay: '0.4s',
              boxShadow: '0 8px 24px rgba(100, 116, 139, 0.04)',
            }}
          >
            <ParallelogramSVG
              width={360}
              height={200}
              skew={80}
              annotations={[
                { pos: 'AD', label: 'AD = BC' },
                { pos: 'BC', label: 'AD = BC' },
                { pos: 'AB', label: 'AB = CD' },
                { pos: 'CD', label: 'AB = CD' }
              ]}
            />
          </div>

          <Panel title="生活中的平行四邊形" delay={0.5}>
            <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
              <div style={{ flex: 1, height: 130 }}>
                <img src={windowImg} alt='生活中的平行四邊形窗戶' style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--osd-radius)' }} />
              </div>
              <div style={{ flex: 1.2, fontSize: 20, color: palette.muted, lineHeight: 1.4 }}>
                日常生活中，許多窗戶、建築外觀或設計裝飾會採用平行四邊形結構，兼具美學與結構力學穩定性。
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
    <TextbookFooter />
  </div>
);

// ─── Slide 5: Section 1 Exercise 1 ───────────────────────────────────────────
const Section1Ex1: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <div style={{ position: 'relative', zIndex: 2, padding: '100px 120px 140px 120px' }}>
      <TextbookHeader title="對邊長度與周長計算" subtitle="例題 1" />
      
      <ExerciseLayout
        delay={0.1}
        question={
          <div>
            如圖，平行四邊形 □ABCD 的<strong>周長為 56</strong>。
            <br />
            已知線段 <strong>AB = 12</strong>，求線段 <strong>AD</strong> 的長度。
          </div>
        }
        diagram={
          <ParallelogramSVG
            width={340}
            height={180}
            skew={60}
            annotations={[
              { pos: 'AB', label: '12' },
              { pos: 'AD', label: '?' }
            ]}
          />
        }
        solution={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <span style={{ color: 'var(--osd-accent)', fontWeight: 'bold' }}>步驟一：對邊等長性質</span>
              <div style={{ color: palette.muted, fontSize: 24, marginTop: 4 }}>
                因為 □ABCD 是平行四邊形，所以對邊等長：
                <br />
                CD = AB = 12
              </div>
            </div>
            
            <hr style={{ border: 'none', borderTop: `1px solid ${palette.border}`, margin: '4px 0' }} />
            
            <div>
              <span style={{ color: 'var(--osd-accent)', fontWeight: 'bold' }}>步驟二：列出周長關係式</span>
              <div style={{ color: palette.muted, fontSize: 24, marginTop: 4 }}>
                平行四邊形的周長為四邊之和：
                <br />
                周長 = AB + BC + CD + DA = 56
                <br />
                由於對邊等長 (BC = AD)，公式可簡化為：
                <br />
                2 × (AB + AD) = 56
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: `1px solid ${palette.border}`, margin: '4px 0' }} />

            <div>
              <span style={{ color: palette.orange, fontWeight: 'bold' }}>步驟三：代入數值求解</span>
              <div style={{ color: 'var(--osd-text)', fontWeight: 600, fontSize: 24, marginTop: 4 }}>
                2 × (12 + AD) = 56
                <br />
                12 + AD = 28
                <br />
                AD = 16 (cm)
              </div>
            </div>
          </div>
        }
      />
    </div>
    <TextbookFooter />
  </div>
);

// ─── Slide 6: Section 1 Exercise 2 ───────────────────────────────────────────
const Section1Ex2: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <div style={{ position: 'relative', zIndex: 2, padding: '100px 120px 140px 120px' }}>
      <TextbookHeader title="對邊長度的代數運算" subtitle="例題 2" />
      
      <ExerciseLayout
        delay={0.1}
        question={
          <div>
            如圖，在平行四邊形 □ABCD 中，若：
            <br />
            <strong>AB = 2x+1</strong>，<strong>CD = 7</strong>，<strong>AD = 6</strong>，<strong>BC = y-3</strong>。
            <br />
            求未知數 <strong>x</strong> 與 <strong>y</strong> 的值，以及其<strong>周長</strong>。
          </div>
        }
        diagram={
          <ParallelogramSVG
            width={340}
            height={180}
            skew={70}
            annotations={[
              { pos: 'AB', label: '2x+1' },
              { pos: 'CD', label: '7' },
              { pos: 'AD', label: '6' },
              { pos: 'BC', label: 'y-3' }
            ]}
          />
        }
        solution={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <span style={{ color: 'var(--osd-accent)', fontWeight: 'bold' }}>步驟一：建立對邊等式</span>
              <div style={{ color: palette.muted, fontSize: 24, marginTop: 4 }}>
                利用平行四邊形性質：AB = CD 且 AD = BC。
              </div>
            </div>
            
            <hr style={{ border: 'none', borderTop: `1px solid ${palette.border}`, margin: '4px 0' }} />
            
            <div>
              <span style={{ color: 'var(--osd-accent)', fontWeight: 'bold' }}>步驟二：解一元一次方程式</span>
              <div style={{ color: 'var(--osd-text)', fontWeight: 600, fontSize: 24, marginTop: 4 }}>
                1. 解 x：
                <div style={{ color: palette.muted, fontWeight: 400, paddingLeft: 16 }}>
                  2x + 1 = 7 ➔ 2x = 6 ➔ <strong>x = 3</strong>
                </div>
                2. 解 y：
                <div style={{ color: palette.muted, fontWeight: 400, paddingLeft: 16 }}>
                  y - 3 = 6 ➔ <strong>y = 9</strong>
                </div>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: `1px solid ${palette.border}`, margin: '4px 0' }} />

            <div>
              <span style={{ color: palette.orange, fontWeight: 'bold' }}>步驟三：計算周長</span>
              <div style={{ color: 'var(--osd-text)', fontWeight: 600, fontSize: 24, marginTop: 4 }}>
                周長 = AB + BC + CD + DA
                <br />
                周長 = 7 + 6 + 7 + 6 = <strong>26</strong>
              </div>
            </div>
          </div>
        }
      />
    </div>
    <TextbookFooter />
  </div>
);

// ─── Slide 7: Section 1 Exercise 3 ───────────────────────────────────────────
const Section1Ex3: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <div style={{ position: 'relative', zIndex: 2, padding: '100px 120px 140px 120px' }}>
      <TextbookHeader title="對角與鄰角求度數" subtitle="例題 3" />
      
      <ExerciseLayout
        delay={0.1}
        question={
          <div>
            如圖，在平行四邊形 □ABCD 中，
            <br />
            若 <strong>∠A = 105°</strong>，求其餘三個內角 ∠B、∠C 和 ∠D 的度數。
          </div>
        }
        diagram={
          <ParallelogramSVG
            width={340}
            height={180}
            skew={80}
            annotations={[
              { pos: 'angleA', label: '105°' },
              { pos: 'angleB', label: '∠B = ?', color: palette.muted },
              { pos: 'angleC', label: '∠C = ?', color: palette.muted },
              { pos: 'angleD', label: '∠D = ?', color: palette.muted }
            ]}
          />
        }
        solution={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <span style={{ color: 'var(--osd-accent)', fontWeight: 'bold' }}>步驟一：對角相等求出 ∠C</span>
              <div style={{ color: palette.muted, fontSize: 24, marginTop: 4 }}>
                根據平行四邊形對角相等的幾何性質：
                <br />
                ∠C = ∠A = <strong>105°</strong>
              </div>
            </div>
            
            <hr style={{ border: 'none', borderTop: `1px solid ${palette.border}`, margin: '4px 0' }} />
            
            <div>
              <span style={{ color: 'var(--osd-accent)', fontWeight: 'bold' }}>步驟二：鄰角互補求出 ∠B</span>
              <div style={{ color: palette.muted, fontSize: 24, marginTop: 4 }}>
                因為兩對邊平行，同側內角互補（即鄰角互補）：
                <br />
                ∠A + ∠B = 180°
                <br />
                ∠B = 180° - 105° = <strong>75°</strong>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: `1px solid ${palette.border}`, margin: '4px 0' }} />

            <div>
              <span style={{ color: palette.orange, fontWeight: 'bold' }}>步驟三：對角相等求出 ∠D</span>
              <div style={{ color: 'var(--osd-text)', fontWeight: 600, fontSize: 24, marginTop: 4 }}>
                ∠D = ∠B = <strong>75°</strong>
                <br />
                <span style={{ color: 'var(--osd-accent)', fontSize: 20 }}>
                  驗算：105° + 75° + 105° + 75° = 360° (內角和符合)
                </span>
              </div>
            </div>
          </div>
        }
      />
    </div>
    <TextbookFooter />
  </div>
);

// ─── Slide 8: Section 2 Divider ──────────────────────────────────────────────
const Section2Divider: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        padding: '0 120px',
      }}
    >
      <div
        className="es-fadeUp"
        style={{
          fontFamily: font.sans,
          fontSize: 24,
          color: palette.orange,
          background: palette.orangeLight,
          padding: '8px 24px',
          borderRadius: 8,
          fontWeight: 700,
          letterSpacing: '0.15em',
        }}
      >
        SECTION 02
      </div>
      <h1
        className="es-fadeUp"
        style={{
          fontFamily: font.display,
          fontSize: 90,
          fontWeight: 900,
          color: 'var(--osd-text)',
          margin: '32px 0 24px 0',
          textAlign: 'center',
          animationDelay: '0.2s',
        }}
      >
        對角線與面積的幾何性質
      </h1>
      <p
        className="es-fadeUp"
        style={{
          fontSize: 30,
          color: palette.muted,
          textAlign: 'center',
          maxWidth: 900,
          lineHeight: 1.6,
          animationDelay: '0.4s',
        }}
      >
        深入學習對角線「互相平分」與「面積等分」的性質，探索其幾何應用的技巧。
      </p>
    </div>
    <TextbookFooter />
  </div>
);

// ─── Slide 9: Section 2 Concepts ─────────────────────────────────────────────
const Section2Concepts: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <div style={{ position: 'relative', zIndex: 2, padding: '100px 120px 140px 120px' }}>
      <TextbookHeader title="對角線平分與面積分割" subtitle="核心觀念" />
      
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 48,
          marginTop: 36,
          alignItems: 'start',
        }}
      >
        {/* Left List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Panel title="性質 4：對角線互相平分" delay={0.1}>
            平行四邊形的兩條對角線會互相平分其長度：
            <br />
            若對角線 AC 與 BD 交於點 O，則有：
            <div style={{ color: palette.muted, fontSize: 24, marginTop: 6, fontWeight: 600 }}>
              AO = OC = 1/2 AC 且 BO = OD = 1/2 BD
            </div>
          </Panel>
          
          <Panel title="性質 5：面積等分關係" delay={0.25}>
            平行四邊形的兩條對角線會將其分割成<strong>四個面積相等</strong>的三角形：
            <div style={{ color: palette.muted, fontSize: 22, marginTop: 8 }}>
              面積(△AOB) = 面積(△BOC) = 面積(△COD) = 面積(△DOA)
            </div>
            <div style={{ color: palette.orange, fontSize: 22, marginTop: 4, fontWeight: 600 }}>
              每個三角形面積均為整個平行四邊形面積的 1/4。
            </div>
          </Panel>
        </div>

        {/* Right Diagram Panel */}
        <div
          className="es-fadeUp"
          style={{
            background: palette.white,
            border: `2px solid ${palette.border}`,
            borderRadius: 'var(--osd-radius)',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: 480,
            animationDelay: '0.4s',
            boxShadow: '0 8px 24px rgba(100, 116, 139, 0.04)',
          }}
        >
          <ParallelogramSVG
            width={420}
            height={260}
            skew={80}
            showDiagonals={true}
            labelO="O"
            shadeTriangle="AOB"
            annotations={[
              { pos: 'AO', label: '1/2 AC', color: 'var(--osd-accent)' },
              { pos: 'OC', label: '1/2 AC', color: 'var(--osd-accent)' },
              { pos: 'BO', label: '1/2 BD', color: palette.orange },
              { pos: 'OD', label: '1/2 BD', color: palette.orange }
            ]}
          />
          <div style={{ marginTop: 40, fontSize: 22, color: palette.muted, textAlign: 'center', fontWeight: 500 }}>
            陰影區域 △AOB 面積為總面積的 1/4。
          </div>
        </div>
      </div>
    </div>
    <TextbookFooter />
  </div>
);

// ─── Slide 10: Section 2 Exercise 1 ──────────────────────────────────────────
const Section2Ex1: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <div style={{ position: 'relative', zIndex: 2, padding: '100px 120px 140px 120px' }}>
      <TextbookHeader title="對角線平分關係與長度" subtitle="例題 4" />
      
      <ExerciseLayout
        delay={0.1}
        question={
          <div>
            如圖，在平行四邊形 □ABCD 中，對角線 AC 與 BD 相交於 O 點。
            <br />
            若已知 <strong>AO = 8x+3</strong> 且 <strong>OC = 9x-1</strong>，求線段 <strong>AC</strong> 的長度。
          </div>
        }
        diagram={
          <ParallelogramSVG
            width={340}
            height={180}
            skew={60}
            showDiagonals={true}
            labelO="O"
            annotations={[
              { pos: 'AO', label: '8x+3' },
              { pos: 'OC', label: '9x-1' }
            ]}
          />
        }
        solution={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <span style={{ color: 'var(--osd-accent)', fontWeight: 'bold' }}>步驟一：利用對角線平分建立方程式</span>
              <div style={{ color: palette.muted, fontSize: 24, marginTop: 4 }}>
                因為對角線互相平分，所以對角線交點 O 為其終點：
                <br />
                AO = OC
              </div>
            </div>
            
            <hr style={{ border: 'none', borderTop: `1px solid ${palette.border}`, margin: '4px 0' }} />
            
            <div>
              <span style={{ color: 'var(--osd-accent)', fontWeight: 'bold' }}>步驟二：解出未知數 x</span>
              <div style={{ color: 'var(--osd-text)', fontWeight: 600, fontSize: 24, marginTop: 4 }}>
                8x + 3 = 9x - 1
                <br />
                將同類項移項：
                <br />
                9x - 8x = 3 + 1
                <br />
                得： <strong>x = 4</strong>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: `1px solid ${palette.border}`, margin: '4px 0' }} />

            <div>
              <span style={{ color: palette.orange, fontWeight: 'bold' }}>步驟三：代回數值求 AC</span>
              <div style={{ color: 'var(--osd-text)', fontWeight: 600, fontSize: 24, marginTop: 4 }}>
                先計算 AO 的長度：
                <br />
                AO = 8(4) + 3 = 35
                <br />
                再計算完整 AC 的長度：
                <br />
                AC = 2 × AO = 2 × 35 = <strong>70</strong>
              </div>
            </div>
          </div>
        }
      />
    </div>
    <TextbookFooter />
  </div>
);

// ─── Slide 11: Section 2 Exercise 2 ──────────────────────────────────────────
const Section2Ex2: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <div style={{ position: 'relative', zIndex: 2, padding: '100px 120px 140px 120px' }}>
      <TextbookHeader title="對角線互相垂直與周長" subtitle="例題 5" />
      
      <ExerciseLayout
        delay={0.1}
        question={
          <div>
            如圖，在平行四邊形 □ABCD 中，對角線 AC 與 BD 相交於 O 點。
            <br />
            若 <strong>AC ⊥ BD</strong>（互相垂直），且 <strong>AC = 6, BD = 8</strong>。
            <br />
            求此平行四邊形的<strong>周長</strong>。
          </div>
        }
        diagram={
          <ParallelogramSVG
            width={340}
            height={180}
            skew={50}
            showDiagonals={true}
            labelO="O"
            rightAngle={true}
            annotations={[
              { pos: 'AD', label: '周長 = ?', color: palette.muted }
            ]}
          />
        }
        solution={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <span style={{ color: 'var(--osd-accent)', fontWeight: 'bold' }}>步驟一：求出半對角線長度</span>
              <div style={{ color: palette.muted, fontSize: 24, marginTop: 4 }}>
                對角線平分：
                <br />
                AO = 1/2 AC = 3 且 BO = 1/2 BD = 4
              </div>
            </div>
            
            <hr style={{ border: 'none', borderTop: `1px solid ${palette.border}`, margin: '4px 0' }} />
            
            <div>
              <span style={{ color: 'var(--osd-accent)', fontWeight: 'bold' }}>步驟二：直角三角形畢氏定理求邊長</span>
              <div style={{ color: palette.muted, fontSize: 24, marginTop: 4 }}>
                因對角線垂直，∠AOB = 90°，△AOB 為直角三角形。
                <br />
                利用畢氏定理求斜邊 AB：
                <br />
                AB = √(AO² + BO²) = √(3² + 4²) = 5
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: `1px solid ${palette.border}`, margin: '4px 0' }} />

            <div>
              <span style={{ color: palette.orange, fontWeight: 'bold' }}>步驟三：計算周長（菱形判定）</span>
              <div style={{ color: 'var(--osd-text)', fontWeight: 600, fontSize: 24, marginTop: 4 }}>
                對角線互相垂直的平行四邊形為<strong>菱形</strong>，菱形四邊等長。
                <br />
                周長 = 4 × AB = 4 × 5 = <strong>20</strong>
              </div>
            </div>
          </div>
        }
      />
    </div>
    <TextbookFooter />
  </div>
);

// ─── Slide 12: Section 2 Exercise 3 ──────────────────────────────────────────
const Section2Ex3: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <div style={{ position: 'relative', zIndex: 2, padding: '100px 120px 140px 120px' }}>
      <TextbookHeader title="對角線與三角形面積關係" subtitle="例題 6" />
      
      <ExerciseLayout
        delay={0.1}
        question={
          <div>
            如圖，在平行四邊形 □ABCD 中，對角線 AC 與 BD 交於 O 點。
            <br />
            若已知 <strong>△AOB 的面積為 71</strong>。
            <br />
            求整個平行四邊形 <strong>ABCD 的總面積</strong>。
          </div>
        }
        diagram={
          <ParallelogramSVG
            width={340}
            height={180}
            skew={80}
            showDiagonals={true}
            labelO="O"
            shadeTriangle="AOB"
            annotations={[
              { pos: 'AB', label: '面積 = 71', color: 'var(--osd-accent)' }
            ]}
          />
        }
        solution={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <span style={{ color: 'var(--osd-accent)', fontWeight: 'bold' }}>步驟一：理解對角線面積分割定理</span>
              <div style={{ color: palette.muted, fontSize: 24, marginTop: 4 }}>
                平行四邊形對角線交於 O，由於對角線等底且同高，四個分割出的三角形（△AOB, △BOC, △COD, △DOA）其<strong>面積完全相等</strong>。
              </div>
            </div>
            
            <hr style={{ border: 'none', borderTop: `1px solid ${palette.border}`, margin: '4px 0' }} />
            
            <div>
              <span style={{ color: 'var(--osd-accent)', fontWeight: 'bold' }}>步驟二：列出總面積關係式</span>
              <div style={{ color: palette.muted, fontSize: 24, marginTop: 4 }}>
                平行四邊形總面積為任一分割三角形的 4 倍：
                <br />
                面積(ABCD) = 4 × 面積(△AOB)
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: `1px solid ${palette.border}`, margin: '4px 0' }} />

            <div>
              <span style={{ color: palette.orange, fontWeight: 'bold' }}>步驟三：計算出總面積</span>
              <div style={{ color: 'var(--osd-text)', fontWeight: 600, fontSize: 24, marginTop: 4 }}>
                面積(ABCD) = 4 × 71 = <strong>284</strong>
              </div>
            </div>
          </div>
        }
      />
    </div>
    <TextbookFooter />
  </div>
);

// ─── Slide 13: Section 3 Divider ───────────────────────────────────────────
const Section3Divider: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        padding: '0 120px',
      }}
    >
      <div
        className="es-fadeUp"
        style={{
          fontFamily: font.sans,
          fontSize: 24,
          color: 'var(--osd-accent)',
          background: palette.accentMuted,
          padding: '8px 24px',
          borderRadius: 8,
          fontWeight: 700,
          letterSpacing: '0.15em',
        }}
      >
        SECTION 03
      </div>
      <h1
        className="es-fadeUp"
        style={{
          fontFamily: font.display,
          fontSize: 90,
          fontWeight: 900,
          color: 'var(--osd-text)',
          margin: '32px 0 24px 0',
          textAlign: 'center',
          animationDelay: '0.2s',
        }}
      >
        平行四邊形的判別方法
      </h1>
      <p
        className="es-fadeUp"
        style={{
          fontSize: 30,
          color: palette.muted,
          textAlign: 'center',
          maxWidth: 900,
          lineHeight: 1.6,
          animationDelay: '0.4s',
        }}
      >
        如何判別一個四邊形是平行四邊形？掌握五大充要條件，精準排除幾何陷阱。
      </p>
    </div>
    <TextbookFooter />
  </div>
);

// ─── Slide 14: Section 3 Concepts ────────────────────────────────────────────
const Section3Concepts: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <div style={{ position: 'relative', zIndex: 2, padding: '100px 120px 140px 120px' }}>
      <TextbookHeader title="平行四邊形的五大判別法" subtitle="判別定理" />
      
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 40,
          marginTop: 32,
        }}
      >
        {/* Left: 1-3 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Panel title="判別法 1：兩組對邊分別平行（定義）" delay={0.1}>
            若 AB // CD 且 AD // BC，則四邊形 ABCD 為平行四邊形。
          </Panel>
          <Panel title="判別法 2：兩組對邊分別等長" delay={0.2}>
            若 AB = CD 且 AD = BC，則四邊形 ABCD 為平行四邊形。
          </Panel>
          <Panel title="判別法 3：兩組對角分別相等" delay={0.3}>
            若 ∠A = ∠C 且 ∠B = ∠D，則四邊形 ABCD 為平行四邊形。
          </Panel>
        </div>

        {/* Right: 4-5 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Panel title="判別法 4：兩條對角線互相平分" delay={0.4}>
            對角線 AC 與 BD 交於 O，若 AO = OC 且 BO = OD，則四邊形 ABCD 為平行四邊形。
          </Panel>
          <Panel title="判別法 5：一組對邊平行且等長" delay={0.5} style={{ borderLeft: `8px solid ${palette.orange}` }}>
            若 <strong>AB // CD 且 AB = CD</strong>（或 AD // BC 且 AD = BC），則四邊形 ABCD 為平行四邊形。
            <div style={{ color: palette.orange, fontSize: 20, marginTop: 6, fontWeight: 600 }}>
              ⚠️注意：必須是「同一組對邊」平行且等長！若一組平行、另一組等長，則可能為等腰梯形。
            </div>
          </Panel>
        </div>
      </div>
    </div>
    <TextbookFooter />
  </div>
);

// ─── Slide 15: Section 3 Exercise 1 ──────────────────────────────────────────
const Section3Ex1: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <div style={{ position: 'relative', zIndex: 2, padding: '100px 120px 140px 120px' }}>
      <TextbookHeader title="判別法與逆時針邊長" subtitle="例題 7" />
      
      <ExerciseLayout
        delay={0.1}
        question={
          <div>
            阿明用不同長度的木棒作為平行四邊形的四個邊長，將木棒的長度依序以<strong>逆時針方向</strong>連接起來，哪一組<strong>無法</strong>組成平行四邊形？
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 14, fontSize: 24, fontWeight: 600 }}>
              <span>(A) 4, 4, 6, 6</span>
              <span>(B) 1, 4, 1, 4</span>
              <span>(C) 8, 8, 8, 8</span>
              <span>(D) 5, 2, 5, 2</span>
            </div>
          </div>
        }
        diagram={
          <ParallelogramSVG
            width={340}
            height={180}
            skew={70}
            annotations={[
              { pos: 'AB', label: 'a' },
              { pos: 'BC', label: 'b' },
              { pos: 'CD', label: 'a' },
              { pos: 'AD', label: 'b' }
            ]}
          />
        }
        solution={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <span style={{ color: 'var(--osd-accent)', fontWeight: 'bold' }}>步驟一：理解環狀連接的對邊關係</span>
              <div style={{ color: palette.muted, fontSize: 24, marginTop: 4 }}>
                若依序（如逆時針）連接四邊為：AB, BC, CD, DA。
                <br />
                平行四邊形要求對邊等長：即 AB = CD 且 BC = DA。
                <br />
                因此邊長排列模式必為：<strong>a, b, a, b 交替型</strong>。
              </div>
            </div>
            
            <hr style={{ border: 'none', borderTop: `1px solid ${palette.border}`, margin: '4px 0' }} />
            
            <div>
              <span style={{ color: 'var(--osd-accent)', fontWeight: 'bold' }}>步驟二：逐項檢視選項</span>
              <div style={{ color: palette.muted, fontSize: 24, marginTop: 4 }}>
                - (B) 1, 4, 1, 4 ➡️ 符合 a, b, a, b 型。
                <br />
                - (C) 8, 8, 8, 8 ➡️ 所有邊相等（菱形也是平行四邊形）。
                <br />
                - (D) 5, 2, 5, 2 ➡️ 符合 a, b, a, b 型。
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: `1px solid ${palette.border}`, margin: '4px 0' }} />

            <div>
              <span style={{ color: palette.orange, fontWeight: 'bold' }}>步驟三：鎖定錯誤選項</span>
              <div style={{ color: 'var(--osd-text)', fontWeight: 600, fontSize: 24, marginTop: 4 }}>
                - (A) 4, 4, 6, 6 ➡️ 其為 a, a, b, b 型，相鄰邊等長，但對邊不等長（此為箏形），<strong>無法組成</strong>平行四邊形。
                <br />
                <span style={{ color: palette.orange }}>正確答案選 (A)</span>
              </div>
            </div>
          </div>
        }
      />
    </div>
    <TextbookFooter />
  </div>
);

// ─── Slide 16: Summary ───────────────────────────────────────────────────────
const SummaryPage: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <div style={{ position: 'relative', zIndex: 2, padding: '100px 120px 140px 120px' }}>
      <TextbookHeader title="單元 4-2 重點整理" subtitle="本章總結" />
      
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 48,
          marginTop: 40,
          alignItems: 'start',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Panel title="三大核心公式與定理" delay={0.1}>
            <ul style={{ margin: 0, paddingLeft: 28 }}>
              <li>對邊等長（AB=CD, AD=BC）</li>
              <li style={{ marginTop: 8 }}>對角相等（∠A=∠C, ∠B=∠D），鄰角互補</li>
              <li style={{ marginTop: 8 }}>對角線互相平分，將面積四等分</li>
            </ul>
          </Panel>

          <Panel title="常見考試陷阱" delay={0.25}>
            一組對邊平行、另一組對邊等長的四邊形，<strong>不一定是平行四邊形</strong>（可能是等腰梯形）。判別時必須是「同一組對邊」平行且等長。
          </Panel>
        </div>

        <Panel title="溫馨小提醒" delay={0.4} style={{ borderLeft: `8px solid ${palette.orange}`, height: '100%' }}>
          在處理複雜幾何題目時，記得：
          <ol style={{ margin: '8px 0 0 0', paddingLeft: 28, fontSize: 24 }}>
            <li>先將已知邊長與角度標註在圖形上。</li>
            <li>觀察是否有直角三角形（可應用畢氏定理）。</li>
            <li>利用對角線中點 O 連接長度平分關係，建立代數方程式。</li>
          </ol>
          多做例題練習，幾何題目就能迎刃而解！
        </Panel>
      </div>
    </div>
    <TextbookFooter />
  </div>
);

// ─── Export Slides list ──────────────────────────────────────────────────────
export const meta: SlideMeta = {
  title: '4-2 平行四邊形',
  createdAt: '2026-06-04T03:11:50Z',
};

// Subtle transition defaults (Rise-like family)
const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN  = 'cubic-bezier(0.4, 0, 1, 1)';

export const transition: SlideTransition = {
  duration: 200,
  exit:  { duration: 140, easing: EASE_IN,
           keyframes: [
             { opacity: 1, transform: 'translateY(0)' },
             { opacity: 0, transform: 'translateY(-4px)' },
           ] },
  enter: { duration: 200, delay: 80, easing: EASE_OUT,
           keyframes: [
             { opacity: 0, transform: 'translateY(6px)' },
             { opacity: 1, transform: 'translateY(0)' },
           ] },
};

export default [
  Cover,
  TOC,
  Section1Divider,
  Section1Concepts,
  Section1Ex1,
  Section1Ex2,
  Section1Ex3,
  Section2Divider,
  Section2Concepts,
  Section2Ex1,
  Section2Ex2,
  Section2Ex3,
  Section3Divider,
  Section3Concepts,
  Section3Ex1,
  SummaryPage
] satisfies Page[];
