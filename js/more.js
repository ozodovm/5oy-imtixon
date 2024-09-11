const moreId = JSON.parse(window.localStorage.getItem("moreId"))
let studentArr = JSON.parse(window.localStorage.getItem("studentsList"))
let moreList = document.querySelector(".more-list")
let eltitle = document.querySelector(".title")


const findSingleData = studentArr.find(item => item.id == moreId)

moreList.innerHTML = `
    <div class="w-[592px] h-[391px] bg-white mt-[41px] p-3 flex justify-between rounded-lg">
    <img src=${findSingleData.imgURL}/>
    <div>
    <div class="text-center mx-auto"><span class="text-[14px] text-slate-500">Name</span>
    <h2 class="pb-[20px]">${findSingleData.name}</h2></div>
    <div class="text-center mx-auto"><span class="text-[14px] text-slate-500">Email</span>
    <p class="pb-[20px]">Email${findSingleData.email}</p></div>
    <div class="text-center mx-auto"><span class="text-[14px] text-slate-500">Phone</span>
    <p>${findSingleData.phone}</p></div>
    <span class="pt-[20px] block text-[14px] text-center text-slate-500">Date admission</span>
    <p class="text-center">${findSingleData.date}</p>
    </div>
    <div><img src="./images/decoration.svg" width="12" height="82"></div>
    </div>
    
`
eltitle.textContent = findSingleData.name