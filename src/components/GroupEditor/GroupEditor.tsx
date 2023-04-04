import {ChangeEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import {addGroup, editGroup} from '../../store/groupsSlice';
import { GroupEditorProps } from './GroupEditor.types';

export const GroupEditor = ({group, cancel, type}: GroupEditorProps) => {
    const [name, setName] = useState<string>(group.name);
    const [tags, setTags] = useState<string[]>(group?.tags ? group.tags : []);
    const dispatch = useDispatch();

    const onName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value.trim());
    };

    const onTags = (e: ChangeEvent<HTMLInputElement>) => {
        setTags(e.currentTarget.value.split(', '));
    };

    const onSave = () => {
        const newData = {...group, name, tags}
        switch (type) {
            case "add":
                dispatch(addGroup(newData));
                break;
            case "edit":
                dispatch(editGroup(newData));
                break;
        }
        setName('');
        setTags([])
        cancel();
    };

    const onCancel = () => {
        cancel();
    };

    return (
        <div className="shadow">
            <div className="modal">
                <label>Group name
                    <input
                        type="text"
                        defaultValue={name}
                        onChange={onName}
                    />
                </label>
                <label>Tags
                    <input
                        type="text"
                        defaultValue={tags.join(', ')}
                        onChange={onTags}
                    />
                </label>
                <button disabled={!name} onClick={onSave}>Save</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};
