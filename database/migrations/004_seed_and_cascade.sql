alter table user_preferences drop constraint fk_user_preference_id;
alter table user_preferences add constraint fk_user_preference_id foreign key (id) references users(id) on delete cascade;

alter table user_authentication drop constraint fk_auth_user;
alter table user_authentication add constraint fk_auth_user foreign key (user_id) references users(id) on delete cascade;

alter table active_login_sessions drop constraint fk_active_session_user;
alter table active_login_sessions add constraint fk_active_session_user foreign key (user_id) references users(id) on delete cascade;

alter table refresh_tokens drop constraint fk_refresh_token_user;
alter table refresh_tokens add constraint fk_refresh_token_user foreign key (user_id) references users(id) on delete cascade;

insert into auth_types (locale_name, can_be_primary, can_be_secondary) values ("password", 1, 0);
