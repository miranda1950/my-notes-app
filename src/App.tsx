import { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

//Container
//Notes

function App() {
  return (
    <>
      <div>
        <Container />
      </div>
    </>
  );
}

function Container() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);

  return (
    <div>
      <h1 className="notes_label">Title</h1>
      <input
        type="text"
        placeholder="Title of note"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <h1 className="notes_label">Content</h1>
      <input
        type="text"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></input>
      <div>
        <button
          className="save-button"
          onClick={() => handleSave(title, content)}
        >
          Save
        </button>
      </div>
      {notes.map((note) => (
        <Notes noteObject={note} key={note.title} />
      ))}
    </div>
  );

  function handleSave(title: string, content: string) {
    if (!title) return;

    const note: Note = {
      id: uuidv4(),
      title: title,
      content: content,
      createdAt: Date.now(),
      updatedAt: null,
    };
    const hours = new Date().getHours();
    console.log(hours);
    setNotes([...notes, note]);
    setTitle("");
    setContent("");
  }
}

function Notes({ noteObject }: { noteObject: Note }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  function handleClick(id: string) {
    setSelectedId(id !== selectedId ? id : null);
  }
  return (
    <div onClick={() => handleClick(noteObject.id)}>
      <h2>Note </h2>
      <div className="note">
        <p>{noteObject.title}</p>
        {noteObject.id === selectedId ? (
          <>
            <p>{noteObject.content}</p>
            <p>Created at: {new Date(noteObject.createdAt).toLocaleString()}</p>
            <button onClick={handleEditNote}>Edit note</button>
          </>
        ) : null}
      </div>
    </div>
  );

  function handleEditNote() {}
}

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number | null;
}

export default App;
