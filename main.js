const tasks=JSON.parse(localStorage.getItem("task"))??[]
// const task=JSON.parse(localStorage.getItem('tasks')
const tasklist=document.querySelector("#task-list")
const todoform=document.querySelector("#todo-form")
const todoinput=document.querySelector("#todo-input")
/* kt trùng */
function duplicate(newtitle,idex=-1){
    const trung
        =tasks.some((t,i)=>t.title.toLowerCase()===newtitle.toLowerCase()
        &&idex!==i)
        return trung
}
/* localstorage lưu kiểu dữ liệu chuỗi */
/* Json có thể lưu mảng*/
// localStorage.setItem('key',' value')/* thêm dữ liệu getitem lấy dữ liệu*/ 
// console.log(JSON.stringify(tasks))/* dùng chuyển thành chuỗi JSON */
/* lưu data */
function savetask(){
    localStorage.setItem('task', JSON.stringify(tasks))
}
/* add */
todoform.onsubmit = function(e) {
    e.preventDefault();
    const value=todoinput.value.trim()
    if(!value){
        alert("nhập đi fen")
        return;
    }
    const newtask={
        title:value,
        completed:false
    }
    // const trung=tasks.some((task)=>task.title.toLowerCase()==value.toLowerCase())
    if(duplicate(value)){
        alert("trùng r")
        return
    }
    tasks.push(newtask)/* THÊM VÀO CUỐI */
    render()
    savetask()
    todoinput.value=""
}
/* edit */
tasklist.onclick=function(e){
    const taskitem=e.target.closest(".task-item")
    const taskindex = +taskitem.getAttribute("task-index");
    const task=tasks[taskindex]
    
    if(e.target.closest(".edit")){
        let newtitle=prompt("nhập title",task.title);
        if(newtitle==null )return;
        newtitle=newtitle.trim()
        /* tránh trường hợp k nhập*/
        if(!newtitle){
            alert("nhập lại đi")
            return
        }
        /* check trùng */
        
        if(duplicate(newtitle,taskindex)){
            alert("Trùng rồi, nhập lại đi");
            return;
        }
        task.title = newtitle;/* gán lại */
        render()
        savetask()
    }else if(e.target.closest(".done")){
        task.completed=!task.completed
        render()
        savetask()
    }else if(e.target.closest(".delete")){
        if(confirm(`xoá thật hả${task.title}`))
        tasks.splice(taskindex,1)
         render()
        savetask()
        

    }
}
function render(){
    if(!tasks.length){
        tasklist.innerHTML='<li>k có danh sách vui lòng nhập vào</li>'
        return;
    }
const html=tasks.map((task,index)=>`<li class="task-item ${task.completed?"completed":""}"
                task-index="${index}">
                <span class="task-title">${task.title}</span>
                <div class="task-action">
                    <button class="task-btn edit">Edit</button>
                    <button class="task-btn done">${task.completed ?"mark as undone":"mark as done"}</button>
                    <button class="task-btn delete">Delete</button>
                </div>
            </li>`).join(" ")/* biến thành 1 chuỗi */;
tasklist.innerHTML=html;
}



