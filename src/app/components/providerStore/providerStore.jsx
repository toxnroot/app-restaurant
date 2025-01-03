"use client"
import { Provider } from "react-redux";
import store from "@/app/store"; // تأكد من استيراد store بشكل صحيح

const ProviderStore = ({ children }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}

export default ProviderStore;
