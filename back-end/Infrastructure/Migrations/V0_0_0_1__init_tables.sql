﻿-- introduction
create table introduction 
(
	id serial primary key,
	title text,
	poster_url varchar(512),	
	poster_description varchar(512),
	content text,
	version int not null default 0
);
-- --------------------------------------------------------------

-- category
create table category 
(
	id serial primary key,
	code varchar(128) not null unique,
	display_name varchar(128) not null,
	is_everything boolean not null default false,
	version int not null default 0
);
-- --------------------------------------------------------------

-- project
create table project
(
	id serial primary key,
	code varchar(128) not null unique,
	display_name varchar(128) not null,
	release_date date, 
	poster_url varchar(512),
	poster_description varchar(512),
	category_id int references category (id),
	description_short text,
	description text,
	version int not null default 0
);
-- --------------------------------------------------------------

-- gallery_image
create table gallery_image
(
	id serial primary key,

	extra_url varchar(256),
	image_url varchar(256) not null,

	project_id int references project (id) on delete cascade,
	version int not null default 0
);
-- --------------------------------------------------------------

-- external_url
create table external_url
(
	id serial primary key,
	url varchar(256) not null,
	display_name varchar(128) not null,
	version int not null default 0
);
-- --------------------------------------------------------------

-- project_to_external_url
create table project_to_external_url
(
	project_id int references project (id) on delete cascade,
	external_url_id int references external_url (id) on delete cascade,
	primary key(project_id, external_url_id)
);
-- --------------------------------------------------------------

-- introduction_to_external_url
create table introduction_to_external_url
(
	introduction_id int references introduction (id) on delete cascade,
	external_url_id int references external_url (id) on delete cascade,
	primary key(introduction_id, external_url_id)
);
-- --------------------------------------------------------------

-- account
create table account
(
	id serial primary key,
	login varchar(256) not null unique,
	password varchar(256) not null,	
	salt varchar(256) not null,
	role varchar(128) not null,
	version int not null default 0
);
-- --------------------------------------------------------------
