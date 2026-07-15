import FadeIn from '../components/FadeIn';

const services = [
  {
    number: '01',
    name: 'Shoe Design',
    description:
      '从概念草图到 3D 建模渲染，覆盖运动鞋、板鞋、户外鞋等多品类童鞋全流程设计，注重造型创新与可落地性。',
  },
  {
    number: '02',
    name: 'Product Planning',
    description:
      '季度产品企划与产品线矩阵规划，精准定位价格带与目标人群，搭建分层产品结构驱动业绩增长。',
  },
  {
    number: '03',
    name: 'IP Development',
    description:
      '长线 IP 系列打造与迭代升级（如聚风4.0-7.0），以设计驱动产品存量盘活与增量赛道突破。',
  },
  {
    number: '04',
    name: 'Team Management',
    description:
      '设计团队梯度搭建、跨部门协作推进、数字化设计流程落地，实现设计创意与商业业绩双向赋能。',
  },
  {
    number: '05',
    name: 'Trend Research',
    description:
      '竞品趋势分析、消费者洞察与儿童足部发育规律研究，结合运动生物力学为产品设计提供科学依据。',
  },
];

export default function ServicesSection() {
  return (
    <section
      id="expertise"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      {/* Heading */}
      <h2
        className="uppercase text-center mb-16 sm:mb-20 md:mb-28"
        style={{
          fontFamily: "'Passion One', 'Kanit', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(3rem, 12vw, 160px)',
          lineHeight: 0.9,
          color: '#0C0C0C',
        }}
      >
        EXPERTISE
      </h2>

      {/* Service Items */}
      <div className="max-w-5xl mx-auto">
        {services.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1} y={20}>
            <div
              className="flex items-start"
              style={{
                borderTop: i > 0 ? '1px solid rgba(12, 12, 12, 0.15)' : 'none',
                paddingTop: 'clamp(2rem, 5vw, 3rem)',
                paddingBottom: 'clamp(2rem, 5vw, 3rem)',
              }}
            >
              {/* Number */}
              <span
                className="leading-none flex-shrink-0"
                style={{
                  fontFamily: "'Passion One', 'Kanit', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(3rem, 10vw, 140px)',
                  lineHeight: '0.85',
                  minWidth: 'clamp(5rem, 14vw, 10rem)',
                  color: '#0C0C0C',
                }}
              >
                {service.number}
              </span>

              {/* Name + Description */}
              <div className="flex flex-col ml-4 sm:ml-6 md:ml-8">
                <h3
                  className="font-medium uppercase text-[#0C0C0C]"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {service.name}
                </h3>
                <p
                  className="font-light leading-relaxed max-w-2xl text-[#0C0C0C] mt-2"
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)', opacity: 0.6 }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
