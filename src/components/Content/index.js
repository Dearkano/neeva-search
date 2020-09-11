import React from "react";
import { connect } from "dva";
import { List, Card, Tag, Result } from "antd";
import { HeartTwoTone } from "@ant-design/icons";
import dayjs from "dayjs";
import styles from "./index.less";

const Contents = ({ dispatch, data }) => {
  let content = data.content;
  if (data.filter !== "All") {
    content = content.filter((item) => item.type === data.filter.toLowerCase());
  }
  const addStar = (item) => {
    dispatch({
      type: "data/addStar",
      payload: { item },
    });
  };
  const deleteStar = (item) => {
    dispatch({
      type: "data/deleteStar",
      payload: { item },
    });
  };
  return (
    <List className={styles["list"]}>
      {content.length === 0 && !data.isFirst && (
        <Result
          title="Oops, no matching results"
          subTitle="Sorry, the content you searched does not exist."
        />
      )}
      {content.map((item) => {
        if (item.type === "calendar")
          return (
            <List.Item
              className={styles["list-item"]}
              key={`${Math.random()}${Date.now()}`}
            >
              <Card
                className={styles["card"]}
                title={item.data.title}
                extra={
                  <span>
                    <Tag color="magenta">Calendar</Tag>{" "}
                    <HeartTwoTone
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        item.isStar ? deleteStar(item) : addStar(item)
                      }
                      twoToneColor={item.isStar ? "#eb2f96" : "#cccccc"}
                    />
                  </span>
                }
              >
                <p>Time: {dayjs(item.data.date).format("YYYY-MM-DD HH:mm")}</p>
                <p>Invitees: {item.data.invitees}</p>
              </Card>
            </List.Item>
          );
        else if (item.type === "slack") {
          return (
            <List.Item
              className={styles["list-item"]}
              key={`${Math.random()}${Date.now()}`}
            >
              <Card
                className={styles["card"]}
                title={item.data[0].channel}
                extra={
                  <span>
                    <Tag color="volcano">Slack</Tag>{" "}
                    <HeartTwoTone
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        item.isStar ? deleteStar(item) : addStar(item)
                      }
                      twoToneColor={item.isStar ? "#eb2f96" : "#cccccc"}
                    />
                  </span>
                }
              >
                {item.data.map((obj) => {
                  const { author, message, timestamp } = obj;
                  return (
                    <Card
                      title={`${author} posted at ${dayjs(timestamp).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}`}
                    >
                      <p>{message}</p>
                    </Card>
                  );
                })}
              </Card>
            </List.Item>
          );
        } else if (item.type === "tweet") {
          return (
            <List.Item
              className={styles["list-item"]}
              key={`${Math.random()}${Date.now()}`}
            >
              <Card
                className={styles["card"]}
                title={item.data[0].user}
                extra={
                  <span>
                    <Tag color="cyan">Tweet</Tag>{" "}
                    <HeartTwoTone
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        item.isStar ? deleteStar(item) : addStar(item)
                      }
                      twoToneColor={item.isStar ? "#eb2f96" : "#cccccc"}
                    />
                  </span>
                }
              >
                <List>
                  {item.data.map((obj) => (
                    <List.Item>
                      <p>{obj.message}</p>
                      <p>
                        {dayjs(obj.timestamp).format("YYYY-MM-DD HH:mm:ss")}
                      </p>
                    </List.Item>
                  ))}
                </List>
              </Card>
            </List.Item>
          );
        } else if (item.type === "dropbox") {
          return (
            <List.Item
              className={styles["list-item"]}
              key={`${Math.random()}${Date.now()}`}
            >
              <Card
                className={styles["card"]}
                title={item.data.title}
                extra={
                  <span>
                    <Tag color="purple">Dropbox</Tag>{" "}
                    <HeartTwoTone
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        item.isStar ? deleteStar(item) : addStar(item)
                      }
                      twoToneColor={item.isStar ? "#eb2f96" : "#cccccc"}
                    />
                  </span>
                }
              >
                <p>
                  path: <a href={item.data.path}>{item.data.path}</a>
                </p>
                <p>
                  {item.data.shared_with.map((email) => (
                    <a
                      style={{ marginRight: "2rem" }}
                      href={`mailto: ${email}`}
                    >
                      {email}
                    </a>
                  ))}
                </p>
              </Card>
            </List.Item>
          );
        } else {
          return (
            <List.Item
              className={styles["list-item"]}
              key={`${Math.random()}${Date.now()}`}
            >
              <Card
                className={styles["card"]}
                title={item.data[0].company}
                extra={
                  <span>
                    <Tag color="gold">Contacts</Tag>{" "}
                    <HeartTwoTone
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        item.isStar ? deleteStar(item) : addStar(item)
                      }
                      twoToneColor={item.isStar ? "#eb2f96" : "#cccccc"}
                    />
                  </span>
                }
              >
                <List>
                  {item.data.map((obj) => {
                    return (
                      <List.Item
                        className={styles["list-item"]}
                        key={`${Math.random()}${Date.now()}`}
                      >
                        <Card className={styles["card"]} title={obj.name}>
                          {obj.phones.map((phone) => (
                            <p>{phone}</p>
                          ))}
                          <p>
                            {obj.emails.map((email) => (
                              <a
                                style={{ marginRight: "2rem" }}
                                href={`mailto: ${email}`}
                              >
                                {email}
                              </a>
                            ))}
                          </p>
                          <p>
                            Last Contact at{" "}
                            {dayjs(obj.last_contact).format("YYYY-MM-DD")}
                          </p>
                        </Card>
                      </List.Item>
                    );
                  })}
                </List>
              </Card>
            </List.Item>
          );
        }
      })}
    </List>
  );
};

export default connect(({ data }) => ({ data }))(Contents);
