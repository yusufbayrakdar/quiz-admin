import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "tailwindcss/tailwind.css";

import { store } from "../redux/configureStore";
import Container from "../components/Container";
import CustomHeader from "../components/CustomHeader";
import CustomDrawer from "../components/CustomDrawer";
import CustomSider from "../components/CustomSider";

const { Content, Sider } = Layout;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="h-screen overflow-hidden">
      <Provider store={store}>
        <Container>
          <Layout className="flex flex-col h-full">
            <CustomHeader />
            <Layout className="flex flex-col h-full">
              <CustomSider />
              <Content className="flex-1 flex items-center justify-center relative">
                <Component {...pageProps} />
                <CustomDrawer />
              </Content>
            </Layout>
          </Layout>
        </Container>
      </Provider>
    </div>
  );
}
export default MyApp;
