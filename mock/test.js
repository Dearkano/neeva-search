import md5 from "md5";
import tweet from "./tweet.json";
import calendar from "./calendar.json";
import contacts from "./contacts.json";
import dropbox from "./dropbox.json";
import slack from "./slack.json";

module.exports = {
  "GET /api/search": (req, res) => {
    const { q } = req.query;
    const ans = [];

    // deal with slack
    let arr = [];
    for (const item of slack.slack) {
      if (item.matching_terms.includes(q)) {
        arr.push(item);
      }
    }
    const channels = arr.reduce((a, b) => {
      if (!a[b.channel]) a[b.channel] = [];
      a[b.channel].push(b);
      return a;
    }, {});
    arr = [];
    for (const key of Object.keys(channels)) {
      channels[key].sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
      arr.push({
        type: "slack",
        data: channels[key],
        key: md5(channels[key]),
      });
    }

    ans.push(...arr);
    // deal with tweet
    arr = [];
    for (const item of tweet.tweet) {
      if (item.matching_terms.includes(q)) {
        arr.push(item);
      }
    }
    const users = arr.reduce((a, b) => {
      if (!a[b.user]) a[b.user] = [];
      a[b.user].push(b);
      return a;
    }, {});

    arr = [];
    for (const key of Object.keys(users)) {
      users[key].sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
      arr.push({ type: "tweet", data: users[key], key: md5(users[key]) });
    }
    ans.push(...arr);

    // deal with contacts
    arr = [];
    for (const item of contacts.contacts) {
      if (item.matching_terms.includes(q)) {
        arr.push(item);
      }
    }

    const companies = arr.reduce((a, b) => {
      if (!a[b.company]) a[b.company] = [];
      a[b.company].push(b);
      return a;
    }, {});
    const newArr = [];
    for (const key of Object.keys(companies)) {
      newArr.push({
        type: "contacts",
        data: companies[key],
        key: md5(companies[key]),
      });
    }

    newArr.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
    ans.push(...newArr);

    // deal with calendar
    arr = [];
    for (const item of calendar.calendar) {
      if (item.matching_terms.includes(q)) {
        arr.push({
          type: "calendar",
          data: item,
          key: md5(JSON.stringify(item)),
        });
      }
    }
    arr.sort((a, b) => (a.date < b.date ? 1 : -1));
    ans.push(...arr);

    // deal with dropbox
    for (const item of dropbox.dropbox) {
      if (item.matching_terms.includes(q)) {
        ans.push({
          type: "dropbox",
          data: item,
          key: md5(JSON.stringify(item)),
        });
      }
    }

    res.send({
      data: ans,
    });
  },
};
