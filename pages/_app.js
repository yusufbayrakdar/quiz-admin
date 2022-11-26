import { Provider } from "react-redux";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "tailwindcss/tailwind.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { store } from "../redux/configureStore";
import Container from "../components/Container";
import CustomHeader from "../components/CustomHeader";
import CustomSider from "../components/CustomSider";

import "../styles/global.css";

const { Content } = Layout;

function MyApp({ Component, pageProps }) {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen overflow-hidden">
        <Provider store={store}>
          <Container>
            <Layout className="flex flex-col h-full">
              <CustomHeader />
              <Layout className="flex flex-col h-full">
                <CustomSider />
                <Content className="flex-1 flex justify-center overflow-scroll">
                  <Component {...pageProps} />
                </Content>
              </Layout>
            </Layout>
          </Container>
        </Provider>
      </div>
    </DndProvider>
  );
}
export default MyApp;
