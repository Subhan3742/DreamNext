import { resolve } from "styled-jsx/css";
import { createConnection } from "../../../../lib/db"; 
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const db = await createConnection();
    const sql = "SELECT * FROM message";
    const [posts] = await db.query(sql);
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    // Parse JSON body from the request
    const data = await request.json();

    // Ensure required fields are present
    const { name, email, no, text } = data;
    if (!name || !email || !no || !text) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Establish database connection
    const db = await createConnection();

    // Parameterized query to prevent SQL injection
    const sql = `
      INSERT INTO message (name, email, no, text)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [name, email, no, text]);

    // Return success response with inserted ID
    return NextResponse.json({ success: true, id: result.insertId }, { status: 201 });
  } catch (error) {
    console.error('Error inserting post:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



export async function PUT(request) {
  try {
    // Parse JSON body from the request
    const data = await request.json();
    
    // Extract the ID from the request URL
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    
    // Ensure ID and required fields are present
    const { name, email, no, text } = data;
    if (!id || !name || !email || !no || !text) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Establish database connection
    const db = await createConnection();

    // Parameterized query to prevent SQL injection
    const sql = `
      UPDATE message
      SET name = ?, email = ?, no = ?, text = ?
      WHERE id = ?
    `;
    const [result] = await db.query(sql, [name, email, no, text, id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'No record found with the given ID' }, { status: 404 });
    }

    // Return success response
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



