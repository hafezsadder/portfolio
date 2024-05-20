var goalNumber = 0;

function addGoal() {
  goalNumber += 1;
  const title = document.getElementById("goalTitle").value;
  const priority = document.getElementById("goalPriority").value;
  const description = document.getElementById("goalDescription").value;
  const type = document.getElementById("goalType").value;
  const goalList = document.getElementById("goalList");
  const listItem = document.createElement("li");
  listItem.classList.add(type);
  const goalTypeSelect = document.getElementById("goalType").cloneNode(true);
  const goalPrioritySelect = document
    .getElementById("goalPriority")
    .cloneNode(true);
  goalPrioritySelect.id = "priority" + goalNumber;
  const goalProgress = document
    .getElementById("filterprogress")
    .cloneNode(true);
  goalProgress.removeAttribute("id");
  goalProgress.removeAttribute("onchange");
  goalProgress.classList.add("progress");
  const x = goalProgress.removeChild(goalProgress.firstChild);
  //x must be added cause remove child returns the value of the first child as well
  goalProgress.removeChild(goalProgress.firstChild);
  const progressLabel = document.createElement("label");
  progressLabel.innerText = "Goal Progress";
  const breakdownGoal = document.createElement("button");
  breakdownGoal.innerHTML = '<i class="fa-solid fa-plus"></i>';
  breakdownGoal.id = goalNumber;
  const breakdownInput = document.createElement("input");
  breakdownInput.setAttribute("placeholder", `Breakdown your ${type} goal`);
  breakdownInput.id = `breakdown${goalNumber}`;
  const titleElement = document.createElement("h3");
  titleElement.innerText = title;
  const goalPriority = document.createElement("div");
  goalPriority.innerText = priority;
  goalPriority.classList.add("priority");
  const goalTime = document.createElement("div");
  goalTime.innerText = type;
  goalTime.classList.add("goalTime");
  const descriptionElement = document.createElement("span");
  descriptionElement.innerText = description;
  descriptionElement.classList.add("description");
  const breakdownArea = document.createElement("div");
  const broken = document.createElement("div");
  var addedTimes = [];
  const deleteGoalButton = document.createElement("button");
  // deleteGoalButton.textContent = "Delete Goal";
  deleteGoalButton.innerHTML = '<i class="fas fa-trash-can"></i>';
  deleteGoalButton.classList.add("modifyGoal");
  const editGoalButton = document.createElement("button");
  editGoalButton.innerHTML = '<i class="fa-solid fa-pen"></i>';
  editGoalButton.classList.add("modifyGoal");

  descriptionElement.style.display = "none";
  breakdownGoal.style.display = "none";
  goalTypeSelect.style.display = "none";
  breakdownInput.style.display = "none";
  breakdownArea.style.display = "none";
  broken.style.display = "none";
  goalPrioritySelect.style.display = "none";

  if (!title) {
    alert("You can't enter an empty goal");
    return;
    //prevent users from adding empty goals later on
  }

  // Toggle description visibility on title click
  titleElement.addEventListener("click", function () {
    descriptionElement.style.display =
      descriptionElement.style.display === "none" ? "block" : "none";
    goalTypeSelect.style.display =
      goalTypeSelect.style.display === "none" ? "inline" : "none";
    breakdownInput.style.display =
      breakdownInput.style.display === "none" ? "inline" : "none";
    breakdownGoal.style.display =
      breakdownGoal.style.display === "none" ? "inline" : "none";
    breakdownArea.style.display =
      breakdownArea.style.display === "none" ? "inline" : "none";
    broken.style.display = broken.style.display === "none" ? "inline" : "none";
    goalPrioritySelect.style.display =
      goalPrioritySelect.style.display === "none" ? "inline" : "none";
  });

  goalTypeSelect.addEventListener("change", function () {
    const breakDownValue = goalTypeSelect.value;
    breakdownInput.setAttribute(
      "placeholder",
      `Breakdown your ${type} goal into ${breakDownValue} goals`
    );
  });

  // Event listener to toggle visibility of list items under h4 element
  function toggleListItemsVisibility(childId) {
    return function () {
      const brokenGoalList = document.getElementById(childId);
      const listItems = brokenGoalList.querySelectorAll("li");

      listItems.forEach((item) => {
        item.style.display =
          item.style.display === "none" ? "list-item" : "none";
      });
    };
  }

  function deleteGoal() {
    listItem.remove();
  }
  function editGoal() {
    const textElement = listItem.querySelector("h3");
    const currentText = textElement.innerText;
    const descriptionElement = listItem.querySelector(".description");
    const currentDescription = descriptionElement.innerText;
    const timeframeElement = listItem.querySelector(".goalTime");
    const currentTimeframe = timeframeElement.innerText;
    const priorityElement = listItem.querySelector(".priority");
    const currentPriority = priorityElement.innerText;
    listItem.classList.remove(currentTimeframe);
    listItem.querySelectorAll(".modifyGoal").forEach((button) => {
      button.style.display = "none";
    });

    // Create an input element
    const inputElement = document.createElement("input");
    inputElement.value = currentText;
    const descriptionInput = document.createElement("input");
    descriptionInput.value = currentDescription;
    const newTime = document.getElementById("goalType").cloneNode(true);
    newTime.value = currentTimeframe;
    const newPriority = document.getElementById("goalPriority").cloneNode(true);
    newPriority.value = currentPriority;
    // Replace the text element with the input element
    const saveButton = document.createElement("button");
    saveButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    saveButton.addEventListener("click", () => {
      saveEdit(
        textElement,
        inputElement,
        descriptionElement,
        descriptionInput,
        timeframeElement,
        newTime,
        priorityElement,
        newPriority
      );
      saveButton.remove();
      cancelButton.remove();
      listItem.querySelectorAll(".modifyGoal").forEach((button) => {
        button.style.display = "inline";
      });
    });

    // Create cancel button
    const cancelButton = document.createElement("button");
    cancelButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    cancelButton.addEventListener("click", () => {
      cancelEdit(
        textElement,
        inputElement,
        descriptionElement,
        descriptionInput,
        timeframeElement,
        newTime,
        priorityElement,
        newPriority
      );
      saveButton.remove();
      cancelButton.remove();
      listItem.querySelectorAll(".modifyGoal").forEach((button) => {
        button.style.display = "inline";
      });
    });

    // Replace the text element with the input element, save, and cancel buttons
    textElement.replaceWith(inputElement, saveButton, cancelButton);
    descriptionElement.replaceWith(descriptionInput, saveButton, cancelButton);
    timeframeElement.replaceWith(newTime, saveButton, cancelButton);
    priorityElement.replaceWith(newPriority, saveButton, cancelButton);

    // Focus on the input element
    inputElement.focus();
  }
  function saveEdit(
    textElement,
    inputElement,
    descriptionElement,
    descriptionInput,
    timeframeElement,
    newTime,
    priorityElement,
    newPriority
  ) {
    const newText = inputElement.value.trim();
    const newTimeframe = newTime.value;
    if (newText !== "") {
      textElement.innerText = newText;
    }
    timeframeElement.innerText = newTimeframe;
    priorityElement.innerText = newPriority.value;
    descriptionElement.innerText = descriptionInput.value;
    // Replace the input element with the text element
    inputElement.replaceWith(textElement);
    newTime.replaceWith(timeframeElement);
    newPriority.replaceWith(priorityElement);
    descriptionInput.replaceWith(descriptionElement);
    listItem.classList.add(newTime.value);
  }

  function cancelEdit(
    textElement,
    inputElement,
    descriptionElement,
    descriptionInput,
    timeframeElement,
    newTime,
    priorityElement,
    newPriority
  ) {
    // Replace the input element with the text element without saving changes
    inputElement.replaceWith(textElement);
    newTime.replaceWith(timeframeElement);
    newPriority.replaceWith(priorityElement);
    descriptionInput.replaceWith(descriptionElement);
    listItem.classList.add(timeframeElement.innerText);
  }

  function editChildGoal() {
    const listItemToEdit = this.parentElement; // Parent element of the edit button is the li
    const textToEdit = listItemToEdit.querySelector(".childValue");
    const currentText = textToEdit.innerText;
    const priorityToEdit = listItemToEdit.querySelector(".priority");
    const currentPriority = priorityToEdit.innerText;
    listItemToEdit.querySelectorAll("button").forEach((button) => {
      button.style.display = "none";
    });
    // Create an input element
    const inputElement = document.createElement("input");
    inputElement.value = currentText;
    const newPriority = document.getElementById("goalPriority").cloneNode(true);
    newPriority.value = currentPriority;
    // Create save button
    const saveButton = document.createElement("button");
    saveButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    saveButton.addEventListener("click", () => {
      saveChildGoal(textToEdit, inputElement, priorityToEdit, newPriority);
      saveButton.remove();
      cancelButton.remove();
      listItemToEdit.querySelectorAll("button").forEach((button) => {
        button.style.display = "inline";
      });
    });

    // Create cancel button
    const cancelButton = document.createElement("button");
    cancelButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    cancelButton.addEventListener("click", () => {
      cancelChildGoal(textToEdit, inputElement, priorityToEdit, newPriority);
      saveButton.remove();
      cancelButton.remove();
      listItemToEdit.querySelectorAll("button").forEach((button) => {
        button.style.display = "inline";
      });
    });

    // Replace the text element with the input element, save, and cancel buttons
    textToEdit.replaceWith(inputElement, saveButton, cancelButton);
    priorityToEdit.replaceWith(newPriority, saveButton, cancelButton);

    // Focus on the input element
    inputElement.focus();
  }
  function saveChildGoal(
    textElement,
    inputElement,
    priorityElement,
    newPriority
  ) {
    const newText = inputElement.value.trim();
    if (newText !== "") {
      textElement.innerText = newText;
    }
    priorityElement.innerText = newPriority.value;
    // Replace the input element with the text element
    inputElement.replaceWith(textElement);
    newPriority.replaceWith(priorityElement);
  }
  function cancelChildGoal(
    textElement,
    inputElement,
    priorityElement,
    newPriority
  ) {
    // Replace the input element with the text element without saving changes
    inputElement.replaceWith(textElement);
    newPriority.replaceWith(priorityElement);
  }
  // Breakdown goal into shorter timeframes
  breakdownGoal.addEventListener("click", () => {
    const breakDownValue = goalTypeSelect.value;
    const breakdownButtonNumber = breakdownGoal.id;
    if (!addedTimes.includes(breakDownValue)) {
      if (!document.getElementById(`breakdown${breakdownButtonNumber}`).value) {
        alert("You can't enter an empty goal");
        return;
      }
      addedTimes.push(breakDownValue);

      const breakBox = document.createElement("div");
      breakBox.id = breakDownValue + breakdownButtonNumber;
      const newHeader = document.createElement("h4");
      newHeader.innerText = `${breakDownValue} Goals`;

      const brokenGoalList = document.createElement("ul");
      brokenGoalList.id = `${breakDownValue}List${breakdownButtonNumber}`;
      const newItem = document.createElement("li");
      const textElement = document.createElement("span");
      textElement.classList.add("childValue");
      const childPriority = document.createElement("span");
      textElement.innerText = document.getElementById(
        `breakdown${breakdownButtonNumber}`
      ).value;

      childPriority.innerText = document.getElementById(
        `priority${breakdownButtonNumber}`
      ).value;
      childPriority.classList.add("priority");
      const childProgress = goalProgress.cloneNode(true);
      newItem.appendChild(textElement);
      newItem.appendChild(childPriority);
      newItem.append(childProgress);
      document.getElementById(`breakdown${breakdownButtonNumber}`).value = "";
      // Add delete button
      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = '<i class="fas fa-trash-can"></i>';
      deleteButton.addEventListener("click", () => {
        brokenGoalList.removeChild(newItem);
        if (brokenGoalList.children.length === 0) {
          const updatedFrame = document.getElementById(
            `${breakDownValue}${breakdownButtonNumber}`
          );
          updatedFrame.remove();
          addedTimes = addedTimes.filter((timeframe) => {
            timeframe !== breakDownValue;
          });
        }
      });

      const editButton = document.createElement("button");
      editButton.innerHTML = '<i class="fa-solid fa-pen"></i>';
      editButton.addEventListener("click", editChildGoal);
      newItem.appendChild(deleteButton);
      newItem.appendChild(editButton);

      breakBox.appendChild(newHeader);
      listItem.appendChild(breakdownArea);
      breakdownArea.appendChild(breakBox);
      breakBox.appendChild(brokenGoalList);
      brokenGoalList.appendChild(newItem);
      const childId = breakBox.id;

      // Event listener to toggle visibility of list items under h4 element
      newHeader.addEventListener("click", toggleListItemsVisibility(childId));
      goalTimeFilter();
      goalPriorityFilter();
      goalProgressFilter();
    } else {
      if (!document.getElementById(`breakdown${breakdownButtonNumber}`).value) {
        alert("You can't enter an empty goal");
        return;
        //prevent users from adding empty goals later on
      }
      const updatedFrame = document.getElementById(
        `${breakDownValue}${breakdownButtonNumber}`
      );
      const brokenGoalList = updatedFrame.querySelector(
        `#${breakDownValue}List${breakdownButtonNumber}`
      );
      const newItem = document.createElement("li");
      const textElement = document.createElement("span");
      textElement.innerText = document.getElementById(
        `breakdown${breakdownButtonNumber}`
      ).value;
      textElement.classList.add("childValue");

      const childPriority = document.createElement("span");
      childPriority.innerText = document.getElementById(
        `priority${breakdownButtonNumber}`
      ).value;
      childPriority.classList.add("priority");
      const childProgress = goalProgress.cloneNode(true);
      newItem.appendChild(textElement);
      newItem.appendChild(childPriority);
      newItem.append(childProgress);
      document.getElementById(`breakdown${breakdownButtonNumber}`).value = "";

      // Add delete button
      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = '<i class="fas fa-trash-can"></i>';
      deleteButton.addEventListener("click", () => {
        brokenGoalList.removeChild(newItem);
        if (brokenGoalList.children.length === 0) {
          updatedFrame.remove();
          addedTimes = addedTimes.filter((timeframe) => {
            timeframe !== breakDownValue;
          });
        }
      });

      const editButton = document.createElement("button");
      editButton.innerHTML = '<i class="fa-solid fa-pen"></i>';
      editButton.addEventListener("click", editChildGoal);

      newItem.appendChild(deleteButton);
      newItem.appendChild(editButton);

      brokenGoalList.appendChild(newItem);
      goalTimeFilter();
      goalPriorityFilter();
      goalProgressFilter();
    }
  });
  deleteGoalButton.addEventListener("click", deleteGoal);
  editGoalButton.addEventListener("click", editGoal);

  // Append elements to the list item
  listItem.appendChild(titleElement);
  listItem.appendChild(goalTime);
  listItem.appendChild(goalPriority);
  listItem.appendChild(progressLabel);
  listItem.appendChild(goalProgress);
  listItem.appendChild(document.createElement("br")); // Line break for better spacing
  listItem.appendChild(descriptionElement);
  document.getElementById("goalTitle").value = "";
  document.getElementById("goalDescription").value = "";
  document.getElementById("goalPriority").value = "High";

  goalList.appendChild(listItem);
  listItem.appendChild(breakdownInput);
  listItem.appendChild(goalTypeSelect);
  listItem.appendChild(goalPrioritySelect);
  listItem.appendChild(breakdownGoal);
  listItem.appendChild(document.createElement("br"));
  listItem.appendChild(deleteGoalButton);
  listItem.appendChild(editGoalButton);
  goalTimeFilter();
  goalPriorityFilter();
  goalProgressFilter();
}

