import React from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';

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
    hero: 160,         // 大字標題由 130 放大至 160
    body: 40,          // 內文字體由 34 放大至 40
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
  red: '#ef4444',
  redLight: '#fee2e2',
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

// 簡化動畫效果，改用乾淨的淡入（fadeIn），移除位移以使視覺感受更單純
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=Noto+Sans+TC:wght@400;500;700;900&display=swap');

  @keyframes textbook-fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  .es-fadeIn { 
    opacity: 0; 
    animation: textbook-fadeIn 0.5s ease-out forwards; 
  }
`;

const Styles = () => <style>{styles}</style>;

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const IconCheck = ({ size = 28, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconAlert = ({ size = 28, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const IconTicket = ({ size = 38, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
    <line x1="13" y1="5" x2="13" y2="19" strokeDasharray="3 3" />
  </svg>
);

const IconShield = ({ size = 28, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const IconLock = ({ size = 28, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

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
    <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
      <span
        style={{
          fontFamily: font.sans,
          fontSize: 24,         // 放大至 24
          color: 'var(--osd-accent)',
          letterSpacing: '0.12em',
          fontWeight: 700,
          background: palette.accentMuted,
          padding: '8px 20px',
          borderRadius: 6,
        }}
      >
        網路必修課 · 防詐教育
      </span>
      {subtitle && (
        <span
          style={{
            fontFamily: font.sans,
            fontSize: 24,       // 放大至 24
            color: palette.orange,
            fontWeight: 700,
            background: palette.orangeLight,
            padding: '8px 20px',
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
        fontSize: 68,           // 放大至 68
        fontWeight: 800,
        color: 'var(--osd-text)',
        margin: '14px 0 0 0',
        letterSpacing: '-0.02em',
      }}
    >
      {title}
    </h2>
    <div
      style={{
        height: 4,
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
        bottom: 40,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: font.sans,
        fontSize: 22,           // 放大至 22
        color: palette.muted,
        borderTop: `2px dashed ${palette.border}`,
        paddingTop: 16,
        zIndex: 2,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', background: 'var(--osd-accent)' }} />
        <span style={{ fontWeight: 600 }}>夢想的門票，一堂網路必修課</span>
      </div>
      <div style={{ fontFamily: font.mono, letterSpacing: '0.08em', fontWeight: 600 }}>
        PAGE <span style={{ color: 'var(--osd-accent)', fontSize: 24 }}>{String(current).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
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
    className="es-fadeIn"
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
          fontSize: 34,         // 放大至 34
          color: 'var(--osd-accent)',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          fontWeight: 800,
        }}
      >
        <span style={{ color: palette.orange }}>◆</span> {title}
      </h3>
    )}
    <div style={{ fontSize: 28, lineHeight: 1.5, color: 'var(--osd-text)', flex: 1 }}>
      {children}
    </div>
  </div>
);

// ─── Custom Card and Item Components (Explicit instances for inspector edit) ───
const CheckItem = ({ checked, label, delay = 0 }: { checked: boolean; label: string; delay?: number }) => (
  <div
    className="es-fadeIn"
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      margin: '14px 0',
      animationDelay: `${delay}s`,
    }}
  >
    <div
      style={{
        width: 38,             // 放大至 38
        height: 38,
        borderRadius: 8,
        border: `3px solid ${checked ? 'var(--osd-accent)' : palette.border}`,
        background: checked ? palette.accentMuted : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {checked && <IconCheck size={24} color="var(--osd-accent)" />}
    </div>
    <span style={{ fontSize: 28, fontWeight: checked ? 600 : 400, color: checked ? 'var(--osd-text)' : palette.muted }}>
      {label}
    </span>
  </div>
);

const StepCard = ({ num, title, desc1, desc2, delay = 0 }: { num: string; title: string; desc1: string; desc2: string; delay?: number }) => (
  <div
    className="es-fadeIn"
    style={{
      flex: 1,
      background: palette.white,
      border: `2px solid ${palette.border}`,
      borderRadius: 'var(--osd-radius)',
      padding: '32px 28px',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      animationDelay: `${delay}s`,
      boxShadow: '0 8px 24px rgba(100, 116, 139, 0.04)',
    }}
  >
    <div
      style={{
        position: 'absolute',
        top: -24,
        left: 28,
        background: 'var(--osd-accent)',
        color: palette.white,
        fontFamily: font.mono,
        fontSize: 24,           // 放大至 24
        fontWeight: 800,
        padding: '3px 18px',
        borderRadius: 20,
        boxShadow: '0 4px 12px rgba(13, 148, 136, 0.2)',
      }}
    >
      STEP {num}
    </div>
    <h4 style={{ fontSize: 32, fontWeight: 800, margin: '14px 0 6px 0', color: 'var(--osd-text)' }}>
      {title}
    </h4>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 24, color: palette.muted, lineHeight: 1.4 }}>
      <div style={{ display: 'flex', gap: 10 }}>
        <span style={{ color: palette.orange }}>•</span>
        <span>{desc1}</span>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <span style={{ color: palette.orange }}>•</span>
        <span>{desc2}</span>
      </div>
    </div>
  </div>
);

const ScenarioRow = ({
  index,
  scenario,
  safe,
  reason,
  delay = 0,
}: {
  index: number;
  scenario: string;
  safe: 'safe' | 'warn' | 'danger';
  reason: string;
  delay?: number;
}) => {
  const isSafe = safe === 'safe';
  const isDanger = safe === 'danger';
  const badgeBg = isSafe ? palette.accentMuted : (isDanger ? palette.redLight : palette.orangeLight);
  const badgeColor = isSafe ? 'var(--osd-accent)' : (isDanger ? palette.red : palette.orange);
  const badgeLabel = isSafe ? '安全' : (isDanger ? '極危險' : '要小心');

  return (
    <tr
      className="es-fadeIn"
      style={{
        borderBottom: `1px solid ${palette.border}`,
        animationDelay: `${delay}s`,
      }}
    >
      <td style={{ padding: '20px 24px', fontFamily: font.mono, fontWeight: 700, color: palette.muted, width: '80px', fontSize: 22 }}>
        {String(index).padStart(2, '0')}
      </td>
      <td style={{ padding: '20px 24px', fontWeight: 600, fontSize: 26, color: 'var(--osd-text)' }}>
        {scenario}
      </td>
      <td style={{ padding: '20px 24px', width: '150px' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '6px 16px',
            borderRadius: 6,
            background: badgeBg,
            color: badgeColor,
            fontWeight: 700,
            fontSize: 22,       // 放大至 22
            textAlign: 'center',
            minWidth: 90,
          }}
        >
          {badgeLabel}
        </span>
      </td>
      <td style={{ padding: '20px 24px', fontSize: 22, color: palette.muted, lineHeight: 1.4 }}>
        {reason}
      </td>
    </tr>
  );
};

const ChoiceCard = ({
  label,
  type,
  desc,
  delay = 0,
}: {
  label: string;
  type: 'safe' | 'warn' | 'danger';
  desc: string;
  delay?: number;
}) => {
  const isSafe = type === 'safe';
  const isDanger = type === 'danger';
  const color = isSafe ? 'var(--osd-accent)' : (isDanger ? palette.red : palette.orange);
  const bg = isSafe ? palette.accentLight : (isDanger ? palette.redLight : palette.orangeLight);
  const border = isSafe ? palette.accentMuted : (isDanger ? '#fecaca' : '#fed7aa');

  return (
    <div
      className="es-fadeIn"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        padding: '20px 24px',
        borderRadius: 8,
        background: bg,
        border: `2px solid ${border}`,
        animationDelay: `${delay}s`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 22, fontWeight: 800, padding: '4px 12px', borderRadius: 4, background: palette.white, color: color, boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          {isSafe ? '推薦' : (isDanger ? '危險' : '輔助')}
        </span>
        <span style={{ fontSize: 26, fontWeight: 700, color: 'var(--osd-text)' }}>{label}</span>
      </div>
      <p style={{ margin: 0, fontSize: 22, color: palette.muted, paddingLeft: 8 }}>
        {desc}
      </p>
    </div>
  );
};


// ─── Slide 1: Cover (封面) ────────────────────────────────────────────────────
const Cover: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px' }}>
    <TextbookBg />
    <Styles />
    
    <div
      style={{
        position: 'relative',
        zIndex: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 60,
      }}
    >
      <div
        className="es-fadeIn"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 14,
          background: palette.orangeLight,
          color: palette.orange,
          fontSize: 26,         // 放大至 26
          fontWeight: 800,
          padding: '10px 24px',
          borderRadius: 30,
          width: 'fit-content',
          marginBottom: 36,
        }}
      >
        <IconTicket size={28} color={palette.orange} />
        <span>夢想的門票 — 網路安全專題</span>
      </div>

      <h1
        className="es-fadeIn"
        style={{
          fontFamily: font.display,
          fontSize: 'var(--osd-size-hero)',
          fontWeight: 900,
          color: 'var(--osd-text)',
          margin: '0 0 28px 0',
          lineHeight: 1.15,
          animationDelay: '0.15s',
        }}
      >
        一堂網路必修課
      </h1>

      <p
        className="es-fadeIn"
        style={{
          fontSize: 44,         // 放大至 44
          color: palette.muted,
          maxWidth: 1000,
          margin: '0 0 64px 0',
          lineHeight: 1.4,
          animationDelay: '0.3s',
        }}
      >
        看影片學防詐，成為聰明又有責任感的數位公民！
      </p>

      <div
        className="es-fadeIn"
        style={{
          display: 'flex',
          gap: 32,
          animationDelay: '0.45s',
        }}
      >
        <div style={{ borderLeft: `5px solid var(--osd-accent)`, paddingLeft: 20 }}>
          <div style={{ fontSize: 22, color: palette.muted, fontWeight: 600 }}>班級 / 座號</div>
          <div style={{ fontSize: 30, fontWeight: 700, color: 'var(--osd-text)', marginTop: 6 }}>＿＿＿＿＿＿</div>
        </div>
        <div style={{ borderLeft: `5px solid var(--osd-accent)`, paddingLeft: 20, marginLeft: 32 }}>
          <div style={{ fontSize: 22, color: palette.muted, fontWeight: 600 }}>姓名</div>
          <div style={{ fontSize: 30, fontWeight: 700, color: 'var(--osd-text)', marginTop: 6 }}>＿＿＿＿＿＿</div>
        </div>
      </div>
    </div>
  </div>
);


// ─── Slide 2: 影片觀察 (阿樂發生了什麼事？) ───────────────────────────────
const VideoObservation: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px' }}>
    <TextbookBg />
    <Styles />
    <TextbookHeader title="阿樂發生了什麼事？" subtitle="一、影片觀察" />
    
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginTop: 16, position: 'relative', zIndex: 2 }}>
      <Panel title="1. 阿樂為什麼想買票？ (可複選)" delay={0.1}>
        <CheckItem checked={true} label="想看喜歡的偶像演唱會" delay={0.15} />
        <CheckItem checked={true} label="怕錯過這場演出會留下遺憾" delay={0.25} />
        <CheckItem checked={true} label="看到別人有票，自己也想要" delay={0.35} />
        <CheckItem checked={false} label="其他（例如：幫朋友買票）" delay={0.45} />
      </Panel>

      <Panel title="2. 阿樂做了哪些危險的事？ (可複選)" delay={0.2}>
        <CheckItem checked={true} label="在非官方的網路平台上尋找門票" delay={0.25} />
        <CheckItem checked={true} label="輕信賣家提供的對話與匯款紀錄截圖" delay={0.35} />
        <CheckItem checked={true} label="在未確認實體驗收前就先匯款/付訂金" delay={0.45} />
        <CheckItem checked={true} label="提供自己的個人銀行帳戶資訊給賣家" delay={0.55} />
      </Panel>
    </div>
    
    <TextbookFooter />
  </div>
);


// ─── Slide 3: 說服手段 (賣家如何說服阿樂？) ───────────────────────────────
const PersuasionTactics: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px' }}>
    <TextbookBg />
    <Styles />
    <TextbookHeader title="賣家是如何一步步說服阿樂？" subtitle="一、影片觀察" />
    
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginTop: 40, position: 'relative', zIndex: 2 }}>
      <div style={{ display: 'flex', gap: 32 }}>
        <StepCard 
          num="01" 
          title="建立信任感" 
          desc1="提供偽造的身分證件或良民證照片" 
          desc2="展示他人成交好評與匯款紀錄的偽造截圖" 
          delay={0.1} 
        />
        <StepCard 
          num="02" 
          title="製造焦慮與急迫" 
          desc1="強調「這是最後一張，很多人在排隊」" 
          desc2="逼迫買家快速下決定：「不快點就給別人」" 
          delay={0.25} 
        />
        <StepCard 
          num="03" 
          title="話術誘導" 
          desc1="要求「先付部分訂金」保留購買資格" 
          desc2="要求「提供個人帳戶代收」或私下轉帳" 
          delay={0.4} 
        />
      </div>

      <div 
        className="es-fadeIn"
        style={{
          background: palette.orangeLight,
          border: `2px solid #fed7aa`,
          borderRadius: 'var(--osd-radius)',
          padding: '24px 28px',
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          animationDelay: '0.55s',
        }}
      >
        <IconAlert size={32} color={palette.orange} />
        <div style={{ fontSize: 25, color: palette.orange, fontWeight: 700 }}>
          反思：在緊迫的情境下，我們最容易忽略客觀事實，這正是騙子最擅長利用的「心理盲點」。
        </div>
      </div>
    </div>
    
    <TextbookFooter />
  </div>
);


