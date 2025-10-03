import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // initially true

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const data = await res.json();
        await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay for Cypress
        setUser(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <p>User not found</p>;

  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Website: {user.website}</p>
      <Link to="/">Back to User List</Link>
    </div>
  );
};

export default UserDetails;
