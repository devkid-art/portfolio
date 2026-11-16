import 'server-only';
import { existsSync } from 'node:fs';
import path from 'node:path';

/** True when a file exists under /public (checked at build time for static pages). */
export function publicFileExists(publicPath: string): boolean {
  return existsSync(path.join(process.cwd(), 'public', publicPath));
}
