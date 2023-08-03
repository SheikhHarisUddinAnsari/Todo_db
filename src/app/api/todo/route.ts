import { sql } from '@vercel/postgres';
import { error } from 'console';
import { NextRequest, NextResponse } from "next/server";
import { newTodo, Todo, db, todoTable } from '@/app/lib/drizzle'
import { eq } from 'drizzle-orm'
import exp from 'constants';


export async function GET(req: NextRequest) {
    try {
        await sql`CREATE TABLE IF NOT EXISTS TODOS ( ID SMALLSERIAL,NAME VARCHAR(255),ISDONE BOOLEAN );`;
        const allTasks = await db.select().from(todoTable).execute()
        return NextResponse.json({ data: allTasks })

    } catch (err) {
        console.log((err as { message: string }).message)
        return NextResponse.json({ message: 'something went wrong' });
    }


}

export async function POST(request: NextRequest) {
    const req = await request.json()
    try {
        if (req.name) {
            let newTasks = {
                name: req.name,
                   isdone: false
            }


            const res = await db.insert(todoTable).values(newTasks).returning()
            return NextResponse.json({ data: res })
        } else {
            throw new Error("Task field is required");

        }
    } catch (error) {
        return NextResponse.json({ message: (error as { message: string }).message })
    }
}

export async function PATCH(request: NextRequest) {
    const req = await request.json();
    try {
        if (req.id) {
            const updatedTasks = await db.update(todoTable).set({ isdone: req.isdone }).where(eq(todoTable.id, req.id)).returning({ task: todoTable.name, isdone: todoTable.isdone })
            return NextResponse.json(updatedTasks);

        }
        else {
            throw new Error("Id field is required");

        }
    } catch (error) {
        return NextResponse.json({ message: (error as { message: string }).message })
    }
}

export async function DELETE(request:NextRequest){
const req=await request.json()


try{
    if(req.id){
        const deletedTasks=await db.delete(todoTable).where(eq(todoTable.id, req.id)).returning()
        return NextResponse.json(deletedTasks);
    }
    else {
        throw new Error("Id field is required");

    }
}
catch (error) {
    return NextResponse.json({ message: (error as { message: string }).message })
}
} 