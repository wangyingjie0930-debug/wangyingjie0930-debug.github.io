import { useRef, useEffect, useState } from 'react';

// 用户作品图 — 从 public/gallery/ 和 public/project-*.webp 取图
const portfolioImages = [
  '/gallery/work-01.webp',
  '/gallery/work-03.webp',
  '/gallery/work-05.webp',
  '/gallery/work-07.webp',
  '/gallery/work-09.webp',
  '/gallery/work-11.webp',
  '/gallery/work-13.webp',
  '/gallery/work-15.webp',
  '/gallery/work-02.webp',
  '/gallery/work-04.webp',
  '/gallery/work-06.webp',
  '/gallery/work-08.webp',
  '/gallery/work-10.webp',
  '/gallery/work-12.webp',
  '/gallery/work-14.webp',
  '/gallery/work-16.webp',
];

// Video markers — rendered as <video> inside MarqueeRow
const VIDEO_MARKER = '__VIDEO__';
const SPEED_VIDEO_MARKER = '__SPEED_VIDEO__';
// marquee-shoe-6 — gets 2s scale-in-and-out animation
const ZOOM_ANIMATED = '__ZOOM_ANIMATED__';

const row1Images = [
  VIDEO_MARKER,                       // 1st — 10秒产品视频
  '/gallery/marquee-shoe-1.webp',      // 2nd — 包装袋橙白篮球鞋
  SPEED_VIDEO_MARKER,                 // 3rd — 3秒速度感动效视频
  '/gallery/marquee-shoe-3.webp',      // 4th — 粉紫丝绸 + 黑白橙跑鞋
  '/gallery/marquee-shoe-4.webp',      // 5th — 白色包装袋 + FEIYING 跑鞋
  ...portfolioImages.slice(5, 8),     // 6-8: work-11, 13, 15
];
const row2Images = [
  '/gallery/marquee-shoe-5.webp',      // 1st — 透明包装袋 + 橙黑 FEIYING 跑鞋
  ZOOM_ANIMATED,                      // 2nd — S/LAB PHANTASM 3 白底白鞋（2秒由大到小收缩）
  '/gallery/marquee-shoe-7.webp',      // 3rd — Leave Yourself in the Dust
  '/gallery/marquee-shoe-9.webp',      // 4th — 粉底 S/LAB PHANTASM 3
  '/gallery/marquee-shoe-8.webp',      // 5th — 青色光效白跑鞋
  ...portfolioImages.slice(13, 16),   // 6-8: work-10, 12, 14
];

// Triple for seamless looping
const row1Tripled = [...row1Images, ...row1Images, ...row1Images];
const row2Tripled = [...row2Images, ...row2Images, ...row2Images];

function MarqueeRow({
  images,
  direction,
  offset,
}: {
  images: string[];
  direction: 'left' | 'right';
  offset: number;
}) {
  const translateX = direction === 'right' ? offset - 200 : -(offset - 200);

  return (
    <div
      className="flex justify-start will-change-transform"
      style={{ gap: '0.75rem', transform: `translateX(${translateX}px)`, willChange: 'transform' }}
    >
      {images.map((src, i) => {
        if (src === VIDEO_MARKER) {
          return (
            <div
              key={`video-${i}`}
              className="flex-shrink-0 rounded-2xl overflow-hidden"
              style={{ width: 420, height: 270, boxShadow: '0 20px 60px -15px rgba(0,0,0,0.8)' }}
            >
              <video
                src="/showcase-video.mp4"
                muted
                loop
                playsInline
                autoPlay
                className="w-full h-full object-cover"
                style={{ display: 'block' }}
              />
            </div>
          );
        }
        if (src === SPEED_VIDEO_MARKER) {
          return (
            <div
              key={`speed-video-${i}`}
              className="flex-shrink-0 rounded-2xl overflow-hidden"
              style={{ width: 420, height: 270, boxShadow: '0 20px 60px -15px rgba(0,0,0,0.8)' }}
            >
              <video
                src="/marquee-speed-video.mp4"
                muted
                loop
                playsInline
                autoPlay
                className="w-full h-full object-cover"
                style={{ display: 'block' }}
              />
            </div>
          );
        }
        if (src === ZOOM_ANIMATED) {
          return (
            <div
              key={`zoom-anim-${i}`}
              className="flex-shrink-0 rounded-2xl overflow-hidden"
              style={{ width: 420, height: 270 }}
            >
              <img
                src="/gallery/marquee-shoe-6.webp"
                alt=""
                loading="lazy"
                className="w-full h-full object-cover zoom-pulse"
                style={{ display: 'block', animation: 'marqueeZoomPulse 4s ease-in-out infinite', transformOrigin: 'center center' }}
              />
            </div>
          );
        }
        return (
          <div
            key={`${src}-${i}`}
            className="flex-shrink-0 rounded-2xl overflow-hidden"
            style={{ width: 420, height: 270 }}
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover"
              style={{ display: 'block' }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionTop = sectionRef.current.offsetTop;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setScrollOffset(offset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden">
      <div className="flex flex-col" style={{ gap: '0.75rem' }}>
        <MarqueeRow images={row1Tripled} direction="right" offset={scrollOffset} />
        <MarqueeRow images={row2Tripled} direction="left" offset={scrollOffset} />
      </div>
    </section>
  );
}
