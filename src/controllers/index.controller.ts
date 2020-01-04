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
    const signature = parseInt(req.params.signature);
    const response1: QueryResult = await client.query("SELECT * FROM user1 WHERE signature = $1", [signature]);
    const response2: QueryResult = await client.query("SELECT * FROM address WHERE sig_id = $1", [response1.rows[0].signature]);

    console.log(response1.rows[0].signature);
    // return res.json(response2.rows);

    const userinfo = response1.rows;
    userinfo[0].signature = response2.rows[0]
    const address = response2.rows[0];

    
    return res.json({
        userinfo 
    });

    // return res.json({
    //     body: {
    //         user: { userinfo }
    //     }
    // });
};

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    console.log("111")

    const { name, signature, address } = req.body;
    // console.log(address.street)

    const response1: QueryResult = await client.query('INSERT INTO user1 (name, signature) VALUES ($1, $2)', [name, signature]);
    const response2: QueryResult = await client.query('INSERT INTO address (sig_id, street) VALUES ($1, $2)', [signature, address.street]);
    // console.log(response1)
    res.json({
        message: 'User Added successfully', 
        body: {
            user: { name, signature, address }
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

    const response: QueryResult = await client.query('UPDATE user1 SET uname = $1, email = $2 WHERE id = $3', [ uname, email, id ]);
    res.json({
        message: 'User Upfdated successfully', 
        body: {
            user: { uname, email }
        }
    });
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    await client.query('DELETE FROM user1 where id = $1', [
        id
    ]);
    res.json(`User ${id} deleted Successfully`);
};