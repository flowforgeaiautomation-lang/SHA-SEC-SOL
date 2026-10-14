export type Shift={start:number;end:number;guards:number};
export function calculateCoverage(shifts:Shift[],required:number){
 const coverage=Array.from({length:24},(_,hour)=>shifts.reduce((sum,s)=>sum+((s.start===s.end||s.start<s.end&&hour>=s.start&&hour<s.end||s.start>s.end&&(hour>=s.start||hour<s.end))?s.guards:0),0));
 const gaps=coverage.map((n,h)=>n<required?h:-1).filter(h=>h>=0);
 return {coverage,gaps,coveredHours:24-gaps.length,personHours:coverage.reduce((a,b)=>a+b,0),overlapHours:coverage.filter(n=>n>required).length,scheduledPositions:shifts.reduce((a,s)=>a+s.guards,0)};
}
