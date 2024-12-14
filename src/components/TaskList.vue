<template>
    <div>
      <h1>Task Manager</h1>
  
      <button @click="toggleForm">
        {{ showForm ? 'Hide Form' : 'Add New Task' }}
      </button>
  
      <form v-if="showForm" @submit.prevent="addTask">
        <input v-model="newTask" placeholder="Enter task name" />
        <button type="submit">Add Task</button>
      </form>
  
      <p v-if="tasks.length === 0">No tasks available</p>
  
      <ul>
        <li v-for="(task, index) in tasks" :key="index" :class="{ completed: task.completed }">
          <span @click="toggleTaskCompletion(index)" style="cursor: pointer">
            {{ task.name }}
          </span>
          <button @click="deleteTask(index)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { taskState } from '../main';
  
  export default {
    data() {
      return {
        newTask: '',
        showForm: false
      };
    },
    computed: {
      tasks() {
        return taskState.tasks;
      }
    },
    methods: {
      toggleForm() {
        this.showForm = !this.showForm;
      },
      addTask() {
        if (this.newTask.length < 3) {
          alert('Task name must be at least 3 characters long.');
          return;
        }
        taskState.tasks.push({ name: this.newTask, completed: false });
        this.newTask = '';
        this.saveTasks();
      },
      toggleTaskCompletion(index) {
        taskState.tasks[index].completed = !taskState.tasks[index].completed;
        this.saveTasks();
      },
      deleteTask(index) {
        taskState.tasks.splice(index, 1);
        this.saveTasks();
      },
      saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(taskState.tasks));
      }
    }
  };
  </script>
  
  <style scoped>
  div {
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
  }
  
  button {
    background-color: #4caf50; 
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  button:active {
    background-color: #3e8e41;
  }
  
  button.delete {
    background-color: #f44336; 
  }
  
  button.delete:hover {
    background-color: #d32f2f;
  }
  
  form {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  
  input {
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  
  input:focus {
    border-color: #4caf50;
    outline: none;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin: 5px 0;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #fff;
    transition: transform 0.2s ease;
  }
  
  li:hover {
    transform: scale(1.02);
  }
  
  span {
    flex-grow: 1;
    cursor: pointer;
  }
  
  .completed {
    background-color: lightgreen; 
    border: 2px solid red; 
  }
  
  .completed span {
    text-decoration: line-through;
    color: #888;
  }
  
  @media (max-width: 600px) {
    div {
      padding: 10px;
    }
  
    button {
      font-size: 12px;
      padding: 8px 16px;
    }
  }
  </style>
  