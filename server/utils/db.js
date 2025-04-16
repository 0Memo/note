import { createPool } from "mysql2/promise";

// Create a connection pool that works well in serverless
const pool = createPool({
    uri: process.env.DATABASE_URL,
    // These settings help with serverless environments
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});

// User operations
export async function findUserByEmail(email) {
    const [rows] = await pool.execute("SELECT * FROM User WHERE email = ?", [
        email,
    ]);
    return rows[0] || null;
}

export async function createUser(email, password, salt) {
    const [result] = await pool.execute(
        "INSERT INTO User (email, password, salt, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())",
        [email, password, salt]
    );

    // Get the inserted user
    const [users] = await pool.execute("SELECT * FROM User WHERE id = ?", [
        result.insertId,
    ]);
    return users[0];
}

// Note operations
export async function findNotesByUserId(userId) {
    const [rows] = await pool.execute("SELECT * FROM Note WHERE userId = ?", [
        userId,
    ]);
    return rows;
}

export async function findNoteById(id) {
    const [rows] = await pool.execute("SELECT * FROM Note WHERE id = ?", [id]);
    return rows[0] || null;
}

export async function createNote(userId, text = "") {
    const [result] = await pool.execute(
        "INSERT INTO Note (userId, text, createdAt, updatedAt) VALUES (?, ?, NOW(), NOW())",
        [userId, text]
    );

    // Get the inserted note
    const [notes] = await pool.execute("SELECT * FROM Note WHERE id = ?", [
        result.insertId,
    ]);
    return notes[0];
}

export async function updateNote(id, text) {
    await pool.execute(
        "UPDATE Note SET text = ?, updatedAt = NOW() WHERE id = ?",
        [text, id]
    );

    // Get the updated note
    const [notes] = await pool.execute("SELECT * FROM Note WHERE id = ?", [id]);
    return notes[0];
}

export async function deleteNote(id) {
    await pool.execute("DELETE FROM Note WHERE id = ?", [id]);
    return { success: true };
}

// Create a Prisma-like interface for backward compatibility
const prisma = {
    user: {
        findUnique: async ({ where }) => {
        if (where.email) {
            return findUserByEmail(where.email);
        }
        if (where.id) {
            const [rows] = await pool.execute("SELECT * FROM User WHERE id = ?", [
            where.id,
            ]);
            return rows[0] || null;
        }
        return null;
        },
        create: async ({ data }) => {
        return createUser(data.email, data.password, data.salt);
        },
    },
    note: {
        findMany: async ({ where }) => {
        if (where.userId) {
            return findNotesByUserId(where.userId);
        }
        return [];
        },
        findUnique: async ({ where }) => {
        if (where.id) {
            return findNoteById(where.id);
        }
        return null;
        },
        create: async ({ data }) => {
        return createNote(data.userId, data.text);
        },
        update: async ({ where, data }) => {
        if (where.id) {
            return updateNote(where.id, data.text);
        }
        return null;
        },
        delete: async ({ where }) => {
        if (where.id) {
            return deleteNote(where.id);
        }
        return null;
        },
    },
};

export default prisma;