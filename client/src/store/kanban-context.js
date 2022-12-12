import React from 'react';

const KanbanContext = React.createContext({
    taskToDo: [],
    taskInProgress: [],
    taskDone: [],
    addTask: (task) => {},
    removeTask: (id) => {},
    moveTaskAB: (id) => {},
    moveTaskBC: (id) => {},
    moveTaskCB: (id) => {},
    moveTaskBA: (id) => {},
});

export default KanbanContext;