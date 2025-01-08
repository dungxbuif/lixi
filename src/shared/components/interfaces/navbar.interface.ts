import { Icons } from '@/shared/components/atoms/Icon';
import { UserRoleEnum } from '@/shared/enum';

export interface INavItem {
    title: string;
    href?: string;
    disabled?: boolean;
    external?: boolean;
    icon?: keyof typeof Icons;
    label?: string;
    description?: string;
    subItems?: INavItem[] | null;
    role: UserRoleEnum[];
}
