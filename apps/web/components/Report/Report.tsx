import React, { useEffect, useState } from 'react';
import { ReportableType, useReportMutation } from '../../lib/graphql-types';
import { Button } from '../UI/Button/Button';
import { Input } from '../UI/Input/Input';
import { Modal } from '../UI/Modal';
import { RadioList } from '../UI/RadioList';

interface IReportProps {
  subject: ReportableType;
  subjectId: string;
  reasons: IReason[];
  modalTitle?: string;
  modalDescription?: string;
  buttonTitle?: string;
}

export interface IReason {
  name: string;
  value?: string;
  customValue?: boolean;
}

export const Report = ({
  subject,
  subjectId,
  reasons,
  modalTitle = 'گزارش',
  modalDescription = 'درصورتی که یکی از موارد ذیل و یا یکی از قوانین سایت نقض شده است، از شما در خواست می شود به ما گزارش دهید.',
  buttonTitle = 'گزارش',
}: IReportProps) => {
  const [report, { data, loading }] = useReportMutation();

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
              report({
                variables: {
                  subject,
                  id: subjectId,
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
        {buttonTitle}
      </Button.Ghost>
    </>
  );
};
