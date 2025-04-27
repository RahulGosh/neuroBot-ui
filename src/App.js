import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/themeContext";
import Layout from "./components/chatPage/layout/layout";
import AiPage from "./page/AiPage";
import LoginPage from "./page/loginPage";
import ChatPage from "./page/chatPage";
import SignUpPage from "./page/signUpPage";
import HomePage from "./page/homePage";

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={
            <Layout>
              <AiPage />
            </Layout>
          } />
          <Route path="/chat/:id" element={
            <Layout>
              <ChatPage />
            </Layout>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}