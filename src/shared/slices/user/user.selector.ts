import { RootState } from '@/shared/config/store.config';

export const selectUserProfile = (state: RootState) => state.user.user;
