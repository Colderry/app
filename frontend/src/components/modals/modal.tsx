import classNames from 'classnames';
import { useSnackbar } from 'notistack';
import ReactModal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux';
import { actions as ui, closeModal, openSaveChanges } from '../../store/ui';

export interface ModalProps {
  typeName: string;
  size?: keyof typeof sizeClass;
  className?: string;
}

const sizeClass = {
  'sm': 'rounded-lg w-1/4 inset-x-1/3 inset-y-1/3',
  'md': 'rounded-lg w-1/3 inset-x-1/3 inset-y-1/4',
  'lg': 'rounded-lg w-1/3 inset-x-1/3 top-1/4',
  'full': 'h-full w-full',
};
 
const Modal: React.FunctionComponent<ModalProps> = ({ className, typeName, size, children }) => {
  const dispatch = useDispatch();
  const openModal = useSelector((s: Store.AppState) => s.ui.openModal);
  const { closeSnackbar } = useSnackbar();

  return (
    <ReactModal
      className={classNames(
        `bg-bg-primary overflow-auto fixed outline-none`,
        className,
        sizeClass[size ?? 'sm']
      )}
      appElement={document.querySelector('#root')!}
      isOpen={openModal === typeName}
      onRequestClose={() => {
        dispatch(closeModal);
        closeSnackbar('saveChanges');
      }}>{children}</ReactModal>
  );
}
 
export default Modal;