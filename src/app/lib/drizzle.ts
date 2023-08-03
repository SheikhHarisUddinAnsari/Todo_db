
import { sql } from "@vercel/postgres";
import { InferModel } from "drizzle-orm";

import { varchar, serial, pgTable,boolean} from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres"


export const todoTable = pgTable("todos", {
    id: serial("id").primaryKey(),
    name: varchar('task', { length: 255 }).notNull(),

    isdone: boolean('isdone').notNull()
}
    )

export type Todo = InferModel<typeof todoTable>
export type newTodo = InferModel<typeof todoTable, "insert">

export const db = drizzle(sql)