// ─── Slide 4: 詐騙警訊！ (找出詐騙警訊) ───────────────────────────────────
const FraudFlags: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px' }}>
    <TextbookBg />
    <Styles />
    <TextbookHeader title="找出影片中的詐騙警訊！" subtitle="二、找出警訊" />
    
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 40, marginTop: 16, position: 'relative', zIndex: 2 }}>
      <Panel title="影片中不安全交易的特徵" delay={0.1}>
        <CheckItem checked={true} label="口頭逼迫：一直推託說「只剩最後一張」" delay={0.15} />
        <CheckItem checked={true} label="金流陷阱：堅持要求「先付訂金或全額」" delay={0.25} />
        <CheckItem checked={true} label="規避平台：拒絕在安全有保障的官方渠道交易" delay={0.35} />
        <CheckItem checked={true} label="異常優惠：票價過於吸引人或低於行情" delay={0.45} />
        <CheckItem checked={true} label="黑箱溝通：限制只能私訊，避開第三方審核" delay={0.55} />
      </Panel>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div
          className="es-fadeIn"
          style={{
            background: palette.redLight,
            border: `2px solid #fecaca`,
            borderRadius: 'var(--osd-radius)',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            animationDelay: '0.2s',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <IconAlert size={36} color={palette.red} />
            <h4 style={{ fontSize: 32, fontWeight: 900, color: palette.red, margin: 0 }}>
              最危險的警訊
            </h4>
          </div>
          <p style={{ fontSize: 25, color: palette.red, fontWeight: 700, margin: '8px 0 0 0', lineHeight: 1.4 }}>
            「要求提供個人帳戶幫忙代收、代付，或以高利租借、轉讓個人帳戶。」
          </p>
        </div>

        <Panel title="為什麼這最危险？" delay={0.35}>
          <p style={{ fontSize: 24, margin: 0, color: palette.muted, lineHeight: 1.5 }}>
            一旦將個人帳戶借給他人，該帳戶極有可能被用作「詐騙贓款的收付媒介」（即人頭帳戶）。這將面臨法律責任與所有銀行服務被凍結的下場。
          </p>
        </Panel>
      </div>
    </div>
    
    <TextbookFooter />
  </div>
);


// ─── Slide 5: 看似安全，其實可能是陷阱！ ──────────────────────────────────────
const SafeOrTrap: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px' }}>
    <TextbookBg />
    <Styles />
    <TextbookHeader title="看似安全，其實可能是陷阱！" subtitle="三、陷阱判斷" />
    
    <div
      className="es-fadeIn"
      style={{
        background: palette.white,
        border: `2px solid ${palette.border}`,
        borderRadius: 'var(--osd-radius)',
        marginTop: 20,
        padding: '16px',
        position: 'relative',
        zIndex: 2,
        boxShadow: '0 8px 24px rgba(100, 116, 139, 0.04)',
        animationDelay: '0.1s',
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: `2px solid var(--osd-accent)` }}>
            <th style={{ padding: '16px 24px', color: 'var(--osd-accent)', fontSize: 24, fontWeight: 800, width: '80px' }}>編號</th>
            <th style={{ padding: '16px 24px', color: 'var(--osd-accent)', fontSize: 24, fontWeight: 800 }}>交易情境</th>
            <th style={{ padding: '16px 24px', color: 'var(--osd-accent)', fontSize: 24, fontWeight: 800, width: '150px' }}>安全判斷</th>
            <th style={{ padding: '16px 24px', color: 'var(--osd-accent)', fontSize: 24, fontWeight: 800 }}>判斷依據與原因</th>
          </tr>
        </thead>
        <tbody>
          <ScenarioRow 
            index={1} 
            scenario="賣家提供很多好評截圖與對話" 
            safe="warn" 
            reason="截圖極易用軟體偽造或盜用他人圖片" 
            delay={0.15} 
          />
          <ScenarioRow 
            index={2} 
            scenario="賣家說可以先付一半訂金保留" 
            safe="warn" 
            reason="「定金詐騙」是門票詐騙最核心的圈套" 
            delay={0.25} 
          />
          <ScenarioRow 
            index={3} 
            scenario="賣家催促「不快點付款就賣別人」" 
            safe="warn" 
            reason="故意壓迫思考時間，讓人荒亂中匯款" 
            delay={0.35} 
          />
          <ScenarioRow 
            index={4} 
            scenario="賣家願意配合使用官方平台交易" 
            safe="safe" 
            reason="有官方第三方的代管金流保障，最為安全" 
            delay={0.45} 
          />
          <ScenarioRow 
            index={5} 
            scenario="要求提供個人帳戶「代收轉發」" 
            safe="danger" 
            reason="詐騙洗錢的標準套路，帳戶將列為共犯凍結" 
            delay={0.55} 
          />
        </tbody>
      </table>
    </div>
    
    <TextbookFooter />
  </div>
);


