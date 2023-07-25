import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

  todoItems:any[]=[];
  todoFilter:any[]=[];


  todoObject:any={
    todoId:'',
    todoText:''
  }

  add(){
    debugger;
    this.todoObject.todoId=this.todoItems.length+1  ;
    this.todoItems.unshift(this.todoObject);
    localStorage.setItem("todoList",JSON.stringify(this.todoItems));
    this.todoObject={
      todoId:'',
      todoText:''
    };

    
  }

  isCheck(){
    const checkedCount=this.todoItems.filter(a=>a.isChecked==true).length;
    if(checkedCount!=0)
      return true;
    return false;
  }

  del(){
    const checkedList=this.todoItems.filter(a=>a.isChecked==true) ;
    for(let i=0;i<checkedList.length;i++)
    {
      const checkitem=this.todoItems.findIndex(m=>m.todoId==checkedList[i].todoId);
        this.todoItems.splice(checkitem,1);
    }
    localStorage.setItem("todoList",JSON.stringify(this.todoItems));
  }

  filter(s:string){
    const tabFilt=this.todoItems.filter(a=>a.todoText.toLowerCase().startsWith(s.toLowerCase()));
    if(tabFilt.length!==0)
        this.todoFilter=tabFilt;
    else{
      if(this.todoObject.todoText ==''){
        this.todoFilter=this.todoItems;
      }
    }

  }


  ngOnInit():void{
    debugger;
    const data=localStorage.getItem("todoList");
    if(data!=null){
      this.todoItems=JSON.parse(data);
      this.todoFilter=this.todoItems;
    }
  }
}
