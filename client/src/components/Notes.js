import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

function Notes(){
    const { id: houseId } = useParams();
    const navigate = useNavigate;
    const [notes, setNotes] = useState([]);
    const [editingNoteId, setEditingNoteId] = useState(null);

    useEffect(() => {
        fetch(`/api/houses/${houseId}/notes`)
            .then(res => res.json())
            .then(data => {
                setNotes(data);
            })
    }, [houseId]);

    const formSchema = yup.object().shape({
        details: yup.string(),
        medical_conditions: yup.string()
    });

    const handleAddNote = (values, { resetForm }) => {
        fetch(`/api/houses/${houseId}/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        }).then(res => res.json())
        .then(data => {
            setNotes([...notes, data]);
            resetForm();
        }).catch(error => {
            console.error('Error adding note:', error);
        });
    };

    const handleUpdateNote = (noteId, updatedNote) => {
        fetch(`/api/houses/${houseId}/notes/${noteId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedNote)
        }).then(res => res.json())
        .then(data => {
            const updatedNotes = notes.map(note => note.id === noteId ? data : note);
            setNotes(updatedNotes);
            setEditingNoteId(null); // Reset the editing state
            navigate(`/houses/${houseId}`);
        }).catch(error => {
            console.error('Error updating note:', error);
        });
    };

    const handleEditNote = (noteId) => {
        setEditingNoteId(noteId);
    };

    const handleDeleteNote = (noteId) => {
        fetch(`/api/houses/${houseId}/notes/${noteId}`, {
            method: 'DELETE'
        }).then(() => {
            const updatedNotes = notes.filter(note => note.id !== noteId);
            setNotes(updatedNotes);
        }).catch(error => {
            console.error('Error deleting note:', error);
        });
    };

    const smallButtonStyle = {
        fontSize: '10px',
        padding: '6px 6px'
    };

    const textStyle = {
        color: 'black',
        fontSize: '16px'
    };
    
    return (
        <div>
            <h2>Notes</h2>
            <Formik
                initialValues={{ details: '', medical_conditions: '' }}
                validationSchema={formSchema}
                onSubmit={handleAddNote}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="details" placeholder="Details" style={{color: 'black'}}/><br/>
                        <ErrorMessage name="details" component="div" />
                        <Field type="text" name="medical_conditions" placeholder="Medical Conditions" style={textStyle}/>
                        <ErrorMessage name="medical_conditions" component="div" /><br/>
                        <button type="submit" disabled={isSubmitting} style={smallButtonStyle}>Add Note</button>
                    </Form>
                )}
            </Formik>
            <div>
                {notes.map(note => (
                    <div key={note.id}>
                        {editingNoteId === note.id ? (
                            // Editable form for updating a note
                            <Formik
                                initialValues={{ details: note.details, medical_conditions: note.medical_conditions }}
                                validationSchema={formSchema}
                                onSubmit={(values) => handleUpdateNote(note.id, values)}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <Field type="text" name="details" style={{color: 'black'}}/>
                                        <ErrorMessage name="details" component="div" />
                                        <Field type="text" name="medical_conditions" style={{color: 'black'}} />
                                        <ErrorMessage name="medical_conditions" component="div" />
                                        <button style={smallButtonStyle} type="submit" disabled={isSubmitting}>
                                            Save Changes
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        ) : (
                            // Displaying note details
                            <>
                                <p style={textStyle}>Details: {note.details}</p>
                                <p style={textStyle}>Medical Conditions: {note.medical_conditions}</p>
                                <p style={textStyle}>Timestamp: {new Date(note.timestamp).toLocaleString()}</p>
                                <button style={smallButtonStyle} onClick={() => handleEditNote(note.id)}>
                                    Update Note
                                </button>
                                <button style={smallButtonStyle} onClick={() => handleDeleteNote(note.id)}>
                                    Delete Note
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Notes;