import { atom } from 'recoil';

export const userToken = atom({
    key: 'userToken',
    default: 'none',
    dangerouslyAllowMutability: true,
});

export const userProfile = atom({
    key: 'userProfile',
    default: {}
});