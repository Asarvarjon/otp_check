import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw(`
        create table if not exists user_otps (
            id uuid primary key default uuid_generate_v4(),
            user_id uuid references users(id) not null,
            request_count int default 0,
            fail_count int default 0,
            temporary_blocked bool default false,
            temp_block_end_time timestamp,
            permanent_blocked bool default false
        );
    `)
}


export async function down(knex: Knex): Promise<void> {
    await knex.raw(`
        drop table if exists user_otps;
    `)
}

