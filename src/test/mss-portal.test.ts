import { describe,it,expect } from 'vitest';
import {profileSchema,vacancySchema,activeVacancy} from '@/lib/mss/portal-schema';
const profile={full_name:'Test Candidate',phone:'+919876543210',location:'Delhi',preferred_locations:'',experience:'',qualifications:'',skills:'',job_categories:'',availability:'',training_interests:'',accommodation:'',serving_personnel:false,permissions_confirmed:false,consent:true};
describe('Employment safeguards',()=>{
 it('requires serving personnel to confirm permission',()=>{expect(profileSchema.safeParse({...profile,serving_personnel:true}).success).toBe(false);expect(profileSchema.safeParse({...profile,serving_personnel:true,permissions_confirmed:true}).success).toBe(true)});
 it('requires privacy consent for profile saving',()=>{expect(profileSchema.safeParse({...profile,consent:false}).success).toBe(false)});
 it('does not list expired vacancies',()=>{expect(activeVacancy({status:'active',verified:true,deadline:'2026-10-23T00:00:00Z'},Date.parse('2026-10-24T00:00:00Z'))).toBe(false)});
 it('does not list unverified vacancies',()=>{expect(activeVacancy({status:'active',verified:false,deadline:null})).toBe(false);expect(activeVacancy({status:'active',verified:true,deadline:null})).toBe(true)});
 it('rejects publication before employer verification',()=>{expect(vacancySchema.safeParse({title:'Security supervisor',employer:'Test employer',location:'Delhi',job_type:'Full time',responsibilities:'Manage shift handovers',eligibility:'Relevant experience',qualifications:'',salary:'',hours:'',benefits:'',deadline:'',status:'active',verified:false}).success).toBe(false)});
});
