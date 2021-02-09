import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import "./dashboard.sass";
import { connect, useSelector } from "react-redux";
import {
    getTodos,
    updateTodo,
    updateColor,
    deleteTodo,
    addTodo,
} from "../../redux/actions/actions";
import { RootState } from "../../redux/reducers";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import trash from "../../assets/trash.svg";

type DashboardProps = {
    reducer: RootState;
    getTodos: Function;
    updateTodo: Function;
    updateColor: Function;
    deleteTodo: Function;
    addTodo: Function;
};

const Dashboard: React.FunctionComponent<DashboardProps> = (props) => {
    const reducer = useSelector((state: DashboardProps) => state.reducer);

    const [modal, setModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [todoTitle, setTodoTitle] = useState("");
    const [todoDescription, setTodoDescription] = useState("");
    const [todoId, setTodoId] = useState("");

    useEffect(() => {
        props.getTodos();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        ReactDOM.render(
            <React.StrictMode>
                {modal && todoModal}
                {addModal && addTodoModal}
            </React.StrictMode>,
            document.getElementById("modal")
        );
        // eslint-disable-next-line
    }, [modal, addModal, todoTitle, todoDescription]);

    if (modal || addModal) {
        document.getElementById("root")!.style.opacity = "0.1";
        document.body.classList.add("modal-open");
        document.getElementById("root")!.style.pointerEvents = "none";
    } else {
        document.getElementById("root")!.style.opacity = "1";
        document.body.classList.remove("modal-open");
        document.getElementById("root")!.style.pointerEvents = "auto";
    }

    dayjs.extend(relativeTime);

    const openModal = (todo: any) => {
        setModal(true);
        setTodoTitle(todo.title);
        setTodoDescription(todo.description);
        setTodoId(todo.id);
    };

    const openAddNewTodoModal = () => {
        setAddModal(true);
        setTodoTitle("");
        setTodoDescription("");
        setTodoId("");
    };

    const useOnClick = (ref: any, handler: any) => {
        useEffect(() => {
            const listener = (event: any) => {
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }
                handler(event);
            };
            document.addEventListener("mousedown", listener);
            return () => {
                document.removeEventListener("mousedown", listener);
            };
            // eslint-disable-next-line
        }, []);
    };
    const ref: any = useRef();
    useOnClick(ref, () => {
        setModal(false);
        setAddModal(false);
    });

    const update = (e: any) => {
        e.preventDefault();

        props.updateTodo({
            title: todoTitle,
            description: todoDescription,
            id: todoId,
        });

        setModal(false);
    };

    const updateTodoColor = (color: any) => {
        props.updateColor({
            color: color,
            id: todoId,
        });
    };

    const deleteTodo = () => {
        props.deleteTodo({
            id: todoId,
        });

        setModal(false);
    };

    const addNewTodo = () => {
        props.addTodo({
            title: todoTitle,
            description: todoDescription,
        });

        setAddModal(false);
    };

    const todoModal = (
        <div className="dashboard-modal" ref={ref}>
            <label htmlFor="todoTitle" className="modal-label">
                Title
            </label>
            <input
                placeholder="Title"
                id="todoTitle"
                name="todoTitle"
                type="text"
                value={todoTitle || ""}
                onChange={(e: any) => setTodoTitle(e.target.value)}
                className="modal-input"
            />
            <label htmlFor="todoDescription" className="modal-label">
                Description
            </label>
            <textarea
                placeholder="Description"
                id="todoDescription"
                name="todoDescription"
                value={todoDescription || ""}
                onChange={(e: any) => setTodoDescription(e.target.value)}
                className="modal-textarea"
            />
            <button
                className="modal-update-button"
                type="submit"
                onClick={update}
            >
                Update
            </button>
            <div className="colors">
                <div
                    className="color-green"
                    onClick={() => updateTodoColor("#C5E1A5")}
                />
                <div
                    className="color-yellow"
                    onClick={() => updateTodoColor("#FFF59D")}
                />
                <div
                    className="color-blue"
                    onClick={() => updateTodoColor("#81D4FA")}
                />
                <div
                    className="color-purple"
                    onClick={() => updateTodoColor("#CE93D8")}
                />
                <div
                    className="color-red"
                    onClick={() => updateTodoColor("#EF9A9A")}
                />
                <div
                    className="color-white"
                    onClick={() => updateTodoColor("#F5F5F5")}
                />
            </div>
            <img
                src={trash}
                alt="trash"
                className="trash"
                onClick={deleteTodo}
            />
        </div>
    );

    const addTodoModal = (
        <div className="add-modal" ref={ref}>
            <label htmlFor="todoTitle" className="add-modal-label">
                Title
            </label>
            <input
                placeholder="Title"
                id="todoTitle"
                name="todoTitle"
                type="text"
                value={todoTitle || ""}
                onChange={(e: any) => setTodoTitle(e.target.value)}
                className="add-modal-input"
            />
            <label htmlFor="todoDescription" className="add-modal-label">
                Description
            </label>
            <textarea
                placeholder="Description"
                id="todoDescription"
                name="todoDescription"
                value={todoDescription || ""}
                onChange={(e: any) => setTodoDescription(e.target.value)}
                className="add-modal-textarea"
            />
            <button
                className="add-modal-update-button"
                type="submit"
                onClick={addNewTodo}
            >
                Add
            </button>
        </div>
    );

    return (
        <div className="dashboard-container">
            <div className="dashboard">
                {reducer.todos.map((todo: any) => {
                    return (
                        <div
                            style={{ backgroundColor: todo.color }}
                            className="todo"
                            key={todo.id}
                            onClick={() => openModal(todo)}
                        >
                            <p className="todo-title">{todo.title}</p>
                            <p className="todo-description">
                                {todo.description}
                            </p>
                            <p className="created-at">
                                {dayjs(todo.created_at).fromNow(true)} ago
                            </p>
                        </div>
                    );
                })}
            </div>
            <button
                className="dashboard-add-button"
                onClick={() => openAddNewTodoModal()}
            >
                Add Note
            </button>
        </div>
    );
};

export default connect(null, {
    getTodos,
    updateTodo,
    updateColor,
    deleteTodo,
    addTodo,
})(Dashboard);
