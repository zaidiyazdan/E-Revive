import bcrypt from 'bcrypt';
import pool from '../database.js';

export const loginFacility = async function(req, res) {
    const { email, password } = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM facilities WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }

        const hashedPassword = rows[0].password;

        const match = await bcrypt.compare(password, hashedPassword);
        if (!match) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }

        res.status(200).send({ message: 'Login successful', data: rows });
    } catch (error) {
        console.error('Error logging in facility:', error);
        res.status(500).send({ message: 'An error occurred while logging in' });
    }
};

export const registerFacility = async function(req, res) {

    const { name, email, address, password, phone, capacity } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const data = await pool.query('INSERT INTO facilities (name, email, address, password, phone, capacity) VALUES (?, ?, ?, ?, ?, ?)', [name, email, address, hashedPassword, phone, capacity]);
        res.status(201).send({ message: 'Facility registered successfully' });
    } catch (error) {
        console.error('Error registering facility:', error);
        res.status(500).send({ message: 'An error occurred while registering facility' });
    }
};

export const getAllFacilities = async function(req, res) {
    try {
        const facilities = await pool.query('SELECT * FROM facilities');
        console.log(facilities[0]);
        return res.status(200).send({
            success: true,
            data: facilities[0],
        });
    } catch (error) {
        console.error("Error fetching facilities:", error);
        return res.status(500).send({
            success: false,
            message: "An error occurred while fetching facilities."
        });
    }
}