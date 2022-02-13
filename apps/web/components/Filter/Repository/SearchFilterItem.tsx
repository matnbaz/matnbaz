import { useTranslation } from 'next-i18next';
import { AiOutlineSearch } from 'react-icons/ai';
import { Collapsible } from '../../UI/Collapsible';
import { Input, InputProps } from '../../UI/Input/Input';
import { FilterItem } from './filter-item.interface';

export interface SearchFilterItemProps extends FilterItem {
  value?: InputProps['value'];
  onChange?: (value: string) => unknown;
}

export const SearchFilterItem = ({
  open,
  value,
  onChange,
  ...props
}: SearchFilterItemProps) => {
  const { t } = useTranslation('repo-filters');

  return (
    <Collapsible title={t(`search.title`)} open={open}>
      <Input.Text
        placeholder={t(`search.placeholder`)}
        icon={AiOutlineSearch}
        wrapperClassName="w-full"
        className="w-full"
        value={value}
        onChange={(event) => {
          if (onChange) {
            onChange(event.target.value);
          }
        }}
        {...props}
      />
    </Collapsible>
  );
};
