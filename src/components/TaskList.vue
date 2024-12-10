<template>
    <div class="main-box">
      <h1>Task Management App</h1>
      <button @click="showForm = !showForm">
        {{ showForm ? 'Hide Add Task Form' : 'Show Add Task Form' }}
      </button>
      <div v-if="showForm" class="text-center">
        <input v-model="newTask" placeholder="Enter task name" />
        <button @click="addTask(newTask)">Add Task</button>
      </div>
      <div v-if="state.tasks.length === 0">No tasks available</div>
      <ul v-else>
        <li
          v-for="(task, index) in state.tasks"
          :key="index"
          :style="{
            backgroundColor: task.completed ? 'lightgreen' : '',
            border: task.completed ? '2px solid red' : ''
          }"
        >
          {{ task.name }}
          <div class="complete-box">
            <button @click="toggleTask(task)">
            {{ task.completed ? 'Undo' : 'Complete' }}
          </button>
          <button @click="deleteTask(index)">Delete</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { state } from "../store";
  import { computed, ref } from "vue";
  
  export default {
    setup() {
      const newTask = ref("");
      const showForm = ref(false);
  
      const addTask = (taskName) => {
        if (taskName.length >= 3) {
          state.tasks.push({ name: taskName, completed: false });
          newTask.value = "";
          saveTasks();
        } else {
          alert("Task name must be at least 3 characters long.");
        }
      };
  
      const toggleTask = (task) => {
        task.completed = !task.completed;
        saveTasks();
      };
  
      const deleteTask = (index) => {
        state.tasks.splice(index, 1);
        saveTasks();
      };
  
      const saveTasks = () => {
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      };
  
      return { state, newTask, showForm, addTask, toggleTask, deleteTask };
    }
  };
  </script>
  
  <style>
  *{
    padding: 0;
    margin: 0;
    outline: 0;
    box-sizing: border-box;
  }
  body{
    font-family: "Roboto", serif;
    background-color: #242424;
    font-size: 16px;
    line-height: 26px;
    font-weight: 300;
    color: #606c76;
  }
  li{
    list-style-type: none;
  }
  .main-box{
    max-width: 550px;
    width: 100%;
    margin: 0 auto;
    min-height: 100vh;
    padding: 50px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .main-box h1{
    font-size: 51px;
    line-height: 56px;
    font-weight: 300;
    
  }
  .main-box button{
    font-size: 12px;
    line-height: 38px;
    font-weight: 700;
    background-color: #F72C5B;
    border-radius: 4px;
    text-transform: uppercase;
    color: #fff;
    padding: 2px 25px;
    border: none;
    display: inline-block;
    margin: 25px 0;
    transition: .3s all linear;
    cursor: pointer;
  }

  .main-box button:hover{
    background-color: #9AA6B2;
  }
  .text-center{
    text-align: center;
  }
  .main-box input{
    padding: 10px 15px;
    border: 1px solid #F72C5B;
    background: transparent;
    border-radius: 4px;
    width: 100%;
    font-family: "Roboto", serif;
    
    font-size: 16px;
    line-height: 26px;
    font-weight: 300;
    color: #606c76;
  }
  .main-box ul{
    width: 100%;
  }
  .main-box ul li{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #F72C5B;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
  }
  .main-box .complete-box button{
    margin: 0;
  }
  .complete-box{
    display: flex;
    gap: 10px;
  }
  </style>
  