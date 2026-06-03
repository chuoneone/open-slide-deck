import React from 'react';
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';

// ─── Panel-tweakable design tokens ────────────────────────────────────────────
export const design: DesignSystem = {
  palette: {
    bg: '#14251c',      // 深黑綠色黑板底色
    text: '#f4f6f0',    // 粉筆白色
    accent: '#ffd043',  // 粉筆黃色
  },
  fonts: {
    display: '"Comic Sans MS", "Balsamiq Sans", "DFKai-SB", "BiauKai", system-ui, sans-serif',
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Microsoft JhengHei", sans-serif',
  },
  typeScale: {
    hero: 140,
    body: 36,
  },
  radius: 12,
};

// ─── Local Style Constants ────────────────────────────────────────────────────
const chalkMuted = '#9bb0a2';
const chalkBlue = '#64b5f6';
const chalkRed = '#e57373';
const chalkOrange = '#ffb74d';
const chalkGreen = '#81c784';
const chalkYellow = '#ffd043';

const styles = `
  @keyframes chalk-fade {
    from { opacity: 0; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes chalk-draw-line {
    from { stroke-dasharray: 1000; stroke-dashoffset: 1000; }
    to { stroke-dasharray: 1000; stroke-dashoffset: 0; }
  }
  @keyframes chalk-grow-bar {
    from { transform: scaleY(0); }
    to { transform: scaleY(1); }
  }
  @keyframes chalk-draw-dash {
    from { stroke-dashoffset: 40; }
    to { stroke-dashoffset: 0; }
  }
  .chalk-fade {
    opacity: 0;
    animation: chalk-fade 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
  }
  .chalk-draw-line {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: chalk-draw-line 2.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  .chalk-grow-bar {
    transform-origin: bottom;
    animation: chalk-grow-bar 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.1) forwards;
  }
  .chalk-dash-flow {
    stroke-dasharray: 8, 4;
    animation: chalk-draw-dash 2s linear infinite;
  }
`;

const Styles = () => <style>{styles}</style>;

// ─── Shared Layout Components ──────────────────────────────────────────────────
const BlackboardBg = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      background: 'var(--osd-bg)',
      boxSizing: 'border-box',
      border: '28px solid #5a3a22', // 木製黑板框
      boxShadow: 'inset 0 0 50px rgba(0,0,0,0.85), 0 12px 36px rgba(0,0,0,0.6)',
      overflow: 'hidden',
    }}
  >
    {/* 木製框內側陰影與反光 */}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        border: '3px solid rgba(0, 0, 0, 0.4)',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
    
    {/* 數學課堂網格線 */}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(244, 246, 240, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(244, 246, 240, 0.04) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        pointerEvents: 'none',
      }}
    />
    
    {/* 粉筆灰與板擦留下的白粉痕跡 */}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.18,
        backgroundImage: `
          radial-gradient(circle at 15% 25%, rgba(255, 255, 255, 0.6) 0%, transparent 40%),
          radial-gradient(circle at 85% 75%, rgba(255, 255, 255, 0.5) 0%, transparent 45%),
          radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.3) 0%, transparent 60%)
        `,
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }}
    />
  </div>
);

const ChalkHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div style={{ position: 'relative', zIndex: 2, marginBottom: 40 }}>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 20 }}>
      <span
        style={{
          fontFamily: 'var(--osd-font-body)',
          fontSize: 22,
          color: chalkMuted,
          letterSpacing: '0.15em',
          fontWeight: 600,
        }}
      >
        UNIT 6 · 統計資料處理
      </span>
      {subtitle && (
        <span
          style={{
            fontFamily: 'var(--osd-font-body)',
            fontSize: 22,
            color: chalkBlue,
            fontWeight: 500,
          }}
        >
          {` | ${subtitle}`}
        </span>
      )}
    </div>
    <h2
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 72,
        fontWeight: 800,
        color: 'var(--osd-text)',
        margin: '12px 0 0 0',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        letterSpacing: '0.02em',
      }}
    >
      {title}
    </h2>
    <div
      style={{
        height: 4,
        background: `linear-gradient(90deg, ${chalkMuted}77, transparent)`,
        marginTop: 16,
        borderRadius: 2,
      }}
    />
  </div>
);

const ChalkFooter = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 100,
        right: 100,
        bottom: 60,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'var(--osd-font-body)',
        fontSize: 22,
        color: chalkMuted,
        borderTop: '2px dashed rgba(244, 246, 240, 0.15)',
        paddingTop: 16,
        zIndex: 2,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: chalkGreen }} />
        <span>國一數學下學期：統計圖表</span>
      </div>
      <div style={{ fontFamily: 'monospace', letterSpacing: '0.1em' }}>
        PAGE <span style={{ color: 'var(--osd-accent)', fontWeight: 'bold' }}>{String(current).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
      </div>
    </div>
  );
};

