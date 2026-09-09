create table users (id int primary key auto_increment, username varchar(64) unique not null, display_name varchar(128) not null);
create table user_preferences (id int primary key auto_increment, colour_scheme_id int default null, language_id int default 0);
create table user_authentication (id int primary key auto_increment, user_id int not null, auth_type_id int not null, is_primary tinyint(1) not null, is_secondary tinyint(1) not null);
create table auth_types (id int primary key auto_increment, locale_name varchar(32) unique not null, can_be_primary tinyint(1) not null, can_be_secondary tinyint(1) not null);
create table colour_schemes (id int primary key auto_increment, locale_name varchar(32) unique not null);
create table languages (id int primary key auto_increment, locale varchar(16) not null);
create table active_login_sessions (id int primary key auto_increment, idempotance_token char(36) not null, step int default 0, user_id int not null);
create table refresh_tokens (id int primary key auto_increment, refresh_token varchar(36) unique not null, session_token varchar(36) unique null, expires_at datetime not null, user_id int not null);

alter table user_preferences add constraint fk_user_preference_id foreign key (id) references users(id);
alter table user_preferences add constraint fk_user_preference_colour_scheme foreign key (colour_scheme_id) references colour_schemes(id);
alter table user_preferences add constraint fk_user_preference_language foreign key (language_id) references languages(id);
alter table user_authentication add constraint fk_auth_user foreign key (user_id) references users(id);
alter table user_authentication add constraint fk_auth_user foreign key (auth_type_id) references auth_types(id);
alter table active_login_sessions add constraint fk_active_session_user foreign key (user_id) references users(id);
alter table user_authentication add constraint fk_auth_user foreign key (user_id) references users(id);
alter table refresh_tokens add constraint fk_refresh_token_user foreign key (user_id) references users(id);
