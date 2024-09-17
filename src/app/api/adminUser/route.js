import { NextResponse } from 'next/server';
import { createConnection } from '../../../../lib/db'; 

export async function POST(request) {
  try {
    // Parse JSON body from the request
    const data = await request.json();

    // Extract email and password from the request data
    const { email, password } = data;

    // Ensure required fields are present
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Establish database connection
    const db = await createConnection();

    // Parameterized query to prevent SQL injection
    const sql = `
      INSERT INTO admin (email, password)
      VALUES (?, ?)
    `;
    const [result] = await db.query(sql, [email, password]);

    // Return success response with inserted ID
    return NextResponse.json({ success: true, id: result.insertId }, { status: 201 });
  } catch (error) {
    console.error('Error inserting post:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



export async function GET() {
  try {
    const db = await createConnection();
    const sql = "SELECT * FROM admin";
    const [posts] = await db.query(sql);
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}