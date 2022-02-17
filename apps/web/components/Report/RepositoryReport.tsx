import { useTranslation } from 'next-i18next';
import { ReportableType } from '../../lib/graphql-types';
import { Reason, Report, ReportProps } from './Report';

export interface RepositoryReportProps
  extends Omit<
    ReportProps,
    'subject' | 'subjectId' | 'modalTitle' | 'modalDescription' | 'reasons'
  > {
  repository: { fullName: string; id: string };
}

export const RepositoryReport = ({
  repository,
  ...props
}: RepositoryReportProps) => {
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
      subject={ReportableType.Repository}
      subjectId={repository.id}
      modalTitle={t('report-owner.title')}
      modalDescription={t('report-owner.description', {
        name: repository.fullName,
      })}
      reasons={reasons}
      {...props}
    />
  );
};
