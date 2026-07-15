import DomeGallery from '../components/DomeGallery';
import FadeIn from '../components/FadeIn';

// =====================================================
//  Gallery 作品图片配置 — 图片存放在 public/gallery/ 目录
//  work-17~24:8 张 MarqueeSection 未用的独有小图(保留)
//  work-25~35:用户提供的 11 张作品图
//  work-36~37:用户最新 2 张(填原 2 个空占位)
//  work-38~39:用户最新 2 张(替换视觉上同款的 work-19 / work-23 旧图)
// =====================================================
const galleryImages: { src: string; alt: string }[] = [
  // 8 张 Marquee 未用的独有图(保留 6 张 + 2 张被替换)
  { src: '/gallery/work-17.png', alt: '星弹2.0 儿童专业跑鞋' },
  { src: '/gallery/work-18.png', alt: 'BOA儿童跑鞋 — 灰紫配色' },
  // work-19 (旧聚风5.0) 被替换为 work-38 飞影Pro 红黄黑
  { src: '/gallery/work-38.png', alt: '飞影Pro 碳板竞速跑鞋 — 红黄黑' },
  { src: '/gallery/work-20.png', alt: '山羚PRO 青少年越野跑鞋' },
  { src: '/gallery/work-21.png', alt: '乔丹儿童 荧光绿篮球鞋' },
  { src: '/gallery/work-22.png', alt: '羚跑山野 乔燃迷你越野跑' },
  // work-23 (旧黑紫篮球) 被替换为 work-39 KIDS 篮球
  { src: '/gallery/work-39.png', alt: '高能竞速 KIDS 篮球鞋 — 深蓝红' },
  { src: '/gallery/work-24.jpg', alt: 'KIDS 青绿渐变跑鞋' },

  // 用户提供的 11 张作品图(按 image#1~#11 顺序)
  { src: '/gallery/work-25.png', alt: '聚风7.0 BOA 荧光绿' },
  { src: '/gallery/work-26.png', alt: '儿童跑鞋双配色 — 蓝/紫' },
  { src: '/gallery/work-27.png', alt: '飞影6.0 YOUNG 专业青少年竞训跑鞋' },
  { src: '/gallery/work-28.png', alt: '云端轻量跑鞋 — 紫白配色' },
  { src: '/gallery/work-29.png', alt: '聚风7.0 专业儿童校园稳护跑鞋' },
  { src: '/gallery/work-30.png', alt: '巭PRO 碳板科技跑鞋' },
  { src: '/gallery/work-31.png', alt: 'Q-ARC PLATE 巭科技跑鞋' },
  { src: '/gallery/work-32.png', alt: '篮球鞋四款系列' },
  { src: '/gallery/work-33.png', alt: '追电 PRO2.0 校园体测跑鞋' },
  { src: '/gallery/work-34.png', alt: '轻 软 弹 儿童跑鞋' },
  { src: '/gallery/work-35.png', alt: '山羚PRO 少年专业越野跑鞋' },

  // 填满 2 个原空占位 — 用户最新 2 张作品
  { src: '/gallery/work-36.png', alt: '雷霆2.0 专业儿童跑鞋 — 深空蓝' },
  { src: '/gallery/work-37.png', alt: '巭BOA 儿童校园跑鞋 — 白蓝配色' },
];

export default function DomeGallerySection() {
  return (
    <section id="gallery" className="relative bg-[#0C0C0C] pt-20 sm:pt-24 md:pt-32 pb-20 sm:pb-28 md:pb-36">
      {/* Heading */}
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading uppercase text-center mb-8 sm:mb-12 md:mb-16"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Gallery
        </h2>
      </FadeIn>

      {/* Dome Gallery */}
      <FadeIn delay={0.2} y={40}>
        <div className="w-full h-[80vh] min-h-[600px] max-h-[900px]">
          <DomeGallery
            images={galleryImages}
            overlayBlurColor="#0C0C0C"
            grayscale={false}
            fit={0.45}
            imageBorderRadius="16px"
            openedImageBorderRadius="24px"
            openedImageWidth="350px"
            openedImageHeight="450px"
            dragSensitivity={18}
          />
        </div>
      </FadeIn>
    </section>
  );
}
