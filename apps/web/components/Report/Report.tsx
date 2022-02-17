import { useTranslation } from 'next-i18next';
import { useCallback, useEffect, useState } from 'react';
import { ReportableType, useReportMutation } from '../../lib/graphql-types';
import { Button } from '../UI/Button/Button';
import { Input } from '../UI/Input/Input';
import { Modal } from '../UI/Modal';
import { RadioList } from '../UI/RadioList';

export interface ReportProps {
  subject: ReportableType;
  subjectId: string;
  reasons: Reason[];
  modalTitle?: string;
  modalDescription?: string;
  buttonTitle?: string;
  button?: ({ onClick: any, children: string }) => JSX.Element;
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
  button,
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

  const onButtonClick = useCallback(() => {
    setReportReason('');
    setSelectedReportReason(reasons[0]);
    setShowReportModal(true);
  }, [reasons]);

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
      {button ? (
        button({ children: t('report-button'), onClick: onButtonClick })
      ) : (
        <Button.Ghost
          onClick={() => {
            onButtonClick();
          }}
        >
          {t('report-button')}
        </Button.Ghost>
      )}
    </>
  );
};
