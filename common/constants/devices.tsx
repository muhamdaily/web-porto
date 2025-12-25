import {
    BsLaptop,
    BsPhone,
    BsSmartwatch,
    BsSpeaker,
    BsTablet,
    BsTv,
} from 'react-icons/bs';

import { DeviceInfoProps } from '../types/spotify';

const iconSize = 24;
const iconClassName = 'w-auto text-neutral-700 dark:text-neutral-300';

export const PAIR_DEVICES: Record<string, DeviceInfoProps> = {
    Computer: {
        icon: <BsLaptop className={iconClassName} size={iconSize} />,
        model: 'ROG Zephyrus G14',
        id: 'GA402NJ-R735K6G-O',
    },
    Smartphone: {
        icon: <BsPhone className={iconClassName} size={iconSize} />,
        model: 'iPhone 11 Pro',
        id: 'muhamdaily-iphone11',
    },
    Tablet: {
        icon: <BsTablet className={iconClassName} size={iconSize} />,
        model: 'iPad Mini 6',
        id: 'muhamdaily-ipad',
    },
    Smartwatch: {
        icon: <BsSmartwatch className={iconClassName} size={iconSize} />,
        model: 'Apple Watch Series 7',
        id: 'muhamdaily-iwatch',
    },
    Speaker: {
        icon: <BsSpeaker className={iconClassName} size={iconSize} />,
        model: 'Sony',
        id: 'muhamdaily-speaker',
    },
    TV: {
        icon: <BsTv className={iconClassName} size={iconSize} />,
        model: 'Android TV',
        id: 'muhamdaily-tv',
    },
};
