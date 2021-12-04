import React, { useEffect, useState } from 'react';
import { useReportOwnerMutation } from '../../lib/graphql-types';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Modal from '../UI/Modal';
import RadioList from '../UI/RadioList';

interface IReportProps {
  data: any;
  loading: boolean;
  reasons: IReason[];
  modalTitle?: string;
  modalDescription?: string;
  buttonTitle?: string;
  onReport?: (reason: string) => void;
}

export interface IReason {
  name: string;
  value?: string;
  customValue?: boolean;
}

const Report = ({
  reasons,
  data,
  loading,
  onReport,
  modalTitle = 'گزارش',
  modalDescription = 'درصورتی که یکی از موارد ذیل و یا یکی از قوانین سایت نقض شده است، از شما در خواست می شود به ما گزارش دهید.',
  buttonTitle = 'گزارش',
}: IReportProps) => {
  const [showReportModal, setShowReportModal] = useState(false);

  // This is for the raw report reason itself
  const [reportReason, setReportReason] = useState('');

  // And this is for the selected radio input option
  const [selectedReportReason, setSelectedReportReason] = useState<IReason>();

  useEffect(() => setShowReportModal(false), [data]);

  return (
    <>
      {' '}
      <Modal
        show={showReportModal}
        title={modalTitle}
        onClose={() => {
          if (!loading) setShowReportModal(false);
        }}
      >
        <div className="block space-y-6">
          <span>{modalDescription}</span>
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
              placeholder="بنویسید (حداقل ۵ کاراکتر)..."
              className="w-full"
              onChange={(event) => {
                setReportReason(event.target.value);
              }}
            />
          )}
          <Button.Primary
            disabled={loading || (reportReason || '').trim().length <= 5}
            onClick={() => {
              onReport?.(reportReason);
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
        {buttonTitle}
      </Button.Ghost>
    </>
  );
};

export default Report;
