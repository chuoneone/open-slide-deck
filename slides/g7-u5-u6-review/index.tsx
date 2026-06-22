import React from 'react';
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';

// 引入本機圖片資源
import garyApplesImg from './assets/gary_apples.png';
import amyNotebookImg from './assets/amy_notebook.png';
import jennyAirportImg from './assets/jenny_airport.png';
import rayCinemaImg from './assets/ray_cinema.png';

// 定義主題的 DesignSystem（採用 Warm Textbook 溫暖學術風格）
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

// 額外的風格色彩常數定義
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

// 注入主題動畫樣式
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
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
  ` }} />
);

// 1. 課本風格底圖
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

// 2. 課本風格頁首標題欄
const TextbookHeader = ({ title, subtitle, unit = '段考複習' }: { title: string; subtitle?: string; unit?: string }) => (
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

// 3. 課本風格頁尾欄（自動計算頁碼）
const TextbookFooter = ({ subtitle = 'Grade 7 第三次段考英文複習(U5-6)' }: { subtitle?: string }) => {
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

// 4. 卡片面版
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

// 5. 單字選擇庫面版
const WordBank = ({ words, highlightWord1, highlightWord2 }: { words: string[]; highlightWord1?: string; highlightWord2?: string }) => (
  <div
    className="es-fadeUp"
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 12,
      padding: '16px 24px',
      background: '#f8fafc',
      border: '2px dashed #cbd5e1',
      borderRadius: 12,
      marginBottom: 20,
      position: 'relative',
      zIndex: 2,
    }}
  >
    <div style={{ fontSize: 20, fontWeight: 700, color: '#475569', width: '100%', marginBottom: 4 }}>
      單字庫 (Word Bank):
    </div>
    {words.map((word) => {
      const isSelected = word === highlightWord1 || word === highlightWord2;
      return (
        <span
          key={word}
          style={{
            fontSize: 22,
            fontWeight: isSelected ? 700 : 500,
            padding: '6px 16px',
            borderRadius: 8,
            background: isSelected ? 'var(--osd-accent)' : white,
            color: isSelected ? white : '#475569',
            border: isSelected ? '2px solid var(--osd-accent)' : '1px solid #cbd5e1',
            boxShadow: isSelected ? '0 4px 12px rgba(13, 148, 136, 0.2)' : 'none',
          }}
        >
          {word}
        </span>
      );
    })}
  </div>
);

// 7. 文法重點與解題秘訣提示卡
const GrammarTip = ({ formula, note, delay = 0.2 }: { formula?: string; note: string; delay?: number }) => (
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
        解題解析與文法重點
      </span>
    </div>
    {formula && (
      <div style={{ fontSize: 24, fontWeight: 800, color: '#9a3412', fontFamily: 'monospace', background: '#fff7ed', padding: '10px 18px', borderRadius: 6, border: '1px solid #fed7aa', letterSpacing: '0.05em' }}>
        {formula}
      </div>
    )}
    <div style={{ fontSize: 22, color: '#7c2d12', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
      {note}
    </div>
  </div>
);

// ==================== 投影片頁面定義 ====================

// Page 1: 封面頁
const Cover: Page = () => (
  <div style={{ ...fill, padding: '120px 140px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <StyleTag />
    <TextbookBg />
    <div style={{ position: 'relative', zIndex: 2, maxWidth: 1400 }}>
      <div style={{ display: 'inline-block', fontSize: 24, color: 'var(--osd-accent)', letterSpacing: '0.15em', fontWeight: 800, background: accentMuted, padding: '8px 20px', borderRadius: 8, marginBottom: 24 }}>
        Grade 7 英文科複習
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
        第三次段考英文科習作題複習 (U5-6)
      </h1>
      <p style={{ fontSize: 38, color: orange, fontWeight: 700, margin: '0 0 60px 0', letterSpacing: '0.05em' }}>
        焦點複習：過去式助動詞與 be 動詞、動詞變化與句型精研
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

// Page 2: 單字第一部分轉場頁
const SectionDivider1: Page = () => (
  <div style={{ ...fill, padding: '120px 140px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <StyleTag />
    <TextbookBg />
    <div style={{ position: 'relative', zIndex: 2 }}>
      <div style={{ display: 'inline-block', fontSize: 24, color: 'var(--osd-accent)', letterSpacing: '0.15em', fontWeight: 800, background: accentMuted, padding: '8px 20px', borderRadius: 8, marginBottom: 24 }}>
        SECTION 01
      </div>
      <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 72, fontWeight: 900, color: 'var(--osd-text)', margin: '0 0 24px 0' }}>
        ◎ 根據句意填入適當的單字 (Part 1)
      </h1>
      <p style={{ fontSize: 32, color: orange, fontWeight: 700, margin: 0 }}>
        字彙庫：dead, row, trash, playground, plant, warm
      </p>
    </div>
    <TextbookFooter />
  </div>
);

// 單字庫第一組常數
const words1 = ['dead', 'row', 'trash', 'playground', 'plant', 'warm'];

// Q1_Q
const Q1_Q: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 1 題：字彙填空" subtitle="思考時間" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 10, position: 'relative', zIndex: 2 }}>
      <WordBank words={words1} />
      <Panel title="題目 (Question)">
        <p style={{ margin: 0, fontSize: 46, fontWeight: 700, lineHeight: 1.6 }}>
          1. I often <span style={{ borderBottom: '4px solid #64748b', padding: '0 50px', color: 'transparent' }}>_____</span> a boat with friends in my free time.
        </p>
      </Panel>
    </div>
    <TextbookFooter />
  </div>
);

// Q1_A
const Q1_A: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 1 題：字彙填空" subtitle="答案與解析" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 10, position: 'relative', zIndex: 2 }}>
      <WordBank words={words1} highlightWord1="row" />
      <Panel title="解答 (Answer)">
        <p style={{ margin: 0, fontSize: 46, fontWeight: 700, lineHeight: 1.6, color: '#334155' }}>
          1. I often <span style={{ color: 'var(--osd-accent)', borderBottom: '4px solid var(--osd-accent)', padding: '0 8px', fontWeight: 800 }}>row</span> a boat with friends in my free time.
        </p>
      </Panel>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 24 }}>
        <Panel title="中文翻譯" style={{ padding: '20px 28px', height: '100%' }}>
          <p style={{ margin: 0, fontSize: 24, color: '#475569', fontWeight: 500, lineHeight: 1.5 }}>
            翻譯：我空閒時間經常和朋友一起划船。
          </p>
        </Panel>
        <GrammarTip
          formula="row a boat (動詞片語) — 划船"
          note="• row 在此作為動詞，意為「划（船）」。&#10;• often（經常）為頻率副詞，其後方接原形動詞。"
        />
      </div>
    </div>
    <TextbookFooter />
  </div>
);

// Q2_Q
const Q2_Q: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 2 題：字彙填空" subtitle="思考時間" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 10, position: 'relative', zIndex: 2 }}>
      <WordBank words={words1} />
      <Panel title="題目 (Question)">
        <p style={{ margin: 0, fontSize: 46, fontWeight: 700, lineHeight: 1.6 }}>
          2. Blaire doesn’t drink cold（冷的）water; she always drinks <span style={{ borderBottom: '3px solid #64748b', padding: '0 50px', color: 'transparent' }}>_____</span> water.
        </p>
      </Panel>
    </div>
    <TextbookFooter />
  </div>
);

// Q2_A
const Q2_A: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 2 題：字彙填空" subtitle="答案與解析" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 10, position: 'relative', zIndex: 2 }}>
      <WordBank words={words1} highlightWord1="warm" />
      <Panel title="解答 (Answer)">
        <p style={{ margin: 0, fontSize: 46, fontWeight: 700, lineHeight: 1.6, color: '#334155' }}>
          2. Blaire doesn’t drink cold water; she always drinks <span style={{ color: 'var(--osd-accent)', borderBottom: '3px solid var(--osd-accent)', padding: '0 8px', fontWeight: 800 }}>warm</span> water.
        </p>
      </Panel>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 24 }}>
        <Panel title="中文翻譯" style={{ padding: '20px 28px', height: '100%' }}>
          <p style={{ margin: 0, fontSize: 24, color: '#475569', fontWeight: 500, lineHeight: 1.5 }}>
            翻譯：Blaire 不喝冰水；她總是喝溫水。
          </p>
        </Panel>
        <GrammarTip
          formula="warm (形容詞) — 溫暖的、溫的"
          note="• 根據前文 doesn't drink cold water（不喝冷/冰水），後面應該是表示對比的「溫水 (warm water)」。"
        />
      </div>
    </div>
    <TextbookFooter />
  </div>
);

// Q3_Q
const Q3_Q: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 3 題：字彙填空" subtitle="思考時間" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 10, position: 'relative', zIndex: 2 }}>
      <WordBank words={words1} />
      <Panel title="題目 (Question)">
        <p style={{ margin: 0, fontSize: 46, fontWeight: 700, lineHeight: 1.6 }}>
          3. Lucy: Did you <span style={{ borderBottom: '3px solid #64748b', padding: '0 50px', color: 'transparent' }}>_____</span> the flowers? They are beautiful!<br />
          Henry: Thank you.
        </p>
      </Panel>
    </div>
    <TextbookFooter />
  </div>
);

// Q3_A
const Q3_A: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 3 題：字彙填空" subtitle="答案與解析" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 10, position: 'relative', zIndex: 2 }}>
      <WordBank words={words1} highlightWord1="plant" />
      <Panel title="解答 (Answer)">
        <p style={{ margin: 0, fontSize: 46, fontWeight: 700, lineHeight: 1.6, color: '#334155' }}>
          3. Lucy: Did you <span style={{ color: 'var(--osd-accent)', borderBottom: '4px solid var(--osd-accent)', padding: '0 8px', fontWeight: 800 }}>plant</span> the flowers? They are beautiful!<br />
          Henry: Thank you.
        </p>
      </Panel>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 24 }}>
        <Panel title="中文翻譯" style={{ padding: '20px 28px', height: '100%' }}>
          <p style={{ margin: 0, fontSize: 24, color: '#475569', fontWeight: 500, lineHeight: 1.5 }}>
            翻譯：Lucy：你種了這些花嗎？它們好漂亮！<br />
            Henry：謝謝你。
          </p>
        </Panel>
        <GrammarTip
          formula="Did + 主詞 + 原形動詞...?"
          note="• plant 在此作動詞用，表示「種植（花草）」。&#10;• 問句開頭使用過去式助動詞 Did，後面的動詞必須使用原形動詞 plant。"
        />
      </div>
    </div>
    <TextbookFooter />
  </div>
);

// Q4_Q
const Q4_Q: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 4 題：字彙填空" subtitle="思考時間" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 10, position: 'relative', zIndex: 2 }}>
      <WordBank words={words1} />
      <Panel title="題目 (Question)">
        <p style={{ margin: 0, fontSize: 46, fontWeight: 700, lineHeight: 1.6 }}>
          4. Glenn: What did you and your brother do at the <span style={{ borderBottom: '3px solid #64748b', padding: '0 50px', color: 'transparent' }}>_____</span>?<br />
          Sandy: We jumped rope there.
        </p>
      </Panel>
    </div>
    <TextbookFooter />
  </div>
);

// Q4_A
const Q4_A: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 4 題：字彙填空" subtitle="答案與解析" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 10, position: 'relative', zIndex: 2 }}>
      <WordBank words={words1} highlightWord1="playground" />
      <Panel title="解答 (Answer)">
        <p style={{ margin: 0, fontSize: 46, fontWeight: 700, lineHeight: 1.6, color: '#334155' }}>
          4. Glenn: What did you and your brother do at the <span style={{ color: 'var(--osd-accent)', borderBottom: '4px solid var(--osd-accent)', padding: '0 8px', fontWeight: 800 }}>playground</span>?<br />
          Sandy: We jumped rope there.
        </p>
      </Panel>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 24 }}>
        <Panel title="中文翻譯" style={{ padding: '20px 28px', height: '100%' }}>
          <p style={{ margin: 0, fontSize: 24, color: '#475569', fontWeight: 500, lineHeight: 1.5 }}>
            翻譯：Glenn：你和你哥哥在操場做了什麼？<br />
            Sandy：我們在那裡跳繩。
          </p>
        </Panel>
        <GrammarTip
          formula="playground (名詞) — 操場、遊樂場"
          note="• 根據 Sandy 的回答 We jumped rope there（我們在那裡跳繩），此處需要填入地點名詞 playground。"
        />
      </div>
    </div>
    <TextbookFooter />
  </div>
);

// Q5_Q
const Q5_Q: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 5 題：字彙填空" subtitle="思考時間" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 10, position: 'relative', zIndex: 2 }}>
      <WordBank words={words1} />
      <Panel title="題目 (Question)">
        <p style={{ margin: 0, fontSize: 46, fontWeight: 700, lineHeight: 1.6 }}>
          5. Tim: What’s that smell（味道）? Is there a <span style={{ borderBottom: '3px solid #64748b', padding: '0 40px', color: 'transparent' }}>_____</span> rat in the kitchen?<br />
          Julie: Let me check. No. I only see a lot of <span style={{ borderBottom: '3px solid #64748b', padding: '0 40px', color: 'transparent' }}>_____</span> here.
        </p>
      </Panel>
    </div>
    <TextbookFooter />
  </div>
);

// Q5_A
const Q5_A: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 5 題：字彙填空" subtitle="答案與解析" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 10, position: 'relative', zIndex: 2 }}>
      <WordBank words={words1} highlightWord1="dead" highlightWord2="trash" />
      <Panel title="解答 (Answer)">
        <p style={{ margin: 0, fontSize: 46, fontWeight: 700, lineHeight: 1.6, color: '#334155' }}>
          5. Tim: What’s that smell? Is there a <span style={{ color: 'var(--osd-accent)', borderBottom: '4px solid var(--osd-accent)', padding: '0 8px', fontWeight: 800 }}>dead</span> rat in the kitchen?<br />
          Julie: Let me check. No. I only see a lot of <span style={{ color: 'var(--osd-accent)', borderBottom: '4px solid var(--osd-accent)', padding: '0 8px', fontWeight: 800 }}>trash</span> here.
        </p>
      </Panel>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 24 }}>
        <Panel title="中文翻譯" style={{ padding: '20px 28px', height: '100%' }}>
          <p style={{ margin: 0, fontSize: 24, color: '#475569', fontWeight: 500, lineHeight: 1.5 }}>
            翻譯：Tim：那是什麼味道？廚房裡有死老鼠嗎？<br />
            Julie：讓我檢查看看。沒有，我只在這裡看到很多垃圾。
          </p>
        </Panel>
        <GrammarTip
          formula="dead (形容詞) — 死的 | trash (名詞) — 垃圾"
          note="• dead rat 表示「死老鼠」，用來解釋廚房不好聞的味道 (smell)。&#10;• a lot of 後方可接不可數名詞 trash 意為「許多垃圾」。"
        />
      </div>
    </div>
    <TextbookFooter />
  </div>
);

// Page 14: 單字第二部分轉場頁
const SectionDivider2: Page = () => (
  <div style={{ ...fill, padding: '120px 140px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <StyleTag />
    <TextbookBg />
    <div style={{ position: 'relative', zIndex: 2 }}>
      <div style={{ display: 'inline-block', fontSize: 24, color: 'var(--osd-accent)', letterSpacing: '0.15em', fontWeight: 800, background: accentMuted, padding: '8px 20px', borderRadius: 8, marginBottom: 24 }}>
        SECTION 02
      </div>
      <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 72, fontWeight: 900, color: 'var(--osd-text)', margin: '0 0 24px 0' }}>
        ◎ 根據句意填入適當的單字 (Part 2)
      </h1>
      <p style={{ fontSize: 32, color: orange, fontWeight: 700, margin: 0 }}>
        字彙庫：rest, airport, famous, cry, buy, age
      </p>
    </div>
    <TextbookFooter />
  </div>
);

// 單字庫第二組常數
const words2 = ['rest', 'airport', 'famous', 'cry', 'buy', 'age'];

// Q6_Q
const Q6_Q: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 6 題：字彙填空" subtitle="思考時間" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 10, position: 'relative', zIndex: 2 }}>
      <WordBank words={words2} />
      <Panel title="題目 (Question)">
        <p style={{ margin: 0, fontSize: 46, fontWeight: 700, lineHeight: 1.6 }}>
          6. Bob: Where did you <span style={{ borderBottom: '3px solid #64748b', padding: '0 50px', color: 'transparent' }}>_____</span> this comic book?<br />
          Ivy: I got it from a bookstore nearby.
        </p>
      </Panel>
    </div>
    <TextbookFooter />
  </div>
);

// Q6_A
const Q6_A: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 6 題：字彙填空" subtitle="答案與解析" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 10, position: 'relative', zIndex: 2 }}>
      <WordBank words={words2} highlightWord1="buy" />
      <Panel title="解答 (Answer)">
        <p style={{ margin: 0, fontSize: 46, fontWeight: 700, lineHeight: 1.6, color: '#334155' }}>
          6. Bob: Where did you <span style={{ color: 'var(--osd-accent)', borderBottom: '4px solid var(--osd-accent)', padding: '0 8px', fontWeight: 800 }}>buy</span> this comic book?<br />
          Ivy: I got it from a bookstore nearby.
        </p>
      </Panel>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 24 }}>
        <Panel title="中文翻譯" style={{ padding: '20px 28px', height: '100%' }}>
          <p style={{ margin: 0, fontSize: 24, color: '#475569', fontWeight: 500, lineHeight: 1.5 }}>
            翻譯：Bob：你在哪裡買這本漫畫書的？<br />
            Ivy：我是從附近的一家書店買到的（got it）。
          </p>
        </Panel>
        <GrammarTip
          formula="Where did you + 原形動詞...?"
          note="• 根據答句中的 bookstore (書店) 可以推測出「購買 (buy)」這個動作。&#10;• 問句含有過去式助動詞 did，其後須搭配動詞原形 buy。"
        />
      </div>
    </div>
    <TextbookFooter />
  </div>
);

// Q7_Q
const Q7_Q: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 7 題：字彙填空" subtitle="思考時間" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 10, position: 'relative', zIndex: 2 }}>
      <WordBank words={words2} />
      <Panel title="題目 (Question)">
        <p style={{ margin: 0, fontSize: 46, fontWeight: 700, lineHeight: 1.6 }}>
          7. Rose: Are you OK?<br />
          Tim: I’m fine. I’m just tired and need a <span style={{ borderBottom: '3px solid #64748b', padding: '0 50px', color: 'transparent' }}>_____</span>.
        </p>
      </Panel>
    </div>
    <TextbookFooter />
  </div>
);

// Q7_A
const Q7_A: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 7 題：字彙填空" subtitle="答案與解析" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 10, position: 'relative', zIndex: 2 }}>
      <WordBank words={words2} highlightWord1="rest" />
      <Panel title="解答 (Answer)">
        <p style={{ margin: 0, fontSize: 46, fontWeight: 700, lineHeight: 1.6, color: '#334155' }}>
          7. Rose: Are you OK?<br />
          Tim: I’m fine. I’m just tired and need a <span style={{ color: 'var(--osd-accent)', borderBottom: '4px solid var(--osd-accent)', padding: '0 8px', fontWeight: 800 }}>rest</span>.
        </p>
      </Panel>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 24 }}>
        <Panel title="中文翻譯" style={{ padding: '20px 28px', height: '100%' }}>
          <p style={{ margin: 0, fontSize: 24, color: '#475569', fontWeight: 500, lineHeight: 1.5 }}>
            翻譯：Rose：你還好嗎？<br />
            Tim：我沒事，我只是累了（tired），需要休息。
          </p>
        </Panel>
        <GrammarTip
          formula="need a rest — 需要休息"
          note="• rest 在此處當作單數可數名詞，意為「休息」。&#10;• tiredness (累) 與 need a rest (需要休息) 具備邏輯因果關係。"
        />
      </div>
    </div>
    <TextbookFooter />
  </div>
);

// Q8_Q
const Q8_Q: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 8 題：字彙填空" subtitle="思考時間" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 10, position: 'relative', zIndex: 2 }}>
      <WordBank words={words2} />
      <Panel title="題目 (Question)">
        <p style={{ margin: 0, fontSize: 46, fontWeight: 700, lineHeight: 1.6 }}>
          8. Our company is near the <span style={{ borderBottom: '3px solid #64748b', padding: '0 50px', color: 'transparent' }}>_____</span>. We can see planes right from our office.
        </p>
      </Panel>
    </div>
    <TextbookFooter />
  </div>
);

// Q8_A
const Q8_A: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 8 題：字彙填空" subtitle="答案與解析" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 10, position: 'relative', zIndex: 2 }}>
      <WordBank words={words2} highlightWord1="airport" />
      <Panel title="解答 (Answer)">
        <p style={{ margin: 0, fontSize: 46, fontWeight: 700, lineHeight: 1.6, color: '#334155' }}>
          8. Our company is near the <span style={{ color: 'var(--osd-accent)', borderBottom: '4px solid var(--osd-accent)', padding: '0 8px', fontWeight: 800 }}>airport</span>. We can see planes right from our office.
        </p>
      </Panel>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 24 }}>
        <Panel title="中文翻譯" style={{ padding: '20px 28px', height: '100%' }}>
          <p style={{ margin: 0, fontSize: 24, color: '#475569', fontWeight: 500, lineHeight: 1.5 }}>
            翻譯：我們公司在機場附近。我們可以直接從辦公室看到飛機。
          </p>
        </Panel>
        <GrammarTip
          formula="airport (名詞) — 機場"
          note="• 後文提到 We can see planes（我們看得到飛機），可輕易推斷出地點是在機場 (airport) 附近。"
        />
      </div>
    </div>
    <TextbookFooter />
  </div>
);

// Q9_Q
const Q9_Q: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 9 題：字彙填空" subtitle="思考時間" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 10, position: 'relative', zIndex: 2 }}>
      <WordBank words={words2} />
      <Panel title="題目 (Question)">
        <p style={{ margin: 0, fontSize: 46, fontWeight: 700, lineHeight: 1.6 }}>
          9. Taipei 101 is a <span style={{ borderBottom: '3px solid #64748b', padding: '0 50px', color: 'transparent' }}>_____</span> building. Every year, people around the world come and visit it.
        </p>
      </Panel>
    </div>
    <TextbookFooter />
  </div>
);

// Q9_A
const Q9_A: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 9 題：字彙填空" subtitle="答案與解析" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 10, position: 'relative', zIndex: 2 }}>
      <WordBank words={words2} highlightWord1="famous" />
      <Panel title="解答 (Answer)">
        <p style={{ margin: 0, fontSize: 46, fontWeight: 700, lineHeight: 1.6, color: '#334155' }}>
          9. Taipei 101 is a <span style={{ color: 'var(--osd-accent)', borderBottom: '4px solid var(--osd-accent)', padding: '0 8px', fontWeight: 800 }}>famous</span> building. Every year, people around the world come and visit it.
        </p>
      </Panel>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 24 }}>
        <Panel title="中文翻譯" style={{ padding: '20px 28px', height: '100%' }}>
          <p style={{ margin: 0, fontSize: 24, color: '#475569', fontWeight: 500, lineHeight: 1.5 }}>
            翻譯：台北 101 是一棟著名的建築。每年，全世界的人都會來參觀它。
          </p>
        </Panel>
        <GrammarTip
          formula="famous (形容詞) — 著名的、有名的"
          note="• 根據後文「世界各地的人都來參觀它」，可知台北 101 是一座著名的 (famous) 建築。"
        />
      </div>
    </div>
    <TextbookFooter />
  </div>
);

// Q10_Q
const Q10_Q: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 10 題：字彙填空" subtitle="思考時間" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 10, position: 'relative', zIndex: 2 }}>
      <WordBank words={words2} />
      <Panel title="題目 (Question)">
        <p style={{ margin: 0, fontSize: 46, fontWeight: 700, lineHeight: 1.6 }}>
          10. People <span style={{ borderBottom: '3px solid #64748b', padding: '0 50px', color: 'transparent' }}>_____</span> because the story is so sad.
        </p>
      </Panel>
    </div>
    <TextbookFooter />
  </div>
);

// Q10_A
const Q10_A: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 10 題：字彙填空" subtitle="答案與解析" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 10, position: 'relative', zIndex: 2 }}>
      <WordBank words={words2} highlightWord1="cry" />
      <Panel title="解答 (Answer)">
        <p style={{ margin: 0, fontSize: 46, fontWeight: 700, lineHeight: 1.6, color: '#334155' }}>
          10. People <span style={{ color: 'var(--osd-accent)', borderBottom: '4px solid var(--osd-accent)', padding: '0 8px', fontWeight: 800 }}>cry</span> because the story is so sad.
        </p>
      </Panel>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 24 }}>
        <Panel title="中文翻譯" style={{ padding: '20px 28px', height: '100%' }}>
          <p style={{ margin: 0, fontSize: 24, color: '#475569', fontWeight: 500, lineHeight: 1.5 }}>
            翻譯：人們哭了，因為這個故事太令人悲傷了。
          </p>
        </Panel>
        <GrammarTip
          formula="cry (動詞) — 哭泣"
          note="• 根據後文 because the story is so sad（因為故事太傷人/悲傷），可知人們會「哭泣 (cry)」。&#10;• People（人們）為複數名詞主詞，在現在式中後面直接搭配原形動詞 cry。"
        />
      </div>
    </div>
    <TextbookFooter />
  </div>
);

// Q11_Q
const Q11_Q: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 11 題：字彙填空" subtitle="思考時間" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 10, position: 'relative', zIndex: 2 }}>
      <WordBank words={words2} />
      <Panel title="題目 (Question)">
        <p style={{ margin: 0, fontSize: 46, fontWeight: 700, lineHeight: 1.6 }}>
          11. Bill: Do you know the <span style={{ borderBottom: '3px solid #64748b', padding: '0 50px', color: 'transparent' }}>_____</span> of that house?<br />
          Mrs. Lee: Yes. It’s about two hundred years old.
        </p>
      </Panel>
    </div>
    <TextbookFooter />
  </div>
);

// Q11_A
const Q11_A: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 11 題：字彙填空" subtitle="答案與解析" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 10, position: 'relative', zIndex: 2 }}>
      <WordBank words={words2} highlightWord1="age" />
      <Panel title="解答 (Answer)">
        <p style={{ margin: 0, fontSize: 46, fontWeight: 700, lineHeight: 1.6, color: '#334155' }}>
          11. Bill: Do you know the <span style={{ color: 'var(--osd-accent)', borderBottom: '4px solid var(--osd-accent)', padding: '0 8px', fontWeight: 800 }}>age</span> of that house?<br />
          Mrs. Lee: Yes. It’s about two hundred years old.
        </p>
      </Panel>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 24 }}>
        <Panel title="中文翻譯" style={{ padding: '20px 28px', height: '100%' }}>
          <p style={{ margin: 0, fontSize: 24, color: '#475569', fontWeight: 500, lineHeight: 1.5 }}>
            翻譯：Bill：你知道那棟房子的年紀（屋齡）嗎？<br />
            Mrs. Lee：知道。它大約有兩百年的歷史了。
          </p>
        </Panel>
        <GrammarTip
          formula="age (名詞) — 年紀、歲數、歷史"
          note="• 答句為 It's about two hundred years old（屋齡大約兩百歲），因此問句詢問的是「年齡/屋齡 (age)」。"
        />
      </div>
    </div>
    <TextbookFooter />
  </div>
);

// Page 28: 依提示作答轉場頁
const SectionDivider3: Page = () => (
  <div style={{ ...fill, padding: '120px 140px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <StyleTag />
    <TextbookBg />
    <div style={{ position: 'relative', zIndex: 2 }}>
      <div style={{ display: 'inline-block', fontSize: 24, color: 'var(--osd-accent)', letterSpacing: '0.15em', fontWeight: 800, background: accentMuted, padding: '8px 20px', borderRadius: 8, marginBottom: 24 }}>
        SECTION 03
      </div>
      <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 72, fontWeight: 900, color: 'var(--osd-text)', margin: '0 0 24px 0' }}>
        ◎ 依提示作答 (Sentence Transformation)
      </h1>
      <p style={{ fontSize: 32, color: orange, fontWeight: 700, margin: 0 }}>
        重點：過去式動詞與助動詞的時間轉換
      </p>
    </div>
    <TextbookFooter />
  </div>
);

// QExample_Q
const QExample_Q: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="引導例題分析" subtitle="思考時間" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 20, position: 'relative', zIndex: 2 }}>
      <Panel title="原句 (Original Sentence)" style={{ background: '#f8fafc' }}>
        <p style={{ margin: 0, fontSize: 40, fontWeight: 700, color: '#64748b', lineHeight: 1.6 }}>
          I watch a movie on TV.
        </p>
      </Panel>
      <Panel title="修改提示 (Prompt)">
        <p style={{ margin: 0, fontSize: 46, fontWeight: 800, color: orange, lineHeight: 1.6 }}>
          👉 句尾加上 last night
        </p>
      </Panel>
    </div>
    <TextbookFooter />
  </div>
);

// QExample_A
const QExample_A: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="引導例題分析" subtitle="解答呈現" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginTop: 40, position: 'relative', zIndex: 2 }}>
      <Panel title="原句 (Original Sentence)" style={{ background: '#f8fafc' }}>
        <p style={{ margin: 0, fontSize: 40, fontWeight: 700, color: '#64748b', lineHeight: 1.6 }}>
          I watch a movie on TV. (句尾加上 last night)
        </p>
      </Panel>
      <Panel title="修改結果 (Rewritten Sentence)">
        <p style={{ margin: 0, fontSize: 46, fontWeight: 700, lineHeight: 1.6, color: '#334155' }}>
          I <span style={{ color: 'var(--osd-accent)', borderBottom: '4px solid var(--osd-accent)', padding: '0 4px', fontWeight: 800 }}>watched</span> a movie on TV <span style={{ color: orange, borderBottom: `4px solid ${orange}`, padding: '0 4px', fontWeight: 800 }}>last night</span>.
        </p>
      </Panel>
    </div>
    <TextbookFooter />
  </div>
);

// Q12_Q
const Q12_Q: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 1 題：依提示作答" subtitle="思考時間" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 20, position: 'relative', zIndex: 2 }}>
      <Panel title="原句 (Original Sentence)" style={{ background: '#f8fafc' }}>
        <p style={{ margin: 0, fontSize: 40, fontWeight: 700, color: '#64748b', lineHeight: 1.6 }}>
          Where does she live?
        </p>
      </Panel>
      <Panel title="修改提示 (Prompt)">
        <p style={{ margin: 0, fontSize: 46, fontWeight: 800, color: orange, lineHeight: 1.6 }}>
          👉 句尾加上 three years ago
        </p>
      </Panel>
    </div>
    <TextbookFooter />
  </div>
);

// Q12_A
const Q12_A: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 1 題：依提示作答" subtitle="解答呈現" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginTop: 40, position: 'relative', zIndex: 2 }}>
      <Panel title="原句 (Original Sentence)" style={{ background: '#f8fafc' }}>
        <p style={{ margin: 0, fontSize: 40, fontWeight: 700, color: '#64748b', lineHeight: 1.6 }}>
          Where does she live? (句尾加上 three years ago)
        </p>
      </Panel>
      <Panel title="修改結果 (Rewritten Sentence)">
        <p style={{ margin: 0, fontSize: 46, fontWeight: 700, lineHeight: 1.6, color: '#334155' }}>
          Where <span style={{ color: 'var(--osd-accent)', borderBottom: '4px solid var(--osd-accent)', padding: '0 4px', fontWeight: 800 }}>did</span> she live <span style={{ color: orange, borderBottom: `4px solid ${orange}`, padding: '0 4px', fontWeight: 800 }}>three years ago</span>?
        </p>
      </Panel>
    </div>
    <TextbookFooter />
  </div>
);

// Q13_Q
const Q13_Q: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 2 題：依提示作答" subtitle="思考時間" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 20, position: 'relative', zIndex: 2 }}>
      <Panel title="原句 (Original Sentence)" style={{ background: '#f8fafc' }}>
        <p style={{ margin: 0, fontSize: 40, fontWeight: 700, color: '#64748b', lineHeight: 1.6 }}>
          Are you at the lake?
        </p>
      </Panel>
      <Panel title="修改提示 (Prompt)">
        <p style={{ margin: 0, fontSize: 46, fontWeight: 800, color: orange, lineHeight: 1.6 }}>
          👉 句尾加上 yesterday morning
        </p>
      </Panel>
    </div>
    <TextbookFooter />
  </div>
);

// Q13_A
const Q13_A: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="第 2 題：依提示作答" subtitle="解答呈現" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginTop: 40, position: 'relative', zIndex: 2 }}>
      <Panel title="原句 (Original Sentence)" style={{ background: '#f8fafc' }}>
        <p style={{ margin: 0, fontSize: 40, fontWeight: 700, color: '#64748b', lineHeight: 1.6 }}>
          Are you at the lake? (句尾加上 yesterday morning)
        </p>
      </Panel>
      <Panel title="修改結果 (Rewritten Sentence)">
        <p style={{ margin: 0, fontSize: 46, fontWeight: 700, lineHeight: 1.6, color: '#334155' }}>
          <span style={{ color: 'var(--osd-accent)', borderBottom: '4px solid var(--osd-accent)', padding: '0 4px', fontWeight: 800 }}>Were</span> you at the lake <span style={{ color: orange, borderBottom: `4px solid ${orange}`, padding: '0 4px', fontWeight: 800 }}>yesterday morning</span>?
        </p>
      </Panel>
    </div>
    <TextbookFooter />
  </div>
);

// Page 34: 看圖回答問題轉場頁
const SectionDivider4: Page = () => (
  <div style={{ ...fill, padding: '120px 140px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <StyleTag />
    <TextbookBg />
    <div style={{ position: 'relative', zIndex: 2 }}>
      <div style={{ display: 'inline-block', fontSize: 24, color: 'var(--osd-accent)', letterSpacing: '0.15em', fontWeight: 800, background: accentMuted, padding: '8px 20px', borderRadius: 8, marginBottom: 24 }}>
        SECTION 04
      </div>
      <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 72, fontWeight: 900, color: 'var(--osd-text)', margin: '0 0 24px 0' }}>
        ◎ 看圖回答問題 (Look and Answer)
      </h1>
      <p style={{ fontSize: 32, color: orange, fontWeight: 700, margin: 0 }}>
        重點：觀察圖片細節，並以過去式或現在式正確回答問題
      </p>
    </div>
    <TextbookFooter />
  </div>
);

// Q14_Q
const Q14_Q: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="看圖回答問題：第 1 題" subtitle="觀察與思考" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 10, position: 'relative', zIndex: 2 }}>
      <Panel title="提問 (Question)">
        <p style={{ margin: 0, fontSize: 46, fontWeight: 700, lineHeight: 1.6 }}>
          1. Did Gary buy some apples at the market? (肯定簡答)
        </p>
      </Panel>
      <div style={{ display: 'flex', justifyContent: 'center', background: white, padding: 12, borderRadius: design.radius, border: `2px solid ${border}`, alignSelf: 'center' }}>
        <img src={garyApplesImg} style={{ maxHeight: 380, width: 'auto', objectFit: 'contain', borderRadius: 6 }} />
      </div>
    </div>
    <TextbookFooter />
  </div>
);

// Q14_A
const Q14_A: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="看圖回答問題：第 1 題" subtitle="解答呈現" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 10, position: 'relative', zIndex: 2 }}>
      {/* 上半部：左題目，右圖片 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 40, alignItems: 'center' }}>
        <Panel title="提問 (Question)">
          <p style={{ margin: 0, fontSize: 46, fontWeight: 700, lineHeight: 1.6 }}>
            1. Did Gary buy some apples at the market? (肯定簡答)
          </p>
        </Panel>
        <div style={{ display: 'flex', justifyContent: 'center', background: white, padding: 12, borderRadius: design.radius, border: `2px solid ${border}`, height: 180, alignItems: 'center' }}>
          <img src={garyApplesImg} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', borderRadius: 6 }} />
        </div>
      </div>
      
      {/* 下半部：僅有解答 */}
      <Panel title="解答 (Answer)">
        <p style={{ margin: 0, fontSize: 46, fontWeight: 800, color: 'var(--osd-accent)', lineHeight: 1.6 }}>
          Yes, he did.
        </p>
      </Panel>
    </div>
    <TextbookFooter />
  </div>
);

// Q15_Q
const Q15_Q: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="看圖回答問題：第 2 題" subtitle="觀察與思考" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 10, position: 'relative', zIndex: 2 }}>
      <Panel title="提問 (Question)">
        <p style={{ margin: 0, fontSize: 46, fontWeight: 700, lineHeight: 1.6 }}>
          2. What did Amy draw in the notebook?
        </p>
      </Panel>
      <div style={{ display: 'flex', justifyContent: 'center', background: white, padding: 12, borderRadius: design.radius, border: `2px solid ${border}`, alignSelf: 'center' }}>
        <img src={amyNotebookImg} style={{ maxHeight: 380, width: 'auto', objectFit: 'contain', borderRadius: 6 }} />
      </div>
    </div>
    <TextbookFooter />
  </div>
);

// Q15_A
const Q15_A: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="看圖回答問題：第 2 題" subtitle="解答呈現" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 10, position: 'relative', zIndex: 2 }}>
      {/* 上半部：左題目，右圖片 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 40, alignItems: 'center' }}>
        <Panel title="提問 (Question)">
          <p style={{ margin: 0, fontSize: 46, fontWeight: 700, lineHeight: 1.6 }}>
            2. What did Amy draw in the notebook?
          </p>
        </Panel>
        <div style={{ display: 'flex', justifyContent: 'center', background: white, padding: 12, borderRadius: design.radius, border: `2px solid ${border}`, height: 180, alignItems: 'center' }}>
          <img src={amyNotebookImg} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', borderRadius: 6 }} />
        </div>
      </div>
      
      {/* 下半部：僅有解答 */}
      <Panel title="解答 (Answer)">
        <p style={{ margin: 0, fontSize: 46, fontWeight: 800, color: 'var(--osd-accent)', lineHeight: 1.6 }}>
          She drew a train in the notebook.
        </p>
      </Panel>
    </div>
    <TextbookFooter />
  </div>
);

// Q16_Q
const Q16_Q: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="看圖回答問題：第 3 題" subtitle="觀察與思考" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 10, position: 'relative', zIndex: 2 }}>
      <Panel title="提問 (Question)">
        <p style={{ margin: 0, fontSize: 46, fontWeight: 700, lineHeight: 1.6 }}>
          3. Where is Jenny?
        </p>
      </Panel>
      <div style={{ display: 'flex', justifyContent: 'center', background: white, padding: 12, borderRadius: design.radius, border: `2px solid ${border}`, alignSelf: 'center' }}>
        <img src={jennyAirportImg} style={{ maxHeight: 380, width: 'auto', objectFit: 'contain', borderRadius: 6 }} />
      </div>
    </div>
    <TextbookFooter />
  </div>
);

// Q16_A
const Q16_A: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="看圖回答問題：第 3 題" subtitle="解答呈現" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 10, position: 'relative', zIndex: 2 }}>
      {/* 上半部：左題目，右圖片 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 40, alignItems: 'center' }}>
        <Panel title="提問 (Question)">
          <p style={{ margin: 0, fontSize: 46, fontWeight: 700, lineHeight: 1.6 }}>
            3. Where is Jenny?
          </p>
        </Panel>
        <div style={{ display: 'flex', justifyContent: 'center', background: white, padding: 12, borderRadius: design.radius, border: `2px solid ${border}`, height: 180, alignItems: 'center' }}>
          <img src={jennyAirportImg} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', borderRadius: 6 }} />
        </div>
      </div>
      
      {/* 下半部：僅有解答 */}
      <Panel title="解答 (Answer)">
        <p style={{ margin: 0, fontSize: 46, fontWeight: 800, color: 'var(--osd-accent)', lineHeight: 1.6 }}>
          She is at the airport.
        </p>
      </Panel>
    </div>
    <TextbookFooter />
  </div>
);

// Q17_Q
const Q17_Q: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="看圖回答問題：第 4 題" subtitle="觀察與思考" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 10, position: 'relative', zIndex: 2 }}>
      <Panel title="提問 (Question)">
        <p style={{ margin: 0, fontSize: 46, fontWeight: 700, lineHeight: 1.6 }}>
          4. Where did Ray go yesterday?
        </p>
      </Panel>
      <div style={{ display: 'flex', justifyContent: 'center', background: white, padding: 12, borderRadius: design.radius, border: `2px solid ${border}`, alignSelf: 'center' }}>
        <img src={rayCinemaImg} style={{ maxHeight: 380, width: 'auto', objectFit: 'contain', borderRadius: 6 }} />
      </div>
    </div>
    <TextbookFooter />
  </div>
);

// Q17_A
const Q17_A: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="看圖回答問題：第 4 題" subtitle="解答呈現" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 10, position: 'relative', zIndex: 2 }}>
      {/* 上半部：左題目，右圖片 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 40, alignItems: 'center' }}>
        <Panel title="提問 (Question)">
          <p style={{ margin: 0, fontSize: 46, fontWeight: 700, lineHeight: 1.6 }}>
            4. Where did Ray go yesterday?
          </p>
        </Panel>
        <div style={{ display: 'flex', justifyContent: 'center', background: white, padding: 12, borderRadius: design.radius, border: `2px solid ${border}`, height: 180, alignItems: 'center' }}>
          <img src={rayCinemaImg} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', borderRadius: 6 }} />
        </div>
      </div>
      
      {/* 下半部：僅有解答 */}
      <Panel title="解答 (Answer)">
        <p style={{ margin: 0, fontSize: 46, fontWeight: 800, color: 'var(--osd-accent)', lineHeight: 1.6 }}>
          He went to the movie theater yesterday.
        </p>
      </Panel>
    </div>
    <TextbookFooter />
  </div>
);

// Page 43: 總結複習頁
const Summary: Page = () => (
  <div style={{ ...fill, padding: '100px 120px 140px 120px', position: 'relative' }}>
    <StyleTag />
    <TextbookBg />
    <TextbookHeader title="段考複習總結與叮嚀" subtitle="課程總結" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginTop: 10, position: 'relative', zIndex: 2 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Panel title="🔑 核心文法考點回顧">
          <ul style={{ margin: 0, paddingLeft: 24, fontSize: 22, lineHeight: 1.6, color: '#334155' }}>
            <li style={{ marginBottom: 12 }}>
              <strong>時態關鍵字判斷：</strong><br />
              看到 <span style={{ color: orange, fontWeight: 700 }}>yesterday</span>、<span style={{ color: orange, fontWeight: 700 }}>last night</span>、<span style={{ color: orange, fontWeight: 700 }}>three years ago</span> 等，問句與答句必須使用過去式。
            </li>
            <li style={{ marginBottom: 12 }}>
              <strong>助動詞後方動詞還原：</strong><br />
              過去式疑問句或否定句使用 <span style={{ color: 'var(--osd-accent)', fontWeight: 700 }}>did / didn't</span> 時，後方一般動詞一定要使用<strong>原形動詞</strong>（例如：Did you <u>plant</u>...?）。
            </li>
            <li>
              <strong>不規則動詞過去式背誦：</strong><br />
              <code>draw → drew</code>、<code>go → went</code>、<code>buy → bought</code>，這些不規則變化是段考高機率考點！
            </li>
          </ul>
        </Panel>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Panel title="📝 課堂解題好習慣">
          <ul style={{ margin: 0, paddingLeft: 24, fontSize: 22, lineHeight: 1.6, color: '#334155' }}>
            <li style={{ marginBottom: 12 }}>
              <strong>看圖題注意細節：</strong><br />
              答題前先看清楚圖中的主詞（男生用 he，女生用 she）、動作、地點與背景招牌。
            </li>
            <li style={{ marginBottom: 12 }}>
              <strong>注意問句時態：</strong><br />
              如果問句是用現在式 be 動詞（如 <i>Where is Jenny?</i>），答句就用現在式（<i>She is...</i>），不要看到圖就自動寫成過去式喔！
            </li>
          </ul>
        </Panel>
        
        <div
          className="es-fadeUp"
          style={{
            background: '#ecfdf5',
            border: '2px dashed #10b981',
            borderRadius: 12,
            padding: '24px 32px',
            animationDelay: '0.2s',
          }}
        >
          <h4 style={{ margin: '0 0 10px 0', fontSize: 22, color: '#065f46', fontWeight: 800 }}>💪 段考衝刺小語</h4>
          <p style={{ margin: 0, fontSize: 20, color: '#047857', lineHeight: 1.5 }}>
            英文習作的題目往往是段考出題的基本盤，把基礎單字與時態的變化熟記，考試時細心審題，一定能拿到好成績！加油！
          </p>
        </div>
      </div>
    </div>
    <TextbookFooter subtitle="國中英語文法講堂 • 祝大家考試順利" />
  </div>
);

// 投影片中繼資料
export const meta: SlideMeta = {
  title: 'Grade 7 第三次段考英文複習(U5-6)',
  createdAt: '2026-06-22T00:59:54.386Z',
  theme: 'warm-textbook',
};

// 導出所有頁面
export default [
  Cover,
  SectionDivider1,
  Q1_Q, Q1_A,
  Q2_Q, Q2_A,
  Q3_Q, Q3_A,
  Q4_Q, Q4_A,
  Q5_Q, Q5_A,
  SectionDivider2,
  Q6_Q, Q6_A,
  Q7_Q, Q7_A,
  Q8_Q, Q8_A,
  Q9_Q, Q9_A,
  Q10_Q, Q10_A,
  Q11_Q, Q11_A,
  SectionDivider3,
  QExample_Q, QExample_A,
  Q12_Q, Q12_A,
  Q13_Q, Q13_A,
  SectionDivider4,
  Q14_Q, Q14_A,
  Q15_Q, Q15_A,
  Q16_Q, Q16_A,
  Q17_Q, Q17_A,
  Summary,
] satisfies Page[];
