let courseApi = "http://localhost:3000/courses";

function start() {
  getCourses(renderCourses);
  handleCreateForm();
}

start();
// Functions
function getCourses(callback) {
  fetch(courseApi)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

function createCourses(data, callback) {
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(courseApi, options);
}

function handleDeleteCourse(id) {
  let options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(courseApi + "/" + id, options)
    .then(function (response) {
      return response.json();
    })
    .then(function () {
      let courseItem = document.querySelector(".course-item-" + id);
      if (courseItem) {
        courseItem.remove();
      }
    });
}

function renderCourses(courses) {
  let listCourseBlock = document.getElementById("list-courses");
  let htmls = courses.map(function (course) {
    return `<li class="course-item-${course.id}">
    <h4>${course.name}</h4><p>${course.desc}</p>
    <button onclick="handleDeleteCourse(${course.id})">Xóa</button>
    </li>`;
  });
  listCourseBlock.innerHTML = htmls.join("");
}

function handleCreateForm() {
  let createBtn = document.querySelector("#create");
  createBtn.onclick = function () {
    let name = document.querySelector('input[name="name"]').value;
    let desc = document.querySelector('input[name="desc"]').value;
    let formData = {
      name: name,
      desc: desc,
    };
    createCourses(formData);
  };
}
