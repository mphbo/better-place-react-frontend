// // This file is for various sorter and filter functions for opportunities

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

export const rowFilter = (
  opps,
  location = false,
  category = false,
  timeCommitment = false,
  description = false,
  distance = false
) => {
  let rows = [...opps];
  if (!location && !category && !timeCommitment && !description && !distance) {
    return rows;
  }

  if (location) {
    rows = rows.filter((opp) => {
      return opp.location === location;
    });
  }

  if (category) {
    rows = rows.filter((opp) => {
      return opp.category_id === category;
    });
  }

  if (timeCommitment) {
    rows = rows.filter((opp) => {
      return opp.time_commitment === timeCommitment;
    });
  }

  if (description) {
    rows = rows.filter((opp) => {
      return opp.description.toUpperCase().includes(description.toUpperCase());
    });
  }
  if (distance) {
    rows = rows.filter((opp) => {
      return opp.distance < distance;
    });
  }

  return rows;
};

export const columnSort = (opps, column = false) => {
  if (column) {
    const sortedOpps = opps.sort((a, b) => {
      console.log("column:", column);
      console.log("a[column]:", a[column]);
      console.log("b[column]:", b[column]);
      let nameA = a[column].toUpperCase();
      let nameB = b[column].toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    return sortedOpps;
  }
};

export const updateRows = (opps, userOpps) => {
  const rows = [...opps];
  rows.forEach((opp) => {
    return (opp.selected = false);
  });

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < userOpps.length; j++) {
      if (rows[i].id === userOpps[j].opportunity_id) {
        rows[i].selected = true;
      }
    }
  }
  return rows;
};

export const addOpportunity = (opps, id) => {
  const rows = [...opps];
  rows.forEach((opp) => {
    if (Number(id) === Number(opp.id)) {
      opp.selected = true;
      opp.volunteer_count += 1;
    }
  });
  return rows;
};

export const removeOpportunity = (opps, id) => {
  const rows = [...opps];
  rows.forEach((opp) => {
    if (Number(id) === Number(opp.id)) {
      opp.selected = false;
      opp.volunteer_count -= 1;
    }
  });
  return rows;
};

export const addUsersOpportunity = (userOpps, oppid) => {
  const rows = [...userOpps];
  rows.push({});
};

export const countVolunteersAdded = (opps, allUserOpps) => {
  const rows = [...opps];
  rows.forEach((opp) => {
    let count = 0;
    for (let userOpp of allUserOpps) {
      if (Number(userOpp.opportunity_id) === Number(opp.id)) {
        count += 1;
      }
    }
    opp.volunteer_count = count;
  });
  return rows;
};

export const getCompletedOpportunities = (opps) => {
  // filter through opportunities for already completed ones
  const rows = opps.filter((opp) => {
    // Get the date off of the current opportunity
    const date = new Date(opp.date);
    date.toString().valueOf();

    // Get the current date
    const currentDate = new Date();
    currentDate.toString().valueOf();

    // compare and return true if the opp was completed
    return date < currentDate ? true : false;
  });
  return rows;
};

export const getUncompletedOpportunities = (opps) => {
  // filter through opportunities for already completed ones
  const rows = opps.filter((opp) => {
    // Get the date off of the current opportunity
    const date = new Date(opp.date);
    date.toString().valueOf();

    // Get the current date
    const currentDate = new Date();
    currentDate.toString().valueOf();

    // compare and return true if the opp was not completed
    return date > currentDate ? true : false;
  });
  return rows;
};

export const getUsersForOpportunity = (oppId, users, usersOpps) => {
  if (!usersOpps) {
    return [];
  }
  const selectUserOpps = usersOpps.filter((userOpp) => {
    return oppId === userOpp.opportunity_id;
  });

  const usersList = users.filter((user) => {
    for (let userOpp of selectUserOpps) {
      if (userOpp.user_id === user.id) {
        return true;
      }
    }
    return false;
  });

  return usersList;
};

