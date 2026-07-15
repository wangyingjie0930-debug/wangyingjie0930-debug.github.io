import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ChromaGrid, { handleCardGlow } from '../components/ChromaGrid';
import FadeIn from '../components/FadeIn';
import Antigravity from '../components/Antigravity';

type GalleryItem = {
  /** 图片路径 — null 表示占位,后续填充 */
  image?: string | null;
  /** 该长图的标题/阶段说明(可选) */
  caption?: string;
  /** 视频类型：video 表示嵌入视频 */
  type?: 'image' | 'video';
  /** 视频 src URL */
  videoSrc?: string;
  /** 视频封面 poster */
  videoPoster?: string;
  /** 视频标题/说明 */
  videoTitle?: string;
  /** 视频跳转链接(微信文章原文) */
  videoLink?: string;
};

type Project = {
  image: string;
  title: string;
  subtitle: string;
  handle: string;
  borderColor: string;
  gradient: string;
  url: string;
  /** 设计思路 / case study 概述 */
  brief: string;
  /** 项目标签 */
  tags: string[];
  /** 关键数据 */
  meta: { label: string; value: string }[];
  /** 设计思路长图画廊 — 6~7 张,先占坑后续填充 */
  gallery: GalleryItem[];
  /** 卡片内横向滚动图集(替换单张缩略图) */
  cardImages?: string[];
  /** 卡片内嵌入的视频 iframe URL */
  cardVideoUrl?: string;
  /** 视频在 cardImages 中的插入位置(插入到此索引处) */
  cardVideoIndex?: number;
};

/* ── 生成占位 gallery ── */
function placeholderGallery(captions: string[]): GalleryItem[] {
  return captions.map((c) => ({ image: null, caption: c, type: 'image' as const }));
}

/* ── 直接用图片链接填充 gallery(按用户提供的图片顺序) ── */
function imageGallery(images: string[]): GalleryItem[] {
  return images.map((src) => ({ image: src, type: 'image' as const }));
}

/* ── 创建视频 gallery item ── */
function videoItem(src: string, poster: string, title: string, link: string): GalleryItem {
  return { type: 'video', videoSrc: src, videoPoster: poster, videoTitle: title, videoLink: link };
}

