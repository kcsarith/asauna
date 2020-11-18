import React, { useState, useEffect, } from 'react';
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import { v4 } from "uuid";
import '../styles/ws-board.css'

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { getAllTasks } from '../store/task'

function WorkspaceProject() {
    const dispatch = useDispatch();
    const [text, setText] = useState("")
    const [state, setState] = useState({
        "todo": {
            title: "Todo",
            items: []
        },
        "in-progress": {
            title: "In Progress",
            items: []
        },
        "done": {
            title: "Completed",
            items: []
        }
    })
    const { workspaceId } = useParams();
    useEffect(() => {
        async function fetchData() {
            // You can await here
            const res = await dispatch(getAllTasks());
            console.log(res.data);

            const completedTasks = res.data.tasks.filter(ele => ele.status === 'Completed')
            const inProgressTasks = res.data.tasks.filter(ele => ele.status === 'Incomplete')
            const todoTasks = res.data.tasks.filter(ele => ele.status === 'Todo')
            await setState(prev => {
                prev = { ...prev };
                prev['done'].items = completedTasks;
                prev['in-progress'].items = inProgressTasks;
                prev['todo'].items = todoTasks;
                return prev
            });
        }
        fetchData();
    }, [workspaceId]); // Or [] if effect doesn't need props or state

    const handleDragEnd = ({ destination, source }) => {
        if (!destination) {
            return
        }

        if (destination.index === source.index && destination.droppableId === source.droppableId) {
            return
        }

        // Creating a copy of item before removing it from state
        const itemCopy = { ...state[source.droppableId].items[source.index] }

        setState(prev => {
            prev = { ...prev }
            // Remove from previous items array
            prev[source.droppableId].items.splice(source.index, 1)


            // Adding to new items array location
            prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)

            return prev
        })
    }


    return (
        <div className="App">
            <DragDropContext onDragEnd={handleDragEnd}>
                {_.map(state, (data, key) => {
                    return (
                        <div key={key} className={"column"}>
                            <h3>{data.title}</h3>
                            <Droppable droppableId={key}>
                                {(provided, snapshot) => {
                                    return (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className={"droppable-col"}
                                        >
                                            {data.items.map((el, index) => {
                                                return (
                                                    <Draggable key={el.id} index={index} draggableId={el.id.toString()}>
                                                        {(provided, snapshot) => {
                                                            console.log(el)
                                                            return (
                                                                <div
                                                                    className={`item ${snapshot.isDragging && "dragging"}`}
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                >
                                                                    {el.name}
                                                                </div>
                                                            )
                                                        }}
                                                    </Draggable>
                                                )
                                            })}
                                            {provided.placeholder}
                                        </div>
                                    )
                                }}
                            </Droppable>
                        </div>
                    )
                })}
            </DragDropContext>
            < div className={"droppable-col"} >
                <p>The list</p>
            </div>
        </div >
    );
}

export default WorkspaceProject;
