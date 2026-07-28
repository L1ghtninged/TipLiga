create schema tipovacka;
use tipovacka;

create table Uzivatel (
    id int primary key auto_increment,
    username varchar(50) not null unique,
    pocet_bodu int default 0,
    created_at timestamp default current_timestamp
);

create table Tym (
    id int primary key auto_increment,
    nazev varchar(50) not null unique,
    logo_url varchar(255) default null
);

create table Kolo (
    id int primary key auto_increment, -- Opraveno zde (primary key auto_increment)
    cislo_kola int not null unique,
    is_closed boolean default false,
    closed_at datetime default null
);

create table Zapas (
    id int primary key auto_increment,
    kolo_id int not null,
    domaci_tym_id int not null,
    hostujici_tym_id int not null,
    domaci_skore int default null,
    hostujici_skore int default null, -- Sjednoceno na hostujici_skore
    zacatek_zapasu datetime not null,  -- Přidáno pro automatické zamykání tipů
    stav enum('scheduled', 'played', 'postponed') default 'scheduled',
    
    foreign key(kolo_id) references Kolo(id),
    foreign key(domaci_tym_id) references Tym(id),
    foreign key(hostujici_tym_id) references Tym(id)
);

create table PredpovedVysledku(
    id int primary key auto_increment,
    uzivatel_id int not null,
    zapas_id int not null,
    predpoved_domaci_skore int not null,
    predpoved_hostujici_skore int not null,
    is_joker boolean default false,
    body_ziskane int default 0,
    created_at timestamp default current_timestamp ON update current_timestamp,
    
    foreign key(uzivatel_id) references Uzivatel(id),
    foreign key(zapas_id) references Zapas(id),
    unique key unique_user_match (uzivatel_id, zapas_id) 
);

create table PredpovedUmisteni (
    id int primary key auto_increment,
    uzivatel_id int not null,
    tym_id int not null,
    predpoved_pozice int not null,
    body_ziskane int default 0,
    
    foreign key(uzivatel_id) references Uzivatel(id),
    foreign key(tym_id) references Tym(id),
    unique key unique_user_team (uzivatel_id, tym_id)
);

create table system_settings (
    id int primary key auto_increment,
    setting_key varchar(50) not null unique, -- Přidán UNIQUE, aby nebyly duplicitní klíče nastavení
    setting_value varchar(50) not null
);

INSERT INTO system_settings (setting_key, setting_value) VALUES ('season_tips_locked', 'false');
