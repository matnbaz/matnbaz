import { randomBetween, socialMedia } from '@matnbaz/common';
import { useEffect, useState } from 'react';
import { SiGithub, SiInstagram, SiTelegram, SiTwitter } from 'react-icons/si';
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

  {
    text: 'با توییت کردن درمورد متن‌باز به گسترش آن کمک کنید. ❤️',
    icon: SiTwitter,
    url: socialMedia.twitterTweet,
    cta: 'توییت',
    theme: 'twitter',
  },

  {
    text: 'با ستاره دادن به پروژه در گیت‌هاب به ما کمک کنید. ⭐️',
    icon: SiGithub,
    url: socialMedia.githubRepo,
    cta: 'مشاهده مخزن',
    theme: 'github',
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