// ─── Slide 6: 如果我是阿樂，我會怎麼做？ ───────────────────────────────
const WhatWouldIDo: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px' }}>
    <TextbookBg />
    <Styles />
    <TextbookHeader title="如果我是阿樂，我會怎麼做？" subtitle="四、情境模擬" />
    
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 40, marginTop: 16, position: 'relative', zIndex: 2 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Panel title="情境重現" delay={0.1}>
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
            <div style={{ background: palette.orangeLight, padding: 16, borderRadius: 30, display: 'flex', flexShrink: 0 }}>
              <IconAlert size={28} color={palette.orange} />
            </div>
            <p style={{ fontSize: 24, margin: 0, lineHeight: 1.5 }}>
              賣家不斷發送簡訊：「只剩最後一張！先付訂金，我就幫你保留喔~ 不然別人要匯款了！」
            </p>
          </div>
        </Panel>

        <div
          className="es-fadeIn"
          style={{
            background: palette.white,
            border: `2px dashed ${palette.border}`,
            borderRadius: 'var(--osd-radius)',
            padding: '28px',
            animationDelay: '0.25s',
          }}
        >
          <h4 style={{ fontSize: 26, fontWeight: 700, margin: '0 0 14px 0', color: 'var(--osd-accent)' }}>
            課堂反思與討論
          </h4>
          <p style={{ fontSize: 22, color: palette.muted, lineHeight: 1.5, margin: 0 }}>
            為什麼我們容易受到「最後機會」的誘惑？如何在衝動的當下強迫自己冷靜 10 分鐘？
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <ChoiceCard label="直接匯款訂金" type="danger" desc="高達 99% 的機率會被對方直接封鎖，財物兩空。" delay={0.15} />
        <ChoiceCard label="先詢問朋友、長輩或家人" type="warn" desc="旁觀者清，藉助第三人的視角能迅速識破騙局。" delay={0.25} />
        <ChoiceCard label="查證賣家資料（撥打防詐專線 165）" type="warn" desc="利用官方管道確認對方帳戶是否已被通報詐騙。" delay={0.35} />
        <ChoiceCard label="要求使用官方正規第三方平台交易" type="safe" desc="透過平台履約保證，避免資金被私下侵吞。" delay={0.45} />
        <ChoiceCard label="直接不買，尋求正規售票管道" type="safe" desc="最安全的作法，不給騙子留下任何可乘之機。" delay={0.55} />
      </div>
    </div>
    
    <TextbookFooter />
  </div>
);


