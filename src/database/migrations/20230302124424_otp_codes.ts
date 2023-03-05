import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw(`
        create table if not exists otp_codes (
            id uuid primary key default uuid_generate_v4(),
            otp_id uuid references user_otps(id) not null,
            code int not null,
            is_active bool default true,
            sent_time timestamp not null default current_timestamp
        );
    `)
}


export async function down(knex: Knex): Promise<void> {
    await knex.raw(`
        drop table if exists otp_codes;
    `)
}