const projects: Project[] = [
  {
    image: '/project-01.webp',
    title: '聚风系列跑鞋设计',
    subtitle: '核心IP',
    handle: '#01',
    borderColor: '#3B82F6',
    gradient: 'linear-gradient(145deg, #3B82F6, #000)',
    url: '#',
    brief:
      '聚风系列是乔丹儿童专业校园跑鞋 IP，历经 4.0 到 7.0 四代迭代，以"聚风"为核心理念，融合空气动力学、仿生结构与超临界发泡科技，打造兼具透气、回弹与足弓保护的高性能儿童跑鞋。',
    tags: ['聚风系列', '儿童跑鞋', 'IP 迭代'],
    meta: [
      { label: '系列', value: '聚风系列4.0-7.0' },
      { label: '品类', value: '儿童校园跑鞋' },
      { label: '品牌', value: '乔丹儿童' }
    ],
    gallery: [
      ...imageGallery([
        '/projects/jufeng/01.webp',
        '/projects/jufeng/02.webp',
        '/projects/jufeng/03.webp',
        '/projects/jufeng/04.webp',
        '/projects/jufeng/05.webp',
        '/projects/jufeng/06.webp',
        '/projects/jufeng/07.webp'
      ]),
      videoItem(
        '/projects/jufeng/video.mp4',
        '/projects/jufeng/video-poster.webp',
        '聚风系列宣传视频',
        ''
      ),
      ...imageGallery([
        '/projects/jufeng/08.webp',
        '/projects/jufeng/09.webp'
      ])
    ]
  },
  {
    image: '/project-02.webp',
    title: '旋风超跑概念跑鞋',
    subtitle: '跨界设计',
    handle: '#02',
    borderColor: '#8B5CF6',
    gradient: 'linear-gradient(180deg, #8B5CF6, #000)',
    url: '#',
    brief:
      '以 F1 赛事与超级跑车为灵感原点，将空气动力学、扰流板结构与碳纤维材质语言融入跑鞋设计，探索速度极限与功能美学的跨界融合。',
    tags: ['概念跑鞋', '超跑灵感', '跨界设计'],
    meta: [
      { label: '类型', value: '概念设计' },
      { label: '主题', value: '超跑 × 跑鞋' },
      { label: '状态', value: '设计稿' }
    ],
    gallery: [
      ...imageGallery([
        '/projects/supercar/01.webp',
        '/projects/supercar/02.webp',
        '/projects/supercar/03.webp',
        '/projects/supercar/04.webp',
        '/projects/supercar/05.webp',
        '/projects/supercar/06.webp',
        '/projects/supercar/07.webp'
      ]),
      videoItem(
        '/projects/supercar/video.mp4',
        '/projects/supercar/video-poster.webp',
        '旋风超跑概念视频',
        ''
      )
    ]
  },
  {
    image: '/project-03.webp',
    title: '沧龙 · 深海仿生概念',
    subtitle: '跨界灵感',
    handle: '#03',
    borderColor: '#10B981',
    gradient: 'linear-gradient(225deg, #10B981, #000)',
    url: '#',
    brief:
      '以白垩纪沧龙为灵感原点，将远古海洋霸主的流线身形、鳞甲纹理与捕食力量感转化为视觉语言，融合赛博机械与数字故障美学，构建跨越亿年的仿生概念设计体系。',
    tags: ['仿生设计', '灵感板', '跨界概念'],
    meta: [
      { label: '主题', value: '沧龙 × 深海' },
      { label: '类型', value: '概念灵感' },
      { label: '风格', value: 'Y2K / 生物朋克' }
    ],
    gallery: imageGallery([
      '/projects/canglong/01.webp',
      '/projects/canglong/02.webp',
      '/projects/canglong/03.webp',
      '/projects/canglong/04.webp',
      '/projects/canglong/05.webp',
      '/projects/canglong/06.webp',
      '/projects/canglong/07.webp'
    ])
  }
];

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Esc 关闭 + 锁滚动
  useEffect(() => {
    if (!activeProject) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveProject(null);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [activeProject]);

  const close = useCallback(() => setActiveProject(null), []);

  return (
    <section
      id="projects"
      className="relative bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-20 sm:pb-28 md:pb-36"
    >
      {/* Heading */}
      <FadeIn delay={0} y={40}>
        <div className="relative flex justify-center items-center mb-16 sm:mb-20 md:mb-28">
          {/* 右侧 Antigravity 3D 粒子环装饰 — 融入背景,不遮挡文字 */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute select-none"
            style={{
              right: 'clamp(-5%, 2%, 8%)',
              top: '50%',
              transform: 'translateY(-50%)',
              width: 'clamp(160px, 28vw, 400px)',
              height: 'clamp(144px, 24vw, 336px)',
              zIndex: 0,
              maskImage:
                'radial-gradient(ellipse 75% 80% at 50% 50%, #000 35%, rgba(0,0,0,0.5) 65%, transparent 92%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 75% 80% at 50% 50%, #000 35%, rgba(0,0,0,0.5) 65%, transparent 92%)',
              opacity: 0.65
            }}
          >
            <Antigravity
              count={180}
              magnetRadius={8}
              ringRadius={6}
              waveSpeed={0.3}
              waveAmplitude={0.6}
              particleSize={1.2}
              lerpSpeed={0.08}
              color={'#FF9FFC'}
              autoAnimate={true}
              particleVariance={0.8}
              rotationSpeed={0.15}
              depthFactor={0.5}
              pulseSpeed={2}
              particleShape={'capsule'}
              fieldStrength={8}
            />
          </div>
          <h2
            className="hero-heading uppercase text-center relative z-10"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Project
          </h2>
        </div>
      </FadeIn>

      {/* ChromaGrid wrapper — spotlight + cursor animations only */}
      <ChromaGrid radius={300} damping={0.45} fadeOut={0.6} ease="power3.out">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
          {projects.map((proj, i) => (
            <FadeIn key={i} delay={0.1 * i} y={40}>
              <motion.button
                type="button"
                onClick={() => setActiveProject(proj)}
                onMouseMove={handleCardGlow}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="project-card group relative flex flex-col w-full text-left rounded-[20px] overflow-hidden border border-white/10 cursor-pointer"
                style={{
                  background: proj.gradient,
                  '--card-border': proj.borderColor,
                  '--spotlight-color': 'rgba(255, 255, 255, 0.25)'
                } as React.CSSProperties}
                aria-label={`查看 ${proj.title} 设计思路`}
              >
                {/* Hover radial glow */}
                <span className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--spotlight-color), transparent 70%)'
                  }}
                />

                {/* Image */}
                <div className="relative z-[1] p-3">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    loading="lazy"
                    className="w-full aspect-[4/3] object-cover rounded-[10px]"
                  />
                  <span className="absolute inset-3 rounded-[10px] flex items-end justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.6) 100%)'
                    }}
                  >
                    <span
                      className="text-xs tracking-[0.25em] uppercase font-medium px-3 py-1.5 rounded-full backdrop-blur-md"
                      style={{
                        background: 'rgba(255,255,255,0.12)',
                        border: '1px solid rgba(255,255,255,0.25)',
                        color: '#fff'
                      }}
                    >
                      View Case Study →
                    </span>
                  </span>
                </div>

                {/* Info */}
                <div className="relative z-[1] px-4 pb-4 flex items-end justify-between text-white w-full">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold leading-tight">{proj.title}</h3>
                    <p className="text-sm text-white/60 mt-1">{proj.subtitle}</p>
                  </div>
                  <span className="text-sm text-white/40 font-mono">{proj.handle}</span>
                </div>
              </motion.button>
            </FadeIn>
          ))}
        </div>
      </ChromaGrid>

      {/* ===== Full-screen scrollable case study modal ===== */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            key="case-study-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] overflow-y-auto"
            style={{ background: '#0C0C0C' }}
            role="dialog"
            aria-modal="true"
          >
            {/* Sticky top bar */}
            <div className="sticky top-0 z-50 flex items-center justify-between px-5 sm:px-8 py-4"
              style={{
                background: 'rgba(12,12,12,0.85)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid rgba(255,255,255,0.08)'
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono tracking-[0.3em] text-white/40">
                  {activeProject.handle}
                </span>
                <span className="text-sm font-semibold text-white/90 truncate max-w-[200px] sm:max-w-none">
                  {activeProject.title}
                </span>
              </div>
              <button
                onClick={close}
                aria-label="关闭"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>
            </div>

            {/* Scrollable content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="max-w-[900px] mx-auto px-5 sm:px-8 pb-32"
            >
              {/* ── Hero: 主图 + 标题 ── */}
              <div className="pt-8 sm:pt-12">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {activeProject.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: `1px solid ${activeProject.borderColor}55`,
                        color: activeProject.borderColor
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2
                  className="uppercase leading-[1.1] tracking-tight mb-3"
                  style={{
                    fontFamily: "'Passion One', 'Kanit', sans-serif",
                    fontWeight: 900,
                    fontSize: 'clamp(2.4rem, 7vw, 5rem)',
                    background: `linear-gradient(180deg, ${activeProject.borderColor} 0%, #BBCCD7 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {activeProject.title}
                </h2>
                <p className="text-sm text-white/45 tracking-[0.25em] uppercase mb-8">
                  {activeProject.subtitle}
                </p>

                {/* 主图 */}
                <div className="rounded-2xl overflow-hidden border border-white/10 mb-10">
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="w-full object-cover"
                  />
                </div>

                {/* Brief */}
                <div className="mb-10">
                  <h4 className="text-[11px] tracking-[0.4em] uppercase text-white/40 mb-3">
                    Design Brief
                  </h4>
                  <p className="text-[15px] sm:text-base leading-[1.85] text-[#D7E2EA]/80 font-light">
                    {activeProject.brief}
                  </p>
                </div>

                {/* Meta */}
                <div className="grid grid-cols-3 gap-3 mb-12 pb-12 border-b border-white/8">
                  {activeProject.meta.map((m) => (
                    <div key={m.label} className="flex flex-col gap-1">
                      <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">
                        {m.label}
                      </span>
                      <span className="text-[13px] text-white/85 font-medium">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Design Process Gallery (6~7 长图) ── */}
              <div>
                <h4 className="text-[11px] tracking-[0.4em] uppercase text-white/40 mb-8">
                  Design Process — 设计思路
                </h4>

                <div className="flex flex-col gap-8 sm:gap-12">
                  {activeProject.gallery.map((item, gi) => (
                    <div key={gi} className="flex flex-col gap-3">
                      {/* 编号 + 说明(可选) */}
                      {item.caption && (
                        <div className="flex items-baseline gap-3">
                          <span
                            className="text-xs font-mono tracking-[0.2em] shrink-0"
                            style={{ color: activeProject.borderColor }}
                          >
                            {String(gi + 1).padStart(2, '0')}
                          </span>
                          <span className="text-sm text-white/60 font-light">
                            {item.caption}
                          </span>
                        </div>
                      )}

                      {/* 视频类型 */}
                      {item.type === 'video' && item.videoSrc ? (
                        <div className="rounded-xl overflow-hidden border border-white/10 bg-black">
                          {/* 视频标签 */}
                          {item.videoTitle && (
                            <div className="px-4 py-2.5 flex items-center gap-2 border-b border-white/8 bg-white/[0.02]">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={activeProject.borderColor} strokeWidth="2">
                                <polygon points="5 3 19 12 5 21 5 3" />
                              </svg>
                              <span className="text-xs text-white/50 font-light truncate">
                                {item.videoTitle}
                              </span>
                            </div>
                          )}
                          <video
                            src={item.videoSrc}
                            poster={item.videoPoster}
                            controls
                            playsInline
                            preload="metadata"
                            className="w-full"
                            style={{ maxHeight: '600px', background: '#000' }}
                          >
                            您的浏览器不支持视频播放。
                          </video>
                          {/* 视频可能因微信 token 限制无法直接播放，提供原文链接作为后备 */}
                          {item.videoLink && (
                            <div className="px-4 py-2.5 border-t border-white/8 bg-white/[0.02]">
                              <a
                                href={item.videoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[11px] tracking-wider flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                                style={{ color: activeProject.borderColor }}
                              >
                                <span>在微信中查看原视频</span>
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                  <path d="M7 17L17 7M7 7h10v10" />
                                </svg>
                              </a>
                            </div>
                          )}
                        </div>
                      ) : item.image ? (
                        /* 图片类型 */
                        <div className="rounded-xl overflow-hidden border border-white/10">
                          <img
                            src={item.image}
                            alt={item.caption ?? `${activeProject.title} 设计稿 ${gi + 1}`}
                            loading="lazy"
                            className="w-full h-auto object-contain"
                          />
                        </div>
                      ) : (
                        /* 占位 */
                        <div
                          className="rounded-xl border border-dashed flex flex-col items-center justify-center py-20 sm:py-28"
                          style={{
                            borderColor: 'rgba(255,255,255,0.12)',
                            background: `linear-gradient(135deg, ${activeProject.borderColor}08 0%, rgba(255,255,255,0.02) 100%)`
                          }}
                        >
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="9" cy="9" r="2" />
                            <path d="M21 15l-5-5L5 21" />
                          </svg>
                          <span className="mt-3 text-xs tracking-[0.3em] uppercase text-white/25">
                            待填充
                          </span>
                          <span className="mt-1 text-[10px] text-white/15">
                            将长图放入 public/ 目录后在代码中替换
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
