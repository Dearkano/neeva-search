# ACME Search
**Author: Zijun Tian**

## Steps to run
`npm install`

`npm start`

`open localhost:8000`

## Overview

### Frameworks
* Dva.js
* Ant Design

### Data
The project uses Mock.js as the server to respond the APIs, therefore, some data processes are done in /mock/test.js.

Different data source need to be dealt seperately. For Slack and Tweet, some items with the same channel or user should be displayed together. For contacts, users belong to the same company should be displayed together.

Additionally, there's no unique key so I add one use md5.

As for sorting, messages are sorted by timestamp or last_contact in decreasing order since users tend to see the latest information first.

### History
When user finished one search, the search term will be recorded in localStorage and be displayed in the autocomplete component. The history is sorted by the adding order, so the last search will be the bottom. And history's length will not be greater than 10.

### Star
Users can tag the search result as star, and the stars are stored in localStorage. Hashed keys are used to identify the item. Users can click the 'My Star' on the topright of the page to review the stars.

### Filter
A select component is placed on the right of the search component. Users can set the filter to review the source as desired.

### Time format
dayjs is used to format the timestamp. Different data source is formated in different precision. For tweet and slack, we need to fix the time to second. However, for calendar, minute is precise enough. 