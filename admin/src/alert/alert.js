import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


export const notifySuccess=(data)=>toast.success(data);
export const notifyFailure=(data)=>toast.failure(data);