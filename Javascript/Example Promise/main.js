let users = [
  { id: 1, name: "Nguyen Van A" },
  { id: 2, name: "Nguyen Van B" },
  { id: 3, name: "Nguyen Van C" },
];

let comments = [
  {
    id: 1,
    userId: 1,
    comment: "Hello, how are you?",
  },
  {
    id: 2,
    userId: 2,
    comment: "Im fine, nice to meet you!",
  },
  {
    id: 3,
    userId: 1,
    comment: "Thanks",
  },
];

let getComments = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(comments), 1000);
  });
};

let getUserById = (userIds) => {
  let user = users.filter((user) => {
    return userIds.includes(user.id);
  });
  return new Promise((resolve) => setTimeout(() => resolve(user), 1000));
};

getComments()
  .then((comments) => {
    let userIds = comments.map((comment) => comment.userId);
    return getUserById(userIds).then((user) => ({
      users: user,
      comments: comments,
    }));
  })
  .then((data) => {
    let html = "";
    data.comments.forEach((comment) => {
      let user = data.users.filter((user) => {
        return user.id === comment.userId;
      });
      html += `<li>${user[0].name}: ${comment.comment}</li>`;
    });
    document.getElementById("box").innerHTML = html;
  });
