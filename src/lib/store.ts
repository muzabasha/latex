import { atom } from 'jotai';

export const presentationModeAtom = atom(false);
export const instructorModeAtom = atom(false);
export const progressAtom = atom<Record<string, boolean>>({});
export const currentModuleAtom = atom('home');
export const completedModulesAtom = atom<string[]>([]);
