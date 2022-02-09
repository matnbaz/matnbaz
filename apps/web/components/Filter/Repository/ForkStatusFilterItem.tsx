import { useTranslation } from 'next-i18next';
import { ForkStatusType } from '../../../lib/graphql-types';
import { Collapsible } from '../../UI/Collapsible';
import { RadioList, RadioListProps } from '../../UI/RadioList';
import { FilterItem } from './filter-item.interface';

export interface ForkStatusFilterItemProps extends FilterItem {
  value?: RadioListProps['value']['value'];
  onChange?: RadioListProps['onChange'];
}

export const ForkStatusFilterItem = ({
  open,
  ...props
}: ForkStatusFilterItemProps) => {
  const { t } = useTranslation('repo-filters');

  return (
    <Collapsible title={t('fork-status.title')} open={open}>
      <RadioList
        options={Object.values(ForkStatusType).map((status) => ({
          value: status,
          name: t(`fork-status.options.${status}`),
        }))}
        value={{
          value: props.value,
          name: t(`fork-status.options.${props.value}`),
        }}
        onChange={props.onChange}
      />
    </Collapsible>
  );
};
