import { resolve } from "styled-jsx/css";
import { createConnection } from "../../../../lib/db"; 
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const db = await createConnection();
    const sql = "SELECT * FROM productOrder";
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
    const { name, email, address, phone, city, productDetail, total } = data;
    // if (!name || !email || !address || !phone || !city || !productDetail || !total) {
    //   return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    // }

    // Establish database connection
    const db = await createConnection();

    // Parameterized query to prevent SQL injection
    const sql = `
      INSERT INTO productOrder (name, email, address, phone, city, productDetail, total)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [name, email, address, phone, city, productDetail, total]);

    // Return success response with inserted ID
    return NextResponse.json({ success: true, id: result.insertId }, { status: 201 });
  } catch (error) {
    console.error('Error inserting post:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}