const Card = ({
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
    className="chalk-fade"
    style={{
      background: 'rgba(255, 255, 255, 0.03)',
      border: '2px solid rgba(244, 246, 240, 0.2)',
      borderRadius: 'var(--osd-radius)',
      padding: '36px 44px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      animationDelay: `${delay}s`,
      backdropFilter: 'blur(5px)',
      ...style,
    }}
  >
    {title && (
      <h3
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 38,
          color: 'var(--osd-accent)',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <span style={{ color: chalkBlue }}>✦</span> {title}
      </h3>
    )}
    <div style={{ fontSize: 32, lineHeight: 1.6, color: 'var(--osd-text)' }}>
      {children}
    </div>
  </div>
);

// ─── Slide 1: Cover ──────────────────────────────────────────────────────────
const Cover: Page = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      padding: '140px 140px',
      fontFamily: 'var(--osd-font-body)',
      boxSizing: 'border-box',
    }}
  >
    <Styles />
    <BlackboardBg />
    
    <div
      style={{
        position: 'relative',
        zIndex: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div className="chalk-fade" style={{ animationDelay: '0.1s' }}>
        <span
          style={{
            fontFamily: 'var(--osd-font-body)',
            fontSize: 26,
            color: 'var(--osd-accent)',
            letterSpacing: '0.2em',
            border: '2px solid var(--osd-accent)',
            padding: '8px 24px',
            borderRadius: 8,
          }}
        >
          國一下學期數學課堂
        </span>
      </div>

      <div style={{ margin: '60px 0' }}>
        <h1
          className="chalk-fade"
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 'var(--osd-size-hero)',
            lineHeight: 1.1,
            fontWeight: 900,
            margin: 0,
            color: 'var(--osd-text)',
            animationDelay: '0.3s',
            textShadow: '3px 3px 6px rgba(0,0,0,0.4)',
          }}
        >
          探索數據的世界：
          <br />
          <span style={{ color: chalkBlue }}>統計圖表</span>
          <span style={{ color: chalkMuted, fontSize: 80, marginLeft: 20 }}>教學簡報</span>
        </h1>
        <p
          className="chalk-fade"
          style={{
            marginTop: 36,
            fontSize: 'var(--osd-size-body)',
            color: chalkMuted,
            maxWidth: 1200,
            lineHeight: 1.5,
            animationDelay: '0.5s',
          }}
        >
          手把手教你如何繪製「長條圖」、「折線圖」，以及看懂圖表背後隱藏的秘密！
        </p>
      </div>

      {/* 封面粉筆手繪風插圖 */}
      <div
        className="chalk-fade"
        style={{
          position: 'absolute',
          right: 40,
          bottom: 120,
          width: 320,
          height: 240,
          zIndex: -1,
          animationDelay: '0.7s',
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 320 240" fill="none">
          {/* 長條圖草稿 */}
          <rect x="20" y="140" width="30" height="60" rx="4" stroke={chalkRed} strokeWidth="3" strokeDasharray="6 3" />
          <rect x="70" y="100" width="30" height="100" rx="4" stroke={chalkOrange} strokeWidth="3" strokeDasharray="6 3" />
          <rect x="120" y="60" width="30" height="140" rx="4" stroke={chalkBlue} strokeWidth="3" strokeDasharray="6 3" />
          
          {/* 折線圖草稿 */}
          <path d="M 180 180 L 220 120 L 260 140 L 300 50" stroke={chalkYellow} strokeWidth="4" strokeLinecap="round" strokeDasharray="6 4" />
          <circle cx="180" cy="180" r="6" fill={chalkYellow} />
          <circle cx="220" cy="120" r="6" fill={chalkYellow} />
          <circle cx="260" cy="140" r="6" fill={chalkYellow} />
          <circle cx="300" cy="50" r="6" fill={chalkYellow} />
          
          {/* 坐標軸 */}
          <path d="M 10 200 L 310 200" stroke="white" strokeWidth="3" strokeLinecap="round" />
          <path d="M 10 20 L 10 200" stroke="white" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      <div
        className="chalk-fade"
        style={{
          animationDelay: '0.8s',
          display: 'flex',
          gap: 60,
          fontFamily: 'monospace',
          fontSize: 22,
          color: chalkMuted,
        }}
      >
        <span>
          <span style={{ color: chalkBlue }}>★</span> 長條圖比較數量
        </span>
        <span>
          <span style={{ color: chalkYellow }}>★</span> 折線圖看趨勢
        </span>
        <span>
          <span style={{ color: chalkGreen }}>★</span> 統計解讀真好玩
        </span>
      </div>
    </div>
  </div>
);

// ─── Slide 2: 情境導入 ────────────────────────────────────────────────────────
const Introduction: Page = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      padding: '100px 100px 140px 100px',
      fontFamily: 'var(--osd-font-body)',
      boxSizing: 'border-box',
    }}
  >
    <BlackboardBg />
    <div style={{ position: 'relative', zIndex: 2 }}>
      <ChalkHeader title="生活中的數據，如何看清？" subtitle="情境導入" />
      
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 48,
          marginTop: 40,
        }}
      >
        {/* 左側：雜亂的表格數據 */}
        <Card title="情境一：雜亂的原始數據" delay={0.2}>
          <p style={{ margin: '0 0 16px 0', fontSize: 26, color: chalkMuted }}>
            小華記錄了班上 20 位同學最喜歡的球類運動：
          </p>
          <div
            style={{
              fontFamily: 'var(--osd-font-body)',
              background: 'rgba(0,0,0,0.15)',
              border: '2px dashed rgba(244,246,240,0.15)',
              padding: '16px 24px',
              borderRadius: 8,
              fontSize: 24,
              lineHeight: 1.7,
              color: chalkMuted,
            }}
          >
            籃球、排球、羽球、籃球、桌球、籃球、羽球、排球、籃球、桌球、羽球、籃球、排球、羽球、桌球、籃球、桌球、排球、籃球、桌球。
          </div>
          <p style={{ margin: '20px 0 0 0', fontSize: 26, color: chalkRed, fontWeight: 'bold' }}>
            思考：你能一眼看出哪種運動最受歡迎嗎？需要花時間數一數，對吧？
          </p>
        </Card>

        {/* 右側：一目了然的圖表優勢 */}
        <Card title="情境二：整理後的統計圖表" delay={0.4}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p style={{ margin: 0, fontSize: 26, color: chalkMuted }}>
              如果我們把數據統計好，畫成統計圖表：
            </p>
            {/* 簡易手繪風微型長條圖 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-around',
                height: 160,
                borderBottom: '2px solid white',
                borderLeft: '2px solid white',
                padding: '10px 20px',
                margin: '10px 0',
              }}
            >
              {[
                { name: '籃球', val: 7, color: chalkRed },
                { name: '排球', val: 4, color: chalkOrange },
                { name: '羽球', val: 4, color: chalkBlue },
                { name: '桌球', val: 5, color: chalkGreen },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: 60,
                  }}
                >
                  <div style={{ fontSize: 18, color: item.color, marginBottom: 4 }}>{item.val}人</div>
                  <div
                    className="chalk-grow-bar"
                    style={{
                      width: 40,
                      height: item.val * 16,
                      background: `${item.color}bb`,
                      border: `2px solid ${item.color}`,
                      borderRadius: '4px 4px 0 0',
                      animationDelay: `${0.6 + idx * 0.1}s`,
                    }}
                  />
                  <div style={{ fontSize: 18, color: 'white', marginTop: 6 }}>{item.name}</div>
                </div>
              ))}
            </div>
            <p style={{ margin: 0, fontSize: 26, color: chalkGreen, fontWeight: 'bold' }}>
              這就是統計圖表的魔力！
            </p>
            <ul style={{ margin: 0, paddingLeft: 30, fontSize: 24, color: 'var(--osd-text)' }}>
              <li><strong>一目了然</strong>：不需重新計數，直接呈現數據大小。</li>
              <li><strong>便於比較</strong>：長條高低直接對比，高下一眼立判。</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
    <ChalkFooter />
  </div>
);

// ─── Slide 3: 認識長條圖 ──────────────────────────────────────────────────────
const BarChartIntro: Page = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      padding: '100px 100px 140px 100px',
      fontFamily: 'var(--osd-font-body)',
      boxSizing: 'border-box',
    }}
  >
    <BlackboardBg />
    <div style={{ position: 'relative', zIndex: 2 }}>
      <ChalkHeader title="什麼是長條圖 (Bar Chart)？" subtitle="認識長條圖" />
      
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 48,
          marginTop: 40,
        }}
      >
        {/* 左側長條圖模擬展示 */}
        <Card title="模擬統計：全班最愛水果" delay={0.2} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ position: 'relative', height: 350, margin: '20px 20px 40px 60px' }}>
            {/* Y軸刻度線與數字 */}
            {[0, 3, 6, 9, 12].map((val) => (
              <div
                key={val}
                style={{
                  position: 'absolute',
                  bottom: `${(val / 12) * 100}%`,
                  left: -45,
                  right: 0,
                  borderBottom: val === 0 ? '3px solid white' : '1px dashed rgba(244, 246, 240, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: 18, fontFamily: 'monospace', color: chalkMuted, marginRight: 10 }}>
                  {val}人
                </span>
              </div>
            ))}
            
            {/* X軸線 */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                borderBottom: '3px solid white',
              }}
            />
            
            {/* 長條與X軸標記 */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'flex-end',
              }}
            >
              {[
                { label: '西瓜🍉', value: 10, color: chalkRed, highlight: true },
                { label: '香蕉🍌', value: 6, color: chalkYellow },
                { label: '蘋果🍎', value: 8, color: chalkOrange },
                { label: '橘子🍊', value: 3, color: chalkBlue, min: true },
              ].map((bar, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: 100,
                    height: '100%',
                    justifyContent: 'flex-end',
                  }}
                >
                  {/* 最值提示標籤 */}
                  {bar.highlight && (
                    <div
                      className="chalk-fade"
                      style={{
                        animationDelay: '1.5s',
                        fontSize: 20,
                        color: chalkRed,
                        border: `1.5px solid ${chalkRed}`,
                        padding: '2px 8px',
                        borderRadius: 6,
                        marginBottom: 8,
                        transform: 'rotate(-5deg)',
                        fontWeight: 'bold',
                      }}
                    >
                      最多！
                    </div>
                  )}
                  {bar.min && (
                    <div
                      className="chalk-fade"
                      style={{
                        animationDelay: '1.5s',
                        fontSize: 20,
                        color: chalkBlue,
                        border: `1.5px solid ${chalkBlue}`,
                        padding: '2px 8px',
                        borderRadius: 6,
                        marginBottom: 8,
                        transform: 'rotate(5deg)',
                        fontWeight: 'bold',
                      }}
                    >
                      最少！
                    </div>
                  )}
                  
                  {/* 長條本體 */}
                  <div
                    className="chalk-grow-bar"
                    style={{
                      width: 70,
                      height: `${(bar.value / 12) * 100}%`,
                      background: `${bar.color}a0`,
                      border: `3px solid ${bar.color}`,
                      borderBottom: 'none',
                      borderRadius: '8px 8px 0 0',
                      animationDelay: `${0.4 + i * 0.15}s`,
                      position: 'relative',
                    }}
                  >
                    <div style={{ position: 'absolute', top: -36, left: 0, right: 0, textAlign: 'center', fontSize: 22, fontWeight: 'bold' }}>
                      {bar.value}
                    </div>
                  </div>
                  {/* X軸標籤 */}
                  <div style={{ fontSize: 22, marginTop: 12, color: 'white', whiteSpace: 'nowrap' }}>
                    {bar.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* 右側觀念說明 */}
        <Card title="長條圖核心特性" delay={0.4}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <span style={{ color: 'var(--osd-accent)', fontWeight: 'bold' }}>定義與特徵：</span>
              <ul style={{ margin: '8px 0 0 0', paddingLeft: 28, fontSize: 26 }}>
                <li>以<strong>長方形條形</strong>的高低（或長短）來表示數量的多少。</li>
                <li>橫軸表示<strong>類別項目</strong>（如：水果種類、性別、班級）。</li>
                <li>直軸表示<strong>資料數量/頻率</strong>。</li>
              </ul>
            </div>
            
            <div style={{ borderTop: '2px dashed rgba(244, 246, 240, 0.15)', paddingTop: 20 }}>
              <span style={{ color: chalkBlue, fontWeight: 'bold' }}>💡 怎麼解讀長條圖？</span>
              <ol style={{ margin: '8px 0 0 0', paddingLeft: 28, fontSize: 26 }}>
                <li><strong>找最大與最小</strong>：直接看最高與最低的柱子（西瓜最多，橘子最少）。</li>
                <li><strong>進行差值計算</strong>：例如「喜歡西瓜的人比香蕉多幾人？」可以用高低差來計算（10 - 6 = 4 人）。</li>
              </ol>
            </div>
          </div>
        </Card>
      </div>
    </div>
    <ChalkFooter />
  </div>
);

