// src/app/api/messages/route.js
import { NextResponse } from 'next/server';
import clientPromise from '../../../db';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('NextDubaiDB');
    const messages = await db.collection('messages').find({}).toArray();
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.error();
  }
}

export async function POST(request) {
  try {
    const { name, email, message, mobile, location } = await request.json();
    const client = await clientPromise;
    const db = client.db('NextDubaiDB');
    await db.collection('messages').insertOne({ name, email, message, mobile, location });

    return NextResponse.json({ message: 'Message saved successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error saving message:', error);
    return NextResponse.error();
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const client = await clientPromise;
    const db = client.db('NextDubaiDB');
    await db.collection('messages').deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ message: 'Message deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.error();
  }
}