let priorityFilteredOut = []; //to allow filters to work simultaneously
let timeFilteredOut = [];
let progressFilteredOut = [];
let filteredOutAll = [];
function goalSearch() {
  const searchTerm = document.getElementById("searchBox").value.toLowerCase();
  const items = document.querySelectorAll("#goalList>li");
  const cItems = [];

  items.forEach((item) => {
    const description = item
      .querySelector(".description")
      .innerText.toLowerCase();
    const childItems = item.querySelectorAll("li");
    if (
      (item.querySelector("h3") &&
        item
          .querySelector("h3")
          .innerText.toLowerCase()
          .includes(searchTerm)) ||
      description.includes(searchTerm)
    ) {
      item.style.display = "list-item";
    } else {
      item.style.display = "none";
    }
    childItems.forEach((child) => {
      if (child.querySelector(".childValue").innerText.includes(searchTerm)) {
        item.style.display = "list-item";
        const itemStyle = window.getComputedStyle(
          item.querySelector(".description")
        );
        if (itemStyle.getPropertyValue("display") === "none") {
          item.querySelector("h3").click();
        }
        child.style.display = "list-item";
        if (!cItems.includes(child.parentElement.parentElement)) {
          cItems.push(child.parentElement.parentElement);
        }
      } else {
        child.style.display = "none";
        child.parentElement.parentElement.style.display = "none";
      }
    });
    cItems.forEach((item) => {
      item.style.display = "block";
    });
  });
}

