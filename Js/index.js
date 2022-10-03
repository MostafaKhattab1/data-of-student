var stuName = document.getElementById("studentName")
var month = document.getElementById("month")
var searchInput = document.getElementById("searchInput")

var currantx = 0
var allStudent = []

if (localStorage.getItem("StuAll2") != null) {
   allStudent = JSON.parse(localStorage.getItem("StuAll2"));
   displayStudent();
}
else {
   allStudent = []
}

function addStudent() {
   var students = {
      name: stuName.value,
      date: month.value
   }
   allStudent.push(students)
   localStorage.setItem("StuAll2", JSON.stringify(allStudent))
   displayStudent()
}

function displayStudent() {

   temp = ""
   for (var i = 0; i < allStudent.length; i++) {

      temp += `   <tr>
      <td>`+ allStudent[i].name + `</td>
   `
      for (let j = 1; j <= 12; j++) {
         if (j == allStudent[i].date.split(",")[1]) {
            temp += '<td><i class="fa-solid fa-circle-check text-info fw-bolder fs-4"></i></td>'
         }
         else {
            temp += `<td></td>`
         }
      }

      temp += `
      <td>
          <button class="btn btn-warning" onclick="updateStudent(`+ i + `)">تعديل</button>
      </td>
      <td>
          <button class="btn btn-danger" onclick="deleteStudent( `+ i + `) ">حذف</button>
      </td>
  </tr> `
   }

   document.getElementById("tableBody").innerHTML = temp
}


function deleteStudent(x) {
   allStudent.splice(x, 1)
   localStorage.setItem("StuAll2", JSON.stringify(allStudent))
   displayStudent()
}

function clearForm() {
   stuName.value = ""
   month.value = ""
}

function updateStudent(x) {
   currantx = x

   stuName.value = allStudent[x].name
   month.value = allStudent[x].date

   document.getElementById("btn-add").style.display = "none"
   document.getElementById("btn-edit").style.display = "inline-block"
}

function editStudent() {
   allStudent[currantx].name = stuName.value
   allStudent[currantx].date = month.value

   localStorage.setItem("StuAll2", JSON.stringify(allStudent))
   displayStudent();

   document.getElementById("btn-add").style.display = "inline-block"
   document.getElementById("btn-edit").style.display = "none"
}

function SearchStudent() {

   var search = searchInput.value.toLowerCase()

   temp = ""
   for (var i = 0; i < allStudent.length; i++) {

      if (allStudent[i].name.toLowerCase().includes(search) == true){
         
      temp += `   <tr>
      <td>`+ allStudent[i].name.toLowerCase().replace(search ,  `<span class="text-danger fw-bold">${search}</span>`) + `</td>
      `
      for (let j = 1; j <= 12; j++) {
         if (j == allStudent[i].date.split(",")[1]) {
            temp += '<td><i class="fa-solid fa-circle-check text-info fw-bolder fs-4"></i></td>'
         }
         else {
            temp += `<td></td>`
         }
      }

      temp += `
      <td>
          <button class="btn btn-warning" onclick="updateStudent(`+ i + `)">تعديل</button>
      </td>
      <td>
          <button class="btn btn-danger" onclick="deleteStudent( `+ i + `) ">حذف</button>
      </td>
  </tr> `

      }

   }

   document.getElementById("tableBody").innerHTML = temp
}