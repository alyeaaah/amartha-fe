import { ComponentProps, ComponentType, SVGProps } from 'react'

export type IconProps = Omit<
  ComponentProps<"svg">,
  "height" | "width" | "widths"
> & {
  size?: "small" | "regular";
};

type Icon = ComponentType<IconProps>;
import IconLogo_ from '@/assets/images/logo.svg';
import IconLogoAlt_ from '@/assets/images/logo-alt.svg';
import IconXTwitter_ from '@/assets/images/icons/x-twitter.svg';
import IconTiktok_ from '@/assets/images/icons/tiktok.svg';
import IconMan_ from "@/assets/images/icons/man.svg";
import IconWoman_ from "@/assets/images/icons/woman.svg";
import IconMale_ from "@/assets/images/icons/male.svg";
import IconFemale_ from "@/assets/images/icons/female.svg";

export const IconLogo = IconLogo_ as unknown as Icon;
export const IconLogoAlt = IconLogoAlt_ as unknown as Icon;
export const IconXTwitter = IconXTwitter_ as unknown as Icon;
export const IconTiktok = IconTiktok_ as unknown as Icon;
export const IconMan = IconMan_ as unknown as Icon;
export const IconWoman = IconWoman_ as unknown as Icon;
export const IconMale = IconMale_ as unknown as Icon;
export const IconFemale = IconFemale_ as unknown as Icon;

