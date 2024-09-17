import { resolve } from "styled-jsx/css";
import { createConnection } from "../../../../../lib/db";
import { NextResponse } from "next/server";


export async function DELETE(request) {
  try {
    // Extract the ID from the request URL
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    // Establish database connection
    const db = await createConnection();

    // Parameterized query to prevent SQL injection
    const sql = "DELETE FROM admin WHERE id = ?";
    const [result] = await db.query(sql, [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'No record found with the given ID' }, { status: 404 });
    }

    // Return success response
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting record:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}