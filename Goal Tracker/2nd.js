var goalNumber = 0;

function addGoal() {
  goalNumber += 1;
  const title = document.getElementById("goalTitle").value;
  const priority = document.getElementById("goalPriority").value;
  const description = document.getElementById("goalDescription").value;
  const type = document.getElementById("goalType").value;
  const goalList = document.getElementById("goalList");
  const listItem = document.createElement("li");
  const goalTypeSelect = document.getElementById("goalType").cloneNode(true);
  const goalPrioritySelect = document
    .getElementById("goalPriority")
    .cloneNode(true);
  goalPrioritySelect.id = "priority" + goalNumber;
  const breakdownGoal = document.createElement("button");
  breakdownGoal.textContent = "Breakdown Goal";
  breakdownGoal.id = goalNumber;
  const breakdownInput = document.createElement("input");
  breakdownInput.setAttribute("placeholder", `Breakdown your ${type} goal`);
  breakdownInput.id = `breakdown${goalNumber}`;
  const titleElement = document.createElement("h3");
  titleElement.innerText = title;
  const goalPriority = document.createElement("div");
  goalPriority.innerText = priority;
  const descriptionElement = document.createElement("span");
  descriptionElement.innerText = description;
  const breakdownArea = document.createElement("div");
  const broken = document.createElement("div");
  var addedTimes = [];
  const deleteGoalButton = document.createElement("button");
  deleteGoalButton.textContent = "Delete Goal";
  const editGoalButton = document.createElement("button");
  editGoalButton.textContent = "Edit Goal";

  descriptionElement.style.display = "none";
  breakdownGoal.style.display = "none";
  goalTypeSelect.style.display = "none";
  breakdownInput.style.display = "none";
  breakdownArea.style.display = "none";
  broken.style.display = "none";
  goalPrioritySelect.style.display = "none";

  if (!title) {
    console.log("error"); //prevent users from adding empty goals later on
  }

  // Toggle description visibility on title click
  titleElement.addEventListener("click", function () {
    descriptionElement.style.display =
      descriptionElement.style.display === "none" ? "inline" : "none";
    goalTypeSelect.style.display =
      goalTypeSelect.style.display === "none" ? "block" : "none";
    breakdownInput.style.display =
      breakdownInput.style.display === "none" ? "inline" : "none";
    breakdownGoal.style.display =
      breakdownGoal.style.display === "none" ? "block" : "none";
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

    // Create an input element
    const inputElement = document.createElement("input");
    inputElement.value = currentText;

    // Replace the text element with the input element
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.addEventListener("click", () => {
      saveEdit(textElement, inputElement);
      saveButton.remove();
      cancelButton.remove();
    });

    // Create cancel button
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.addEventListener("click", () => {
      cancelEdit(textElement, inputElement);
      saveButton.remove();
      cancelButton.remove();
    });

    // Replace the text element with the input element, save, and cancel buttons
    textElement.replaceWith(inputElement, saveButton, cancelButton);

    // Focus on the input element
    inputElement.focus();
  }
  function saveEdit(textElement, inputElement) {
    const newText = inputElement.value.trim();
    if (newText !== "") {
      textElement.innerText = newText;
    }

    // Replace the input element with the text element
    inputElement.replaceWith(textElement);
  }

  function cancelEdit(textElement, inputElement) {
    // Replace the input element with the text element without saving changes
    inputElement.replaceWith(textElement);
  }

  function editChildGoal() {
    const listItemToEdit = this.parentElement; // Parent element of the edit button is the li
    const textToEdit = listItemToEdit.querySelector("span");

    const currentText = textToEdit.innerText;

    // Create an input element
    const inputElement = document.createElement("input");
    inputElement.value = currentText;

    // Create save button
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.addEventListener("click", () => {
      saveEdit(textToEdit, inputElement);
      saveButton.remove();
      cancelButton.remove();
    });

    // Create cancel button
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.addEventListener("click", () => {
      cancelEdit(textToEdit, inputElement);
      saveButton.remove();
      cancelButton.remove();
    });

    // Replace the text element with the input element, save, and cancel buttons
    textToEdit.replaceWith(inputElement, saveButton, cancelButton);

    // Focus on the input element
    inputElement.focus();
  }

  // Breakdown goal into shorter timeframes
  breakdownGoal.addEventListener("click", () => {
    const breakDownValue = goalTypeSelect.value;
    const breakdownButtonNumber = breakdownGoal.id;
    if (!addedTimes.includes(breakDownValue)) {
      addedTimes.push(breakDownValue);

      const breakBox = document.createElement("div");
      breakBox.id = breakDownValue + breakdownButtonNumber;
      const newHeader = document.createElement("h4");
      newHeader.innerText = `${breakDownValue} Goals`;

      const brokenGoalList = document.createElement("ul");
      brokenGoalList.id = breakDownValue;
      const newItem = document.createElement("li");
      const textElement = document.createElement("span");
      const childPriority = document.createElement("span");
      textElement.innerText = document.getElementById(
        `breakdown${breakdownButtonNumber}`
      ).value;
      childPriority.innerText = document.getElementById(
        `priority${breakdownButtonNumber}`
      ).value;
      newItem.appendChild(textElement);
      newItem.appendChild(childPriority);
      document.getElementById(`breakdown${breakdownButtonNumber}`).value = "";
      // Add delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        brokenGoalList.removeChild(newItem);
      });

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
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
    } else {
      const updatedFrame = document.getElementById(
        `${breakDownValue}${breakdownButtonNumber}`
      );
      const brokenGoalList = updatedFrame.querySelector(`#${breakDownValue}`);
      const newItem = document.createElement("li");
      const textElement = document.createElement("span");
      textElement.innerText = document.getElementById(
        `breakdown${breakdownButtonNumber}`
      ).value;
      const childPriority = document.createElement("span");
      childPriority.innerText = document.getElementById(
        `priority${breakdownButtonNumber}`
      ).value;
      newItem.appendChild(textElement);
      newItem.appendChild(childPriority);
      document.getElementById(`breakdown${breakdownButtonNumber}`).value = "";

      // Add delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        brokenGoalList.removeChild(newItem);
        if (brokenGoalList.children.length === 0) {
          updatedFrame.querySelector("h4").remove();
          addedTimes = addedTimes.filter((timeframe) => {
            timeframe !== breakDownValue;
          });
        }
      });

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", editChildGoal);

      newItem.appendChild(deleteButton);
      newItem.appendChild(editButton);

      brokenGoalList.appendChild(newItem);
    }
  });
  deleteGoalButton.addEventListener("click", deleteGoal);
  editGoalButton.addEventListener("click", editGoal);

  // Append elements to the list item
  listItem.appendChild(titleElement);
  listItem.appendChild(goalPriority);
  listItem.appendChild(document.createElement("br")); // Line break for better spacing
  listItem.appendChild(descriptionElement);
  document.getElementById("goalTitle").value = "";
  document.getElementById("goalDescription").value = "";
  document.getElementById("goalPriority").value = "High";

  goalList.appendChild(listItem);
  listItem.appendChild(goalTypeSelect);
  listItem.appendChild(goalPrioritySelect);
  listItem.appendChild(breakdownInput);
  listItem.appendChild(breakdownGoal);
  listItem.appendChild(deleteGoalButton);
  listItem.appendChild(editGoalButton);
}
