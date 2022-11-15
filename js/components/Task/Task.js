import getTemplate from './template';

export default class Task {
    constructor (data, parent) {
      this.id = data.id;
      this.content = data.content;
      this.completed = data.completed | false;
      this.parent = parent;
      this.elt = null;
    }
    render (elt) {
      const newTask = document.createElement('div');
      document.querySelector(elt).append(newTask);
      newTask.outerHTML = getTemplate(this); 
      
      this.elt = document.querySelector(elt + ' li:last-of-type');
      this.activateElements();
    }
    activateElements () {
      this.elt.querySelector('.toggle').onchange = () => {
        this.toggleCompleted();
      };
      this.elt.querySelector('.destroy').onclick = () => {
        this.selfDestroy();
      };
    }

    toggleCompleted () {
      this.elt.classList.toggle('completed');
      this.parent.toggleTask(this.id);
    }

    selfDestroy () {
      this.elt.remove();
      this.parent.destroyTask(this.id);
    }
  };