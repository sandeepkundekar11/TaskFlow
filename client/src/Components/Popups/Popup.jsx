// eslint-disable-next-line react/prop-types
const Popup = ({ children }) => {
    return (
        <div className="w-screen h-screen popup flex justify-center items-center">
            {children}
        </div>
    )
}
export default Popup