function goalPriorityFilter() {
  priorityFilteredOut = [];
  filteredOutAll = [
    ...priorityFilteredOut,
    ...timeFilteredOut,
    ...progressFilteredOut,
  ];
  const filterTerm = document.getElementById("filterpriority").value;
  const items = document.querySelectorAll("#goalList>li");
  const filteredItems = [];
  const filteredCItems = [];
  items.forEach((item) => {
    const childItems = item.querySelectorAll("li");
    if (filterTerm !== "All") {
      item.querySelectorAll("h4").forEach((header) => {
        header.style.display = "none";
      });
      if (item.querySelector(".priority").innerText === filterTerm) {
        filteredItems.push(item);
      } else {
        item.style.display = "none";
      }
      childItems.forEach((child) => {
        if (child.querySelector(".priority").innerText === filterTerm) {
          filteredItems.push(item);
          filteredCItems.push(child);
        } else {
          child.style.display = "none";
          priorityFilteredOut.push(child);
        }
      });
      filteredItems.forEach((fItem) => {
        if (!filteredOutAll.includes(fItem)) {
          fItem.style.display = "list-item";
        }
        const itemStyle = window.getComputedStyle(
          fItem.querySelector(".description")
        );
        if (itemStyle.getPropertyValue("display") === "none") {
          fItem.querySelector("h3").click();
        }
      });
      filteredCItems.forEach((cItem) => {
        if (!filteredOutAll.includes(cItem)) {
          cItem.style.display = "list-item";
          cItem.parentElement.parentElement.querySelector("h4").style.display =
            "block";
        }
      });
      if (!filteredItems.includes(item)) {
        priorityFilteredOut.push(item);
      }
    } else {
      document.querySelectorAll("#goalList li").forEach((lItem) => {
        if (!filteredOutAll.includes(lItem)) {
          lItem.style.display = "list-item";
        }
      });
      item.querySelectorAll("h4").forEach((header) => {
        header.style.display = "block";
      });
    }
  });
}
function goalTimeFilter() {
  timeFilteredOut = [];
  filteredOutAll = [
    ...priorityFilteredOut,
    ...timeFilteredOut,
    ...progressFilteredOut,
  ];
  const filterTerm = document.getElementById("filtertime").value;
  const items = document.querySelectorAll("#goalList>li");

  const filteredItems = [];
  const filteredCItems = [];

  items.forEach((item) => {
    if (!filteredOutAll.includes(item)) {
      document.querySelectorAll("li>div>div");
      const childItems = item.querySelectorAll("div>div");

      if (filterTerm !== "All") {
        if (item.classList.contains(filterTerm)) {
          filteredItems.push(item);
        } else {
          item.style.display = "none";
        }
        childItems.forEach((child) => {
          if (child.id.includes(filterTerm)) {
            filteredItems.push(item);
            filteredCItems.push(child);
            const itemStyle = window.getComputedStyle(
              item.querySelector(".description")
            );
            if (itemStyle.getPropertyValue("display") === "none") {
              item.querySelector("h3").click();
            }
          } else {
            child.style.display = "none";
          }
        });
        filteredItems.forEach((fItem) => {
          fItem.style.display = "list-item";
        });
        filteredCItems.forEach((cItem) => {
          cItem.style.display = "block";
        });
        if (!filteredItems.includes(item)) {
          timeFilteredOut.push(item);
        }
      } else {
        item.style.display = "list-item";
        childItems.forEach((child) => {
          child.style.display = "block";
        });
      }
    }
  });
}