// ─── Slide 4: 如何繪製長條圖 ──────────────────────────────────────────────────
const BarChartSteps: Page = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      padding: '100px 100px 140px 100px',
      fontFamily: 'var(--osd-font-body)',
      boxSizing: 'border-box',
    }}
  >
    <BlackboardBg />
    <div style={{ position: 'relative', zIndex: 2 }}>
      <ChalkHeader title="如何正確地畫出長條圖？" subtitle="長條圖繪製步驟" />
      
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 48,
          marginTop: 40,
        }}
      >
        {/* 左側繪圖步驟 */}
        <Card title="繪製長條圖的三大步驟" delay={0.2}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ background: chalkRed, borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 'bold', flexShrink: 0 }}>1</div>
              <div>
                <strong style={{ color: chalkRed }}>劃出直軸與橫軸，並標上名稱與單位</strong>
                <p style={{ margin: '6px 0 0 0', fontSize: 24, color: chalkMuted }}>
                  先畫一條水平軸（橫軸）與一條鉛直軸（直軸），並在端點標示其代表的內容（如：人數、項目）。
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ background: chalkOrange, borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 'bold', flexShrink: 0 }}>2</div>
              <div>
                <strong style={{ color: chalkOrange }}>決定刻度間距，畫出等距刻度</strong>
                <p style={{ margin: '6px 0 0 0', fontSize: 24, color: chalkMuted }}>
                  直軸的數量刻度要非常平均（例如每一格代表2人或5人）。刻度不能忽大忽小！
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ background: chalkBlue, borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 'bold', flexShrink: 0 }}>3</div>
              <div>
                <strong style={{ color: chalkBlue }}>繪製「寬度相同」且「留有間隔」的長條</strong>
                <p style={{ margin: '6px 0 0 0', fontSize: 24, color: chalkMuted }}>
                  依照各組數據高度畫長方形。長條寬度必須一致，且長條與長條之間通常要分開（留有固定空隙）。
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* 右側細節注意 */}
        <Card title="⚠️ 國一學生最常犯的錯誤" delay={0.4}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div
              style={{
                border: `2.5px solid ${chalkRed}`,
                background: 'rgba(229, 115, 115, 0.08)',
                padding: '24px',
                borderRadius: 8,
              }}
            >
              <h4 style={{ margin: '0 0 10px 0', fontSize: 26, color: chalkRed }}>❌ 致命錯誤：長條寬度不一或黏在一起</h4>
              <p style={{ margin: 0, fontSize: 22, color: chalkMuted, lineHeight: 1.5 }}>
                畫長條圖時，寬度不一致會誤導視覺，且<strong>各別類別（如蘋果、香蕉）是獨立項目</strong>，長條與長條間必須留下間距（空隙），切勿將它們黏在一起畫（黏在一起的叫作「直方圖」，用於連續型分組數據，例如體重區間）。
              </p>
            </div>
            
            <div
              style={{
                border: `2.5px solid ${chalkYellow}`,
                background: 'rgba(255, 208, 67, 0.08)',
                padding: '24px',
                borderRadius: 8,
              }}
            >
              <h4 style={{ margin: '0 0 10px 0', fontSize: 26, color: chalkYellow }}>❌ 致命錯誤：直軸刻度間隔不均勻</h4>
              <p style={{ margin: 0, fontSize: 22, color: chalkMuted, lineHeight: 1.5 }}>
                部分同學會直接把題目出現的數值（如 3、8、15）由小到大直接寫在直軸刻度上，這是不對的！直軸的每一步長度必須代表相同的數量。
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
    <ChalkFooter />
  </div>
);