// ─── Slide 7: 認識人頭帳戶與法律責任 ──────────────────────────────────────
const LegalLiability: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px' }}>
    <TextbookBg />
    <Styles />
    <TextbookHeader title="認識人頭帳戶與法律責任" subtitle="五、法律認知" />
    
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 40, marginTop: 16, position: 'relative', zIndex: 2 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <Panel title="什麼是人頭帳戶？" delay={0.1}>
          <p style={{ fontSize: 24, color: palette.muted, margin: 0, lineHeight: 1.5 }}>
            指個人將自己的金融機構帳戶（提款卡、網路銀行帳號及密碼）提供給他人使用，導致該帳戶成為詐騙集團用來「收受與轉移贓款」的工具。
          </p>
        </Panel>

        <div
          className="es-fadeIn"
          style={{
            background: palette.redLight,
            border: `2px solid #fecaca`,
            borderRadius: 'var(--osd-radius)',
            padding: '28px 32px',
            animationDelay: '0.25s',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <IconScale size={32} color={palette.red} />
            <h4 style={{ fontSize: 28, fontWeight: 800, color: palette.red, margin: 0 }}>
              法律責任不容忽視！
            </h4>
          </div>
          <ul style={{ fontSize: 22, color: palette.red, paddingLeft: 28, margin: '14px 0 0 0', lineHeight: 1.5 }}>
            <li>刑事責任：可能構成《刑法》詐欺罪幫助犯，與《洗錢防制法》洗錢罪。</li>
            <li>民事責任：須對被害人的資金損失負擔全部或部分的損害賠償責任！</li>
            <li>信用破產：名下所有帳戶會被列為管制帳戶，無法辦信用卡或貸款。</li>
          </ul>
        </div>
      </div>

      <Panel title="思維碰撞：阿樂沒騙人，就沒有責任嗎？" delay={0.2}>
        <div 
          style={{
            background: palette.orangeLight,
            padding: '20px 24px',
            borderRadius: 8,
            fontSize: 24,
            borderLeft: `6px solid ${palette.orange}`,
            color: palette.orange,
            fontWeight: 700,
            marginBottom: 20,
          }}
        >
          阿樂說：「我只是想看演唱會，我沒有要騙人。」
        </div>
        <p style={{ fontSize: 24, color: palette.muted, lineHeight: 1.5, margin: 0 }}>
          <strong style={{ color: 'var(--osd-text)' }}>法理分析：</strong>
          司法實踐中，這通常會被認定為具有「不確定故意」或「間接故意」。提供帳戶給陌生人意味著你「容許帳戶被非法使用」。即使動機只是買票，法律上依然無法免除刑法幫助犯與民事賠償責任！
        </p>
      </Panel>
    </div>
    
    <TextbookFooter />
  </div>
);


// ─── Slide 8: 我的防詐三步驟 & 防詐小卡 ───────────────────────────────
const SummaryAndCard: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px' }}>
    <TextbookBg />
    <Styles />
    <TextbookHeader title="我的防詐三步驟與防詐小卡" subtitle="六、防詐實踐" />
    
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 40, marginTop: 16, position: 'relative', zIndex: 2 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Panel title="防詐三步驟 (課堂演練)" delay={0.1}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              <div style={{ background: palette.accentMuted, color: 'var(--osd-accent)', fontWeight: 800, padding: '6px 16px', borderRadius: 4, fontSize: 22, flexShrink: 0 }}>第一步</div>
              <div style={{ fontSize: 24, lineHeight: 1.4 }}><strong style={{ color: 'var(--osd-text)' }}>交易前：</strong>先上網查證賣家真實性，絕不私下匯款。</div>
            </div>
            <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              <div style={{ background: palette.orangeLight, color: palette.orange, fontWeight: 800, padding: '6px 16px', borderRadius: 4, fontSize: 22, flexShrink: 0 }}>第二步</div>
              <div style={{ fontSize: 24, lineHeight: 1.4 }}><strong style={{ color: 'var(--osd-text)' }}>要求先匯款：</strong>堅決拒絕，只走官方正式第三方保證平台。</div>
            </div>
            <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              <div style={{ background: palette.redLight, color: palette.red, fontWeight: 800, padding: '6px 16px', borderRadius: 4, fontSize: 22, flexShrink: 0 }}>第三步</div>
              <div style={{ fontSize: 24, lineHeight: 1.4 }}><strong style={{ color: 'var(--osd-text)' }}>要求提供帳戶：</strong>絕不妥協！不提供金融卡、密碼與個人資料。</div>
            </div>
          </div>
        </Panel>

        <div
          className="es-fadeIn"
          style={{
            background: palette.orangeLight,
            border: `2px solid #fed7aa`,
            borderRadius: 'var(--osd-radius)',
            padding: '24px 28px',
            animationDelay: '0.3s',
          }}
        >
          <div style={{ fontSize: 20, color: palette.muted, fontWeight: 600, letterSpacing: '0.05em' }}>今天我學到的一句話：</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: palette.orange, marginTop: 10, lineHeight: 1.4 }}>
            「網路交易雖然方便，但我必須記得：求證永遠比速度重要。不貪圖便宜，才能守住錢包！」
          </div>
        </div>
      </div>

      <div
        className="es-fadeIn"
        style={{
          background: 'var(--osd-accent)',
          color: palette.white,
          borderRadius: 'var(--osd-radius)',
          padding: '36px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          animationDelay: '0.2s',
          boxShadow: '0 12px 36px rgba(13, 148, 136, 0.25)',
          border: '4px solid #ccfbf1',
        }}
      >
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <IconShield size={32} color={palette.white} />
              <h4 style={{ fontSize: 30, fontWeight: 900, margin: 0 }}>我的防詐小卡</h4>
            </div>
            <IconTicket size={32} color="#ccfbf1" />
          </div>
          <div style={{ height: 2, background: '#ccfbf1', margin: '24px 0', opacity: 0.5 }} />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ background: palette.white, borderRadius: '50%', width: 34, height: 34, display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
                <IconCheck size={22} color="var(--osd-accent)" />
              </div>
              <span style={{ fontSize: 26, fontWeight: 700 }}>不點擊任何可疑連結</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ background: palette.white, borderRadius: '50%', width: 34, height: 34, display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
                <IconCheck size={22} color="var(--osd-accent)" />
              </div>
              <span style={{ fontSize: 26, fontWeight: 700 }}>不隨意支付非正規訂金</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ background: palette.white, borderRadius: '50%', width: 34, height: 34, display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
                <IconCheck size={22} color="var(--osd-accent)" />
              </div>
              <span style={{ fontSize: 26, fontWeight: 700 }}>絕不提供個人帳戶資料</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ background: palette.white, borderRadius: '50%', width: 34, height: 34, display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
                <IconCheck size={22} color="var(--osd-accent)" />
              </div>
              <span style={{ fontSize: 26, fontWeight: 700 }}>遇到問題，先求證再行動！</span>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', fontSize: 24, fontWeight: 800, color: '#ccfbf1', marginTop: 32, letterSpacing: '0.1em' }}>
          聰明消費 · 安心生活
        </div>
      </div>
    </div>
    
    <TextbookFooter />
  </div>
);


