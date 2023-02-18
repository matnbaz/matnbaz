import { localize, MINIMUM_STARS } from 'common';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import {
  PlatformType,
  useSendSubmissionMutation,
} from '../../lib/graphql-types';
import { Button } from '../UI/Button/Button';
import { Input } from '../UI/Input/Input';

export const SubmitUserForm = () => {
  const { t } = useTranslation('submit-user');
  const { locale } = useRouter();
  const [submit, { data, loading, error }] = useSendSubmissionMutation();
  const [username, setUsername] = useState('');

  const sendSubmissionInfo = useCallback(async () => {
    try {
      const { data, errors } = await submit({
        variables: { username, platform: PlatformType.GitHub },
      });
      if (data.sendSubmission.submission.id) setUsername('');
    } catch (e) {
      //
    }
  }, [username, submit]);

  const isValidated = useMemo(() => username.length > 0, [username]);

  return (
    <>
      <p className="mt-5">
        {t('about-submission')}{' '}
        <span className="font-bold">
          {t('submission-requirements', {
            minStars: localize(MINIMUM_STARS, locale),
          })}
        </span>
      </p>

      <div className="space-y-3 mt-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isValidated) sendSubmissionInfo();
          }}
          className="flex items-center space-x-2 rtl:space-x-reverse w-full"
        >
          <Input.Text
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            dir="ltr"
            wrapperClassName="w-full"
            className="w-full"
            placeholder="GitHub username"
          />
          <Button.Primary disabled={!isValidated || loading} type="submit">
            {t('submit')}
          </Button.Primary>
        </form>
        {data && (
          <div
            className={classNames(
              'mt-4 text-sm',
              data.sendSubmission.submission ? 'text-green-600' : 'text-red-600'
            )}
          >
            {data.sendSubmission.submission
              ? t('submitted')
              : data.sendSubmission.userErrors[0]?.message || ''}
          </div>
        )}
        {error && (
          <div className="mt-4 text-sm text-red-600">{t('error-occurred')}</div>
        )}
      </div>
    </>
  );
};
