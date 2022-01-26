import React, { useState } from 'react';
import { ReportableType } from '../../lib/graphql-types';
import { Button } from '../UI/Button/Button';
import { Modal } from '../UI/Modal';
import { Reason, Report } from './Report';

export interface RepositoryReportProps {
  repository: { fullName: string; id: string };
}

export const RepositoryReport = ({ repository }: RepositoryReportProps) => {
  const [showOtherModal, setShowOtherModal] = useState(false);

  const reasons: Reason[] = [
    {
      name: 'محتوای غیر اخلاقی',
      value: 'این پروژه محتوا،‌ تصویر یا نام غیر اخلاقی دارد.',
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

  return repository.fullName !== 'matnbaz/matnbaz' ? (
    <Report
      subject={ReportableType.Repository}
      subjectId={repository.id}
      modalTitle={`گزارش پروژه`}
      modalDescription={`درصورتی که ${repository.fullName} یکی از موارد ذیل و یا یکی از قوانین سایت را نقض کرده است، از شما در خواست می شود به ما گزارش دهید.`}
      reasons={reasons}
    />
  ) : (
    // Why am I doing this
    <>
      <Button.Ghost
        onClick={() => {
          setShowOtherModal((previousState) => !previousState);
        }}
      >
        گزارش
      </Button.Ghost>
      <Modal
        title="گزارش پروژه"
        show={showOtherModal}
        onClose={() => {
          setShowOtherModal(false);
        }}
      >
        <span>درصورتی که {repository.fullName} یکی از موا... 🤔</span>
      </Modal>
    </>
  );
};
