const testData = {
  users: [
    { id: 1, picture_url: "xxx", name: "bob" },
    { id: 2, picture_url: "xyz", name: "john" },
    { id: 3, picture_url: "yyy", name: "tom" },
    { id: 4, picture_url: "zzz", name: "sarah" },
    { id: 5, picture_url: "qqq", name: "sam" },
    { id: 6, picture_url: "uuu", name: "zizzy" },
    { id: 7, picture_url: "ooo", name: "Joanna" },
    { id: 8, picture_url: "www", name: "sasha" },
    { id: 9, picture_url: "eee", name: "Tonto" },
    { id: 10, picture_url: "qqq", name: "Larry TAAATE" },
  ],

  messages: [
    {
      author: 1,
      receiver: 2,
      message: "Hey how is it going?",
      date: "2021-07-09T06:42:08.106Z",
    },
    {
      author: 2,
      receiver: 1,
      message: "Hey how is it going?",
      date: "2021-07-09T06:42:08.106Z",
    },
    {
      author: 2,
      receiver: 3,
      message: "Hey how is it going?",
      date: "2021-07-09T06:42:08.106Z",
    },
    {
      author: 2,
      receiver: 1,
      message: "Hey how is it going?",
      date: "2021-07-09T06:42:08.106Z",
    },
    {
      author: 1,
      receiver: 3,
      message: "Hey how is it going?",
      date: "2021-07-09T06:42:08.106Z",
    },
    {
      author: 1,
      receiver: 4,
      message: "Hey how is it going?",
      date: "2021-07-09T06:42:08.106Z",
    },
    {
      author: 2,
      receiver: 6,
      message: "Hey how is it going?",
      date: "2021-07-09T06:42:08.106Z",
    },
    {
      author: 8,
      receiver: 1,
      message: "Hey how is it going?",
      date: "2021-07-09T06:42:08.106Z",
    },
    {
      author: 2,
      receiver: 3,
      message: "Hey how is it going?",
      date: "2021-07-09T06:42:08.106Z",
    },
    {
      author: 1,
      receiver: 2,
      message: "Hey how is it going?",
      date: "2021-07-09T06:42:08.106Z",
    },
  ],

  id: 2,
};

const getUsersFromMessages = (messages, allUsers, id) => {
  const userIds = [];
  messages.forEach((message) => {
    if (message.author === id && !userIds.includes(message.receiver)) {
      userIds.push(message.receiver);
    }
    if (message.receiver === id && !userIds.includes(message.author)) {
      userIds.push(message.receiver);
    }
  });
  console.log(userIds);

  const users = [];
  allUsers.forEach((user) => {
    for (let id of userIds) {
      if (id === user.id) {
        users.push(user);
      }
    }
  });
  return users;
};

console.log(
  getUsersFromMessages(testData.messages, testData.users, testData.id)
);
