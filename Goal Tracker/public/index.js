  // if (!title) {
  //   alert("You can't enter an empty goal");
  //   return;
  //   //prevent users from adding empty goals later on
  // }

// Toggle description visibility on title click
function parentVisibility(id) {
  const goalElement = document.querySelector(`#goal${id}`);
  const descriptionElement = goalElement.querySelector(".description");
  console.log(descriptionElement);
  const breakdownForm = goalElement.querySelector(".breakdownForm")
  const childGoals = goalElement.querySelector(".childGoals")
  console.log(breakdownForm);
  descriptionElement.style.display =
  descriptionElement.style.display === "none" ? "block" : "none";
  breakdownForm.style.display =
  breakdownForm.style.display === "none" ? "inline" : "none";
  childGoals.style.display =
  childGoals.style.display === "none" ? "contents" : "none";
}
 
  function editGoal(id) {
    const textElement = document.querySelector(`#goal${id}`);
    const goalTitle = textElement.querySelector("h3");
    const currentText = goalTitle.innerText;
    const descriptionElement = textElement.querySelector(".description");
    const currentDescription = descriptionElement.innerText;
    const timeframeElement = textElement.querySelector(".goalTime");
    const currentTimeframe = timeframeElement.innerText;
    const priorityElement = textElement.querySelector(".priority");
    const currentPriority = priorityElement.innerText;
    textElement.classList.remove(currentTimeframe);
    textElement.querySelectorAll("*").forEach((element) => {
      element.style.display = "none";
    });
  
    // Create form element
    const formElement = document.createElement("form");
    formElement.action = "/edit";
    formElement.method = "post";
  
    // Create input elements
    const inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.name = "updatedgoalTitle";
    inputElement.value = currentText;
  
    const descriptionInput = document.createElement("textarea");
    descriptionInput.name = "updatedgoalDescription";
    descriptionInput.value = currentDescription;
  
    const newTime = document.createElement("select");
    newTime.name = "updatedgoalTime";
    newTime.innerHTML = document.getElementById("goalType").innerHTML;
    newTime.value = currentTimeframe;
  
    const newPriority = document.createElement("select");
    newPriority.name = "updatedgoalPriority";
    newPriority.innerHTML = document.getElementById("goalPriority").innerHTML;
    newPriority.value = currentPriority;
  
    // Append input elements to the form
    formElement.appendChild(inputElement);
    formElement.appendChild(descriptionInput);
    formElement.appendChild(newTime);
    formElement.appendChild(newPriority);
  
    // Create hidden input for goal id
    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "updatedItemId";
    hiddenInput.value = id;
  
    // Append hidden input to the form
    formElement.appendChild(hiddenInput);
  
    // Create submit button
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    formElement.appendChild(submitButton);
  
  
    // Append form and cancel button to the text element
    textElement.appendChild(formElement);
  
    // Hide the original content
    goalTitle.style.display = "none";
    descriptionElement.style.display = "none";
    timeframeElement.style.display = "none";
    priorityElement.style.display = "none";
  
    // Focus on the input element
    inputElement.focus();
  }
  
  function editChildGoal(id) {
    
    const textElement = document.querySelector(`#childGoal${id}`);
    const goalTitle = textElement.querySelector(".childValue");
    const currentText = goalTitle.innerText;
    const priorityElement = textElement.querySelector(".priority");
    const currentPriority = priorityElement.innerText;
    textElement.querySelectorAll("*").forEach((element) => {
      element.style.display = "none";
    });
    // Create form element
    const formElement = document.createElement("form");
    formElement.action = "/editChildGoal";
    formElement.method = "post";
  
    // Create input elements
    const inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.name = "updatedChildGoalTitle";
    inputElement.value = currentText;
  
    const newPriority = document.createElement("select");
    newPriority.name = "updatedChildGoalPriority";
    newPriority.innerHTML = document.getElementById("goalPriority").innerHTML;
    newPriority.value = currentPriority;
  
    // Append input elements to the form
    formElement.appendChild(inputElement);
    formElement.appendChild(newPriority);
  
    // Create hidden input for goal id
    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "updatedItemId";
    hiddenInput.value = id;
  
    // Append hidden input to the form
    formElement.appendChild(hiddenInput);
  
    // Create submit button
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    formElement.appendChild(submitButton);
  
  
    // Append form and cancel button to the text element
    textElement.appendChild(formElement);
  
    // Hide the original content
    goalTitle.style.display = "none";
    priorityElement.style.display = "none";
  
    // Focus on the input element
    inputElement.focus();
  }

  goalTimeFilter();
  goalPriorityFilter();
  goalProgressFilter();

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