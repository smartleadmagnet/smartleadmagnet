import React, { ReactElement, useRef, useState, useCallback } from "react";
import { EditorState, Modifier } from "draft-js";
import Editor from "@draft-js-plugins/editor";
import createMentionPlugin, { defaultSuggestionsFilter } from "@draft-js-plugins/mention";
import "@draft-js-plugins/mention/lib/plugin.css";
import "draft-js/dist/Draft.css";
import createToolbarPlugin, { Separator } from "@draft-js-plugins/static-toolbar";
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from "@draft-js-plugins/buttons";
import "@draft-js-plugins/static-toolbar/lib/plugin.css";
import { Badge } from "@smartleadmagnet/ui/components/ui/badge";

const mentionPlugin = createMentionPlugin({
  mentionTrigger: ["{"],
  mentionPrefix: (trigger) => trigger,
});
const { MentionSuggestions } = mentionPlugin;
const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;

const plugins = [mentionPlugin, staticToolbarPlugin];

interface MentionData {
  link?: string;
  avatar?: string;
  name: string;
  id?: null | string | number;
  [x: string]: any;
}

interface RichTextEditorProps {
  control: any; // Adjust this type as needed
  name: string;
  placeholder?: string;
  errorMessage?: string;
  mentions: MentionData[];
}

const SimpleMentionEditor = (props: RichTextEditorProps): ReactElement => {
  const { mentions } = props;
  const ref = useRef<Editor>(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<MentionData[]>([]);

  const onChange = useCallback((_editorState: EditorState) => {
    setEditorState(_editorState);
  }, []);

  const onOpenChange = useCallback((_open: boolean) => {
    setOpen(_open);
  }, []);

  const onSearchChange = useCallback(
    ({ trigger, value }: { trigger: string; value: string }) => {
      setSuggestions(defaultSuggestionsFilter(value, mentions, trigger) as MentionData[]);
    },
    [mentions]
  );

  const addMentionToEditor = (mention: MentionData) => {
    const stateWithEntity = editorState.getCurrentContent().createEntity(
        'mention',
        'IMMUTABLE',
        {
            mention
        },
      )
      const entityKey = stateWithEntity.getLastCreatedEntityKey()
      const stateWithText = Modifier.insertText(stateWithEntity, editorState.getSelection(), 'foobar', null, entityKey)
      const newEditorState = EditorState.push(editorState, stateWithText, 'insert-characters')
      console.log(newEditorState)
      setEditorState(newEditorState);
  };

  return (
    <div
      className='editor-container'
      onClick={() => {
        ref.current!.focus();
      }}
    >
      <Toolbar>
        {(externalProps) => (
          <div>
            <HeadlineOneButton {...externalProps} />
            <HeadlineTwoButton {...externalProps} />
            <HeadlineThreeButton {...externalProps} />
            <Separator />
            <BoldButton {...externalProps} />
            <ItalicButton {...externalProps} />
            <UnderlineButton {...externalProps} />
            <CodeButton {...externalProps} />
            <Separator />
            <UnorderedListButton {...externalProps} />
            <OrderedListButton {...externalProps} />
            <BlockquoteButton {...externalProps} />
            <CodeBlockButton {...externalProps} />
          </div>
        )}
      </Toolbar>

      <Editor
        editorState={editorState}
        onChange={onChange}
        plugins={plugins}
        ref={ref}
      />

      <MentionSuggestions
        open={open}
        onOpenChange={onOpenChange}
        onSearchChange={onSearchChange}
        suggestions={suggestions}
      />

      {/* Custom Mention Buttons */}
      <div className="mention-buttons mt-10">
        {mentions.map((mention) => (
          <Badge
            key={mention.id}
            onClick={() => addMentionToEditor(mention)}
            className="mr-2 mb-2 inline-block cursor-pointer rounded px-2 py-1"
            style={{ margin: '5px' }}
          >
            {mention.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default SimpleMentionEditor;
