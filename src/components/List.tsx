import React, { FC } from "react";
import { TodoListProps, ModalType } from "../interface";
import "../pages/style.css";
import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { Empty } from "antd";

const List: FC<TodoListProps> = (props) => {
  const { lists, toggleDone, deleteTodo, onShowModal } = props;

  return (
    <ul className="list">
      {lists.length ? (
        lists.map((todo, i) => (
          <li key={i}>
            <div className="item">
              <span className="content">{todo.text}</span>
              <div>
                <EditOutlined
                  className="icon"
                  onClick={() => onShowModal(ModalType.Edit, todo.id)}
                />
                {todo.done ? (
                  <UndoOutlined
                    className="icon"
                    onClick={() => toggleDone(todo.id)}
                  />
                ) : (
                  <CheckOutlined
                    className="icon"
                    onClick={() => toggleDone(todo.id)}
                  />
                )}
                <DeleteOutlined
                  className="icon"
                  onClick={() => deleteTodo(todo.id)}
                />
              </div>
            </div>
          </li>
        ))
      ) : (
        <Empty className="empty" />
      )}
    </ul>
  );
};

export default List;
