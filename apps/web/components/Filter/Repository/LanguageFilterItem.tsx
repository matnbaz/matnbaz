import { useTranslation } from 'next-i18next';
import { useMemo, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useGetLanguagesQuery } from '../../../lib/graphql-types';
import { LanguagesFilterSkeletonLoader } from '../../SkeletonLoader/LanguagesFilterSkeletonLoader';
import { Button } from '../../UI/Button/Button';
import { CheckboxList, CheckboxListProps } from '../../UI/CheckboxList';
import { Collapsible } from '../../UI/Collapsible';
import { Input } from '../../UI/Input/Input';
import { FilterItem } from './filter-item.interface';

export interface LanguageFilterItemProps extends FilterItem {
  value?: CheckboxListProps['value'];
  onChange?: CheckboxListProps['onChange'];
}

export const LanguageFilterItem = ({
  open,
  ...props
}: LanguageFilterItemProps) => {
  const { t } = useTranslation('repo-filters');
  const { data, loading, refetch, error } = useGetLanguagesQuery();
  const [search, setSearch] = useState('');

  const languages = useMemo<CheckboxListProps['value']>(
    () =>
      data?.languages.edges.map((lang) => ({
        value: lang.node.slug,
        name: lang.node.name,
      })),
    [data]
  );

  return (
    <Collapsible title={t(`language.title`)} open={open}>
      <Input
        placeholder={t(`language.search-placeholder`)}
        onChange={(event) => setSearch(event.target.value)}
        icon={AiOutlineSearch}
        className="w-full"
      />
      {languages && languages.length > 0 ? (
        <div dir="ltr">
          <CheckboxList
            className="max-h-52 overflow-y-auto mt-4 ltr:text-left rtl:text-right flex-row-reverse"
            options={languages}
            search={search}
            {...props}
          />
        </div>
      ) : (
        !loading && (
          <div className="mt-4 text-sm text-secondary">
            {t('language.no-result-found')}
          </div>
        )
      )}
      {error && (
        <div className="flex flex-col space-y-2 items-center mt-2">
          <span>{t('language.error-occurred')}</span>
          <Button.Primary size="sm" onClick={() => refetch()}>
            {t('language.try-again')}
          </Button.Primary>
        </div>
      )}
      {loading && (
        <div className="max-h-52 overflow-y-auto mt-4 space-y-4">
          {[...Array(12).keys()].map((index) => (
            <LanguagesFilterSkeletonLoader key={index} />
          ))}{' '}
        </div>
      )}
    </Collapsible>
  );
};
