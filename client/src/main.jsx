import ReactDOM from "react-dom/client"
import App from "./App"
import ToasterProvider from "./Components/MainComponents/Providers/ToasterProvider.jsx"
import "./index.css"
const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
    <ToasterProvider>
        <App />
    </ToasterProvider>
)