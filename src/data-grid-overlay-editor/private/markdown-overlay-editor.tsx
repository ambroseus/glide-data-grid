import * as React from "react";
import MarkdownDiv from "../../markdown-div/markdown-div";
import GrowingEntry from "../../growing-entry/growing-entry";
import { MarkdownOverlayEditorStyle } from "./markdown-overlay-editor-style";
import { EditPencil } from "../../common/utils";

interface Props {
    readonly markdown: string;
    readonly onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    readonly onChange: (ev: React.ChangeEvent<HTMLTextAreaElement>) => void;
    readonly forceEditMode: boolean;
    createNode?: (content: string) => DocumentFragment;
}

const MarkdownOverlayEditor: React.FunctionComponent<Props> = p => {
    const { markdown, onChange, onKeyDown, forceEditMode, createNode } = p;

    const [editMode, setEditMode] = React.useState<boolean>(markdown === "" || forceEditMode);

    const onEditClick = React.useCallback(() => {
        setEditMode(true);
    }, []);

    if (editMode) {
        return <GrowingEntry autoFocus={true} onKeyDown={onKeyDown} value={markdown} onChange={onChange} />;
    }

    return (
        <MarkdownOverlayEditorStyle>
            <MarkdownDiv contents={markdown} createNode={createNode} />
            <div className="edit-icon" onClick={onEditClick}>
                <EditPencil />
            </div>
            <textarea autoFocus={true} onKeyDown={onKeyDown} />
        </MarkdownOverlayEditorStyle>
    );
};

export default MarkdownOverlayEditor;
