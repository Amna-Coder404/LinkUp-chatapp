// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { createContext, useContext, useEffect, useMemo, useState } from "react";
// import { PaperProvider } from "react-native-paper";

// import { darkTheme, lightTheme } from "../constants/theme";

// const ThemeContext = createContext(null);

// const THEME_KEY = "@linkup_theme";

// export const ThemeProvider = ({ children }) => {
//     const [isDark, setIsDark] = useState(true);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         loadTheme();
//     }, []);

//     const loadTheme = async () => {
//         try {
//             const savedTheme = await AsyncStorage.getItem(THEME_KEY);

//             if (savedTheme) {
//                 setIsDark(savedTheme === "dark");
//             }
//         } catch (error) {
//             console.log("THEME LOAD ERROR:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const toggleTheme = async () => {
//         const newIsDark = !isDark;

//         setIsDark(newIsDark);

//         try {
//             await AsyncStorage.setItem(
//                 THEME_KEY,
//                 newIsDark ? "dark" : "light"
//             );
//         } catch (error) {
//             console.log("THEME SAVE ERROR:", error);
//         }
//     };

//     const theme = useMemo(
//         () => (isDark ? darkTheme : lightTheme),
//         [isDark]
//     );

//     if (loading) return null;

//     return (
//         <ThemeContext.Provider
//             value={{
//                 isDark,
//                 toggleTheme,
//             }}
//         >
//             <PaperProvider theme={theme}>
//                 {children}
//             </PaperProvider>
//         </ThemeContext.Provider>
//     );
// };

// export const useAppTheme = () => {
//     const context = useContext(ThemeContext);

//     if (!context) {
//         throw new Error(
//             "useAppTheme must be used inside ThemeProvider"
//         );
//     }

//     return context;
// };