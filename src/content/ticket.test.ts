import { describe, expect, it } from 'vitest';
import { getProject } from './projects';
import { routeCode } from './ticket';

describe('routeCode', () => {
  it('joins the Cameroonian and Chinese ends of a route', () => {
    expect(routeCode(getProject('colisa')!)).toBe('DLA ⟶ CAN');
    expect(routeCode(getProject('student-network-china')!)).toBe('DLA ⟶ NKG');
  });

  it('prints a single code for a local project', () => {
    expect(routeCode(getProject('esa-cosmetics')!)).toBe('DLA');
    expect(routeCode(getProject('school-saas')!)).toBe('NSI');
  });
});
