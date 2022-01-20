export interface TodoType {
  id: number;
  text: string;
  done: boolean;
}

export enum ModalType {
  Edit = "EDIT",
  Add = "ADD",
}
export interface ModalFormProps {
  visible: boolean;
  modalTitle: string;
  todoId: number;
  onClose: () => void;
  addTodo: (id: number, text: string, flag: boolean) => void;
  updateText: (id: number, text: string) => void;
}

export interface TodoListProps {
  lists: TodoType[];
  updateText: (id: number, text: string) => void;
  toggleDone: (id: number) => void;
  deleteTodo: (id: number) => void;
  onShowModal: (type: ModalType, id: number) => void;
}
