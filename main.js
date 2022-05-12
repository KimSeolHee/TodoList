// 유저가 값을 입력
// +버튼을 클릭하면 할일 추가됨
// delete버튼을 누르면 할일 삭제
// check버튼 누르면 밑줄 그어짐
// 진행중 끝남 탭을 누르면 언더바가 이동
// 끝남탭은 끝난 아이템만 진행중은 진행중 아이템만
// 전체탭을 누르면 다시 전체 아이템으로 돌아옴

let inputArea = document.getElementById("input-area");
let buttonArea = document.getElementById("button-area");
let taskAreas = document.querySelectorAll(".task-area div")
let taskList = [];
let mode= "all";
let filterList=[];
buttonArea.addEventListener("click", addTask);

for(let i = 0;i<taskAreas.length;i++) {
  taskAreas[i].addEventListener("click", (event) => {filter(event)})
}

function filter(event) {
  mode = event.target.id;
  filterList = []
  console.log("filter", mode)
  if(mode == "all") {
    render()
  }else if(mode == "ing") {
    for(let i = 0;i<taskList.length;i++){
      if(taskList[i].isComplete == false) {
        filterList.push(taskList[i])
      }
    }
    render()
  }else if(mode == "done") {
    for(let i = 0;i<taskList.length;i++){
      if(taskList[i].isComplete == true) {
        filterList.push(taskList[i])
      }
    }
    render()
  }
}

inputArea.addEventListener("keyup", (event) => {
  if (event.keyCode == 13) {
    addTask();
  }
});

inputArea.addEventListener("focus", () => {
  inputArea.value = "";
});

function addTask() {
  let task = {
    id: id(),
    userInput: inputArea.value,
    isComplete: false,
  };
  if (task.userInput.length > 0) {
    taskList.push(task);
  }
  console.log(task);

  render();
}

function render() {
  let list = [];
  if(mode == "all") {
    list = taskList
  }else if(mode == "ing") {
    list = filterList
  }else if(mode == "done") {
    list = filterList
  }
  let resultInput = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultInput += `<div class="task">
      <div class="task-done">${list[i].userInput}</div>
      <div class>
        <button onclick="finishButton('${list[i].id}')"><span>&#9787;</span></button>
        <button onclick="deleteButton('${list[i].id}')"><span1>&#10008;</span1></button>
      </div>
    </div>`;
    } else {
      resultInput += `<div class="task">
    <div>${list[i].userInput}</div>
    <div>
      <button onclick="finishButton('${list[i].id}')"><span>&#9786;</span>
      </button>
      <button onclick="deleteButton('${list[i].id}')"><span1>&#10008;</span1></button>
    </div>
  </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultInput;
}

function finishButton(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
    console.log("끝!", taskList);
  }

  render();
}

function deleteButton(id) {
  console.log("done", id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  console.log(taskList);
  render();
}

function id() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
