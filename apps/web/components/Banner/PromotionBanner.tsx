import { links, randomBetween } from '@matnbaz/common';
import { useEffect, useState } from 'react';
import { SiGithub, SiInstagram, SiTelegram, SiTwitter } from 'react-icons/si';
import { Banner, BannerProps } from './Banner';

type PromotionBannerType =
  | 'telegram'
  | 'instagram'
  | 'twitter'
  | 'twitterTweet'
  | 'github';

const bannerProps: Record<PromotionBannerType, BannerProps> = {
  telegram: {
    text: 'حتما در کانال تلگرامی متن‌باز عضو شوید.',
    mobile: 'ما را در تلگرام دنبال کنید.',
    icon: SiTelegram,
    url: links.telegram,
    cta: 'ورود به کانال',
    theme: 'primary',
  },

  instagram: {
    text: 'صفحه اینستاگرام متن‌باز را دنبال کنید.',
    mobile: 'ما را در اینستاگرام دنبال کنید.',
    icon: SiInstagram,
    url: links.instagram,
    cta: 'مشاهده صفحه',
    theme: 'instagram',
  },

  twitter: {
    text: 'صفحه توییتری متن‌باز را دنبال کنید.',
    mobile: 'ما را در توییتر دنبال کنید.',
    icon: SiTwitter,
    url: links.twitter,
    cta: 'مشاهده صفحه',
    theme: 'twitter',
  },

  twitterTweet: {
    text: 'با توییت کردن درمورد متن‌باز به گسترش آن کمک کنید. ❤️',
    mobile: 'درمورد متن‌باز توییت کنید.',
    icon: SiTwitter,
    url: links.twitterTweet,
    cta: 'توییت',
    theme: 'twitter',
  },

  github: {
    text: 'با ستاره دادن به پروژه در گیت‌هاب به ما کمک کنید. ⭐️',
    mobile: 'به ما در گیت‌هاب ستاره دهید.',
    icon: SiGithub,
    url: links.githubRepo,
    cta: 'مشاهده مخزن',
    theme: 'github',
  },
};

export interface PromotionBannerProps extends Partial<BannerProps> {
  type?: PromotionBannerType;
}

export const PromotionBanner = ({ type, ...props }: PromotionBannerProps) => {
  const [promoBanner, setPromoBanner] = useState<BannerProps | null>(
    bannerProps[type] || null
  );
  useEffect(() => {
    console.log(type);
    if (type) return;
    const keys = Object.keys(bannerProps);
    const random = randomBetween(0, keys.length - 1);
    setPromoBanner(bannerProps[keys[random]]);
  }, []);

  return (
    promoBanner !== null && (
      <Banner
        {...promoBanner}
        openOnNewTab={props.openOnNewTab || true}
        {...props}
      />
    )
  );
};

const TelegramBanner = (props: Omit<PromotionBannerProps, 'type'>) => (
  <PromotionBanner type="telegram" {...props} />
);
PromotionBanner.Telegram = TelegramBanner;

const InstagramBanner = (props: Omit<PromotionBannerProps, 'type'>) => (
  <PromotionBanner type="instagram" {...props} />
);
PromotionBanner.Instagram = InstagramBanner;

const TwitterBanner = (props: Omit<PromotionBannerProps, 'type'>) => (
  <PromotionBanner type="twitter" {...props} />
);
PromotionBanner.Twitter = TwitterBanner;

const TwitterTweetBanner = (props: Omit<PromotionBannerProps, 'type'>) => (
  <PromotionBanner type="twitterTweet" {...props} />
);
PromotionBanner.TwitterTweet = TwitterTweetBanner;

const GithubBanner = (props: Omit<PromotionBannerProps, 'type'>) => (
  <PromotionBanner type="github" {...props} />
);
PromotionBanner.Github = GithubBanner;
