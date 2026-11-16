import { PLACES } from './places';
import type { Project } from './types';

/** "DLA ⟶ NKG": first Cameroonian place to first Chinese place; a single code when the project stays local. */
export function routeCode(project: Project): string {
  const cm = project.places.find((p) => PLACES[p].country === 'cm');
  const cn = project.places.find((p) => PLACES[p].country === 'cn');
  if (cm && cn) return `${PLACES[cm].code} ⟶ ${PLACES[cn].code}`;
  return PLACES[(cm ?? cn ?? project.places[0])].code;
}
