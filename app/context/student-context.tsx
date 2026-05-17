"use client";

import { createContext, useContext, useSyncExternalStore } from "react";

export type StudentAccount = {
  fullName: string;
  email: string;
  studentId: string;
};

type StudentContextValue = {
  student: StudentAccount | null;
  registeredStudent: StudentAccount | null;
  saveStudent: (student: StudentAccount) => void;
  clearStudent: () => void;
  loginWithStudentId: (studentId: string) => { success: boolean; message: string };
  logout: () => void;
};

const StudentContext = createContext<StudentContextValue | undefined>(undefined);
const ACCOUNT_STORAGE_KEY = "357-student-account";
const SESSION_STORAGE_KEY = "357-student-session";
const listeners = new Set<() => void>();

let cachedAccount: StudentAccount | null = null;
let cachedAccountRawValue = "";
let cachedSessionStudentId: string | null = null;
let cachedSessionRawValue = "";

function getBrowserStorage() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage ?? null;
  } catch {
    return null;
  }
}

function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  function handleStorageChange(event: StorageEvent) {
    if (
      event.key === ACCOUNT_STORAGE_KEY ||
      event.key === SESSION_STORAGE_KEY
    ) {
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
function getStoredAccount() {
  const storage = getBrowserStorage();

  if (!storage) {
    return cachedAccount;
  }

  const savedStudent = storage.getItem(ACCOUNT_STORAGE_KEY) ?? "";

  if (savedStudent === cachedAccountRawValue) {
    return cachedAccount;
  }

  if (!savedStudent) {
    cachedAccountRawValue = "";
    cachedAccount = null;
    return cachedAccount;
  }

  try {
    cachedAccountRawValue = savedStudent;
    cachedAccount = JSON.parse(savedStudent) as StudentAccount;
    return cachedAccount;
  } catch {
    storage.removeItem(ACCOUNT_STORAGE_KEY);
    cachedAccountRawValue = "";
    cachedAccount = null;
    return cachedAccount;
  }
}

function getStoredSessionStudentId() {
  const storage = getBrowserStorage();

  if (!storage) {
    return cachedSessionStudentId;
  }

  const savedSession = storage.getItem(SESSION_STORAGE_KEY) ?? "";

  if (savedSession === cachedSessionRawValue) {
    return cachedSessionStudentId;
  }

  cachedSessionRawValue = savedSession;
  cachedSessionStudentId = savedSession || null;
  return cachedSessionStudentId;
}

function getStoredStudent() {
  const account = getStoredAccount();
  const sessionStudentId = getStoredSessionStudentId();

  if (!account || account.studentId !== sessionStudentId) {
    return null;
  }

  return account;
}

function getServerStudentSnapshot() {
  return null;
}

function getServerAccountSnapshot() {
  return null;
}

function saveAccountToStorage(student: StudentAccount | null) {
  const storage = getBrowserStorage();

  cachedAccount = student;

  if (!student) {
    cachedAccountRawValue = "";
    cachedSessionRawValue = "";
    cachedSessionStudentId = null;
    storage?.removeItem(ACCOUNT_STORAGE_KEY);
    storage?.removeItem(SESSION_STORAGE_KEY);
    emitChange();
    return;
  }

  cachedAccountRawValue = JSON.stringify(student);
  cachedSessionRawValue = student.studentId;
  cachedSessionStudentId = student.studentId;
  storage?.setItem(ACCOUNT_STORAGE_KEY, cachedAccountRawValue);
  storage?.setItem(SESSION_STORAGE_KEY, cachedSessionRawValue);
  emitChange();
}

function saveSessionToStorage(studentId: string | null) {
  const storage = getBrowserStorage();

  cachedSessionStudentId = studentId;

  if (!studentId) {
    cachedSessionRawValue = "";
    storage?.removeItem(SESSION_STORAGE_KEY);
    emitChange();
    return;
  }

  cachedSessionRawValue = studentId;
  storage?.setItem(SESSION_STORAGE_KEY, studentId);
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
    getServerStudentSnapshot,
  );
  const registeredStudent = useSyncExternalStore(
    subscribe,
    getStoredAccount,
    getServerAccountSnapshot,
  );

  function saveStudent(nextStudent: StudentAccount) {
    saveAccountToStorage(nextStudent);
  }

  function clearStudent() {
    saveAccountToStorage(null);
  }

  function loginWithStudentId(studentId: string) {
    const account = getStoredAccount();
    const cleanStudentId = studentId.trim();

    if (!account) {
      return {
        success: false,
        message: "Please register your student account before logging in.",
      };
    }

    if (account.studentId.toLowerCase() !== cleanStudentId.toLowerCase()) {
      return {
        success: false,
        message: "Student ID not found. Check the ID or register first.",
      };
    }

    saveSessionToStorage(account.studentId);
    return { success: true, message: "Login successful." };
  }

  function logout() {
    saveSessionToStorage(null);
  }

  return (
    <StudentContext.Provider
      value={{
        student,
        registeredStudent,
        saveStudent,
        clearStudent,
        loginWithStudentId,
        logout,
      }}
    >
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
