import classNames from 'classnames';
import { useState } from 'react';
import SubmitUserForm from '../Form/SubmitUserForm';
import Modal from '../UI/Modal';

interface ISubmitUserModalProps {
  title?: string;
  className?: string;
}

const SubmitUserModal = ({
  title = 'ثبت کاربر',
  className,
}: ISubmitUserModalProps) => {
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

export default SubmitUserModal;
