import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';
import Lanyard from '../components/Lanyard/Lanyard';

const bio =
  '10 年深耕儿童运动鞋行业，历经安踏儿童、中乔体育两大头部品牌。擅长打造长线 IP 爆款、搭建分层产品矩阵，以设计迭代盘活存量；精准布局户外、女子等增量赛道，打造第二增长曲线。具备用户洞察、品类战略、产品结构升级、团队梯度搭建及数字化落地等综合能力，实现设计创意与业绩双向赋能。';

// 简历风格两列数据。label 用粗体,value 用常规字重。
const fields: { label: string; value: string }[] = [
  { label: '电话', value: '15705929864' },
  { label: '邮箱', value: '452857901@qq.com' },
  { label: '现居', value: '厦门' },
  { label: '年龄', value: '32' },
  { label: '教育', value: '福州大学厦门工艺美术学院 | 鞋靴箱包 | 本科' },
  { label: '求职意向', value: '设计管理岗' },
];

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-3 sm:gap-4 text-[#D7E2EA] text-[0.95rem] sm:text-base">
      <span className="font-bold shrink-0 w-[5rem] sm:w-[5.5rem] whitespace-nowrap">{label}:</span>
      <span className="font-light text-[#D7E2EA]/85 break-words">{value}</span>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-12 py-20 overflow-hidden"
    >
      {/* Decorative Images - Top Right: Sneaker */}
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] pointer-events-none select-none"
      >
        <img
          src="/sneaker.jpg"
          alt="Sneaker"
          className="w-[120px] sm:w-[160px] md:w-[210px]"
          draggable={false}
        />
      </FadeIn>

      {/* Decorative Images - Bottom Right: 3D Group */}
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] pointer-events-none select-none"
      >
        <img
          src="/group134.png"
          alt="3D Group"
          className="w-[130px] sm:w-[170px] md:w-[220px]"
          draggable={false}
        />
      </FadeIn>

      {/* Heading — Passion One 900, gradient text */}
      <FadeIn delay={0} y={40}>
        <h2
          className="uppercase tracking-tight leading-none text-center"
          style={{
            fontFamily: "'Passion One', 'Kanit', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(3rem, 12vw, 160px)',
            background: 'linear-gradient(180deg, #646973 0%, #BBCCD7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 0.9,
          }}
        >
          ABOUT ME
        </h2>
      </FadeIn>

      {/* 3D Lanyard card — moved to top-left corner */}
      <FadeIn
        delay={0.05}
        y={30}
        duration={0.9}
        className="absolute top-[16%] left-[1%] sm:left-[2%] md:left-[4%] z-0 pointer-events-none"
      >
        <div
          className="relative w-[180px] sm:w-[220px] md:w-[260px]"
          style={{ height: 'clamp(360px, 55vh, 560px)' }}
        >
          <div
            aria-hidden
            className="absolute inset-0 -z-10 rounded-3xl"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(68,110,255,0.18) 0%, rgba(12,12,12,0) 65%)',
            }}
          />
          <Lanyard
            position={[0, 0, 18]}
            gravity={[0, -40, 0]}
            fov={24}
            transparent
            lanyardWidth={1.2}
          />
        </div>
        <p className="mt-3 text-center text-[11px] tracking-[0.3em] uppercase text-white/40">
          Drag the card
        </p>
      </FadeIn>

      {/* Profile card — left-aligned content */}
      <FadeIn delay={0.1} y={30} duration={0.8} className="relative z-10 w-full max-w-[820px] mt-12">
        <div
          className="relative z-10 w-full rounded-2xl border-0 px-6 sm:px-10 md:px-14 py-8 sm:py-10 md:py-12 text-left"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)',
            boxShadow: '0 30px 60px -20px rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          {/* Name — Kanit 900 实色,确保中文字符完整显示 */}
          <h3
            className="uppercase tracking-tight mb-8 sm:mb-10 text-left"
            style={{
              fontFamily: "'Kanit', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2.6rem, 6.5vw, 4.6rem)',
              color: '#D7E2EA',
              lineHeight: 1.1,
            }}
          >
            王英洁
          </h3>

          {/* Two-column field grid (md+), single column on small screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 mb-3 text-left">
            {fields.slice(0, 4).map((f) => (
              <FieldRow key={f.label} label={f.label} value={f.value} />
            ))}
          </div>

          <div className="flex flex-col gap-3 mt-3 text-left">
            {fields.slice(4).map((f) => (
              <FieldRow key={f.label} label={f.label} value={f.value} />
            ))}
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent my-6 sm:my-8" />

          {/* Bio */}
          <div>
            <h4 className="text-[#D7E2EA] font-medium tracking-[0.4em] uppercase mb-4 sm:mb-5 text-xs sm:text-sm text-left">
              个人简介
            </h4>
            <p
              className="text-[#D7E2EA]/80 font-light leading-[1.9] tracking-wide text-sm sm:text-base md:text-[1.05rem] text-left"
              style={{ textIndent: '2em' }}
            >
              {bio}
            </p>
          </div>
        </div>
      </FadeIn>

      {/* Contact Button */}
      <FadeIn delay={0.2} y={20} duration={0.7} className="mt-12">
        <ContactButton />
      </FadeIn>

      {/* Decorative bottom-left moon */}
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[4%] left-[1%] sm:left-[2%] md:left-[4%] pointer-events-none select-none opacity-60"
      >
        <img
          src="/moon.png"
          alt="Moon"
          className="w-[100px] sm:w-[130px] md:w-[160px]"
          draggable={false}
        />
      </FadeIn>
    </section>
  );
}
