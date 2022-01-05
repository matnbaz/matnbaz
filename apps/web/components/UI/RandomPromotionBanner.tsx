import { randomBetween, socialMedia } from '@matnbaz/common';
import { useEffect, useState } from 'react';
import { SiInstagram, SiTelegram, SiTwitter } from 'react-icons/si';
import { Banner, BannerProps } from './Banner';

const bannerProps: BannerProps[] = [
  {
    text: 'حتما در کانال تلگرامی متن‌باز عضو شوید.',
    icon: SiTelegram,
    url: socialMedia.telegram,
    cta: 'ورود به کانال',
    theme: 'primary',
  },

  {
    text: 'صفحه اینستاگرام متن‌باز را دنبال کنید.',
    icon: SiInstagram,
    url: socialMedia.instagram,
    cta: 'مشاهده صفحه',
    theme: 'instagram',
  },

  {
    text: 'صفحه توییتری متن‌باز را دنبال کنید.',
    icon: SiTwitter,
    url: socialMedia.twitter,
    cta: 'مشاهده صفحه',
    theme: 'twitter',
  },
];

export type RandomPromotionBannerProps = Partial<BannerProps>;

export const RandomPromotionBanner = (props: RandomPromotionBannerProps) => {
  const [bannerRnd, setBannerRnd] = useState<number | null>(null);
  useEffect(() => {
    setBannerRnd(randomBetween(0, bannerProps.length - 1));
  }, []);

  return (
    bannerRnd !== null && (
      <Banner
        {...bannerProps[bannerRnd]}
        openOnNewTab={props.openOnNewTab || true}
        {...props}
      />
    )
  );
};
