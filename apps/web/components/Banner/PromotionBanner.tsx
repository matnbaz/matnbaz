import { links, randomBetween } from '@matnbaz/common';
import { useTranslation } from 'next-i18next';
import { useEffect, useMemo, useState } from 'react';
import {
  SiDiscord,
  SiGithub,
  SiInstagram,
  SiTelegram,
  SiTwitter,
} from 'react-icons/si';
import { Banner, BannerProps } from './Banner';

type PromotionBannerType =
  | 'telegram'
  | 'instagram'
  | 'twitter'
  | 'twitterTweet'
  | 'github'
  | 'discord';

export interface PromotionBannerProps extends Partial<BannerProps> {
  type?: PromotionBannerType;
}

export const PromotionBanner = ({ type, ...props }: PromotionBannerProps) => {
  const { t } = useTranslation();
  const bannerProps = useMemo<Record<PromotionBannerType, BannerProps>>(() => {
    return {
      telegram: {
        text: t('promotion.telegram.text'),
        mobile: t('promotion.telegram.mobile'),
        icon: SiTelegram,
        url: links.telegram,
        cta: t('promotion.telegram.cta'),
        theme: 'primary',
      },

      instagram: {
        text: t('promotion.instagram.text'),
        mobile: t('promotion.instagram.mobile'),
        icon: SiInstagram,
        url: links.instagram,
        cta: t('promotion.instagram.cta'),
        theme: 'instagram',
      },

      twitter: {
        text: t('promotion.twitter.text'),
        mobile: t('promotion.twitter.mobile'),
        icon: SiTwitter,
        url: links.twitter,
        cta: t('promotion.twitter.cta'),
        theme: 'twitter',
      },

      twitterTweet: {
        text: t('promotion.twitterTweet.text'),
        mobile: t('promotion.twitterTweet.mobile'),
        icon: SiTwitter,
        url: links.twitterTweet,
        cta: t('promotion.twitterTweet.cta'),
        theme: 'twitter',
      },

      github: {
        text: t('promotion.github.text'),
        mobile: t('promotion.github.mobile'),
        icon: SiGithub,
        url: links.githubRepo,
        cta: t('promotion.github.cta'),
        theme: 'github',
      },

      discord: {
        text: t('promotion.discord.text'),
        mobile: t('promotion.discord.mobile'),
        icon: SiDiscord,
        url: links.discord,
        cta: t('promotion.discord.cta'),
        theme: 'discord',
      },
    };
  }, [t]);
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
