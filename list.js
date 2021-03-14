const app = {
  count: 1,
  list: [],
  myData: "",
  moreData: "",
  //   create: createTask,
};

const listPlace = document.querySelector("#listPlace");
const taskInput = document.querySelector("input[name='task-input']");
const imp = document.querySelector("select[name='imp']");
const btn = document.querySelector("button[name='new']");
// localStorage.setItem("data", JSON.stringify([]));
// const myData = JSON.parse(localStorage.getItem("data"));
// if (!JSON.parse(localStorage.getItem("data"))) {
//   localStorage.setItem("data", JSON.stringify([]));
// }

//Create
const showList = (data) => {
  // const myData = JSON.parse(localStorage.getItem("data"));
  // console.log(myData);
  listPlace.innerHTML = "";
  console.log(data);

  data.forEach(async (task, index) => {
    const d = await fetchPersonInfo(task);
    console.log(d);
    const wrap = document.createElement("div");
    wrap.classList.add("wrap");
    const idDiv = document.createElement("div");
    idDiv.classList.add("id");
    idDiv.textContent = task.id;
    wrap.appendChild(idDiv);
    const fmDiv = document.createElement("div");
    fmDiv.classList.add("fn");
    fmDiv.textContent = task.firstName;
    wrap.appendChild(fmDiv);
    const lnDiv = document.createElement("div");
    lnDiv.classList.add("ln");
    lnDiv.textContent = task.lastName;
    wrap.appendChild(lnDiv);
    const capDiv = document.createElement("div");
    capDiv.classList.add("cap");
    capDiv.textContent = task.capsule;
    wrap.appendChild(capDiv);
    const ageDiv = document.createElement("div");
    ageDiv.classList.add("age");
    ageDiv.textContent = d.age;
    wrap.appendChild(ageDiv);
    const cityDiv = document.createElement("div");
    cityDiv.classList.add("city");
    cityDiv.textContent = d.city;
    wrap.appendChild(cityDiv);
    const genderDiv = document.createElement("div");
    genderDiv.classList.add("gender");
    genderDiv.textContent = d.gender;
    wrap.appendChild(genderDiv);
    const hobbyDiv = document.createElement("div");
    hobbyDiv.classList.add("hobby");
    hobbyDiv.textContent = d.hobby;
    wrap.appendChild(hobbyDiv);

    const updateDiv = document.createElement("div");
    updateDiv.classList.add("updateDiv");
    // updateDiv.classList.add("notVisible");
    wrap.appendChild(updateDiv);
    // const taskName = document.createElement("p");
    // taskName.textContent = task.name;
    // idDiv.appendChild(taskName);

    // const taskSub = document.createElement("p");
    // taskSub.textContent = task.date;
    // idDiv.appendChild(taskSub);
    listPlace.appendChild(wrap);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", () => removeTask(index));
    updateDiv.appendChild(deleteBtn);

    const updateBtn = document.createElement("button");
    updateBtn.innerText = "Update";
    updateDiv.appendChild(updateBtn);
    updateBtn.addEventListener("click", () => {
      const br = document.createElement("br");
      const label = document.createElement("label");
      label.classList.add("small");
      label.innerText = "You can change tasks name :";
      const newInput = document.createElement("input");
      const newBtn = document.createElement("button");
      newBtn.innerText = "Ok";
      updateDiv.appendChild(br);
      updateDiv.appendChild(label);
      updateDiv.appendChild(newInput);
      updateDiv.appendChild(newBtn);

      let value = newInput.value;
      newInput.focus();
      newBtn.addEventListener(
        "click",
        () => {}
        // updateTasks(index, newInput.value)
      );
    });
  });
};
// Fetching data
async function fetchData() {
  const res = await fetch("https://apple-seeds.herokuapp.com/api/users/");
  const data = await res.json();
  console.log(data);
  // localStorage.setItem("data", JSON.stringify(myData));

  return data;

  // const myData = app.list;

  // localStorage.setItem("data", JSON.stringify(myData));
  // const info = JSON.parse(localStorage.getItem("data"));
  // console.log(info);
}
fetchData().then((data) => {
  showList(data);
});
async function fetchPersonInfo(el) {
  const res = await fetch(
    `https://apple-seeds.herokuapp.com/api/users/${el.id}`
  );
  const moreData = await res.json();
  return moreData;

  //   app.list.push({
  //     id: el.id,
  //     firstName: el.firstName,
  //     lastName: el.lastName,
  //     capsule: el.capsule,
  //     age: moreData.age,
  //     city: moreData.city,
  //     hobby: moreData.hobby,
  //   });
  //   console.log(app.list);
  // });
  // return app.list;
}

// async function init() {
//   const data = await fetchData();
//   const personData = await fetchPersonInfo(data);
//   console.log(personData);
//   setTimeout(showList(), 6000);
// }
// init();
//Read
const searchTask = (index) => {
  const myData = JSON.parse(localStorage.getItem("data"));
  const tasks = myData[index];
  console.log(tasks);
  return tasks;
};

// createTask(data);

//Update
const updateTasks = (index, value) => {
  const myData = JSON.parse(localStorage.getItem("data"));
  console.log(index, value);
  let task = myData[index];
  console.log(task);

  task.name = value;
  localStorage.setItem("data", JSON.stringify(myData));
  showList();

  // if (isCompleted === false || isCompleted === true) {
  //   task.isCompleted = isCompleted;
  // }
  // if (imp === false || imp === true) {
  //   task.importance = imp;
  // }
};

//Delete
const removeTask = (index) => {
  const myData = JSON.parse(localStorage.getItem("data"));
  //   let task = searchTask(id);
  //   let index = app.taskList.indexOf(task);
  console.log(index);
  myData.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(myData));
  showList();
};
// console.log(getDate());

// console.log(readTask());
// console.log(updateTasks(2, "new name", true));
// removeTask(2);
// removeTask(4);
// const print = () => {
//   app.taskList.map((e) => {
//     return console.log(e.name);
//   });
// };
// btn.addEventListener("click", () => createTask());
// print();
// showList();
// fetchData();
