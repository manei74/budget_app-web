import React, { createContext, useState, useEffect } from "react";

export const FamilyContext = createContext();

export function FamilyProvider({ children }) {
  const [members, setMembers] = useState(() => {
    const stored = localStorage.getItem("familyMembers");
    return stored
      ? JSON.parse(stored)
      : [
          {
            id: 0,
            name: "Maneevi",
            avatar: "https://i.pravatar.cc/150?img=10",
          },
          {
            id: 1,
            name: "Dasha",
            avatar: "https://i.pravatar.cc/150?img=1",
          },
          {
            id: 2,
            name: "Nikita",
            avatar: "https://i.pravatar.cc/150?img=2",
          },
          {
            id: 3,
            name: "Egor",
            avatar: "https://i.pravatar.cc/150?img=3",
          },
          {
            id: 4,
            name: "Ilia",
            avatar: "https://i.pravatar.cc/150?img=4",
          },
          {
            id: 5,
            name: "Christopher",
            avatar: "https://i.pravatar.cc/150?img=6",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("familyMembers", JSON.stringify(members));
  }, [members]);

  const addMember = (newMember) => {
    const newId = members.length
      ? Math.max(...members.map((m) => m.id)) + 1
      : 1;
    setMembers((prev) => [...prev, { ...newMember, id: newId }]);
  };

  const updateMember = (id, updatedMember) => {
    setMembers(
      members.map((m) => (m.id === id ? { ...m, ...updatedMember } : m))
    );
  };

  const removeMember = (id) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  return (
    <FamilyContext.Provider
      value={{ members, addMember, updateMember, removeMember }}
    >
      {children}
    </FamilyContext.Provider>
  );
}
