import formidable from 'formidable';
import path from 'path';
import { NextResponse } from 'next/server';
import { createConnection } from '../../../../lib/db'; 

// Disable the default body parser to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  try {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(process.cwd(), 'public/uploads'); // Ensure this directory exists
    form.keepExtensions = true;

    return new Promise((resolve, reject) => {
      form.parse(request, async (err, fields, files) => {
        if (err) {
          console.error('Error parsing form:', err);
          return resolve(NextResponse.json({ error: 'Error parsing form' }, { status: 500 }));
        }

        const { name, price, category, detail } = fields;
        const image = files.image ? files.image[0].filepath : ''; // Handle missing image

        if (!name || !price || !category || !detail) {
          return resolve(NextResponse.json({ error: 'Missing required fields' }, { status: 400 }));
        }

        try {
          // Establish database connection
          const db = await createConnection();

          // Insert data into the database
          const sql = `
            INSERT INTO posts (name, price, image, category, detail)
            VALUES (?, ?, ?, ?, ?)
          `;
          const [result] = await db.query(sql, [name, price, image, category, detail]);

          resolve(NextResponse.json({ success: true, id: result.insertId }, { status: 201 }));
        } catch (dbError) {
          console.error('Database error:', dbError);
          resolve(NextResponse.json({ error: 'Database error' }, { status: 500 }));
        }
      });
    });
  } catch (error) {
    console.error('Error handling POST request:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}











export async function GET() {
  try {
    const db = await createConnection();
    const sql = "SELECT * FROM posts";
    const [posts] = await db.query(sql);
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}











