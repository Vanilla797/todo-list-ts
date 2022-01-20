import React, { useState } from "react";
import { Input, Button, Tabs, Badge, message } from "antd";
import "./style.css";
import ModalForm from "../components/ModalForm";
import List from "../components/List";
import { TodoType, ModalType } from "../interface";
import styled from "styled-components";

const { Search } = Input;
const { TabPane } = Tabs;

const Todo = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [todoId, setTodoId] = useState(1);
  const [lists, setlists] = useState<TodoType[]>([]);

  const [searchText, setSearchText] = useState("");

  const todoList = lists.filter((item) => !item.done);
  const doneList = lists.filter((item) => item.done);

  const getListText = (id: number) => {
    let text: string = "";
    lists.forEach((item) => {
      if (item.id === id) text = item.text;
    });
    return text;
  };
  const onClose = () => {
    setShowModal(false);
  };
  const onShowModal = (type: ModalType, id?: number) => {
    if (type === ModalType.Add) {
      setModalTitle("Add");
    }
    if (type === ModalType.Edit) {
      setModalTitle("Edit");
      setTodoId(id!);
    }
    setShowModal(true);
  };

  const searchFilter = (lists: TodoType[], searchText: string) => {
    if (searchText.trim() !== "") {
      return lists.filter((todo) =>
        todo.text.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    return lists;
  };

  const addTodo = (id: number, text: string, done: boolean) => {
    const Item = { id, text, done };
    setlists([Item, ...lists]);
    message.success("Add success");
  };

  const deleteTodo = (id: number) => {
    const newlists = lists.filter((item) => item.id !== id);
    setlists([...newlists]);
    message.success("Detele success");
  };

  const toggleDone = (id: number) => {
    const newlists = lists.map((item) =>
      item.id === id
        ? {
            ...item,
            done: !item.done,
          }
        : item
    );
    setlists([...newlists]);
  };

  const updateText = (id: number, text: string) => {
    const newlists = lists.map((item) =>
      item.id === id
        ? {
            ...item,
            text,
          }
        : item
    );
    setlists([...newlists]);
    message.success("Edit success");
  };

  return (
    <Container>
      <ActionBar>
        <Search
          placeholder="Search tasks"
          onSearch={(value) => setSearchText(value)}
          enterButton
        />
        <Button
          type="primary"
          className="newTodo"
          onClick={() => onShowModal(ModalType.Add)}>
          +
        </Button>
      </ActionBar>

      <Tabs size={"large"}>
        <TabPane tab={<Badge status="warning" text="Todo" />} key="1">
          <List
            lists={searchFilter(todoList, searchText)}
            updateText={updateText}
            toggleDone={toggleDone}
            deleteTodo={deleteTodo}
            onShowModal={onShowModal}
          />
        </TabPane>
        <TabPane tab={<Badge status="success" text="Completed" />} key="2">
          <List
            lists={searchFilter(doneList, searchText)}
            updateText={updateText}
            toggleDone={toggleDone}
            deleteTodo={deleteTodo}
            onShowModal={onShowModal}
          />
        </TabPane>
        <TabPane tab={<Badge status="default" text="All" />} key="3">
          <List
            lists={searchFilter(lists, searchText)}
            updateText={updateText}
            toggleDone={toggleDone}
            deleteTodo={deleteTodo}
            onShowModal={onShowModal}
          />
        </TabPane>
      </Tabs>

      <ModalForm
        modalTitle={modalTitle}
        todoId={todoId}
        visible={showModal}
        onClose={onClose}
        addTodo={addTodo}
        updateText={updateText}
      />
    </Container>
  );
};

export default Todo;

const Container = styled.div`
  padding: 50px 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const ActionBar = styled.div`
  display: flex;
  margin-bottom: 30px;
`;
