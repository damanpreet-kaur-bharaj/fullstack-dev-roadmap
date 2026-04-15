const skillInput = document.getElementById("skill-input");
const addBtn = document.getElementById("add-btn");
const skillGrid = document.getElementById("skill-grid");
const skillCount = document.getElementById("skill-count");
const emptyMsg = document.getElementById("empty-msg");

function updateSkillCount() {
    const totalSkills = skillGrid.querySelectorAll(".skill-card").length;
    skillCount.textContent = totalSkills;
    if (totalSkills === 0) {
        emptyMsg.style.display = "block";
    } else {
        emptyMsg.style.display = "none";
    }
}

function addSkill() {
    const skillName = skillInput.value.trim();

    if (skillName === "") return;

    // Duplicate check
    const existing = skillGrid.querySelectorAll(".skill-card__name");
    const isDuplicate = Array.from(existing).some(
        el => el.textContent.toLowerCase() === skillName.toLowerCase()
    );

    if (isDuplicate) {
        skillInput.style.borderColor = "#e74c3c";
        setTimeout(() => {
            skillInput.style.borderColor = "";
        }, 1000);
        return;
    }

    emptyMsg.style.display = "none";

    const card = document.createElement("div");
    card.className = "skill-card";

    const name = document.createElement("p");
    name.className = "skill-card__name";
    name.textContent = skillName;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "skill-card__delete";
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function () {
        card.remove();
        updateSkillCount();
    });

    card.appendChild(name);
    card.appendChild(deleteBtn);
    skillGrid.appendChild(card);

    updateSkillCount();
    skillInput.value = "";
    skillInput.focus();
}

addBtn.addEventListener("click", addSkill);

skillInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addSkill();
    }
});