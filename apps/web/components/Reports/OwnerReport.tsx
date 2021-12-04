import React, { useEffect, useState } from 'react';
import { useReportOwnerMutation } from '../../lib/graphql-types';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Modal from '../UI/Modal';
import RadioList from '../UI/RadioList';
import Report, { IReason } from './Report';

interface IOwnerReportProps {
  owner: { login: string; id: string };
}

const OwnerReport = ({ owner }: IOwnerReportProps) => {
  const [reportOwner, { data, loading }] = useReportOwnerMutation();

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
      modalTitle={`گزارش کاربر`}
      modalDescription={`درصورتی که ${owner.login} یکی از موارد ذیل و یا یکی از قوانین سایت را نقض کرده است، از شما در خواست می شود به ما گزارش دهید.`}
      reasons={reasons}
      loading={loading}
      data={data}
      onReport={(reason) => {
        reportOwner({
          variables: {
            id: owner.id,
            reason,
          },
        });
      }}
    />
  );
};

export default OwnerReport;
