import { useEffect, useRef, useState } from 'react';
import {
  Layers,
  PencilRuler,
  Shirt,
  Droplet,
  Grid3x3,
  TrendingUp,
  Calendar,
  Briefcase,
  Users,
  Eye,
  Footprints,
  Wrench,
} from 'lucide-react';
import FadeIn from '../components/FadeIn';
import TrueFocus from '../components/TrueFocus/TrueFocus';

interface SkillItem {
  name: string;
  level: number; // 0-100
  Icon: typeof Layers;
}

interface SkillGroup {
  title: string;
  skills: SkillItem[];
}

const groups: SkillGroup[] = [
  {
    title: '设计能力',
    skills: [
      { name: 'AI 全链路设计赋能', level: 95, Icon: Layers },
      { name: '手绘草图与效果图', level: 90, Icon: PencilRuler },
      { name: 'CMF设计与材料选型', level: 90, Icon: Shirt },
      { name: '楦型与结构开发', level: 85, Icon: Droplet },
    ],
  },
  {
    title: '产品管理',
    skills: [
      { name: '季度产品企划', level: 92, Icon: Grid3x3 },
      { name: '产品线矩阵规划', level: 92, Icon: TrendingUp },
      { name: '定价策略与成本管控', level: 85, Icon: Calendar },
      { name: '跨部门协作管理', level: 90, Icon: Briefcase },
    ],
  },
  {
    title: '行业认知',
    skills: [
      { name: '儿童足部发育规律', level: 95, Icon: Footprints },
      { name: '运动生物力学基础', level: 88, Icon: Eye },
      { name: '竞品趋势分析', level: 92, Icon: Users },
      { name: '供应链与生产工艺', level: 85, Icon: Wrench },
    ],
  },
];

function ProgressBar({ level }: { level: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setWidth(level), 120);
    return () => clearTimeout(t);
  }, [inView, level]);

  return (
    <div ref={ref} className="relative h-[3px] w-full rounded-full overflow-hidden bg-white/10">
      <div
        className="absolute left-0 top-0 h-full rounded-full transition-[width] duration-[1400ms]"
        style={{
          width: `${width}%`,
          background: 'linear-gradient(90deg, #18011F 0%, #B600A8 45%, #7621B0 80%, #BE4C00 100%)',
        }}
      />
    </div>
  );
}

function SkillCard({ skill, index }: { skill: SkillItem; index: number }) {
  const { Icon } = skill;
  return (
    <FadeIn delay={index * 0.08} y={20} duration={0.7}>
      <div
        className="h-full min-h-[150px] rounded-2xl px-5 py-5 sm:px-6 sm:py-6 flex flex-col gap-3"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)',
          boxShadow: '0 30px 60px -20px rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      >
        {/* Top: icon + title */}
        <div className="flex items-start gap-3">
          <div
            className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background:
                'linear-gradient(135deg, rgba(118,33,176,0.25) 0%, rgba(11,13,16,0) 100%)',
              boxShadow: 'inset 0 0 0 1px rgba(215,226,234,0.08)',
            }}
          >
            <Icon size={18} strokeWidth={1.6} className="text-[#D7E2EA]/80" />
          </div>
          <h4 className="text-[#D7E2EA] font-medium text-[0.95rem] sm:text-base leading-snug min-h-[2.6em]">
            {skill.name}
          </h4>
        </div>
        {/* Bottom: progress + percent (pushed to bottom by flex) */}
        <div className="mt-auto flex flex-col gap-2">
          <ProgressBar level={skill.level} />
          <span className="text-[11px] tracking-[0.2em] uppercase text-[#D7E2EA]/40 font-light">
            {skill.level}%
          </span>
        </div>
      </div>
    </FadeIn>
  );
}

function SkillColumn({ group, columnIndex }: { group: SkillGroup; columnIndex: number }) {
  return (
    <FadeIn delay={columnIndex * 0.1} y={30} duration={0.8}>
      <h3
        className="hero-heading uppercase tracking-tight mb-6 sm:mb-8 pt-2"
        style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2.1rem)', lineHeight: '1.3' }}
      >
        {group.title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 auto-rows-fr">
        {group.skills.map((s, i) => (
          <SkillCard key={s.name} skill={s} index={i} />
        ))}
      </div>
    </FadeIn>
  );
}

export default function StrengthsSection() {
  return (
    <section
      id="strengths"
      className="relative bg-[#0C0C0C] px-5 sm:px-8 md:px-12 py-20 sm:py-24 md:py-32"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header: title + subtitle, left aligned like the resume card */}
        <FadeIn delay={0} y={30} duration={0.8}>
          <div className="mb-12 sm:mb-16 md:mb-20 max-w-[820px]">
            <TrueFocus
              sentence="个人 优势"
              manualMode={false}
              blurAmount={5}
              borderColor="#BBCCD7"
              glowColor="rgba(182, 0, 168, 0.55)"
              animationDuration={0.8}
              pauseBetweenAnimations={0.8}
            />
            <p className="text-[#D7E2EA]/70 font-light leading-[1.9] tracking-wide text-sm sm:text-base md:text-[1.05rem] mt-8 sm:mt-10">
              从设计执行到产品策略，从儿童运动科学到供应链管理，多维度能力矩阵支撑完整的产品落地。
            </p>
          </div>
        </FadeIn>

        {/* Three columns: Design / Product / Industry */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
          {groups.map((g, i) => (
            <SkillColumn key={g.title} group={g} columnIndex={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
