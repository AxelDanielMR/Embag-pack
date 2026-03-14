'use client';

import Link from 'next/link';

export default function ButtonHover({ href, children }) {
  return (
    <Link href={href}>
      <button
        className="bubbles"
        style={{
          '--c1': '#ffffff',
          '--c2': '#b4eee8',
          '--size-letter': '18px',
        }}
      >
        <span className="text">{children}</span>
        <style jsx>{`
          .bubbles {
            padding: 0.75em 1.5em;
            font-size: var(--size-letter);
            font-family: 'Arial', sans-serif;
            background-color: transparent;
            border: 2px solid var(--c2);
            border-radius: 0.5em;
            cursor: pointer;
            overflow: hidden;
            position: relative;
            transition: 300ms cubic-bezier(0.83, 0, 0.17, 1);
          }

          .bubbles > .text {
            font-weight: 600;
            color: var(--c2);
            position: relative;
            z-index: 1;
            transition: color 700ms cubic-bezier(0.83, 0, 0.17, 1);
          }

          .bubbles::before {
            top: 0;
            left: 0;
          }

          .bubbles::after {
            top: 100%;
            left: 100%;
          }

          .bubbles::before,
          .bubbles::after {
            content: '';
            width: 150%;
            aspect-ratio: 1/1;
            scale: 0;
            transition: 1000ms cubic-bezier(0.76, 0, 0.24, 1);
            background-color: var(--c2);
            border-radius: 50%;
            position: absolute;
            translate: -50% -50%;
          }

          .bubbles:hover > .text {
            color: var(--c1);
          }

          .bubbles:hover::before,
          .bubbles:hover::after {
            scale: 1;
          }

          .bubbles:active {
            scale: 0.98;
            filter: brightness(0.9);
          }
        `}</style>
      </button>
    </Link>
  );
}