import { persianNumbers } from '@matnbaz/common';
import { Card, ICardProps } from '../UI/Card';

export interface ISelectionPreviewProps
  extends Omit<ICardProps, 'children' | 'href'> {
  selection: {
    id: string;
    title: string;
    issue: number;
    featuredAt: {
      formatted: string;
    };
    description?: string;
  };
}

export const SelectionPreview = ({
  selection,
  ...props
}: ISelectionPreviewProps) => {
  return (
    <Card {...props} href={`/selections/${selection.issue}`}>
      <div className="flex justify-between gap-4">
        <div className="space-y-1">
          <div className="text-lg font-bold">{selection.title}</div>
          {selection.description && (
            <div className="">{selection.description}</div>
          )}
          <div className="text-sm text-secondary">
            {selection.featuredAt.formatted}
          </div>
        </div>
        <h3 className="text-3xl font-bold">
          #{persianNumbers(selection.issue)}
        </h3>
      </div>
    </Card>
  );
};
