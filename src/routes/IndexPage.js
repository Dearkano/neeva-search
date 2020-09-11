import React from "react";
import { connect } from "dva";
import { Layout, Badge } from "antd";
import styles from "./IndexPage.css";
import Search from "../components/Search";
import Contents from "../components/Content";
import "antd/dist/antd.css";

const { Header, Footer, Content } = Layout;

function IndexPage({ data, dispatch }) {
  const showStars = () => {
    dispatch({
      type: "data/showStars",
    });
  };
  return (
    <Layout>
      <Header className={styles["header"]}>
        <div className={styles["title"]}>ACME Search</div>
        <Badge count={data.stars.length}>
          <div className={styles["button"]} onClick={showStars}>
            My Stars
          </div>
        </Badge>
      </Header>
      <Content style={{ minHeight: "85vh" }} className={styles["content"]}>
        <Search />
        <Contents />
      </Content>
      <Footer className={styles["footer"]}>
        Zijun Tian | Cornell Tech |{" "}
        <a href="mailto:zt248@cornell.edu">zt248@cornell.edu</a> |
        <a href="https://github.com/Dearkano">Github</a> |
        <a href="https://www.linkedin.com/in/vaynetian/">Linkedin</a>
      </Footer>
    </Layout>
  );
}

IndexPage.propTypes = {};

export default connect(({ data }) => ({ data }))(IndexPage);
