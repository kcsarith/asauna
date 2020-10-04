import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Route, useParams, useHistory } from 'react-router-dom';

import _ from 'lodash'

import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Divider, TextField, InputBase } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import { getAllTasks, swapMyTaskListOrders } from '../store/task'

import WsTaskCreationEdit from '../components/workspace/WsTaskCreationEdit';


import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
        marginBottom: 0,
        backgroundColor: 'black'
    },
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
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: '#222222',
        color: 'white'
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
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
    whiteBg: {
        backgroundColor: '#FFFFFF'
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

    const taskInfo = useSelector(state => state.task)
    const dispatch = useDispatch();
    const history = useHistory();

    const [currentTaskId, setCurrentTaskId] = useState();
    const [myTasks, setMyTasks] = useState([]);
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
            console.log(res.data.tasks);
            setMyTasks(res.data.tasks);
        }
        fetchData();
    }, [workspaceId]); // Or [] if effect doesn't need props or state

    const handleMyTaskClick = e => {
        const sideBarTaskId = parseInt(e.target.id.split('my-task_')[1], 10);
        if (sideBarTaskId > 0) {
            history.push(`/workspace/${workspaceId}/my-tasks/${sideBarTaskId}`);
        }
    }
    const handleMyTaskOnChange = e => {
        const sideBarTaskId = parseInt(e.target.id.split('my-task_')[1], 10)
        setCurrentTaskId(sideBarTaskId);
    }

    const handleOnDragEnd = result => {
        //TODO, SWAP LIST ORDERS
        console.log(result)
        const { destination, source } = result;
        if (!destination) {
            return
        }

        if (destination.index === source.index && destination.droppableId === source.droppableId) {
            return
        }
        console.log(myTasks[source.index]);
        console.log(myTasks[destination.index]);
        const sourceTaskCopy = { ...myTasks[source.index] };
        const destinationTaskCopy = { ...myTasks[destination.index] };
        setMyTasks(prev => {
            prev = [...prev];
            console.log(prev);
            prev.splice(source.index, 1);
            prev.splice(destination.index, 0, sourceTaskCopy);
            return prev;

        });
        async function fetchData() {
            // You can await here
            await swapMyTaskListOrders(sourceTaskCopy.listOrder, destinationTaskCopy.listOrder)
        }
        fetchData();
    };
    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            spacing={5}>
            <Grid item sm={7} >
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    spacing={3, 3}
                    className={classes.whiteBg} >
                    <Grid item sm={12} align="left">
                        <Button variant="contained" color="primary">+ Add Task</Button>
                    </Grid>
                    <Grid item sm={12}><Divider className={classes.darken} /></Grid>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Grid item sm={6} align="left"><h2>Recently Assigned</h2></Grid>
                        <Grid item sm={6} align="right"><h2>Due Date</h2></Grid>
                        <Droppable droppableId='droppable_my-task'>
                            {(provided) => (
                                <Grid container direction="row" justify="space-between" spacing={3, 3} className={classes.whiteBg} innerRef={provided.innerRef} {...provided.droppableProps} >
                                    {myTasks.length > 0 && myTasks.map((task, index) =>
                                        <Draggable key={task.id} draggableId={`draggable-task_${task.id}`} index={index}>
                                            {provided => (
                                                <Grid container {...provided.draggableProps} {...provided.dragHandleProps} innerRef={provided.innerRef}>
                                                    <Grid item sm={12}><Divider className={classes.darken} /></Grid>
                                                    <Grid item sm={9} component={InputBase} id={`my-task_${task.listOrder}`} defaultValue={task.name} fullWidth onClick={handleMyTaskClick} onChange={handleMyTaskOnChange} align="left" ><CheckCircleOutlineIcon color={(task.status === 'Incomplete') ? "secondary" : "primary"} />{task.name}</Grid>
                                                    <Grid item sm={3} align="right">{task.dueDate}</Grid>
                                                </Grid>
                                            )}
                                        </Draggable>
                                    )}
                                    {provided.placeholder}
                                </Grid>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <Grid item sm={12}><Divider className={classes.darken} /></Grid>
                </Grid>
            </Grid>
            {/* THIS IS THE FORM! */}
            {Object.keys(taskInfo).length &&
                <Route path="/workspace/:workspaceId/my-tasks/:taskId" render={() => <WsTaskCreationEdit taskInfo={taskInfo} />} />}

        </Grid>
    );
}
