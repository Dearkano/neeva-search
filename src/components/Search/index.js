import React, { useState } from "react";
import { AutoComplete, Select, Input } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import styles from "./index.css";
import { connect } from "dva";

const Component = ({ dispatch, data }) => {
  const [searchTerm, setSearchTerm] = useState("");

  let history = localStorage.getItem("history")
    ? JSON.parse(localStorage.getItem("history"))
    : [];

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const onSearch = () => {
    if (!searchTerm) return;
    dispatch({
      type: "data/search",
      payload: { searchTerm },
    });
  };

  const handleSelect = (value) => {
    if (!value) return;
    setSearchTerm(value);
    dispatch({
      type: "data/search",
      payload: { searchTerm: value },
    });
  };

  const onKeyUp = (e) => {
    if (e.keyCode === 13) {
      onSearch();
    }
  };

  const setFilter = (v) => {
    dispatch({
      type: "data/setFilter",
      payload: { filter: v },
    });
  };

  history = history.filter((s) => s.startsWith(searchTerm));
  const options = history.map((str) => {
    return { value: str };
  });
  console.log("search =" + searchTerm);
  return (
    <div className={styles["search-wrapper"]}>
      <div className={styles["button-row"]}>
        <AutoComplete
          dropdownMatchSelectWidth={252}
          style={{ width: "40rem" }}
          onSearch={handleSearch}
          onSelect={handleSelect}
          onKeyUp={onKeyUp}
          options={options}
          size="large"
          value={searchTerm}
        >
          <Input.Search
            size="large"
            value={searchTerm}
            autoFocus
            enterButton
            suffix={<CloseOutlined onClick={() => setSearchTerm("")} />}
          />
        </AutoComplete>
        <Select
          style={{ marginLeft: "2rem", width: 120 }}
          onSelect={setFilter}
          defaultValue="All"
          size="large"
        >
          {["All", "Contacts", "Slack", "Tweet", "Dropbox", "Calendar"].map(
            (item) => (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            )
          )}
        </Select>
      </div>
    </div>
  );
};
export default connect(({ data }) => ({ data }))(Component);