// ─── Slide 5: 認識折線圖 ──────────────────────────────────────────────────────
const LineChartIntro: Page = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      padding: '100px 100px 140px 100px',
      fontFamily: 'var(--osd-font-body)',
      boxSizing: 'border-box',
    }}
  >
    <BlackboardBg />
    <div style={{ position: 'relative', zIndex: 2 }}>
      <ChalkHeader title="什麼是折線圖 (Line Chart)？" subtitle="認識折線圖" />
      
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 48,
          marginTop: 40,
        }}
      >
        {/* 左側折線圖模擬展示 */}
        <Card title="趨勢觀測：一週氣溫變化" delay={0.2} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ position: 'relative', height: 350, margin: '20px 20px 40px 60px' }}>
            {/* Y軸刻度線與溫度 */}
            {[20, 22, 24, 26, 28, 30].map((val) => (
              <div
                key={val}
                style={{
                  position: 'absolute',
                  bottom: `${((val - 20) / 10) * 100}%`,
                  left: -50,
                  right: 0,
                  borderBottom: val === 20 ? '3px solid white' : '1px dashed rgba(244, 246, 240, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: 18, fontFamily: 'monospace', color: chalkMuted, marginRight: 10 }}>
                  {val}°C
                </span>
              </div>
            ))}
            
            {/* X軸線 */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                borderBottom: '3px solid white',
              }}
            />
            
            {/* 折線路徑 (用 SVG 畫) */}
            {/* 數據點座標對應: 
                週一 (0): 21°C -> 10%
                週二 (1): 24°C -> 40%
                週三 (2): 28°C -> 80% (Max)
                週四 (3): 23°C -> 30%
                週五 (4): 26°C -> 60%
            */}
            <svg
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                overflow: 'visible',
              }}
            >
              {/* 連線 */}
              <path
                className="chalk-draw-line"
                d="M 50 315 L 150 210 L 250 70 L 350 245 L 450 140"
                fill="none"
                stroke={chalkYellow}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* 趨勢提示符號 (手繪箭頭效果) */}
              {/* 週二到週三升溫 */}
              <path
                className="chalk-dash-flow"
                d="M 170 170 L 220 110"
                stroke={chalkRed}
                strokeWidth="3"
                fill="none"
              />
              <path d="M 220 110 L 210 112 M 220 110 L 218 120" stroke={chalkRed} strokeWidth="3" strokeLinecap="round" />
              
              {/* 週三到週四降溫 */}
              <path
                className="chalk-dash-flow"
                d="M 280 110 L 320 200"
                stroke={chalkBlue}
                strokeWidth="3"
                fill="none"
              />
              <path d="M 320 200 L 320 190 M 320 200 L 310 198" stroke={chalkBlue} strokeWidth="3" strokeLinecap="round" />
            </svg>
            
            {/* 圓點與標籤 */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'flex-end',
              }}
            >
              {[
                { label: '週一', val: 21, y: 315, color: 'white' },
                { label: '週二', val: 24, y: 210, color: 'white' },
                { label: '週三', val: 28, y: 70, color: chalkRed, highlight: true },
                { label: '週四', val: 23, y: 245, color: 'white' },
                { label: '週五', val: 26, y: 140, color: 'white' },
              ].map((pt, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: 80,
                    height: '100%',
                    justifyContent: 'flex-end',
                  }}
                >
                  {/* 小圓點 */}
                  <div
                    className="chalk-fade"
                    style={{
                      position: 'absolute',
                      bottom: 350 - pt.y - 8,
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      background: pt.color,
                      border: '3px solid #14251c',
                      boxShadow: '0 0 8px rgba(255,255,255,0.4)',
                      animationDelay: `${0.8 + i * 0.15}s`,
                    }}
                  />
                  {/* 溫度標記 */}
                  <div
                    className="chalk-fade"
                    style={{
                      position: 'absolute',
                      bottom: 350 - pt.y + 12,
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: pt.color,
                      animationDelay: `${0.8 + i * 0.15}s`,
                    }}
                  >
                    {pt.val}°C
                  </div>
                  
                  {/* X軸星期標籤 */}
                  <div style={{ fontSize: 22, marginTop: 12, color: 'white' }}>
                    {pt.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* 右側觀念說明 */}
        <Card title="折線圖核心特性" delay={0.4}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <span style={{ color: 'var(--osd-accent)', fontWeight: 'bold' }}>定義與特徵：</span>
              <ul style={{ margin: '8px 0 0 0', paddingLeft: 28, fontSize: 26 }}>
                <li>將各數據點在坐標平面上標出，並以<strong>折線段相連</strong>以表示變化趨勢。</li>
                <li>通常用於表示隨<strong>連續時間（如：年份、月份、星期）</strong>推移的數據。</li>
              </ul>
            </div>
            
            <div style={{ borderTop: '2px dashed rgba(244, 246, 240, 0.15)', paddingTop: 20 }}>
              <span style={{ color: chalkYellow, fontWeight: 'bold' }}>📈 怎麼看折線圖趨勢？</span>
              <ol style={{ margin: '8px 0 0 0', paddingLeft: 28, fontSize: 26 }}>
                <li><strong>線段向上傾斜 ↗</strong>：代表數量隨時間<strong>增加</strong>（如週一至週三，氣溫逐漸上升）。</li>
                <li><strong>線段向下傾斜 ↘</strong>：代表數量隨時間<strong>減少</strong>（如週三至週四，氣溫降溫）。</li>
                <li><strong>斜率（陡度）大小</strong>：線段越陡峭，代表變化速度越快！</li>
              </ol>
            </div>
          </div>
        </Card>
      </div>
    </div>
    <ChalkFooter />
  </div>
);