function goalProgressFilter() {
  progressFilteredOut = [];
  filteredOutAll = [
    ...priorityFilteredOut,
    ...timeFilteredOut,
    ...progressFilteredOut,
  ];
  const filterTerm = document.getElementById("filterprogress").value;
  const items = document.querySelectorAll("#goalList>li");
  const filteredItems = [];
  const filteredCItems = [];

  items.forEach((item) => {
    const childItems = item.querySelectorAll("li");
    if (filterTerm !== "All") {
      item.querySelectorAll("h4").forEach((header) => {
        header.style.display = "none";
      });
      if (item.querySelector(".progress").value === filterTerm) {
        filteredItems.push(item);
      } else {
        item.style.display = "none";
      }
      childItems.forEach((child) => {
        if (child.querySelector(".progress").value === filterTerm) {
          filteredItems.push(item);
          filteredCItems.push(child);
          const itemStyle = window.getComputedStyle(
            item.querySelector(".description")
          );
          if (itemStyle.getPropertyValue("display") === "none") {
            item.querySelector("h3").click();
          }
        } else {
          child.style.display = "none";
          progressFilteredOut.push(child);
        }
      });
      filteredItems.forEach((fItem) => {
        if (!filteredOutAll.includes(fItem)) {
          fItem.style.display = "list-item";
        }
      });
      filteredCItems.forEach((cItem) => {
        if (!filteredOutAll.includes(cItem)) {
          cItem.style.display = "list-item";
          cItem.parentElement.parentElement.querySelector("h4").style.display =
            "block";
        }
      });
      if (!filteredItems.includes(item)) {
        progressFilteredOut.push(item);
      }
    } else {
      document.querySelectorAll("#goalList li").forEach((lItem) => {
        if (!filteredOutAll.includes(lItem)) {
          lItem.style.display = "list-item";
        }
      });
      item.querySelectorAll("h4").forEach((header) => {
        header.style.display = "block";
      });
    }
  });
}
