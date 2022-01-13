import React from 'react';
import { ReportableType } from '../../lib/graphql-types';
import { IReason, Report } from './Report';

export interface IOwnerReportProps {
  owner: { login: string; id: string };
}

export const OwnerReport = ({ owner }: IOwnerReportProps) => {
  const reasons: IReason[] = [
    {
      name: 'تصویر یا نام غیر اخلاقی',
      value: 'این کاربر یک تصویر و یا نام غیر اخلاقی برای خود انتخاب کرده است.',
    },
    {
      name: 'حساب غیر ایرانی',
      value: 'این کاربر ایرانی نمی باشد.',
    },
    {
      name: 'دیگر',
      customValue: true,
    },
  ];

  return (
    <Report
      subject={ReportableType.Owner}
      subjectId={owner.id}
      modalTitle={`گزارش کاربر`}
      modalDescription={`درصورتی که ${owner.login} یکی از موارد ذیل و یا یکی از قوانین سایت را نقض کرده است، از شما در خواست می شود به ما گزارش دهید.`}
      reasons={reasons}
    />
  );
};
