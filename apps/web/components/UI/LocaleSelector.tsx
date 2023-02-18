import { Listbox, Transition } from '@headlessui/react';
import { setBodyDirection } from 'common';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { Fragment, useMemo } from 'react';
import { HiCheck } from 'react-icons/hi';
import { IoLanguage } from 'react-icons/io5';

export const LocaleSelector = () => {
  const { push, pathname, locale, locales, asPath } = useRouter();

  const { t } = useTranslation();

  const changeLanguage = useMemo(
    () => async (locale: string) => {
      await push({ pathname }, asPath, { locale });
      setBodyDirection(locale);
    },
    [push, pathname, asPath]
  );

  return (
    <Listbox value={locale} onChange={(value) => changeLanguage(value)}>
      <div className="relative">
        <Listbox.Button className="relative w-full py-2 ltr:pr-3 ltr:pl-10 rtl:pl-3 rtl:pr-10 ltr:text-left rtl:text-right rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 md:text-sm">
          <span className="block truncate">{t(`locale.${locale}`)}</span>
          <span className="absolute inset-y-0 ltr:left-0 rtl:right-0 flex items-center ltr:pl-2 rtl:pr-2 pointer-events-none">
            <IoLanguage className="w-6 h-6" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute py-1 bg-gray-100 dark:bg-gray-800 mt-1 overflow-auto text-base rounded-md max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {locales.map((_locale, localeIdx) => (
              <Listbox.Option
                key={localeIdx}
                className={({ active }) =>
                  classNames(
                    active && 'bg-gray-200 dark:bg-gray-700',
                    'select-none relative py-2 ltr:pl-10 ltr:pr-4 rtl:pr-10 rtl:pl-4'
                  )
                }
                value={_locale}
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={classNames(
                        selected ? 'font-medium' : 'font-normal',
                        'block truncate'
                      )}
                    >
                      {t(`locale.${_locale}`)}
                    </span>
                    {selected ? (
                      <span
                        className={classNames(
                          active ? 'text-primary-600' : 'text-primary-600',
                          `absolute inset-y-0 ltr:left-0 rtl:right-0 flex items-center ltr:pl-3 rtl:pr-3`
                        )}
                      >
                        <HiCheck className="w-5 h-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
