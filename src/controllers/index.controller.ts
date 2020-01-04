import {Request, Response} from 'express';
import {QueryResult} from 'pg';
import { client } from '../database';
export const getUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await client.query('SELECT * from user4');
        console.log(response.rows);
        res.status(200).json(response.rows);   
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal server error"); 
    }
};

export const getUserById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const response: QueryResult = await client.query("SELECT * FROM user4 WHERE id = $1", [id]);
    return res.json(response.rows);
};

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    console.log("111")

    const { uname, email } = req.body;
    const response: QueryResult = await client.query('INSERT INTO user4 (uname, email) VALUES ($1, $2)', [uname, email]);
    res.json({
        message: 'User Added successfully', 
        body: {
            user: { uname, email }
        }
    })
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    console.log("1112")
    const id = parseInt(req.params.id);
    const { uname, email } = req.body;
    console.log(id);
    console.log(uname);
    console.log(email);

    const response: QueryResult = await client.query('UPDATE user4 SET uname = $1, email = $2 WHERE id = $3', [ uname, email, id ]);
    res.json({
        message: 'User Upfdated successfully', 
        body: {
            user: { uname, email }
        }
    });
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    await client.query('DELETE FROM user4 where id = $1', [
        id
    ]);
    res.json(`User ${id} deleted Successfully`);
};