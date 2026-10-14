import { describe, expect, it } from 'vitest';
import { calculateCoverage } from '@/lib/mss/planner';
describe('MSS daily coverage',()=>{
 it('detects full overnight coverage',()=>{const r=calculateCoverage([{start:6,end:14,guards:1},{start:14,end:22,guards:1},{start:22,end:6,guards:1}],1);expect(r.gaps).toEqual([]);expect(r.personHours).toBe(24);expect(r.scheduledPositions).toBe(3)});
 it('does not claim coverage across a gap',()=>{const r=calculateCoverage([{start:6,end:13,guards:1},{start:14,end:22,guards:1},{start:22,end:6,guards:1}],1);expect(r.gaps).toEqual([13]);expect(r.coveredHours).toBe(23)});
 it('compares staffing with simultaneous requirement',()=>{expect(calculateCoverage([{start:0,end:0,guards:1}],2).coveredHours).toBe(0)});
 it('reports overlap without pretending unique headcount',()=>{const r=calculateCoverage([{start:0,end:0,guards:1},{start:8,end:16,guards:1}],1);expect(r.overlapHours).toBe(8);expect(r.personHours).toBe(32)});
});
