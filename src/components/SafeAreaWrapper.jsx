import { SafeAreaView, } from "react-native-safe-area-context";

function SafeAreaWrapper({ children }) {
    return (
        <SafeAreaView style={{ flex: 1, }}  >
            {children}
        </SafeAreaView>
    );
}

export default SafeAreaWrapper;