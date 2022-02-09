import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { ReportableType, useReportMutation } from '../../lib/graphql-types';
import { Button } from '../UI/Button/Button';
import { Input } from '../UI/Input/Input';
import { Modal } from '../UI/Modal';
import { RadioList } from '../UI/RadioList';

interface ReportProps {
  subject: ReportableType;
  subjectId: string;
  reasons: Reason[];
  modalTitle?: string;
  modalDescription?: string;
  buttonTitle?: string;
}

export interface Reason {
  name: string;
  value: string | null;
  customValue?: boolean;
}

export const Report = ({
  subject,
  subjectId,
  reasons,
  modalTitle,
  modalDescription,
  buttonTitle,
}: ReportProps) => {
  const { t } = useTranslation('report');

  modalTitle = modalTitle || t('report');
  modalDescription = modalDescription || t('report-description');
  buttonTitle = buttonTitle || t('report-button');

  const [report, { data, loading }] = useReportMutation();

  const [showReportModal, setShowReportModal] = useState(false);

  // This is for the raw report reason itself
  const [reportReason, setReportReason] = useState('');

  // And this is for the selected radio input option
  const [selectedReportReason, setSelectedReportReason] = useState<Reason>(
    reasons[0]
  );

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
            onChange={(reason: Reason) => {
              setReportReason(reason.value);
              setSelectedReportReason(reason);
            }}
          />
          {selectedReportReason?.customValue && (
            <Input.Textarea
              rows={5}
              placeholder={t('custom-report-placeholder')}
              className="w-full"
              onChange={(event) => {
                setReportReason(event.target.value);
              }}
            />
          )}
          <Button.Primary
            disabled={
              loading ||
              (selectedReportReason.customValue === true &&
                (reportReason || '').trim().length <= 5)
            }
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
            {t('report-submit')}
          </Button.Primary>
        </div>
      </Modal>
      <Button.Ghost
        onClick={() => {
          setReportReason('');
          setSelectedReportReason(reasons[0]);
          setShowReportModal(true);
        }}
      >
        {t('report-button')}
      </Button.Ghost>
    </>
  );
};