// ─── Slide 6: 如何繪製折線圖 ──────────────────────────────────────────────────
const LineChartSteps: Page = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      padding: '100px 100px 140px 100px',
      fontFamily: 'var(--osd-font-body)',
      boxSizing: 'border-box',
    }}
  >
    <BlackboardBg />
    <div style={{ position: 'relative', zIndex: 2 }}>
      <ChalkHeader title="如何正確地畫出折線圖？" subtitle="折線圖繪製步驟" />
      
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: 48,
          marginTop: 40,
        }}
      >
        {/* 左側步驟 */}
        <Card title="繪製折線圖的三大步驟" delay={0.2}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ background: chalkRed, borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 'bold', flexShrink: 0 }}>1</div>
              <div>
                <strong style={{ color: chalkRed }}>畫軸與標示刻度</strong>
                <p style={{ margin: '6px 0 0 0', fontSize: 24, color: chalkMuted }}>
                  橫軸為時間或連續序號，直軸代表數值。兩軸的刻度間距必須是<strong>均勻且固定的</strong>。
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ background: chalkOrange, borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 'bold', flexShrink: 0 }}>2</div>
              <div>
                <strong style={{ color: chalkOrange }}>對準坐標，精確標記「資料點」</strong>
                <p style={{ margin: '6px 0 0 0', fontSize: 24, color: chalkMuted }}>
                  對照橫軸項目與直軸數值，在交界處點上圓點，此圓點代表那一組資料點。
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ background: chalkBlue, borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 'bold', flexShrink: 0 }}>3</div>
              <div>
                <strong style={{ color: chalkBlue }}>以「直線段」依時間序連接相鄰點</strong>
                <p style={{ margin: '6px 0 0 0', fontSize: 24, color: chalkMuted }}>
                  用直尺將相鄰兩個點用直線段相連。<strong>注意：不可以隨手畫成曲線，也不能跳過順序連接！</strong>
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* 右側細節注意 */}
        <Card title="⚠️ 繪圖魔鬼細節提醒" delay={0.4}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div
              style={{
                border: `2.5px solid ${chalkYellow}`,
                background: 'rgba(255, 208, 67, 0.08)',
                padding: '24px',
                borderRadius: 8,
              }}
            >
              <h4 style={{ margin: '0 0 10px 0', fontSize: 26, color: chalkYellow }}>💡 摺疊線（省略符號）的使用</h4>
              <p style={{ margin: 0, fontSize: 22, color: chalkMuted, lineHeight: 1.5 }}>
                當數據都集中在較高區間時（例如體重在 45kg ~ 60kg 之間），如果從 0 開始標記，圖表的起伏會擠在上方很不清晰。這時可以使用雙折線波浪號<strong>「摺疊符號 (≈)」</strong>來省略 0 到 45 之間的數值，讓圖表波動更明顯！
              </p>
            </div>
            
            <div
              style={{
                border: `2.5px solid ${chalkBlue}`,
                background: 'rgba(100, 181, 246, 0.08)',
                padding: '24px',
                borderRadius: 8,
              }}
            >
              <h4 style={{ margin: '0 0 10px 0', fontSize: 26, color: chalkBlue }}>📌 折線一定要是由左至右</h4>
              <p style={{ margin: 0, fontSize: 22, color: chalkMuted, lineHeight: 1.5 }}>
                折線圖的順序有嚴格的時間或時間次序邏輯，例如週一到週二、週二到週三。千萬不可以把週一的點和週三的點直接相連，否則就失去觀察中途變化的意義了。
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
    <ChalkFooter />
  </div>
);