const IconScale = ({ size = 28, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="5" y1="7" x2="19" y2="7" />
    <path d="M5 7L2 17c0 1.5 2 2.5 3 2.5s3-1 3-2.5L5 7z" />
    <path d="M19 7l-3 10c0 1.5 2 2.5 3 2.5s3-1 3-2.5L19 7z" />
  </svg>
);


// ─── Module Export Contract ───────────────────────────────────────────────────
export const meta: SlideMeta = {
  title: '夢想的門票 — 網路安全與防詐教育',
  theme: 'warm-textbook',
  createdAt: '2026-06-15T06:49:42.214Z',
};

// 簡化轉場動畫：將平移距離降為 0，僅進行純透明度（dissolve）淡入淡出，切換體驗更單純流暢
export const transition: SlideTransition = {
  duration: 200,
  exit: {
    duration: 150,
    easing: 'cubic-bezier(0.4, 0, 1, 1)',
    keyframes: [
      { opacity: 1 },
      { opacity: 0 },
    ],
  },
  enter: {
    duration: 200,
    delay: 50,
    easing: 'cubic-bezier(0, 0, 0.2, 1)',
    keyframes: [
      { opacity: 0 },
      { opacity: 1 },
    ],
  },
};

export default [
  Cover,
  VideoObservation,
  PersuasionTactics,
  FraudFlags,
  SafeOrTrap,
  WhatWouldIDo,
  LegalLiability,
  SummaryAndCard,
] satisfies Page[];
