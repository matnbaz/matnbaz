import { useTranslation } from 'next-i18next';
import { RepoOrder } from '../../../lib/graphql-types';
import { Collapsible } from '../../UI/Collapsible';
import { RadioList, RadioListProps } from '../../UI/RadioList';
import { FilterItem } from './filter-item.interface';

export interface OrderFilterItemProps extends FilterItem {
  value?: RadioListProps['value']['value'];
  onChange?: RadioListProps['onChange'];
}

export const OrderFilterItem = ({ open, ...props }: OrderFilterItemProps) => {
  const { t } = useTranslation('repo-filters');

  return (
    <Collapsible divider title={t('order.title')} open={open}>
      <RadioList
        options={[
          RepoOrder.TrendingWeekly,
          RepoOrder.TrendingMonthly,
          RepoOrder.StarsDesc,
          RepoOrder.CreatedDesc,
          RepoOrder.PushedDesc,
        ].map((order) => ({
          name: t(`order.options.${order}`),
          value: order,
        }))}
        value={{
          value: props.value,
          name: t(`order.options.${props.value}`),
        }}
        onChange={props.onChange}
      />
    </Collapsible>
  );
};