// ─── Slide 7: 長條圖 vs 折線圖 ────────────────────────────────────────────────
const Comparison: Page = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      padding: '100px 100px 140px 100px',
      fontFamily: 'var(--osd-font-body)',
      boxSizing: 'border-box',
    }}
  >
    <BlackboardBg />
    <div style={{ position: 'relative', zIndex: 2 }}>
      <ChalkHeader title="長條圖與折線圖，我該用誰？" subtitle="統計圖表對比" />
      
      <div style={{ marginTop: 40 }} className="chalk-fade">
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 26,
            lineHeight: 1.5,
            textAlign: 'left',
          }}
        >
          <thead>
            <tr style={{ borderBottom: '3px solid white', color: 'var(--osd-accent)', fontFamily: 'var(--osd-font-display)' }}>
              <th style={{ padding: '20px 24px', width: '20%' }}>比較項目</th>
              <th style={{ padding: '20px 24px', width: '40%' }}>長條圖 (Bar Chart)</th>
              <th style={{ padding: '20px 24px', width: '40%' }}>折線圖 (Line Chart)</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px dashed rgba(244, 246, 240, 0.2)' }}>
              <td style={{ padding: '24px', fontWeight: 'bold', color: chalkBlue }}>核心目的</td>
              <td style={{ padding: '24px', color: '#fff' }}>比較各類別「數量的大小或多少」。</td>
              <td style={{ padding: '24px', color: '#fff' }}>觀察數據「隨時間變化的起伏與趨勢」。</td>
            </tr>
            <tr style={{ borderBottom: '1px dashed rgba(244, 246, 240, 0.2)' }}>
              <td style={{ padding: '24px', fontWeight: 'bold', color: chalkBlue }}>適合的資料</td>
              <td style={{ padding: '24px', color: '#fff' }}>
                <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.06)', padding: '4px 12px', borderRadius: 6, marginRight: 8 }}>獨立非連續項目</span>
                <br />
                <span style={{ fontSize: 22, color: chalkMuted }}>例如：最愛運動、班級得獎次數、水果銷量</span>
              </td>
              <td style={{ padding: '24px', color: '#fff' }}>
                <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.06)', padding: '4px 12px', borderRadius: 6, marginRight: 8 }}>連續性的時間資料</span>
                <br />
                <span style={{ fontSize: 22, color: chalkMuted }}>例如：每日氣溫、每月身高體重、股價指數</span>
              </td>
            </tr>
            <tr style={{ borderBottom: '2px solid white' }}>
              <td style={{ padding: '24px', fontWeight: 'bold', color: chalkBlue }}>閱讀重點</td>
              <td style={{ padding: '24px', color: chalkOrange }}>
                <strong>柱子的長短/高低</strong>
                <br />
                <span style={{ fontSize: 22, color: chalkMuted }}>誰最高、誰最低？各相差多少？</span>
              </td>
              <td style={{ padding: '24px', color: chalkYellow }}>
                <strong>線段的起伏（上升/下降）</strong>
                <br />
                <span style={{ fontSize: 22, color: chalkMuted }}>是增加還是減少？成長速度是變快還變慢？</span>
              </td>
            </tr>
          </tbody>
        </table>
        
        {/* 口訣 */}
        <div
          style={{
            background: 'rgba(255, 208, 67, 0.08)',
            border: `2px dashed ${chalkYellow}`,
            padding: '24px 32px',
            borderRadius: 12,
            marginTop: 36,
            display: 'flex',
            alignItems: 'center',
            gap: 20,
          }}
        >
          <span style={{ fontSize: 44, color: chalkYellow }}>💡</span>
          <div>
            <strong style={{ fontSize: 28, color: chalkYellow }}>記住口訣：比較大小看長條，觀察趨勢用折線！</strong>
            <p style={{ margin: '4px 0 0 0', fontSize: 22, color: chalkMuted }}>
              做題或遇到生活數據時，先想想看資料中是不是包含「時間先後」的關聯。如果是，通常折線圖是更好的選擇。
            </p>
          </div>
        </div>
      </div>
    </div>
    <ChalkFooter />
  </div>
);

