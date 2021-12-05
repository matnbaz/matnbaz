import React from 'react';
import { ReportableType } from '../../lib/graphql-types';
import Report, { IReason } from './Report';

interface IRepositoryReportProps {
  repository: { fullName: string; id: string };
}

const RepositoryReport = ({ repository }: IRepositoryReportProps) => {
  const reasons: IReason[] = [
    {
      name: 'تصویر یا نام غیر اخلاقی',
      value: 'این پروژه یک تصویر و یا نام غیر اخلاقی دارد.',
    },
    {
      name: 'پروژه غیر ایرانی',
      value: 'این پروژه ایرانی نمی باشد.',
    },
    {
      name: 'دیگر',
      customValue: true,
    },
  ];

  return (
    <Report
      subject={ReportableType.Repository}
      subjectId={repository.id}
      modalTitle={`گزارش پروژه`}
      modalDescription={`درصورتی که ${repository.fullName} یکی از موارد ذیل و یا یکی از قوانین سایت را نقض کرده است، از شما در خواست می شود به ما گزارش دهید.`}
      reasons={reasons}
    />
  );
};

export default RepositoryReport;
