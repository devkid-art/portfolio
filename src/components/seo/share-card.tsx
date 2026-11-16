import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';

export const SHARE_SIZE = { width: 1200, height: 630 };

const font = (file: string) => readFile(path.join(process.cwd(), 'node_modules/@fontsource', file));

const INK = '#141A3D';
const INDIGO = '#1F2C78';
const CINNABAR = '#C8281E';
const PAPER = '#F1F3F7';

/**
 * The share image: a cargo ticket on waybill paper — big name, one line, the route and a seal.
 * Rendered at build time with static font files (satori cannot read woff2 or variable fonts).
 */
export async function shareCard({
  kicker,
  title,
  line,
  route,
  stamp,
}: {
  kicker: string;
  title: string;
  line: string;
  route: string;
  stamp: string;
}) {
  const [display, displayBold, body] = await Promise.all([
    font('big-shoulders/files/big-shoulders-latin-800-normal.woff'),
    font('big-shoulders/files/big-shoulders-latin-700-normal.woff'),
    font('archivo/files/archivo-latin-400-normal.woff'),
  ]);

  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%', background: PAPER, padding: 48, fontFamily: 'Archivo' }}>
        <div
          style={{
            display: 'flex',
            flex: 1,
            background: '#FFFFFF',
            border: '2px solid #C9CFDF',
            borderRadius: 24,
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '48px 56px', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', fontFamily: 'Big Shoulders', fontWeight: 700, fontSize: 34, color: INDIGO }}>{kicker}</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontFamily: 'Big Shoulders', fontWeight: 800, fontSize: title.length > 14 ? 104 : 150, lineHeight: 0.9, color: INK }}>
                {title}
              </div>
              <div style={{ marginTop: 24, fontSize: 34, lineHeight: 1.3, color: INK, maxWidth: 680 }}>{line}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <div style={{ width: 16, height: 16, borderRadius: 8, background: CINNABAR }} />
              <div style={{ width: 300, borderTop: `3px dashed ${INDIGO}` }} />
              {/* The long arrow is not in the font's latin subset: an em dash reads the same. */}
              <div style={{ fontFamily: 'Big Shoulders', fontWeight: 700, fontSize: 36, color: INDIGO }}>
                {route.replace(/⟶/g, '—')}
              </div>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              width: 250,
              borderLeft: '4px dashed #C9CFDF',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                border: `6px solid ${CINNABAR}`,
                borderRadius: 12,
                padding: '10px 20px',
                color: CINNABAR,
                fontFamily: 'Big Shoulders',
                fontWeight: 800,
                fontSize: 44,
                transform: 'rotate(-8deg)',
              }}
            >
              {stamp}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...SHARE_SIZE,
      fonts: [
        { name: 'Big Shoulders', data: display, weight: 800, style: 'normal' },
        { name: 'Big Shoulders', data: displayBold, weight: 700, style: 'normal' },
        { name: 'Archivo', data: body, weight: 400, style: 'normal' },
      ],
    },
  );
}
