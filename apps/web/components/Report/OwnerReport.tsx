import { useTranslation } from 'next-i18next';
import { ReportableType } from '../../lib/graphql-types';
import { Reason, Report, ReportProps } from './Report';

export interface OwnerReportProps
  extends Omit<
    ReportProps,
    'subject' | 'subjectId' | 'modalTitle' | 'modalDescription' | 'reasons'
  > {
  owner: { name?: string; login: string; id: string };
}

export const OwnerReport = ({ owner, ...props }: OwnerReportProps) => {
  const { t } = useTranslation('report');

  const reasons: Reason[] = [
    {
      name: t('reasons.non-iranian'),
      value: t('reasons.non-iranian'),
    },
    {
      name: t('reasons.inappropriate-name-or-avatar'),
      value: t('reasons.inappropriate-name-or-avatar'),
    },
    {
      name: t('reasons.other'),
      value: null,
      customValue: true,
    },
  ];

  return (
    <Report
      subject={ReportableType.Owner}
      subjectId={owner.id}
      modalTitle={t('report-owner.title')}
      modalDescription={t('report-owner.description', {
        name: owner.name || owner.login,
      })}
      reasons={reasons}
      {...props}
    />
  );
};
