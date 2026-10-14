import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { pick, type Lang, type Words } from '@/lib/mss/content';
const Context=createContext<{lang:Lang;setLang:(l:Lang)=>void;t:(w:Words|undefined)=>string}>({lang:'en',setLang:()=>{},t:w=>w?.[0]??''});
export function SiteProvider({children}:{children:ReactNode}){
 const [lang,setLanguage]=useState<Lang>('en');
 useEffect(()=>{const l=new URLSearchParams(window.location.search).get('lang')??sessionStorage.getItem('mss-language');if(l==='hi'||l==='gu'||l==='en')setLanguage(l)},[]);
 useEffect(()=>{document.documentElement.lang=lang},[lang]);
 const setLang=(l:Lang)=>{setLanguage(l);sessionStorage.setItem('mss-language',l);const url=new URL(window.location.href);url.searchParams.set('lang',l);window.history.replaceState({},'',url);};
 return <Context.Provider value={{lang,setLang,t:w=>pick(w,lang)}}>{children}</Context.Provider>;
}
export const useSite=()=>useContext(Context);
