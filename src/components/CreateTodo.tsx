import { ChangeEvent, useState } from "react";
import { withRoleCheck } from "../hocs";
import { Button, Input } from "./common";

import styles from './CreateTodo.module.css';

type CreateTodoProps = {
    onSubmit(params: { title: string, description: string }): Promise<void>;
}

function CreateTodoComponent({ onSubmit }: CreateTodoProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    return (
        <div className={styles.wrapper}>
            <div>
                <h2>New ToDo</h2>
            </div>
            <div>
                <Input
                    type='title'
                    placeholder={`Buy Tim's gift`}
                    value={title}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}
                />
                <Input
                    type='description'
                    placeholder='Toy, clothes or socks'
                    value={description}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)}
                />
            </div>
            <div>
                <Button onClick={() => onSubmit({ title, description })}>Create</Button>
            </div>
        </div>
    );
}

export const CreateTodo = withRoleCheck(CreateTodoComponent, 'todo:create');
