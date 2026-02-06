import { useContext } from 'react';
import AlertContext from './context';

const useAlertContext = () => useContext(AlertContext);

export default useAlertContext;
