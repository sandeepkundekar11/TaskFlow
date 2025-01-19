/* eslint-disable react/prop-types */
import { ToastContainer } from 'react-toastify';
const ToasterProvider = ({ children }) => {
    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            {children}
        </>
    )
}
export default ToasterProvider