import React, { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    if (newName && newAge) {
      await addDoc(usersCollectionRef, {
        name: newName,
        age: Number(newAge),
      });
      setNewName("");
      setNewAge("");
      getUsers();
    } else {
      alert("Please enter both name and age.");
    }
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
    getUsers();
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    getUsers();
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  return (
    <div className="App">
      <h1>
        Cloud Computing Practical - 5
      </h1>
      <h2>Rajdeep & Jainam</h2>
      <div className="form-container">
        <input
          placeholder="Name..."
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
        <input
          type="number"
          placeholder="Age..."
          value={newAge}
          onChange={(event) => setNewAge(event.target.value)}
        />
        <button onClick={createUser}>Create User</button>
      </div>
      <div className="users-container">
        {users.map((user) => (
          <div key={user.id} className="user-item">
            <h2>Name: {user.name}</h2>
            <h2>Age: {user.age}</h2>
            <button onClick={() => updateUser(user.id, user.age)}>
              Increase Age
            </button>
            <button onClick={() => deleteUser(user.id)}>Delete User</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
