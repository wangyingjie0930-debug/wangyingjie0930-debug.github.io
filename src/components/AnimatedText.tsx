import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function AnimatedText({ text, className = '', style }: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  return (
    <p ref={containerRef} className={className} style={{ ...style, position: 'relative' }}>
      {text.split('').map((char, index) => {
        const charProgress = index / text.length;
        const opacity = useTransform(
          scrollYProgress,
          [charProgress - 0.1, charProgress, charProgress + 0.05],
          [0.2, 1, 1]
        );

        // Render a zero-width space as invisible placeholder to preserve layout
        const placeholder = (
          <span key={`ph-${index}`} style={{ visibility: 'hidden' }}>
            {char}
          </span>
        );

        const animatedChar = (
          <motion.span
            key={`char-${index}`}
            style={{
              opacity,
              position: 'absolute',
              left: `${(index / text.length) * 100}%`,
              transform: 'translateX(-50%)',
              whiteSpace: 'pre',
            }}
          >
            {char}
          </motion.span>
        );

        return (
          <span key={`wrap-${index}`} style={{ position: 'relative', display: 'inline' }}>
            {placeholder}
            {animatedChar}
          </span>
        );
      })}
    </p>
  );
}
