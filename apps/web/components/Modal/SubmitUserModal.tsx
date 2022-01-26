import classNames from 'classnames';
import { useState } from 'react';
import { SubmitUserForm } from '../Form/SubmitUserForm';
import { Modal } from '../UI/Modal';

export interface SubmitUserModalProps {
  title?: string;
  className?: string;
}

export const SubmitUserModal = ({
  title = 'ثبت کاربر',
  className,
}: SubmitUserModalProps) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          setShow(true);
        }}
        className={classNames(className, 'active:outline-none')}
      >
        {title}
      </button>
      <Modal
        title="ثبت کاربر"
        show={show}
        onClose={() => {
          setShow((previousState) => !previousState);
        }}
      >
        <SubmitUserForm />
      </Modal>
    </>
  );
};
