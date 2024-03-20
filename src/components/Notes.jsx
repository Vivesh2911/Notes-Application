import React, { useState } from 'react';
import styles from "./Notes.module.css";

export default function Notes() {
  const [data, setData] = useState([]);
  const [notes, setNotes] = useState("");
  const [title, setTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [bold , setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [alignLeft, setAlignLeft] = useState(false);
  const [alignCenter, setAlignCenter] = useState(false);
  const [alignRight, setAlignRight] = useState(false);
  const [viewingNoteIndex, setViewingNoteIndex] = useState(null);
  const [creatingNewNote, setCreatingNewNote] = useState(false);

  function handleBold() {
    setBold(!bold);
    const textarea = document.getElementById("notes");
    if (bold) {
      textarea.style.fontWeight = "normal";
    } else {
      textarea.style.fontWeight = "bold";
    }
  }

  function handleItalic() {
    setItalic(!italic);
    const textarea = document.getElementById("notes");
    if (italic) {
      textarea.style.fontStyle = "normal";
    } else {
      textarea.style.fontStyle = "italic";
    }
  }

  function handleUnderline() {
    setUnderline(!underline);
    const textarea = document.getElementById("notes");
    if (underline) {
      textarea.style.textDecoration = "none";
    } else {
      textarea.style.textDecoration = "underline";
    }
  }

  function handleAlignLeft() {
    setAlignLeft(!alignLeft);
    const textarea = document.getElementById("notes");
    if (alignLeft) {
      textarea.style.textAlign = "left";
    } else {
      textarea.style.textAlign = "left";
    }
    setAlignCenter(false);
    setAlignRight(false);
  }

  function handleAlignCenter() {
    setAlignCenter(!alignCenter);
    const textarea = document.getElementById("notes");
    if (alignCenter) {
      textarea.style.textAlign = "center";
    } else {
      textarea.style.textAlign = "center";
    }
    setAlignLeft(false);
    setAlignRight(false);
  }

  function handleAlignRight() {
    setAlignRight(!alignRight);
    const textarea = document.getElementById("notes");
    if (alignRight) {
      textarea.style.textAlign = "right";
    } else {
      textarea.style.textAlign = "right";
    }
    setAlignLeft(false);
    setAlignCenter(false);
  }

  function handleChange(e) {
    let id = e.target.id;
    if (id === 'notes') {
      setNotes(e.target.value);
    } else if (id === 'title') {
      setTitle(e.target.value); 
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (viewingNoteIndex !== null) {
      return;
    }
    setData([...data, { title, note: notes }]); 
    setNotes(''); 
    setTitle('');
    setCreatingNewNote(false);
  }

  function handleDelete(index) {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  }

  function handleView(index) {
    setViewingNoteIndex(index);
    setTitle(data[index].title);
    setNotes(data[index].note); 
  }

  function handleNewNote() {
    setViewingNoteIndex(null); 
    setNotes('');
    setTitle('');
    setCreatingNewNote(true);
  }

  function handleDownload() {
    const element = document.createElement("a");
    const file = new Blob([notes], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "notes.txt";
    document.body.appendChild(element); // Required for Firefox
    element.click();
  }

  function handleSearch() {
    const query = searchQuery.toLowerCase();
    const filteredData = data.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(query);
      const noteMatch = item.note.toLowerCase().includes(query);
      return titleMatch || noteMatch;
    });
    setData(filteredData);
  }

  return (
    <div className={styles.containr}>
      <div className={styles.sidebar}>
        <button className={styles.createbtn} onClick={handleNewNote}>Create new Note</button>
        {creatingNewNote && (
          <div className={styles.titleInput}>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" value={title} onChange={handleChange} />
          </div>
        )}
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search notes"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <button className={styles.searchBtn} onClick={handleSearch}>Search</button>
        </div>
        <div className={styles.output}>
          {data.map((value, index) => (
            <ul key={index}>
              <li onClick={() => handleView(index)}>{value.title}</li>
              <button type='button' className={styles.buttn} onClick={() => handleDelete(index)}><i class="fa-solid fa-trash"></i></button>
            </ul>
          ))}
        </div>
      </div>
      <div className={styles.notesarea}>
        <div className={styles.l}>
          <h3>Write notes Here !</h3>
          <button className={styles.btn} onClick={handleBold}> <i className="fa-solid fa-bold"></i></button>
          <button className={styles.btn} onClick={handleItalic}> <i className="fa-solid fa-italic"></i></button>
          <button className={styles.btn} onClick={handleUnderline}> <i className="fa-solid fa-underline"></i></button>
          <button className={styles.btn} onClick={handleAlignLeft}> <i className="fa-solid fa-align-left"></i></button>
          <button className={styles.btn} onClick={handleAlignCenter}> <i className="fa-solid fa-align-center"></i></button>
          <button className={styles.btn} onClick={handleAlignRight}> <i className="fa-solid fa-align-right"></i></button>
          <button className={styles.btn} onClick={handleDownload}> <i className="fa-solid fa-download"></i></button>
        </div>
        <div className={styles.forms}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="write"></label>
            <textarea name="text" id="notes" cols="60" rows="18" value={notes} onChange={handleChange}></textarea>
            <button type="submit" className={styles.savebtn}>Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}