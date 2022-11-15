import getTemplate from './template';
import './app.css';
import Task from '../Task/Task';

export default class TasksList {
    constructor (data) {
      this.elt = document.querySelector(data.elt);
      this.tasks = [];
      this.initLocalStorage();
      this.loadTasks();
      this.render();
      this.renderTasksCount();
      this.activateElements();
    }
    initLocalStorage () {
      if (!localStorage.tasks) {
        localStorage.tasks = JSON.stringify([]);
      }
    }
    loadTasks () {
      JSON.parse(localStorage.tasks).forEach(task => {
        this.tasks.push(new Task(task, this));
      });
    }
    render () {
      this.elt.innerHTML = getTemplate(this);
      this.tasks.forEach(task => task.render('.todo-list'));
    }
    renderTasksCount () {
      this.elt.querySelector('.todo-count strong').innerText = 
        this.tasks.filter(task => !task.completed).length;
    }
    activateElements () {
      this.elt.querySelector('.new-todo').onkeyup = (e) => {
        if (e.code === 'Enter') {
          this.addTask(this.elt.querySelector('.new-todo').value);
        }
      }
    }
    addTask (data) {
      const task = new Task({id: Date.now(), content: data, completed: false}, this);
      this.tasks.push(task);
      localStorage.tasks = JSON.stringify(this.tasks);
      task.render('.todo-list');
      this.elt.querySelector('.new-todo').value = '';
      this.activateElements();
      this.renderTasksCount();
    }
    toggleTask (id) {
      this.tasks.filter(task => task.id == id)[0].completed = 
        !this.tasks.filter(task => task.id == id)[0].completed;
      this.renderTasksCount();
    }
    destroyTask (id) {
      this.tasks.splice(this.tasks.findIndex(task => task.id == id), 1);
      this.renderTasksCount();
    }
  };