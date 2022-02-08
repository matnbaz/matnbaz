import { useTranslation } from 'next-i18next';
import React from 'react';
import { ReportableType } from '../../lib/graphql-types';
import { Reason, Report } from './Report';

export interface OwnerReportProps {
  owner: { name?: string; login: string; id: string };
}

export const OwnerReport = ({ owner }: OwnerReportProps) => {
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
      subject={ReportableType.Owner}
      subjectId={owner.id}
      modalTitle={t('report-repository.title')}
      modalDescription={t('report-repository.description', {
        name: owner.name || owner.login,
      })}
      reasons={reasons}
    />
  );
};
