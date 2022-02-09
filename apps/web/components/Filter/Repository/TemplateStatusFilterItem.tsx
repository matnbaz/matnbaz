import { useTranslation } from 'next-i18next';
import { TemplateStatusType } from '../../../lib/graphql-types';
import { Collapsible } from '../../UI/Collapsible';
import { RadioList, RadioListProps } from '../../UI/RadioList';
import { FilterItem } from './filter-item.interface';

export interface TemplateStatusFilterItemProps extends FilterItem {
  value?: RadioListProps['value']['value'];
  onChange?: RadioListProps['onChange'];
}

export const TemplateStatusFilterItem = ({
  open,
  ...props
}: TemplateStatusFilterItemProps) => {
  const { t } = useTranslation('repo-filters');

  return (
    <Collapsible title={t('template-status.title')} open={open}>
      <RadioList
        options={Object.values(TemplateStatusType).map((status) => ({
          value: status,
          name: t(`template-status.options.${status}`),
        }))}
        value={{
          value: props.value,
          name: t(`template-status.options.${props.value}`),
        }}
        onChange={props.onChange}
      />
    </Collapsible>
  );
};
