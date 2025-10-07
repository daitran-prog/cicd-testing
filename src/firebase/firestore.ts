
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./config";

async function addUser() {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: "Alice",
      email: "alice@example.com",
      createdAt: new Date(),
    });
    console.log("Document written with ID:", docRef.id);
  } catch (e) {
    console.error("Error adding document:", e);
  }
}

async function fetchUsers() {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach(doc => {
    console.log(doc.id, " => ", doc.data());
  });
   const users = querySnapshot.docs.map(doc => ({
    id: doc.id,          // include doc id
    ...doc.data(),       // spread the fields
  }));

  return users;
}
export { addUser, fetchUsers };