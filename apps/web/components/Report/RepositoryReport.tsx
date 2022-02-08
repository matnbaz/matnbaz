import { useTranslation } from 'next-i18next';
import React from 'react';
import { ReportableType } from '../../lib/graphql-types';
import { Reason, Report } from './Report';

export interface RepositoryReportProps {
  repository: { fullName: string; id: string };
}

export const RepositoryReport = ({ repository }: RepositoryReportProps) => {
  const { t } = useTranslation('report');

  const reasons: Reason[] = [
    {
      name: t('reasons.inappropriate-name-or-avatar'),
      value: t('reasons.inappropriate-name-or-avatar'),
    },
    {
      name: t('reasons.non-iranian'),
      value: t('reasons.non-iranian'),
    },
    {
      name: t('reasons.other'),
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
    />
  );
};
