const path = require('path');

/** @type {import('next-i18next').UserConfig */
module.exports = {
    i18n: {
        localePath: path.resolve('./apps/web/public/locales'),
        defaultLocale: 'fa',
        locales: ['fa', 'en'],
        localeDetection: false,
    },
};