// ─── Slide 8: 課堂小挑戰 ──────────────────────────────────────────────────────
const QuizChallenge: Page = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      padding: '100px 100px 140px 100px',
      fontFamily: 'var(--osd-font-body)',
      boxSizing: 'border-box',
    }}
  >
    <BlackboardBg />
    <div style={{ position: 'relative', zIndex: 2 }}>
      <ChalkHeader title="課堂腦力大考驗！" subtitle="隨堂挑戰" />
      
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 48,
          marginTop: 40,
        }}
      >
        {/* 左側題目說明 */}
        <Card title="問題情境題" delay={0.2}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <p style={{ margin: 0, fontSize: 28, lineHeight: 1.5 }}>
              小明想要統計國一數學下學期「<strong>每個月小考數學成績的變化與進退步</strong>」，他希望可以一眼看出自己這學期是「在進步中」還是「在退步中」。
            </p>
            
            <p style={{ margin: '10px 0 0 0', fontSize: 28, color: chalkYellow, fontWeight: 'bold' }}>
              ❓ 請問小明應該選用哪一種統計圖表最為合適？
            </p>
            
            <div style={{ display: 'flex', gap: 24, marginTop: 10 }}>
              <div
                style={{
                  flex: 1,
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '2px solid rgba(244, 246, 240, 0.2)',
                  padding: '20px',
                  borderRadius: 10,
                  textAlign: 'center',
                  cursor: 'pointer',
                  fontSize: 26,
                  fontWeight: 'bold',
                }}
              >
                選項 (A)<br />
                <span style={{ color: chalkRed, fontSize: 32 }}>長條圖</span>
              </div>
              <div
                style={{
                  flex: 1,
                  background: 'rgba(255, 208, 67, 0.1)',
                  border: `2px solid ${chalkYellow}`,
                  padding: '20px',
                  borderRadius: 10,
                  textAlign: 'center',
                  cursor: 'pointer',
                  fontSize: 26,
                  fontWeight: 'bold',
                }}
              >
                選項 (B)<br />
                <span style={{ color: chalkGreen, fontSize: 32 }}>折線圖</span>
              </div>
            </div>
          </div>
        </Card>

        {/* 右側解答與說明 */}
        <Card title="🎓 解答與觀念剖析" delay={0.4}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
              <span style={{ background: chalkGreen, color: '#14251c', padding: '4px 16px', borderRadius: 8, fontSize: 28, fontWeight: 'bold' }}>
                答案是 B
              </span>
              <span style={{ fontSize: 28, color: chalkGreen, fontWeight: 'bold' }}>折線圖！</span>
            </div>
            
            <div style={{ borderTop: '2px dashed rgba(244, 246, 240, 0.15)', paddingTop: 16 }}>
              <span style={{ color: 'var(--osd-accent)', fontWeight: 'bold' }}>為什麼？</span>
              <ul style={{ margin: '8px 0 0 0', paddingLeft: 28, fontSize: 24, color: chalkMuted, lineHeight: 1.6 }}>
                <li>因為題目強調的是「<strong>每個月</strong>小考成績的<strong>變化與進退步</strong>」。</li>
                <li>「月份」代表的是連續的時間推移。</li>
                <li>藉由折線圖線段的「往上走 ↗」（進步）或「往下走 ↘」（退步），能最直觀反映出起伏，這正是<strong>折線圖的核心專長</strong>！</li>
              </ul>
            </div>
            
            <p style={{ margin: 0, fontSize: 22, color: chalkMuted, fontStyle: 'italic' }}>
              小提醒：如果選長條圖(A)，雖然也可以看出各月成績高低，但比較難連貫性地感受「上升或下降」的連續波折。
            </p>
          </div>
        </Card>
      </div>
    </div>
    <ChalkFooter />
  </div>
);

// ─── Slide Metadata & Exports ──────────────────────────────────────────────────
export const meta: SlideMeta = {
  title: '國一下數學：統計圖表教學',
  createdAt: '2026-06-03T07:00:13.645Z',
};

export default [
  Cover,
  Introduction,
  BarChartIntro,
  BarChartSteps,
  LineChartIntro,
  LineChartSteps,
  Comparison,
  QuizChallenge,
] satisfies Page[];
