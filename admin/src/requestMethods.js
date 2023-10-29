// import axios from "axios";

// const URL = "http://localhost:5000/api/";
// const user= JSON.parse(localStorage.getItem("persist:root")).user;
// const currentUser=user && JSON.parse(user).currentUser;
// const TOKEN=currentUser?.accessToken;
// console.log()
// console.log(TOKEN);
// const TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjMzOWI1ZjA4YjcxNzRmZTZiNjgwNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1Nzk3MDk2MywiZXhwIjoxNjU4MjMwMTYzfQ.wRqeyhfdUDkA6iGK5OQGDqgbcd4O9wou2h46f96RZx8"
// export const publicRequest = axios.create({
//   baseURL: URL,
// });

// export const userRequest = axios.create({
//   baseURL: URL,
//   headers: { token: `Bearer ${TOKEN}` },
// });

import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

// const TOKEN =
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjMzOWI1ZjA4YjcxNzRmZTZiNjgwNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1ODM5ODYxOSwiZXhwIjoxNjU4NjU3ODE5fQ.XUCARZ0sS9U9MEn-5qBLO9oLDi1032z3yUQFynRVVPQ";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
console.log(user);
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

// console.log(TOKEN);

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
