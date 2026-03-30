"use client";

import { createContext, useContext, useSyncExternalStore } from "react";

export type StudentAccount = {
  fullName: string;
  email: string;
  studentId: string;
};

type StudentContextValue = {
  student: StudentAccount | null;
  saveStudent: (student: StudentAccount) => void;
  clearStudent: () => void;
};

const StudentContext = createContext<StudentContextValue | undefined>(undefined);
const STORAGE_KEY = "357-student-account";
const listeners = new Set<() => void>();

let cachedStudent: StudentAccount | null = null;
let cachedRawValue = "";

function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  function handleStorageChange(event: StorageEvent) {
    if (event.key === STORAGE_KEY) {
      listener();
    }
  }

  window.addEventListener("storage", handleStorageChange);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorageChange);
  };
}

// Read the saved student account from localStorage.
function getStoredStudent() {
  if (typeof window === "undefined") {
    return null;
  }

  const savedStudent = window.localStorage.getItem(STORAGE_KEY) ?? "";

  if (savedStudent === cachedRawValue) {
    return cachedStudent;
  }

  if (!savedStudent) {
    cachedRawValue = "";
    cachedStudent = null;
    return cachedStudent;
  }

  try {
    cachedRawValue = savedStudent;
    cachedStudent = JSON.parse(savedStudent) as StudentAccount;
    return cachedStudent;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    cachedRawValue = "";
    cachedStudent = null;
    return cachedStudent;
  }
}

function getServerSnapshot() {
  return null;
}

function saveStudentToStorage(student: StudentAccount | null) {
  if (typeof window === "undefined") {
    return;
  }

  cachedStudent = student;

  if (!student) {
    cachedRawValue = "";
    window.localStorage.removeItem(STORAGE_KEY);
    emitChange();
    return;
  }

  cachedRawValue = JSON.stringify(student);
  window.localStorage.setItem(STORAGE_KEY, cachedRawValue);
  emitChange();
}

export function StudentProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const student = useSyncExternalStore(
    subscribe,
    getStoredStudent,
    getServerSnapshot,
  );

  function saveStudent(nextStudent: StudentAccount) {
    saveStudentToStorage(nextStudent);
  }

  function clearStudent() {
    saveStudentToStorage(null);
  }

  return (
    <StudentContext.Provider value={{ student, saveStudent, clearStudent }}>
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent() {
  const context = useContext(StudentContext);

  if (!context) {
    throw new Error("useStudent must be used inside StudentProvider");
  }

  return context;
}
