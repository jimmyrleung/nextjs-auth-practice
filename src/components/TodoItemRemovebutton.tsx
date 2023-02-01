import { Todo } from '../entities';
import { withRoleCheck } from '../hocs';
import { Button } from './common';

const TodoItemRemoveButtonComponent = (props: { todo: Todo, onRemoveClick: (id: number) => Promise<void> }) => (
    <Button onClick={() => props.onRemoveClick(props.todo.id!)}>Remove</Button>
);

export const TodoItemRemovebutton = withRoleCheck(TodoItemRemoveButtonComponent, 'todo:delete');
