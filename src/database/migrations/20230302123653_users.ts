import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw(`
        create table if not exists users (
            id uuid primary key default uuid_generate_v4(),
            phone varchar(13) not null
        );
    `)
}


export async function down(knex: Knex): Promise<void> {
    await knex.raw(`
        drop table if exists users;
    `)
}

