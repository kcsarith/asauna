import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Route, useParams, useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Divider, InputBase, Slide } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AppsIcon from '@material-ui/icons/Apps';

import { getAllTasks, patchTaskListOrder, patchTaskName, createNewTask } from '../store/task'

import WsTaskCreationEdit from '../components/workspace/WsTaskCreationEdit';


import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    icon: {
        color: '#DDDDDD'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    lighten: {
        backgroundColor: '#555555'
    },
    darken: {
        backgroundColor: '#000000'
    },
    darkenPads: {
        backgroundColor: '#FFFFFF',
        paddingBottom: '200px'
    },
    whiteBg: {
        backgroundColor: '#FFFFFF',
        paddingLeft: '10px',
        paddingRight: '10px',
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
    descriptionTextArea: {
        minWidth: '400px',
        minHeight: '80px'
    },
    taskPadding: {
        // margin: '200px !important'
    },
    checkIncomplete: {
        backgroundColor: '#FF0000 !important',
        color: 'red'
    },
    checkComplete: {
        backgroundColor: '#DD0000 !important',
        color: 'green !important'
    }

}));

export default function WorkspaceMyTasks() {
    const classes = useStyles();
    const { workspaceId } = useParams()

    const dispatch = useDispatch();
    const history = useHistory();

    const [currentTaskLo, setCurrentTaskLo] = useState();
    const [myTasks, setMyTasks] = useState([]);

    const [singleTaskName, setSingleTaskName] = useState();
    const [singleTaskDescription, setSingleTaskDescription] = useState();
    const [singleTaskDueDate, setSingleTaskDueDate] = useState();
    const [singleTaskStatus, setSingleTaskStatus] = useState();
    const [singleTaskAssignedToId, setSingleTaskAssignedToId] = useState();
    const [singleTaskProjectId, setSingleTaskProjectId] = useState();
    const [singleTaskPriority, setSingleTaskPriority] = useState();
    const [singleTaskParentTasktId, setSingleTaskParentTaskId] = useState();
    // useEffect(async () => {
    //     // This gets called after every render, by default
    //     // (the first one, and every one after that)

    //     await dispatch(getAllTasks());
    //     console.log('usingEffect' + workspaceId)
    //     // If you want to implement componentWillUnmount,
    //     // return a function from here, and React will call
    //     // it prior to unmounting.
    //     return () => console.log('unmounting...');
    // }, [workspaceId
    //     /* dependencies to watch = leave blank to run once or you will get a stack overflow */]);


    useEffect(() => {
        async function fetchData() {
            // You can await here
            const res = await dispatch(getAllTasks());
            setMyTasks(res.data.tasks);
        }
        fetchData();

        console.log(parseInt(window.location.href.split('my-tasks/')[1]))
    }, [workspaceId]); // Or [] if effect doesn't need props or state

    const handleMyTaskClick = e => {
        const myTasksLength = myTasks.length;
        const sideBarTaskId = parseInt(e.target.id.split('my-task_')[1], 10);
        const sideBarTaskLo = myTasksLength - parseInt(e.currentTarget.className.split('my-task-lo_')[1].split(' ')[0], 10);
        setCurrentTaskLo(sideBarTaskLo);
        setSingleTaskName(myTasks[sideBarTaskLo].name);
        setSingleTaskDescription(myTasks[sideBarTaskLo].description);
        setSingleTaskDueDate(myTasks[sideBarTaskLo].dueDate);
        setSingleTaskStatus(myTasks[sideBarTaskLo].status);
        setSingleTaskAssignedToId(myTasks[sideBarTaskLo].AssignedToId);
        setSingleTaskProjectId(myTasks[sideBarTaskLo].projectId);
        setSingleTaskPriority(myTasks[sideBarTaskLo].priority);
        setSingleTaskParentTaskId(myTasks[sideBarTaskLo].parentTaskId);
        if (sideBarTaskId > 0) {
            history.push(`/workspace/${workspaceId}/my-tasks/${sideBarTaskId}`);
        }
    }
    const handleMyTaskOnChange = e => {
        let value = e.target.value;
        let prev = [...myTasks];

        const sideBarTaskId = parseInt(e.target.id.split('my-task_')[1], 10);
        const currentTask = { ...prev[currentTaskLo] }
        currentTask.name = value;
        prev.splice(currentTaskLo, 1, currentTask);
        setSingleTaskName(e.target.value);
        setMyTasks(prev);
        async function fetchData() {
            const res = await dispatch(patchTaskName(sideBarTaskId, e.target.value));
        }

        if (singleTaskName) {
            fetchData();
        }
    }

    const handleMyTaskOnBlur = e => {
        const sideBarTaskId = parseInt(e.target.id.split('my-task_')[1], 10)
        async function fetchData() {
            // You can await here
        }
        fetchData();

    }
    const handleCreateNewTask = e => {
        async function fetchData() {
            // You can await here
            // const res = await dispatch(patchTaskName(sideBarTaskId, e.target.value));

            const res = await dispatch(createNewTask('untitled', 'Hmmm', 1, 1));
            const newTask = res.data.task
            const prev = [...myTasks]
            console.log(newTask)
            setMyTasks([newTask, ...prev])
            console.log(myTasks)
        }
        fetchData();

    }

    const handleOnDragEnd = result => {
        //TODO, SWAP LIST ORDERS
        const { destination, source } = result;
        if (!destination) {
            return
        }

        if (destination.index === source.index && destination.droppableId === source.droppableId) {
            return
        }
        let sourceTaskCopy = { ...myTasks[source.index] };
        let destinationTaskCopy = { ...myTasks[destination.index] };
        const sourceTaskId = sourceTaskCopy.id;
        const destinationTaskId = destinationTaskCopy.id;


        setMyTasks(prev => {
            prev = [...prev]
            // Remove from previous items array
            prev.splice(source.index, 1);
            // Adding to new items array location
            prev.splice(destination.index, 0, sourceTaskCopy);

            prev.forEach((ele, index) => {
                ele.listOrder = myTasks.length - index;
            })
            return prev
        })
        async function fetchData() {
            // You can await here
            const res = await dispatch(patchTaskListOrder(source.index, destination.index));
            console.log(res)
        }
        fetchData();
    };
    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            spacing={5}
            mx={5}
        >
            <Grid item sm={6} >
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    spacing={3, 3}
                    className={classes.whiteBg} >
                    <Grid item sm={12} align="left">
                        <Button variant="contained" color="primary" onClick={handleCreateNewTask}>+ Add Task</Button>
                    </Grid>
                    <Grid item sm={12}><Divider className={classes.darken} /></Grid>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Grid item sm={6} align="left"><h2>Recently Assigned</h2><h3>Warning! Editing tasks too fast can lead to crashing.</h3></Grid>
                        <Grid item sm={6} align="right"><h2>Due Date</h2></Grid>
                        <Droppable droppableId='droppable_my-task'>
                            {(provided) => (
                                <Grid container direction="row" justify="space-between" spacing={0} className={classes.whiteBg} innerRef={provided.innerRef} {...provided.droppableProps} >
                                    {myTasks.length > 0 && myTasks.map((task, index) => {
                                        console.log(myTasks.length - task.listOrder);
                                        return <Draggable key={task.id} draggableId={`draggable-task_${task.id}`} index={index}>
                                            {provided => (
                                                <Grid container {...provided.draggableProps} {...provided.dragHandleProps} innerRef={provided.innerRef} className={task.id === parseInt(window.location.href.split('my-tasks/')[1]) ? 'hover-highlight active' : 'hover-highlight'}>
                                                    <Grid item sm={12}><Divider className={classes.darken} /></Grid>
                                                    <Grid item sm={1} component={AppsIcon} />
                                                    <Grid item sm={1} component={CheckCircleOutlineIcon} color={(myTasks[myTasks.length - task.listOrder].status !== 'Completed') ? "secondary" : "primary"} />
                                                    <Grid item sm={7} component={InputBase} id={`my-task_${task.id}`} className={`my-task-lo_${task.listOrder}`} value={myTasks[myTasks.length - task.listOrder].name} fullWidth onClick={handleMyTaskClick} onChange={handleMyTaskOnChange} onBlur={handleMyTaskOnBlur} align="left" >
                                                        {task.name}
                                                    </Grid>
                                                    <Grid item sm={2} align="right">{myTasks[myTasks.length - task.listOrder].dueDate.slice(0, 10)}</Grid>
                                                </Grid>
                                            )}
                                        </Draggable>
                                    }
                                    )}
                                    {provided.placeholder}
                                    <Grid item sm={12}><Divider className={classes.darken} /></Grid>
                                    <Grid item sm={12}><Divider className={classes.darkenPads} /></Grid>
                                </Grid>
                            )}
                        </Droppable>
                    </DragDropContext>
                </Grid>
            </Grid>
            {/* THIS IS THE FORM! */}
            <Route path="/workspace/:workspaceId/my-tasks/:taskId" render={() => <WsTaskCreationEdit

                currentTaskLo={currentTaskLo}
                myTasks={myTasks}
                setMyTasks={setMyTasks}
                taskName={singleTaskName}
                setTaskName={setSingleTaskName}
                taskDescription={singleTaskDescription}
                setTaskDescription={setSingleTaskDescription}
                taskDueDate={singleTaskDueDate}
                setTaskDueDate={setSingleTaskDueDate}
                taskStatus={singleTaskStatus}
                setTaskStatus={setSingleTaskStatus}
                taskAssignedToId={singleTaskAssignedToId}
                setTaskAssignedToId={setSingleTaskAssignedToId}
                taskProjectId={singleTaskProjectId}
                setTaskProjectId={setSingleTaskProjectId}
                taskPriority={singleTaskPriority}
                setTaskPriority={setSingleTaskPriority}
                taskParentTaskId={singleTaskParentTasktId}
                setTaskParentTaskId={setSingleTaskParentTaskId} />} />
        </Grid>
    );
}