export const sortRowsByTimeCommitment = (opps, descending = false) => {
  // Break out all categories of time commitment into their own array
  const quick = opps.filter((opp) => {
    return opp.time_commitment === "Quick (Minutes)";
  });

  const short = opps.filter((opp) => {
    return opp.time_commitment === "Short (3 hours or less)";
  });

  const medium = opps.filter((opp) => {
    return opp.time_commitment === "Medium (8 hours or less)";
  });

  const long = opps.filter((opp) => {
    return opp.time_commitment === "Long (Full day)";
  });

  const extraLong = opps.filter((opp) => {
    return opp.time_commitment === "Extra Long (Multiple days)";
  });

  // Depending on whether the user chooses ascending or descending organize the arrays above in order, put them into an array and set in state in the application
  if (descending) {
    return [...extraLong, ...long, ...medium, ...short, ...quick];
  }
  return [...quick, ...short, ...medium, ...long, ...extraLong];
};

export const sortRowsByDate = (opps, descending = false) => {
  const sorted = [...opps];
  sorted.sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    return 0;
  });

  return descending ? sorted : sorted.reverse();
};

export const sortRowsByDistance = (opps, descending = false) => {
  const rows = [...opps];
  rows.sort((a, b) => {
    return a.distance - b.distance;
  });

  return rows;
};

export const getAverageRating = (reviews, id) => {
  const userReviews = reviews.filter((review) => {
    return review.user_id === id;
  });

  let total = 0;
  userReviews.forEach((review) => (total += review.rating));
  if (total > 0) {
    return total / userReviews.length;
  }
};

export const sortByRating = (opps) => {
  const rows = [...opps];
  rows.sort((a, b) => {
    return a.rating - b.rating;
  });
  return rows;
};

export const filterMessages = (messages, id) => {
  if (!messages) {
    return [];
  }
  const userMessages = messages.filter((message) => {
    return message.author === id || message.receiver === id;
  });

  return userMessages;
};

export const getUsersFromMessages = (messages, allUsers, id, newContactId) => {
  if (!messages || !allUsers) {
    return [];
  }
  const userIds = [];
  messages.forEach((message) => {
    if (
      message.author === id &&
      !userIds.includes(message.receiver) &&
      message.receiver !== id
    ) {
      userIds.push(message.receiver);
    }
    if (
      message.receiver === id &&
      !userIds.includes(message.author) &&
      message.author !== id
    ) {
      userIds.push(message.author);
    }
  });
  // const contact = allUsers.filter((user) => {
  //   if (user.id === newContactId) {
  //     console.log("user:", user);
  //   }
  //   return user.id === newContactId;
  // });
  if (!userIds.includes(newContactId)) {
    userIds.push(newContactId);
  }

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

// onst getUsersFromMessages = (messages, allUsers, id) => {
//   messages.forEach((message) => {
//     if (message.author === id && !userIds.includes(message.receiver)) {
//       userIds.push(message.receiver);
//     }
//     if (message.receiver === id && !userIds.includes(message.author)) {
//       userIds.push(message.receiver);
//     }
//   });
//   console.log(userIds);
// ;
//   const users = [];
//   allUsers.forEach;((user) => {
//     for (let id of userIds) {
//       if (id === user.id) {
//         users.push(user);
//       }
//     }
//   });
//   re;turn users;
// };;

export const getConversation = (messages, author, receiver) => {
  // console.log("author", author, "receiver", receiver);
  const conversation = messages.filter((message) => {
    return (
      (message.author === author || message.receiver === author) &&
      (message.receiver === receiver || message.author === receiver)
    );
  });
  // console.log("conversation:", conversation);
  return conversation;
};

export const getMessagesFromAuthor = (messageList, author) => {
  if (!messageList) {
    return [];
  }
  console.log("messageList:::", messageList);
  const messages = messageList.map((message) => {
    if (message.author === author && message.seen === false) {
      message.seen = true;
      return message;
    }
    return message;
  });

  return messages;
};
