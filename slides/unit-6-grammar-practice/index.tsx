import React from 'react';
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';

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
  typeScale: { hero: 130, body: 32 },
  radius: 12,
};

// 額外的主題色彩定義
const accentMuted = '#ccfbf1';
const orange = '#ea580c';
const orangeLight = '#ffedd5';
const border = '#e2e8f0';
const muted = '#64748b';
const white = '#ffffff';

const fill = {
  width: '100%',
  height: '100%',
  fontFamily: 'var(--osd-font-body)',
  boxSizing: 'border-box',
} as const;

// 注入主題相關的 CSS 動畫與樣式
const StyleTag = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @keyframes textbook-fadeUp {
      from { opacity: 0; transform: translateY(15px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .es-fadeUp { 
      opacity: 0; 
      animation: textbook-fadeUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; 
    }
  ` }} />
);

// 1. 課堂課本風格背景
const TextbookBg = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      background: 'var(--osd-bg, #fdfbf7)',
      boxSizing: 'border-box',
      border: '16px solid #e2e8f0',
      overflow: 'hidden',
      zIndex: 1,
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

// 2. 課堂課本風格標題欄
const TextbookHeader = ({ title, subtitle, unit = 'Unit 6' }: { title: string; subtitle?: string; unit?: string }) => (
  <div style={{ position: 'relative', zIndex: 2, marginBottom: 24 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <span
        style={{
          fontFamily: 'var(--osd-font-body)',
          fontSize: 20,
          color: 'var(--osd-accent)',
          letterSpacing: '0.12em',
          fontWeight: 700,
          background: accentMuted,
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
            color: orange,
            fontWeight: 700,
            background: orangeLight,
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
        fontSize: 54,
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
        background: `linear-gradient(90deg, var(--osd-accent) 0%, ${accentMuted} 70%, transparent 100%)`,
        marginTop: 10,
        borderRadius: 2,
      }}
    />
  </div>
);

// 3. 課堂課本風格頁尾
const TextbookFooter = ({ subtitle = '文法選擇練習：不規則動詞過去式' }: { subtitle?: string }) => {
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
        color: muted,
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

// 4. 卡片容器
const Panel = ({ title, children, delay = 0, style = {} }: { title?: string; children: React.ReactNode; delay?: number; style?: React.CSSProperties }) => (
  <div
    className="es-fadeUp"
    style={{
      background: white,
      border: `2px solid ${border}`,
      borderRadius: 'var(--osd-radius)',
      padding: '28px 36px',
      boxShadow: '0 8px 24px rgba(100, 116, 139, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      animationDelay: `${delay}s`,
      position: 'relative',
      zIndex: 2,
      ...style,
    }}
  >
    {title && (
      <h3
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 28,
          color: 'var(--osd-accent)',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          fontWeight: 800,
        }}
      >
        <span style={{ color: orange }}>◆</span> {title}
      </h3>
    )}
    <div style={{ fontSize: 24, lineHeight: 1.5, color: 'var(--osd-text)' }}>
      {children}
    </div>
  </div>
);

// 5. 單個選項組件
const Option = ({ letter, text, isCorrect, showAnswer }: { letter: string; text: string; isCorrect?: boolean; showAnswer?: boolean }) => {
  const shouldHighlight = isCorrect && showAnswer;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '12px 20px',
        borderRadius: 8,
        border: shouldHighlight ? '2.5px solid var(--osd-accent)' : '1.5px solid #e2e8f0',
        background: shouldHighlight ? accentMuted : white,
        fontFamily: 'var(--osd-font-body)',
        fontSize: 24,
        fontWeight: shouldHighlight ? 700 : 500,
        color: shouldHighlight ? '#0f766e' : 'var(--osd-text)',
        transition: 'all 0.2s ease',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: shouldHighlight ? 'var(--osd-accent)' : '#e2e8f0',
          color: shouldHighlight ? white : '#64748b',
          fontSize: 20,
          fontWeight: 700,
        }}
      >
        {letter}
      </span>
      <span>{text}</span>
    </div>
  );
};

// 6. 思考面板 (答案出現前的右側 placeholder)
const ThinkPanel = () => (
  <div
    className="es-fadeUp"
    style={{
      background: '#f8fafc',
      border: '2px dashed #cbd5e1',
      borderRadius: 12,
      padding: '36px 40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
      height: '100%',
      minHeight: 320,
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 2,
    }}
  >
    <span style={{ fontSize: 64, animation: 'bounce 2s infinite' }}>🤔</span>
    <div style={{ fontSize: 26, fontWeight: 700, color: '#475569', textAlign: 'center' }}>
      大家想一想，這一題答案是哪一個？
    </div>
    <div style={{ fontSize: 20, color: '#64748b', textAlign: 'center', lineHeight: 1.5 }}>
      請注意句子中的「時間副詞」或「助動詞」喔！<br />
      按「下一頁」即可揭曉答案與解析。
    </div>
  </div>
);

// 7. 文法重點解析組件
const GrammarTip = ({ formula, note, delay = 0.2 }: { formula: string; note: string; delay?: number }) => (
  <div
    className="es-fadeUp"
    style={{
      background: orangeLight,
      border: `2px dashed ${orange}`,
      borderRadius: 12,
      padding: '24px 32px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      animationDelay: `${delay}s`,
      position: 'relative',
      zIndex: 2,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ fontSize: 22, color: orange }}>💡</span>
      <span style={{ fontSize: 24, fontWeight: 700, color: orange, fontFamily: 'var(--osd-font-display)' }}>
        文法解析
      </span>
    </div>
    <div style={{ fontSize: 28, fontWeight: 800, color: '#9a3412', fontFamily: 'monospace', background: '#fff7ed', padding: '10px 18px', borderRadius: 6, border: '1px solid #fed7aa', letterSpacing: '0.05em' }}>
      {formula}
    </div>
    <div style={{ fontSize: 22, color: '#7c2d12', lineHeight: 1.5 }}>
      {note}
    </div>
  </div>
);

// ==================== 頁面定義 ====================

// Page 1: Cover
const Cover: Page = () => (
  <div style={{ ...fill, padding: '120px 140px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <StyleTag />
    <TextbookBg />
    <div style={{ position: 'relative', zIndex: 2, maxWidth: 1400 }}>
      <div style={{ display: 'inline-block', fontSize: 24, color: 'var(--osd-accent)', letterSpacing: '0.15em', fontWeight: 800, background: accentMuted, padding: '8px 20px', borderRadius: 8, marginBottom: 24 }}>
        國中英語文法講堂
      </div>
      <h1
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 'var(--osd-size-hero)',
          fontWeight: 900,
          margin: '0 0 24px 0',
          lineHeight: 1.15,
          color: 'var(--osd-text)',
        }}
      >
        Unit 6 文法選擇練習
      </h1>
      <p style={{ fontSize: 42, color: orange, fontWeight: 700, margin: '0 0 60px 0', letterSpacing: '0.05em' }}>
        焦點單元：不規則動詞過去式與助動詞用法
      </p>
      
      <div style={{ display: 'flex', gap: 48, fontSize: 26, color: muted }}>
        <div style={{ borderBottom: `2.5px solid ${border}`, paddingBottom: 10, width: 280, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span>Class:</span>
          <span style={{ fontFamily: 'monospace', color: 'var(--osd-text)', fontWeight: 700, fontSize: 28 }}>________</span>
        </div>
        <div style={{ borderBottom: `2.5px solid ${border}`, paddingBottom: 10, width: 380, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span>Name:</span>
          <span style={{ fontFamily: 'monospace', color: 'var(--osd-text)', fontWeight: 700, fontSize: 28 }}>____________</span>
        </div>
      </div>
    </div>
  </div>
);

// Page 2: Grammar Review
const GrammarReview: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="重點觀念複習" subtitle="Grammar Focus" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginTop: 10 }}>
      <Panel title="過去簡單式 (Past Simple)" delay={0.1}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ margin: 0, fontSize: 22, color: muted }}>
            用來表示「過去某個特定時間點」發生的動作或存在的狀態。
          </p>
          <div style={{ borderLeft: '4px solid var(--osd-accent)', paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <strong style={{ fontSize: 24, color: 'var(--osd-accent)' }}>常見過去時間副詞：</strong>
            <span style={{ fontSize: 22 }}>yesterday (昨天), last night (昨晚), last week / month, ... ago (以前), last time (上次), at that time (那時)</span>
          </div>
          <div style={{ borderLeft: '4px solid #ea580c', paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <strong style={{ fontSize: 24, color: '#ea580c' }}>不規則動詞變化：</strong>
            <span style={{ fontSize: 22, fontFamily: 'monospace' }}>sleep ➔ slept | read ➔ read | draw ➔ drew | go ➔ went | make ➔ made | sing ➔ sang | sell ➔ sold | have ➔ had</span>
          </div>
        </div>
      </Panel>
      <Panel title="過去式的否定句與疑問句" delay={0.25}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <strong style={{ fontSize: 23, color: '#0f766e', display: 'block', marginBottom: 8 }}>1. 否定句：主詞 + didn't + 原形動詞 (V)</strong>
            <span style={{ fontSize: 21, color: muted }}>例：Kevin didn't draw pictures. (Kevin 沒有畫畫。)</span>
          </div>
          <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <strong style={{ fontSize: 23, color: '#0f766e', display: 'block', marginBottom: 8 }}>2. 疑問句：Did + 主詞 + 原形動詞 (V) ?</strong>
            <span style={{ fontSize: 21, color: muted }}>例：Did you sing? (你那時有唱歌嗎？)</span>
          </div>
          <div style={{ background: '#fff7ed', padding: '16px 20px', borderRadius: 8, border: '1px dashed #fed7aa' }}>
            <strong style={{ fontSize: 22, color: orange, display: 'block', marginBottom: 4 }}>⚠️ 黃金鐵律：</strong>
            <span style={{ fontSize: 21, fontWeight: 600 }}>只要句子中出現助動詞 did / didn't，後面的動詞必須回復為「原形動詞」！</span>
          </div>
        </div>
      </Panel>
    </div>
    <TextbookFooter subtitle="文法重點複習" />
  </div>
);

// ==================== Q1 ====================
const Q1_Q: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 1 題：過去時間副詞的判斷" subtitle="討論時間" />
    <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 40, marginTop: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Panel title="題目 (Question)">
          <p style={{ margin: 0, fontSize: 28, fontWeight: 700, lineHeight: 1.4 }}>
            （ &nbsp;&nbsp;&nbsp; ）1. Henry _____ for seven hours on the airplane last time.
          </p>
        </Panel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Option letter="A" text="sleep" />
          <Option letter="B" text="slept" />
          <Option letter="C" text="sleeps" />
          <Option letter="D" text="sleeping" />
        </div>
      </div>
      <ThinkPanel />
    </div>
    <TextbookFooter />
  </div>
);

const Q1_A: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 1 題：過去時間副詞的判斷" subtitle="答案解析" />
    <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 40, marginTop: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Panel title="題目 (Question)">
          <p style={{ margin: 0, fontSize: 28, fontWeight: 700, lineHeight: 1.4 }}>
            （ <span style={{ color: 'var(--osd-accent)', fontWeight: 800 }}>B</span> ）1. Henry _____ for seven hours on the airplane last time.
          </p>
        </Panel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Option letter="A" text="sleep" showAnswer />
          <Option letter="B" text="slept" isCorrect showAnswer />
          <Option letter="C" text="sleeps" showAnswer />
          <Option letter="D" text="sleeping" showAnswer />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Panel title="中文翻譯" style={{ padding: '20px 28px' }}>
          <p style={{ margin: 0, fontSize: 22, color: '#334155', fontWeight: 500 }}>
            翻譯：Henry 上次在飛機上睡了七個小時。
          </p>
        </Panel>
        <GrammarTip
          formula="S + V-ed + 過去時間."
          note="句尾的 last time (上一次) 指過去時間，因此動詞需用過去式。sleep 的過去式為不規則變化 slept。"
        />
      </div>
    </div>
    <TextbookFooter />
  </div>
);

// ==================== Q2 ====================
const Q2_Q: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 2 題：易混淆動詞與拼字" subtitle="討論時間" />
    <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 40, marginTop: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Panel title="題目 (Question)">
          <p style={{ margin: 0, fontSize: 28, fontWeight: 700, lineHeight: 1.4 }}>
            （ &nbsp;&nbsp;&nbsp; ）2. Gina _____ a book with her son last night.
          </p>
        </Panel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Option letter="A" text="reads" />
          <Option letter="B" text="reading" />
          <Option letter="C" text="read" />
          <Option letter="D" text="red" />
        </div>
      </div>
      <ThinkPanel />
    </div>
    <TextbookFooter />
  </div>
);

const Q2_A: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 2 題：易混淆動詞與拼字" subtitle="答案解析" />
    <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 40, marginTop: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Panel title="題目 (Question)">
          <p style={{ margin: 0, fontSize: 28, fontWeight: 700, lineHeight: 1.4 }}>
            （ <span style={{ color: 'var(--osd-accent)', fontWeight: 800 }}>C</span> ）2. Gina _____ a book with her son last night.
          </p>
        </Panel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Option letter="A" text="reads" showAnswer />
          <Option letter="B" text="reading" showAnswer />
          <Option letter="C" text="read" isCorrect showAnswer />
          <Option letter="D" text="red" showAnswer />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Panel title="中文翻譯" style={{ padding: '20px 28px' }}>
          <p style={{ margin: 0, fontSize: 22, color: '#334155', fontWeight: 500 }}>
            翻譯：Gina 昨晚和她兒子讀了一本書。
          </p>
        </Panel>
        <GrammarTip
          formula="read - read - read (形同音不同)"
          note="時間詞 last night (昨晚) 提示過去式。動詞 read (閱讀) 的過去式拼寫同樣是 read，但發音改變為 /rɛd/。選項 (D) red 雖然發音相同，但是指顏色「紅色」。"
        />
      </div>
    </div>
    <TextbookFooter />
  </div>
);

// ==================== Q3 ====================
const Q3_Q: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 3 題：過去否定句與助動詞" subtitle="討論時間" />
    <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 40, marginTop: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Panel title="題目 (Question)">
          <p style={{ margin: 0, fontSize: 28, fontWeight: 700, lineHeight: 1.4 }}>
            ( &nbsp;&nbsp;&nbsp; ) 3. Kevin didn’t _____ pictures with his brother this afternoon.
          </p>
        </Panel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Option letter="A" text="draw" />
          <Option letter="B" text="drew" />
          <Option letter="C" text="drink" />
          <Option letter="D" text="drank" />
        </div>
      </div>
      <ThinkPanel />
    </div>
    <TextbookFooter />
  </div>
);

const Q3_A: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 3 題：過去否定句與助動詞" subtitle="答案解析" />
    <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 40, marginTop: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Panel title="題目 (Question)">
          <p style={{ margin: 0, fontSize: 28, fontWeight: 700, lineHeight: 1.4 }}>
            ( <span style={{ color: 'var(--osd-accent)', fontWeight: 800 }}>A</span> ) 3. Kevin didn’t _____ pictures with his brother this afternoon.
          </p>
        </Panel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Option letter="A" text="draw" isCorrect showAnswer />
          <Option letter="B" text="drew" showAnswer />
          <Option letter="C" text="drink" showAnswer />
          <Option letter="D" text="drank" showAnswer />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Panel title="中文翻譯" style={{ padding: '20px 28px' }}>
          <p style={{ margin: 0, fontSize: 22, color: '#334155', fontWeight: 500 }}>
            翻譯：Kevin 今天下午沒有和他的哥哥/弟弟畫畫。
          </p>
        </Panel>
        <GrammarTip
          formula="S + didn't + 原形動詞 (V)"
          note="否定助動詞 didn't 後面接原形動詞，排除過去式 (B) drew 與 (D) drank。搭配後面受詞 pictures (圖片)，動詞應是「畫圖」draw，而不是「喝」drink。"
        />
      </div>
    </div>
    <TextbookFooter />
  </div>
);

// ==================== Q4 ====================
const Q4_Q: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 4 題：問答句的動詞時態搭配" subtitle="討論時間" />
    <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 40, marginTop: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Panel title="題目 (Question)">
          <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.5 }}>
            （ &nbsp;&nbsp;&nbsp; ）4. A: Where did Jerry _____ last Saturday?<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B: He _____ to a department store.
          </div>
        </Panel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Option letter="A" text="go; go" />
          <Option letter="B" text="go; going" />
          <Option letter="C" text="went; go" />
          <Option letter="D" text="go; went" />
        </div>
      </div>
      <ThinkPanel />
    </div>
    <TextbookFooter />
  </div>
);

const Q4_A: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 4 題：問答句的動詞時態搭配" subtitle="答案解析" />
    <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 40, marginTop: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Panel title="題目 (Question)">
          <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.5 }}>
            （ <span style={{ color: 'var(--osd-accent)', fontWeight: 800 }}>D</span> ）4. A: Where did Jerry _____ last Saturday?<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B: He _____ to a department store.
          </div>
        </Panel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Option letter="A" text="go; go" showAnswer />
          <Option letter="B" text="go; going" showAnswer />
          <Option letter="C" text="went; go" showAnswer />
          <Option letter="D" text="go; went" isCorrect showAnswer />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Panel title="中文翻譯" style={{ padding: '20px 28px' }}>
          <p style={{ margin: 0, fontSize: 22, color: '#334155', fontWeight: 500 }}>
            翻譯：<br />
            A: Jerry 上週六去哪裡了？<br />
            B: 他去了一家百貨公司。
          </p>
        </Panel>
        <GrammarTip
          formula="did ... + V(原形) ➔ S + V-ed."
          note="問句中有助動詞 did，動詞需用原形 go。答句 He went... 為主動敘述過去發生的動作，沒有助動詞阻擋，因此必須使用過去式動詞 went。"
        />
      </div>
    </div>
    <TextbookFooter />
  </div>
);

// ==================== Q5 ====================
const Q5_Q: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 5 題：過去式疑問句的結構" subtitle="討論時間" />
    <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 40, marginTop: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Panel title="題目 (Question)">
          <p style={{ margin: 0, fontSize: 28, fontWeight: 700, lineHeight: 1.4 }}>
            （ &nbsp;&nbsp;&nbsp; ）5. Did Sam _____ a cake last week?
          </p>
        </Panel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Option letter="A" text="made" />
          <Option letter="B" text="make" />
          <Option letter="C" text="makes" />
          <Option letter="D" text="making" />
        </div>
      </div>
      <ThinkPanel />
    </div>
    <TextbookFooter />
  </div>
);

const Q5_A: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 5 題：過去式疑問句的結構" subtitle="答案解析" />
    <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 40, marginTop: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Panel title="題目 (Question)">
          <p style={{ margin: 0, fontSize: 28, fontWeight: 700, lineHeight: 1.4 }}>
            （ <span style={{ color: 'var(--osd-accent)', fontWeight: 800 }}>B</span> ）5. Did Sam _____ a cake last week?
          </p>
        </Panel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Option letter="A" text="made" showAnswer />
          <Option letter="B" text="make" isCorrect showAnswer />
          <Option letter="C" text="makes" showAnswer />
          <Option letter="D" text="making" showAnswer />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Panel title="中文翻譯" style={{ padding: '20px 28px' }}>
          <p style={{ margin: 0, fontSize: 22, color: '#334155', fontWeight: 500 }}>
            翻譯：Sam 上週有做蛋糕嗎？
          </p>
        </Panel>
        <GrammarTip
          formula="Did + 主詞 + 原形動詞 (V)?"
          note="過去式的 Yes/No 疑問句以助動詞 Did 開頭。當句首已經有助動詞 Did 來表達過去時態時，後面的主要動詞 make 必須使用原形。"
        />
      </div>
    </div>
    <TextbookFooter />
  </div>
);

// ==================== Q6 ====================
const Q6_Q: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 6 題：過去時間副詞的否定問答" subtitle="討論時間" />
    <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 40, marginTop: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Panel title="題目 (Question)">
          <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.5 }}>
            （ &nbsp;&nbsp;&nbsp; ）6. A: Did you _____ at that time?<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B: No, I _____ sing at that time.
          </div>
        </Panel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Option letter="A" text="sang; do" />
          <Option letter="B" text="sing; don’t" />
          <Option letter="C" text="sang; did" />
          <Option letter="D" text="sing; didn’t" />
        </div>
      </div>
      <ThinkPanel />
    </div>
    <TextbookFooter />
  </div>
);

const Q6_A: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 6 題：過去時間副詞的否定問答" subtitle="答案解析" />
    <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 40, marginTop: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Panel title="題目 (Question)">
          <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.5 }}>
            （ <span style={{ color: 'var(--osd-accent)', fontWeight: 800 }}>D</span> ）6. A: Did you _____ at that time?<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B: No, I _____ sing at that time.
          </div>
        </Panel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Option letter="A" text="sang; do" showAnswer />
          <Option letter="B" text="sing; don’t" showAnswer />
          <Option letter="C" text="sang; did" showAnswer />
          <Option letter="D" text="sing; didn’t" isCorrect showAnswer />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Panel title="中文翻譯" style={{ padding: '20px 28px' }}>
          <p style={{ margin: 0, fontSize: 22, color: '#334155', fontWeight: 500 }}>
            翻譯：<br />
            A: 你那時候有唱歌嗎？<br />
            B: 沒有，我那時候沒有唱歌。
          </p>
        </Panel>
        <GrammarTip
          formula="at that time ➔ 過去時間"
          note="時間副詞 at that time (那時候) 提示為過去式。問句有助動詞 Did，動詞用原形 sing。B 的答句為否定句且包含原形動詞 sing，需搭配過去式否定助動詞 didn't。"
        />
      </div>
    </div>
    <TextbookFooter />
  </div>
);

// ==================== Q7 ====================
const Q7_Q: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 7 題：不規則動詞字義辨析" subtitle="討論時間" />
    <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 40, marginTop: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Panel title="題目 (Question)">
          <p style={{ margin: 0, fontSize: 28, fontWeight: 700, lineHeight: 1.4 }}>
            （ &nbsp;&nbsp;&nbsp; ）7. Winnie _____ her car last month.
          </p>
        </Panel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Option letter="A" text="sold" />
          <Option letter="B" text="sell" />
          <Option letter="C" text="stand" />
          <Option letter="D" text="stood" />
        </div>
      </div>
      <ThinkPanel />
    </div>
    <TextbookFooter />
  </div>
);

const Q7_A: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 7 題：不規則動詞字義辨析" subtitle="答案解析" />
    <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 40, marginTop: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Panel title="題目 (Question)">
          <p style={{ margin: 0, fontSize: 28, fontWeight: 700, lineHeight: 1.4 }}>
            （ <span style={{ color: 'var(--osd-accent)', fontWeight: 800 }}>A</span> ）7. Winnie _____ her car last month.
          </p>
        </Panel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Option letter="A" text="sold" isCorrect showAnswer />
          <Option letter="B" text="sell" showAnswer />
          <Option letter="C" text="stand" showAnswer />
          <Option letter="D" text="stood" showAnswer />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Panel title="中文翻譯" style={{ padding: '20px 28px' }}>
          <p style={{ margin: 0, fontSize: 22, color: '#334155', fontWeight: 500 }}>
            翻譯：Winnie 上個月賣掉了她的車子。
          </p>
        </Panel>
        <GrammarTip
          formula="sell ➔ sold (不規則變化)"
          note="時間詞 last month 指過去。根據受詞「車子 (car)」，適合的動作是「賣掉 (sell)」，過去式為 sold。選項 (C)(D) 為「站立 (stand / stood)」不搭配。"
        />
      </div>
    </div>
    <TextbookFooter />
  </div>
);

// ==================== Q8 ====================
const Q8_Q: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 8 題：Wh- 疑問句與答句時態" subtitle="討論時間" />
    <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 40, marginTop: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Panel title="題目 (Question)">
          <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.5 }}>
            ( &nbsp;&nbsp;&nbsp; ) 8. A: What did you _____ an hour ago?<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B: I _____ TV with my parents at home.
          </div>
        </Panel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Option letter="A" text="did; watch" />
          <Option letter="B" text="do; watch" />
          <Option letter="C" text="do; watched" />
          <Option letter="D" text="did; watched" />
        </div>
      </div>
      <ThinkPanel />
    </div>
    <TextbookFooter />
  </div>
);

const Q8_A: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 8 題：Wh- 疑問句與答句時態" subtitle="答案解析" />
    <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 40, marginTop: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Panel title="題目 (Question)">
          <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.5 }}>
            ( <span style={{ color: 'var(--osd-accent)', fontWeight: 800 }}>C</span> ) 8. A: What did you _____ an hour ago?<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B: I _____ TV with my parents at home.
          </div>
        </Panel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Option letter="A" text="did; watch" showAnswer />
          <Option letter="B" text="do; watch" showAnswer />
          <Option letter="C" text="do; watched" isCorrect showAnswer />
          <Option letter="D" text="did; watched" showAnswer />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Panel title="中文翻譯" style={{ padding: '20px 28px' }}>
          <p style={{ margin: 0, fontSize: 22, color: '#334155', fontWeight: 500 }}>
            翻譯：<br />
            A: 一個小時前你在做什麼？<br />
            B: 我和父母在家看電視。
          </p>
        </Panel>
        <GrammarTip
          formula="What did + S + V(原形)?"
          note="時間 an hour ago (一小時前) 表示過去。問句 did 後接原形動詞 do。答句描述過去動作且無助動詞，動詞 watch 需用過去式 watched。"
        />
      </div>
    </div>
    <TextbookFooter />
  </div>
);

// ==================== Q9 ====================
const Q9_Q: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 9 題：過去習慣或狀態" subtitle="討論時間" />
    <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 40, marginTop: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Panel title="題目 (Question)">
          <p style={{ margin: 0, fontSize: 28, fontWeight: 700, lineHeight: 1.4 }}>
            ( &nbsp;&nbsp;&nbsp; ) 9. I _____ pizza for dinner every day last week.
          </p>
        </Panel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Option letter="A" text="had" />
          <Option letter="B" text="eat" />
          <Option letter="C" text="am having" />
          <Option letter="D" text="have" />
        </div>
      </div>
      <ThinkPanel />
    </div>
    <TextbookFooter />
  </div>
);

const Q9_A: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 9 題：過去習慣或狀態" subtitle="答案解析" />
    <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 40, marginTop: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Panel title="題目 (Question)">
          <p style={{ margin: 0, fontSize: 28, fontWeight: 700, lineHeight: 1.4 }}>
            ( <span style={{ color: 'var(--osd-accent)', fontWeight: 800 }}>A</span> ) 9. I _____ pizza for dinner every day last week.
          </p>
        </Panel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Option letter="A" text="had" isCorrect showAnswer />
          <Option letter="B" text="eat" showAnswer />
          <Option letter="C" text="am having" showAnswer />
          <Option letter="D" text="have" showAnswer />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Panel title="中文翻譯" style={{ padding: '20px 28px' }}>
          <p style={{ margin: 0, fontSize: 22, color: '#334155', fontWeight: 500 }}>
            翻譯：我上週每天晚餐都吃披薩。
          </p>
        </Panel>
        <GrammarTip
          formula="every day last week ➔ 過去時間"
          note="雖然句中有 every day 表示習慣，但時間被限定在 last week (上星期)。因此這是「過去的習慣」，動詞仍須使用過去式。have/has 的過去式為 had。"
        />
      </div>
    </div>
    <TextbookFooter />
  </div>
);

// ==================== Q10 ====================
const Q10_Q: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 10 題：從答句動詞判斷問句時態 (一)" subtitle="討論時間" />
    <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 40, marginTop: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Panel title="題目 (Question)">
          <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.5 }}>
            ( &nbsp;&nbsp;&nbsp; ) 10. Sue: Where _____ Alex put the photo?<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ray: He put it on his desk.
          </div>
        </Panel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Option letter="A" text="was" />
          <Option letter="B" text="does" />
          <Option letter="C" text="is" />
          <Option letter="D" text="did" />
        </div>
      </div>
      <ThinkPanel />
    </div>
    <TextbookFooter />
  </div>
);

const Q10_A: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 10 題：從答句動詞判斷問句時態 (一)" subtitle="答案解析" />
    <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 40, marginTop: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Panel title="題目 (Question)">
          <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.5 }}>
            ( <span style={{ color: 'var(--osd-accent)', fontWeight: 800 }}>D</span> ) 10. Sue: Where _____ Alex put the photo?<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ray: He put it on his desk.
          </div>
        </Panel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Option letter="A" text="was" showAnswer />
          <Option letter="B" text="does" showAnswer />
          <Option letter="C" text="is" showAnswer />
          <Option letter="D" text="did" isCorrect showAnswer />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Panel title="中文翻譯" style={{ padding: '20px 28px' }}>
          <p style={{ margin: 0, fontSize: 22, color: '#334155', fontWeight: 500 }}>
            翻譯：<br />
            Sue: Alex 把照片放在哪裡了？<br />
            Ray: 他把它放在他的書桌上。
          </p>
        </Panel>
        <GrammarTip
          formula="put - put - put (三態同形)"
          note="Ray 的答句中主詞 He 為單數第三人稱。若是現在式，動詞應寫為 puts。此處卻寫 put，說明這是「過去式」。因此問句必須是過去式，選助動詞 did。"
        />
      </div>
    </div>
    <TextbookFooter />
  </div>
);

// ==================== Q11 ====================
const Q11_Q: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 11 題：從答句動詞判斷問句時態 (二)" subtitle="討論時間" />
    <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 40, marginTop: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Panel title="題目 (Question)">
          <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.5 }}>
            ( &nbsp;&nbsp;&nbsp; ) 11. Sue: Where _____ Alex put the photo?<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ray: He puts it on his desk.
          </div>
        </Panel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Option letter="A" text="was" />
          <Option letter="B" text="does" />
          <Option letter="C" text="is" />
          <Option letter="D" text="did" />
        </div>
      </div>
      <ThinkPanel />
    </div>
    <TextbookFooter />
  </div>
);

const Q11_A: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 11 題：從答句動詞判斷問句時態 (二)" subtitle="答案解析" />
    <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 40, marginTop: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Panel title="題目 (Question)">
          <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.5 }}>
            ( <span style={{ color: 'var(--osd-accent)', fontWeight: 800 }}>B</span> ) 11. Sue: Where _____ Alex put the photo?<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ray: He puts it on his desk.
          </div>
        </Panel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Option letter="A" text="was" showAnswer />
          <Option letter="B" text="does" isCorrect showAnswer />
          <Option letter="C" text="is" showAnswer />
          <Option letter="D" text="did" showAnswer />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Panel title="中文翻譯" style={{ padding: '20px 28px' }}>
          <p style={{ margin: 0, fontSize: 22, color: '#334155', fontWeight: 500 }}>
            翻譯：<br />
            Sue: Alex 平常把照片放在哪裡？<br />
            Ray: 他把它放在他的書桌上。
          </p>
        </Panel>
        <GrammarTip
          formula="主詞 He + 現在式單三動詞 puts"
          note="Ray 的答句中動詞為 puts (加 s)，明確提示為「現在簡單式」。問句主詞 Alex 為第三人稱單數，因此問句須選現在式助動詞 does。"
        />
      </div>
    </div>
    <TextbookFooter />
  </div>
);

// ==================== Summary ====================
const Summary: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="學習重點大統整" subtitle="Takeaways" />
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 40, marginTop: 10 }}>
      <Panel title="過去式解題「三秒判定法」" delay={0.1}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <span style={{ background: 'var(--osd-accent)', color: white, borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, marginTop: 4 }}>1</span>
            <div>
              <strong style={{ fontSize: 24 }}>尋找時間線索：</strong>
              <p style={{ margin: '4px 0 0 0', fontSize: 20, color: muted }}>看到 last night, ... ago, last time, at that time，若句中無助動詞，動詞直接變過去式。</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <span style={{ background: 'var(--osd-accent)', color: white, borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, marginTop: 4 }}>2</span>
            <div>
              <strong style={{ fontSize: 24 }}>助動詞強勢阻擋：</strong>
              <p style={{ margin: '4px 0 0 0', fontSize: 20, color: muted }}>否定句 didn't 或疑問句 Did 開頭，後面的動詞必須無條件打回「原形」。</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <span style={{ background: 'var(--osd-accent)', color: white, borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, marginTop: 4 }}>3</span>
            <div>
              <strong style={{ fontSize: 24 }}>魔鬼細節「三態同形」：</strong>
              <p style={{ margin: '4px 0 0 0', fontSize: 20, color: muted }}>像 put、read 這種字，注意答句中「He put」➔ 過去式 (did)；「He puts」➔ 現在式 (does)。</p>
            </div>
          </div>
        </div>
      </Panel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div
          className="es-fadeUp"
          style={{
            background: '#ecfdf5',
            border: '2px dashed #10b981',
            borderRadius: 12,
            padding: '28px 32px',
            animationDelay: '0.2s',
          }}
        >
          <h4 style={{ margin: '0 0 10px 0', fontSize: 24, color: '#065f46', fontWeight: 800 }}>💪 學習挑戰小提醒</h4>
          <p style={{ margin: 0, fontSize: 20, color: '#047857', lineHeight: 1.5 }}>
            不規則過去式動詞的字尾變化非常多樣（如 -ept, -ew, -old），平日多朗讀與書寫能加深反射記憶。祝你考試順利、文法全對！
          </p>
        </div>
      </div>
    </div>
    <TextbookFooter subtitle="文法總結與解題關鍵" />
  </div>
);

export const meta: SlideMeta = {
  title: 'Unit 6 文法選擇練習：不規則動詞過去式',
  createdAt: '2026-06-15T01:09:41.343Z',
  theme: 'warm-textbook',
};

export default [
  Cover,
  GrammarReview,
  Q1_Q, Q1_A,
  Q2_Q, Q2_A,
  Q3_Q, Q3_A,
  Q4_Q, Q4_A,
  Q5_Q, Q5_A,
  Q6_Q, Q6_A,
  Q7_Q, Q7_A,
  Q8_Q, Q8_A,
  Q9_Q, Q9_A,
  Q10_Q, Q10_A,
  Q11_Q, Q11_A,
  Summary,
] satisfies Page[];
