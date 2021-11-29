import React, { useEffect, useState } from 'react';
import { useReportOwnerMutation } from '../../lib/graphql-types';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Modal from '../UI/Modal';
import RadioList from '../UI/RadioList';

interface IOwnerReportProps {
  owner: { login: string; id: string };
}

interface IReason {
  name: string;
  value: string;
  customValue?: boolean;
}

const OwnerReport = ({ owner }: IOwnerReportProps) => {
  const [showReportModal, setShowReportModal] = useState(false);

  // This is for the raw report reason itself
  const [reportReason, setReportReason] = useState('');

  // And this is for the selected radio input option
  const [selectedReportReason, setSelectedReportReason] = useState<IReason>();

  const [
    reportOwner,
    { data: reportedOwnerData, loading: reportOwnerLoading },
  ] = useReportOwnerMutation();

  useEffect(() => setShowReportModal(false), [reportedOwnerData]);

  const reasons: IReason[] = [
    {
      name: 'تصویر یا نام مستهجن',
      value: 'این کاربر یک تصویر و یا نام مستهجن برای خود انتخاب کرده است.',
    },
    {
      name: 'حساب غیر ایرانی',
      value: 'این کاربر ایرانی نمی باشد.',
    },
    {
      name: 'دیگر',
      value: '',
      customValue: true,
    },
  ];

  return (
    <>
      {' '}
      <Modal
        show={showReportModal}
        title="گزارش کاربر"
        onClose={() => {
          if (!reportOwnerLoading) setShowReportModal(false);
        }}
      >
        <div className="block space-y-6">
          <span>
            درصورتی که {owner.login} یکی از موارد ذیل و یا یکی از قوانین سایت را
            نقض کرده است، از شما در خواست می شود به ما گزارش دهید.
          </span>
          <RadioList
            options={reasons}
            value={selectedReportReason}
            onChange={(reason: IReason) => {
              setReportReason(reason.value);
              setSelectedReportReason(reason);
            }}
          />
          {selectedReportReason?.customValue && (
            <Input.Textarea
              rows={5}
              placeholder="بنویسید (حداقل 5 کاراکتر)..."
              className="w-full"
              onChange={(event) => {
                setReportReason(event.target.value);
              }}
            />
          )}
          <Button.Primary
            disabled={reportOwnerLoading || reportReason.trim().length <= 5}
            onClick={() => {
              reportOwner({
                variables: {
                  ownerId: owner.id,
                  reason: reportReason,
                },
              });
            }}
          >
            ارسال
          </Button.Primary>
        </div>
      </Modal>
      <Button.Ghost
        onClick={() => {
          setReportReason('');
          setSelectedReportReason(null);
          setShowReportModal(true);
        }}
      >
        گزارش
      </Button.Ghost>
    </>
  );
};

export default OwnerReport;
