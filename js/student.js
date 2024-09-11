let elChangeImg = document.querySelector(".changeImgUrl");
let elRenderImg = document.querySelector(".render-img");
let StudentsArr = JSON.parse(window.localStorage.getItem("studentsList")) || [];
let RenderStudents = document.querySelector(".table-body");
let elSearchInput = document.querySelector(".search-input");
let elUploadImg = document.querySelector(".upload-img");
let elChangeAvatar = document.querySelector(".change-avatar");

function renderStudents(arr, list) {
    list.innerHTML = "";
    arr.forEach(item => {
        let elTr = document.createElement("tr");
        elTr.className = "bg-white rounded-[10px]";
        elTr.innerHTML = `
        <td class="p-4">
        <img src=${item.imgURL} width="65" height="55" class="rounded-lg"/>
        </td>
        <td class="p-4">${item.name}</td>
        <td class="p-4">${item.email}</td>
        <td class="p-4">${item.phone}</td>
        <td class="p-4">${item.enrollnumber}</td>
        <td class="p-4">${item.date}</td>
        <td>
        <div class="flex gap-[15px] items-center">
        <button class="rounded-full cursor-pointer hover:scale-125 transition-transform duration-300" onclick="moreClick(${item.id})"><img src="./images/more.svg"></button>
        <button class="rounded-full cursor-pointer hover:scale-125 transition-transform duration-300" onclick="updateBtnClick(${item.id})"><img src="./images/update.svg"></button>
        <button class="rounded-full cursor-pointer hover:scale-125 transition-transform duration-300" onclick="delateStudent(${item.id})"><img src="./images/delate.svg"></button>
        </div>
        </td>
        `;
        list.append(elTr);
    });
}
renderStudents(StudentsArr, RenderStudents);

// Izlash
elSearchInput.addEventListener("keyup", function(e) {
    const value = e.target.value.toLowerCase();
    if (value.trim() === "") {
        renderStudents(StudentsArr, RenderStudents);
    } else {
        const filterList = StudentsArr.filter(item => 
            item.name.toLowerCase().includes(value) ||
            item.email.toLowerCase().includes(value) ||
            item.phone.toLowerCase().includes(value) ||
            item.enrollnumber.toLowerCase().includes(value) ||
            item.date.toLowerCase().includes(value)
        );
        renderStudents(filterList, RenderStudents);
    }
});
function SortClick() {
    const sorted = StudentsArr.sort((a, b) => a.name.localeCompare(b.name));
    renderStudents(sorted, RenderStudents);
}
function delateStudent(id) {
    let delateFromIndex = StudentsArr.findIndex(item => item.id == id);
    StudentsArr.splice(delateFromIndex, 1);
    renderStudents(StudentsArr, RenderStudents);
    window.localStorage.setItem("studentsList", JSON.stringify(StudentsArr));
}
function moreClick(id) {
    window.localStorage.setItem("moreId", JSON.stringify(id));
    location.pathname = "./more.html";
}
document.getElementById('openModal').addEventListener('click', function() {
    document.getElementById('addStudentModal').classList.remove('hidden');
});
document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('addStudentModal').classList.add('hidden');
});
document.getElementById('studentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let studentData = {};
    formData.forEach((value, key) => {
        studentData[key] = value;
    });
    let studentsList = JSON.parse(window.localStorage.getItem('studentsList')) || [];
    studentData.id = studentsList.length ? studentsList[studentsList.length - 1].id + 1 : 1;
    studentData.imgURL = elUploadImg.src;
    studentsList.push(studentData);
    window.localStorage.setItem('studentsList', JSON.stringify(studentsList));
    renderStudents(studentsList, RenderStudents);
    document.getElementById('addStudentModal').classList.add('hidden');
    event.target.reset();
});
elChangeImg.addEventListener("change", function(e) {
    elRenderImg.src = URL.createObjectURL(e.target.files[0]);
});

elChangeAvatar.addEventListener("change", function(e) {
    elUploadImg.src = URL.createObjectURL(e.target.files[0]);
});
const userData = JSON.parse(window.localStorage.getItem("loginedUser"));
console.log(userData);

let AdminName = document.querySelector(".adminname");
AdminName.textContent = userData ? userData.login : '';

function clickLogout() {
    window.localStorage.clear();
    location.pathname = "/index.html";
}
// ----------------------------Update modal----------------------------------
let elUpdateStudentModal = document.getElementById('updateStudentModal');
let elUpdateStudentForm = document.getElementById('updateStudentForm');
let elCloseUpdateModal = document.getElementById('closeUpdateModal');
let currentStudentId;

function updateBtnClick(id) {
    currentStudentId = id;
    let studentData = StudentsArr.find(item => item.id === id);

    elUpdateStudentForm.name.value = studentData.name;
    elUpdateStudentForm.email.value = studentData.email;
    elUpdateStudentForm.phone.value = studentData.phone;
    elUpdateStudentForm.enrollnumber.value = studentData.enrollnumber;
    elUpdateStudentForm.date.value = studentData.date;
    elUploadImg.src = studentData.imgURL;
    
    elUpdateStudentModal.classList.remove('hidden');
}

elCloseUpdateModal.addEventListener('click', function() {
    elUpdateStudentModal.classList.add('hidden');
});

elUpdateStudentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    let formData = new FormData(event.target);
    let updatedData = {};
    formData.forEach((value, key) => {
        updatedData[key] = value;
    });

    let studentIndex = StudentsArr.findIndex(item => item.id === currentStudentId);
    if (studentIndex > -1) {
        StudentsArr[studentIndex] = {
            ...StudentsArr[studentIndex],
            ...updatedData,
            imgURL: elUploadImg.src
        };
    }
    window.localStorage.setItem('studentsList', JSON.stringify(StudentsArr));

    elUpdateStudentModal.classList.add('hidden');
    renderStudents(StudentsArr, RenderStudents);
    event.target.reset();
});

elChangeAvatar.addEventListener("change", function(e) {
    elUploadImg.src = URL.createObjectURL(e.target.files[0]);
});

// ---------------------------Delete Modal---------------------------

let deleteConfirmationModal = document.getElementById('deleteConfirmationModal');
let closeDeleteModal = document.getElementById('closeDeleteModal');
let confirmDelete = document.getElementById('confirmDelete');
let cancelDelete = document.getElementById('cancelDelete');

let deleteStudentId;
function delateStudent(id) {
    deleteStudentId = id;
    deleteConfirmationModal.classList.remove('hidden');
}

confirmDelete.addEventListener('click', function() {
    let deleteFromIndex = StudentsArr.findIndex(item => item.id === deleteStudentId);
    if (deleteFromIndex > -1) {
        StudentsArr.splice(deleteFromIndex, 1);
        window.localStorage.setItem('studentsList', JSON.stringify(StudentsArr));
        renderStudents(StudentsArr, RenderStudents);
    }
    deleteConfirmationModal.classList.add('hidden');
});

closeDeleteModal.addEventListener('click', function() {
    deleteConfirmationModal.classList.add('hidden');
});

cancelDelete.addEventListener('click', function() {
    deleteConfirmationModal.classList.add('hidden');
});
