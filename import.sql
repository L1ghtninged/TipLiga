-- TIPLIGA - IMPORT Z EXCELU
--
-- Vygenerováno automaticky.
--
-- Předpokládá se, že Kolo, Tym a Uzivatel
-- již existují v databázi.

START TRANSACTION;

-- =====================================================
-- ZÁPASY
-- =====================================================

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 8, 2, 3, 1, '2026-07-25 17:00:00', 'played' FROM Kolo WHERE cislo_kola = 1;

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 14, 10, 1, 3, '2026-07-25 17:00:00', 'played' FROM Kolo WHERE cislo_kola = 1;

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 18, 13, 0, 1, '2026-07-25 17:00:00', 'played' FROM Kolo WHERE cislo_kola = 1;

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 11, 4, 3, 1, '2026-07-25 20:00:00', 'played' FROM Kolo WHERE cislo_kola = 1;

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 5, 16, 5, 1, '2026-07-26 15:00:00', 'played' FROM Kolo WHERE cislo_kola = 1;

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 6, 12, 2, 1, '2026-07-26 17:30:00', 'played' FROM Kolo WHERE cislo_kola = 1;

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 9, 17, 2, 1, '2026-07-26 20:00:00', 'played' FROM Kolo WHERE cislo_kola = 1;

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 15, 7, 2, 4, '2026-07-27 18:00:00', 'played' FROM Kolo WHERE cislo_kola = 1;

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 4, 18, 3, 1, '2026-07-31 19:00:00', 'played' FROM Kolo WHERE cislo_kola = 2;

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 13, 5, 0, 4, '2026-08-01 17:00:00', 'played' FROM Kolo WHERE cislo_kola = 2;

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 16, 15, 1, 1, '2026-08-01 17:00:00', 'played' FROM Kolo WHERE cislo_kola = 2;

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 10, 8, 0, 1, '2026-08-01 17:00:00', 'played' FROM Kolo WHERE cislo_kola = 2;

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 14, 11, 1, 1, '2026-08-01 20:00:00', 'played' FROM Kolo WHERE cislo_kola = 2;

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 12, 7, 2, 2, '2026-08-02 15:00:00', 'played' FROM Kolo WHERE cislo_kola = 2;

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 2, 9, 0, 0, '2026-08-02 17:30:00', 'played' FROM Kolo WHERE cislo_kola = 2;

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 17, 6, 0, 2, '2026-08-02 20:00:00', 'played' FROM Kolo WHERE cislo_kola = 2;

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 11, 10, 0, 1, '2026-08-07 19:00:00', 'played' FROM Kolo WHERE cislo_kola = 3;

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 8, 14, 5, 5, '2026-08-08 17:00:00', 'played' FROM Kolo WHERE cislo_kola = 3;

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 18, 2, 0, 2, '2026-08-08 17:00:00', 'played' FROM Kolo WHERE cislo_kola = 3;

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 7, 4, 2, 0, '2026-08-08 20:00:00', 'played' FROM Kolo WHERE cislo_kola = 3;

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 5, 17, 2, 1, '2026-08-09 15:00:00', 'played' FROM Kolo WHERE cislo_kola = 3;

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 9, 13, 2, 1, '2026-08-09 17:00:00', 'played' FROM Kolo WHERE cislo_kola = 3;

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 6, 16, 1, 0, '2026-08-09 17:00:00', 'played' FROM Kolo WHERE cislo_kola = 3;

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 15, 12, 1, 2, '2026-08-09 20:00:00', 'played' FROM Kolo WHERE cislo_kola = 3;

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 17, 7, NULL, NULL, '2026-08-15 17:00:00', 'scheduled' FROM Kolo WHERE cislo_kola = 4;

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 16, 12, NULL, NULL, '2026-08-15 17:00:00', 'scheduled' FROM Kolo WHERE cislo_kola = 4;

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 4, 8, NULL, NULL, '2026-08-15 17:00:00', 'scheduled' FROM Kolo WHERE cislo_kola = 4;

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 14, 18, NULL, NULL, '2026-08-15 20:00:00', 'scheduled' FROM Kolo WHERE cislo_kola = 4;

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 13, 15, NULL, NULL, '2026-08-16 15:00:00', 'scheduled' FROM Kolo WHERE cislo_kola = 4;

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 2, 6, NULL, NULL, '2026-08-16 17:00:00', 'scheduled' FROM Kolo WHERE cislo_kola = 4;

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 10, 5, NULL, NULL, '2026-08-16 20:00:00', 'scheduled' FROM Kolo WHERE cislo_kola = 4;

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 15, 4, NULL, NULL, '2026-08-22 17:00:00', 'scheduled' FROM Kolo WHERE cislo_kola = 5;

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 7, 16, NULL, NULL, '2026-08-22 17:00:00', 'scheduled' FROM Kolo WHERE cislo_kola = 5;

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 18, 10, NULL, NULL, '2026-08-22 17:00:00', 'scheduled' FROM Kolo WHERE cislo_kola = 5;

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 5, 2, NULL, NULL, '2026-08-22 20:00:00', 'scheduled' FROM Kolo WHERE cislo_kola = 5;

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 6, 13, NULL, NULL, '2026-08-23 15:00:00', 'scheduled' FROM Kolo WHERE cislo_kola = 5;

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 9, 14, NULL, NULL, '2026-08-23 17:00:00', 'scheduled' FROM Kolo WHERE cislo_kola = 5;

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 8, 11, NULL, NULL, '2026-08-23 17:00:00', 'scheduled' FROM Kolo WHERE cislo_kola = 5;

INSERT INTO Zapas (kolo_id, domaci_tym_id, hostujici_tym_id, domaci_skore, hostujici_skore, zacatek_zapasu, stav) SELECT id, 12, 17, NULL, NULL, '2026-08-23 20:00:00', 'scheduled' FROM Kolo WHERE cislo_kola = 5;

-- =====================================================
-- TIPY
-- =====================================================

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 25, z.id, 3, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 8 AND z.hostujici_tym_id = 2 AND z.zacatek_zapasu = '2026-07-25 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 24, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 8 AND z.hostujici_tym_id = 2 AND z.zacatek_zapasu = '2026-07-25 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 14, z.id, 2, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 8 AND z.hostujici_tym_id = 2 AND z.zacatek_zapasu = '2026-07-25 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 17, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 8 AND z.hostujici_tym_id = 2 AND z.zacatek_zapasu = '2026-07-25 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 16, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 8 AND z.hostujici_tym_id = 2 AND z.zacatek_zapasu = '2026-07-25 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 15, z.id, 2, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 8 AND z.hostujici_tym_id = 2 AND z.zacatek_zapasu = '2026-07-25 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 18, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 8 AND z.hostujici_tym_id = 2 AND z.zacatek_zapasu = '2026-07-25 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 19, z.id, 1, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 8 AND z.hostujici_tym_id = 2 AND z.zacatek_zapasu = '2026-07-25 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 20, z.id, 1, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 8 AND z.hostujici_tym_id = 2 AND z.zacatek_zapasu = '2026-07-25 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 21, z.id, 0, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 8 AND z.hostujici_tym_id = 2 AND z.zacatek_zapasu = '2026-07-25 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 25, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 14 AND z.hostujici_tym_id = 10 AND z.zacatek_zapasu = '2026-07-25 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 24, z.id, 2, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 14 AND z.hostujici_tym_id = 10 AND z.zacatek_zapasu = '2026-07-25 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 14, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 14 AND z.hostujici_tym_id = 10 AND z.zacatek_zapasu = '2026-07-25 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 17, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 14 AND z.hostujici_tym_id = 10 AND z.zacatek_zapasu = '2026-07-25 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 16, z.id, 3, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 14 AND z.hostujici_tym_id = 10 AND z.zacatek_zapasu = '2026-07-25 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 15, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 14 AND z.hostujici_tym_id = 10 AND z.zacatek_zapasu = '2026-07-25 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 18, z.id, 2, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 14 AND z.hostujici_tym_id = 10 AND z.zacatek_zapasu = '2026-07-25 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 19, z.id, 2, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 14 AND z.hostujici_tym_id = 10 AND z.zacatek_zapasu = '2026-07-25 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 20, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 14 AND z.hostujici_tym_id = 10 AND z.zacatek_zapasu = '2026-07-25 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 21, z.id, 2, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 14 AND z.hostujici_tym_id = 10 AND z.zacatek_zapasu = '2026-07-25 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 25, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 18 AND z.hostujici_tym_id = 13 AND z.zacatek_zapasu = '2026-07-25 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 24, z.id, 1, 3, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 18 AND z.hostujici_tym_id = 13 AND z.zacatek_zapasu = '2026-07-25 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 14, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 18 AND z.hostujici_tym_id = 13 AND z.zacatek_zapasu = '2026-07-25 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 17, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 18 AND z.hostujici_tym_id = 13 AND z.zacatek_zapasu = '2026-07-25 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 16, z.id, 1, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 18 AND z.hostujici_tym_id = 13 AND z.zacatek_zapasu = '2026-07-25 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 15, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 18 AND z.hostujici_tym_id = 13 AND z.zacatek_zapasu = '2026-07-25 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 18, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 18 AND z.hostujici_tym_id = 13 AND z.zacatek_zapasu = '2026-07-25 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 19, z.id, 2, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 18 AND z.hostujici_tym_id = 13 AND z.zacatek_zapasu = '2026-07-25 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 20, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 18 AND z.hostujici_tym_id = 13 AND z.zacatek_zapasu = '2026-07-25 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 21, z.id, 0, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 18 AND z.hostujici_tym_id = 13 AND z.zacatek_zapasu = '2026-07-25 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 25, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 11 AND z.hostujici_tym_id = 4 AND z.zacatek_zapasu = '2026-07-25 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 24, z.id, 0, 3, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 11 AND z.hostujici_tym_id = 4 AND z.zacatek_zapasu = '2026-07-25 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 14, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 11 AND z.hostujici_tym_id = 4 AND z.zacatek_zapasu = '2026-07-25 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 17, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 11 AND z.hostujici_tym_id = 4 AND z.zacatek_zapasu = '2026-07-25 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 16, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 11 AND z.hostujici_tym_id = 4 AND z.zacatek_zapasu = '2026-07-25 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 15, z.id, 0, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 11 AND z.hostujici_tym_id = 4 AND z.zacatek_zapasu = '2026-07-25 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 18, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 11 AND z.hostujici_tym_id = 4 AND z.zacatek_zapasu = '2026-07-25 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 19, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 11 AND z.hostujici_tym_id = 4 AND z.zacatek_zapasu = '2026-07-25 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 20, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 11 AND z.hostujici_tym_id = 4 AND z.zacatek_zapasu = '2026-07-25 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 21, z.id, 0, 3, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 11 AND z.hostujici_tym_id = 4 AND z.zacatek_zapasu = '2026-07-25 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 25, z.id, 4, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 5 AND z.hostujici_tym_id = 16 AND z.zacatek_zapasu = '2026-07-26 15:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 24, z.id, 3, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 5 AND z.hostujici_tym_id = 16 AND z.zacatek_zapasu = '2026-07-26 15:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 14, z.id, 3, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 5 AND z.hostujici_tym_id = 16 AND z.zacatek_zapasu = '2026-07-26 15:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 17, z.id, 2, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 5 AND z.hostujici_tym_id = 16 AND z.zacatek_zapasu = '2026-07-26 15:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 16, z.id, 2, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 5 AND z.hostujici_tym_id = 16 AND z.zacatek_zapasu = '2026-07-26 15:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 15, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 5 AND z.hostujici_tym_id = 16 AND z.zacatek_zapasu = '2026-07-26 15:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 18, z.id, 2, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 5 AND z.hostujici_tym_id = 16 AND z.zacatek_zapasu = '2026-07-26 15:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 19, z.id, 3, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 5 AND z.hostujici_tym_id = 16 AND z.zacatek_zapasu = '2026-07-26 15:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 20, z.id, 2, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 5 AND z.hostujici_tym_id = 16 AND z.zacatek_zapasu = '2026-07-26 15:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 21, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 5 AND z.hostujici_tym_id = 16 AND z.zacatek_zapasu = '2026-07-26 15:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 25, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 6 AND z.hostujici_tym_id = 12 AND z.zacatek_zapasu = '2026-07-26 17:30:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 24, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 6 AND z.hostujici_tym_id = 12 AND z.zacatek_zapasu = '2026-07-26 17:30:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 14, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 6 AND z.hostujici_tym_id = 12 AND z.zacatek_zapasu = '2026-07-26 17:30:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 17, z.id, 2, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 6 AND z.hostujici_tym_id = 12 AND z.zacatek_zapasu = '2026-07-26 17:30:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 16, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 6 AND z.hostujici_tym_id = 12 AND z.zacatek_zapasu = '2026-07-26 17:30:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 15, z.id, 1, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 6 AND z.hostujici_tym_id = 12 AND z.zacatek_zapasu = '2026-07-26 17:30:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 18, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 6 AND z.hostujici_tym_id = 12 AND z.zacatek_zapasu = '2026-07-26 17:30:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 19, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 6 AND z.hostujici_tym_id = 12 AND z.zacatek_zapasu = '2026-07-26 17:30:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 20, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 6 AND z.hostujici_tym_id = 12 AND z.zacatek_zapasu = '2026-07-26 17:30:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 21, z.id, 1, 3, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 6 AND z.hostujici_tym_id = 12 AND z.zacatek_zapasu = '2026-07-26 17:30:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 25, z.id, 1, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 9 AND z.hostujici_tym_id = 17 AND z.zacatek_zapasu = '2026-07-26 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 24, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 9 AND z.hostujici_tym_id = 17 AND z.zacatek_zapasu = '2026-07-26 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 14, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 9 AND z.hostujici_tym_id = 17 AND z.zacatek_zapasu = '2026-07-26 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 17, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 9 AND z.hostujici_tym_id = 17 AND z.zacatek_zapasu = '2026-07-26 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 16, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 9 AND z.hostujici_tym_id = 17 AND z.zacatek_zapasu = '2026-07-26 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 15, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 9 AND z.hostujici_tym_id = 17 AND z.zacatek_zapasu = '2026-07-26 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 18, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 9 AND z.hostujici_tym_id = 17 AND z.zacatek_zapasu = '2026-07-26 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 19, z.id, 2, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 9 AND z.hostujici_tym_id = 17 AND z.zacatek_zapasu = '2026-07-26 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 20, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 9 AND z.hostujici_tym_id = 17 AND z.zacatek_zapasu = '2026-07-26 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 21, z.id, 2, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 9 AND z.hostujici_tym_id = 17 AND z.zacatek_zapasu = '2026-07-26 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 25, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 15 AND z.hostujici_tym_id = 7 AND z.zacatek_zapasu = '2026-07-27 18:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 24, z.id, 0, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 15 AND z.hostujici_tym_id = 7 AND z.zacatek_zapasu = '2026-07-27 18:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 14, z.id, 0, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 15 AND z.hostujici_tym_id = 7 AND z.zacatek_zapasu = '2026-07-27 18:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 17, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 15 AND z.hostujici_tym_id = 7 AND z.zacatek_zapasu = '2026-07-27 18:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 16, z.id, 0, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 15 AND z.hostujici_tym_id = 7 AND z.zacatek_zapasu = '2026-07-27 18:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 15, z.id, 0, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 15 AND z.hostujici_tym_id = 7 AND z.zacatek_zapasu = '2026-07-27 18:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 18, z.id, 1, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 15 AND z.hostujici_tym_id = 7 AND z.zacatek_zapasu = '2026-07-27 18:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 19, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 15 AND z.hostujici_tym_id = 7 AND z.zacatek_zapasu = '2026-07-27 18:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 20, z.id, 1, 3, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 15 AND z.hostujici_tym_id = 7 AND z.zacatek_zapasu = '2026-07-27 18:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 21, z.id, 0, 3, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 15 AND z.hostujici_tym_id = 7 AND z.zacatek_zapasu = '2026-07-27 18:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 22, z.id, 0, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 1 AND z.domaci_tym_id = 15 AND z.hostujici_tym_id = 7 AND z.zacatek_zapasu = '2026-07-27 18:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 25, z.id, 4, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 4 AND z.hostujici_tym_id = 18 AND z.zacatek_zapasu = '2026-07-31 19:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 24, z.id, 3, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 4 AND z.hostujici_tym_id = 18 AND z.zacatek_zapasu = '2026-07-31 19:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 14, z.id, 3, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 4 AND z.hostujici_tym_id = 18 AND z.zacatek_zapasu = '2026-07-31 19:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 17, z.id, 2, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 4 AND z.hostujici_tym_id = 18 AND z.zacatek_zapasu = '2026-07-31 19:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 16, z.id, 3, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 4 AND z.hostujici_tym_id = 18 AND z.zacatek_zapasu = '2026-07-31 19:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 15, z.id, 2, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 4 AND z.hostujici_tym_id = 18 AND z.zacatek_zapasu = '2026-07-31 19:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 18, z.id, 3, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 4 AND z.hostujici_tym_id = 18 AND z.zacatek_zapasu = '2026-07-31 19:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 19, z.id, 2, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 4 AND z.hostujici_tym_id = 18 AND z.zacatek_zapasu = '2026-07-31 19:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 20, z.id, 2, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 4 AND z.hostujici_tym_id = 18 AND z.zacatek_zapasu = '2026-07-31 19:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 21, z.id, 3, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 4 AND z.hostujici_tym_id = 18 AND z.zacatek_zapasu = '2026-07-31 19:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 22, z.id, 2, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 4 AND z.hostujici_tym_id = 18 AND z.zacatek_zapasu = '2026-07-31 19:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 25, z.id, 1, 3, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 13 AND z.hostujici_tym_id = 5 AND z.zacatek_zapasu = '2026-08-01 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 24, z.id, 0, 3, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 13 AND z.hostujici_tym_id = 5 AND z.zacatek_zapasu = '2026-08-01 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 14, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 13 AND z.hostujici_tym_id = 5 AND z.zacatek_zapasu = '2026-08-01 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 17, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 13 AND z.hostujici_tym_id = 5 AND z.zacatek_zapasu = '2026-08-01 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 16, z.id, 1, 3, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 13 AND z.hostujici_tym_id = 5 AND z.zacatek_zapasu = '2026-08-01 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 15, z.id, 0, 3, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 13 AND z.hostujici_tym_id = 5 AND z.zacatek_zapasu = '2026-08-01 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 18, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 13 AND z.hostujici_tym_id = 5 AND z.zacatek_zapasu = '2026-08-01 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 19, z.id, 0, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 13 AND z.hostujici_tym_id = 5 AND z.zacatek_zapasu = '2026-08-01 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 20, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 13 AND z.hostujici_tym_id = 5 AND z.zacatek_zapasu = '2026-08-01 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 21, z.id, 0, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 13 AND z.hostujici_tym_id = 5 AND z.zacatek_zapasu = '2026-08-01 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 22, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 13 AND z.hostujici_tym_id = 5 AND z.zacatek_zapasu = '2026-08-01 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 25, z.id, 2, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 16 AND z.hostujici_tym_id = 15 AND z.zacatek_zapasu = '2026-08-01 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 24, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 16 AND z.hostujici_tym_id = 15 AND z.zacatek_zapasu = '2026-08-01 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 14, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 16 AND z.hostujici_tym_id = 15 AND z.zacatek_zapasu = '2026-08-01 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 17, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 16 AND z.hostujici_tym_id = 15 AND z.zacatek_zapasu = '2026-08-01 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 16, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 16 AND z.hostujici_tym_id = 15 AND z.zacatek_zapasu = '2026-08-01 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 15, z.id, 0, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 16 AND z.hostujici_tym_id = 15 AND z.zacatek_zapasu = '2026-08-01 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 18, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 16 AND z.hostujici_tym_id = 15 AND z.zacatek_zapasu = '2026-08-01 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 19, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 16 AND z.hostujici_tym_id = 15 AND z.zacatek_zapasu = '2026-08-01 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 20, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 16 AND z.hostujici_tym_id = 15 AND z.zacatek_zapasu = '2026-08-01 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 21, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 16 AND z.hostujici_tym_id = 15 AND z.zacatek_zapasu = '2026-08-01 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 22, z.id, 3, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 16 AND z.hostujici_tym_id = 15 AND z.zacatek_zapasu = '2026-08-01 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 25, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 10 AND z.hostujici_tym_id = 8 AND z.zacatek_zapasu = '2026-08-01 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 24, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 10 AND z.hostujici_tym_id = 8 AND z.zacatek_zapasu = '2026-08-01 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 14, z.id, 2, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 10 AND z.hostujici_tym_id = 8 AND z.zacatek_zapasu = '2026-08-01 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 17, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 10 AND z.hostujici_tym_id = 8 AND z.zacatek_zapasu = '2026-08-01 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 16, z.id, 2, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 10 AND z.hostujici_tym_id = 8 AND z.zacatek_zapasu = '2026-08-01 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 15, z.id, 2, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 10 AND z.hostujici_tym_id = 8 AND z.zacatek_zapasu = '2026-08-01 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 18, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 10 AND z.hostujici_tym_id = 8 AND z.zacatek_zapasu = '2026-08-01 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 19, z.id, 2, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 10 AND z.hostujici_tym_id = 8 AND z.zacatek_zapasu = '2026-08-01 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 20, z.id, 3, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 10 AND z.hostujici_tym_id = 8 AND z.zacatek_zapasu = '2026-08-01 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 21, z.id, 2, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 10 AND z.hostujici_tym_id = 8 AND z.zacatek_zapasu = '2026-08-01 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 22, z.id, 1, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 10 AND z.hostujici_tym_id = 8 AND z.zacatek_zapasu = '2026-08-01 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 25, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 14 AND z.hostujici_tym_id = 11 AND z.zacatek_zapasu = '2026-08-01 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 24, z.id, 2, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 14 AND z.hostujici_tym_id = 11 AND z.zacatek_zapasu = '2026-08-01 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 14, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 14 AND z.hostujici_tym_id = 11 AND z.zacatek_zapasu = '2026-08-01 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 17, z.id, 2, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 14 AND z.hostujici_tym_id = 11 AND z.zacatek_zapasu = '2026-08-01 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 16, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 14 AND z.hostujici_tym_id = 11 AND z.zacatek_zapasu = '2026-08-01 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 15, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 14 AND z.hostujici_tym_id = 11 AND z.zacatek_zapasu = '2026-08-01 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 18, z.id, 2, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 14 AND z.hostujici_tym_id = 11 AND z.zacatek_zapasu = '2026-08-01 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 19, z.id, 3, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 14 AND z.hostujici_tym_id = 11 AND z.zacatek_zapasu = '2026-08-01 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 20, z.id, 2, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 14 AND z.hostujici_tym_id = 11 AND z.zacatek_zapasu = '2026-08-01 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 21, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 14 AND z.hostujici_tym_id = 11 AND z.zacatek_zapasu = '2026-08-01 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 22, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 14 AND z.hostujici_tym_id = 11 AND z.zacatek_zapasu = '2026-08-01 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 25, z.id, 2, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 12 AND z.hostujici_tym_id = 7 AND z.zacatek_zapasu = '2026-08-02 15:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 24, z.id, 2, 3, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 12 AND z.hostujici_tym_id = 7 AND z.zacatek_zapasu = '2026-08-02 15:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 14, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 12 AND z.hostujici_tym_id = 7 AND z.zacatek_zapasu = '2026-08-02 15:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 17, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 12 AND z.hostujici_tym_id = 7 AND z.zacatek_zapasu = '2026-08-02 15:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 16, z.id, 3, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 12 AND z.hostujici_tym_id = 7 AND z.zacatek_zapasu = '2026-08-02 15:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 15, z.id, 2, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 12 AND z.hostujici_tym_id = 7 AND z.zacatek_zapasu = '2026-08-02 15:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 18, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 12 AND z.hostujici_tym_id = 7 AND z.zacatek_zapasu = '2026-08-02 15:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 19, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 12 AND z.hostujici_tym_id = 7 AND z.zacatek_zapasu = '2026-08-02 15:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 20, z.id, 2, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 12 AND z.hostujici_tym_id = 7 AND z.zacatek_zapasu = '2026-08-02 15:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 21, z.id, 1, 3, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 12 AND z.hostujici_tym_id = 7 AND z.zacatek_zapasu = '2026-08-02 15:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 22, z.id, 1, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 12 AND z.hostujici_tym_id = 7 AND z.zacatek_zapasu = '2026-08-02 15:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 25, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 2 AND z.hostujici_tym_id = 9 AND z.zacatek_zapasu = '2026-08-02 17:30:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 24, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 2 AND z.hostujici_tym_id = 9 AND z.zacatek_zapasu = '2026-08-02 17:30:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 14, z.id, 0, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 2 AND z.hostujici_tym_id = 9 AND z.zacatek_zapasu = '2026-08-02 17:30:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 17, z.id, 1, 3, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 2 AND z.hostujici_tym_id = 9 AND z.zacatek_zapasu = '2026-08-02 17:30:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 16, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 2 AND z.hostujici_tym_id = 9 AND z.zacatek_zapasu = '2026-08-02 17:30:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 15, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 2 AND z.hostujici_tym_id = 9 AND z.zacatek_zapasu = '2026-08-02 17:30:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 18, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 2 AND z.hostujici_tym_id = 9 AND z.zacatek_zapasu = '2026-08-02 17:30:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 19, z.id, 0, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 2 AND z.hostujici_tym_id = 9 AND z.zacatek_zapasu = '2026-08-02 17:30:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 20, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 2 AND z.hostujici_tym_id = 9 AND z.zacatek_zapasu = '2026-08-02 17:30:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 21, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 2 AND z.hostujici_tym_id = 9 AND z.zacatek_zapasu = '2026-08-02 17:30:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 22, z.id, 0, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 2 AND z.hostujici_tym_id = 9 AND z.zacatek_zapasu = '2026-08-02 17:30:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 25, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 17 AND z.hostujici_tym_id = 6 AND z.zacatek_zapasu = '2026-08-02 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 24, z.id, 0, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 17 AND z.hostujici_tym_id = 6 AND z.zacatek_zapasu = '2026-08-02 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 14, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 17 AND z.hostujici_tym_id = 6 AND z.zacatek_zapasu = '2026-08-02 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 17, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 17 AND z.hostujici_tym_id = 6 AND z.zacatek_zapasu = '2026-08-02 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 16, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 17 AND z.hostujici_tym_id = 6 AND z.zacatek_zapasu = '2026-08-02 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 15, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 17 AND z.hostujici_tym_id = 6 AND z.zacatek_zapasu = '2026-08-02 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 18, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 17 AND z.hostujici_tym_id = 6 AND z.zacatek_zapasu = '2026-08-02 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 19, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 17 AND z.hostujici_tym_id = 6 AND z.zacatek_zapasu = '2026-08-02 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 20, z.id, 0, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 17 AND z.hostujici_tym_id = 6 AND z.zacatek_zapasu = '2026-08-02 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 21, z.id, 0, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 17 AND z.hostujici_tym_id = 6 AND z.zacatek_zapasu = '2026-08-02 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 22, z.id, 1, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 2 AND z.domaci_tym_id = 17 AND z.hostujici_tym_id = 6 AND z.zacatek_zapasu = '2026-08-02 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 25, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 11 AND z.hostujici_tym_id = 10 AND z.zacatek_zapasu = '2026-08-07 19:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 24, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 11 AND z.hostujici_tym_id = 10 AND z.zacatek_zapasu = '2026-08-07 19:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 14, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 11 AND z.hostujici_tym_id = 10 AND z.zacatek_zapasu = '2026-08-07 19:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 17, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 11 AND z.hostujici_tym_id = 10 AND z.zacatek_zapasu = '2026-08-07 19:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 16, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 11 AND z.hostujici_tym_id = 10 AND z.zacatek_zapasu = '2026-08-07 19:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 15, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 11 AND z.hostujici_tym_id = 10 AND z.zacatek_zapasu = '2026-08-07 19:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 18, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 11 AND z.hostujici_tym_id = 10 AND z.zacatek_zapasu = '2026-08-07 19:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 19, z.id, 2, 3, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 11 AND z.hostujici_tym_id = 10 AND z.zacatek_zapasu = '2026-08-07 19:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 20, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 11 AND z.hostujici_tym_id = 10 AND z.zacatek_zapasu = '2026-08-07 19:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 21, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 11 AND z.hostujici_tym_id = 10 AND z.zacatek_zapasu = '2026-08-07 19:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 22, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 11 AND z.hostujici_tym_id = 10 AND z.zacatek_zapasu = '2026-08-07 19:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 25, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 8 AND z.hostujici_tym_id = 14 AND z.zacatek_zapasu = '2026-08-08 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 24, z.id, 0, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 8 AND z.hostujici_tym_id = 14 AND z.zacatek_zapasu = '2026-08-08 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 14, z.id, 1, 3, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 8 AND z.hostujici_tym_id = 14 AND z.zacatek_zapasu = '2026-08-08 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 17, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 8 AND z.hostujici_tym_id = 14 AND z.zacatek_zapasu = '2026-08-08 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 16, z.id, 1, 3, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 8 AND z.hostujici_tym_id = 14 AND z.zacatek_zapasu = '2026-08-08 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 15, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 8 AND z.hostujici_tym_id = 14 AND z.zacatek_zapasu = '2026-08-08 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 18, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 8 AND z.hostujici_tym_id = 14 AND z.zacatek_zapasu = '2026-08-08 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 19, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 8 AND z.hostujici_tym_id = 14 AND z.zacatek_zapasu = '2026-08-08 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 20, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 8 AND z.hostujici_tym_id = 14 AND z.zacatek_zapasu = '2026-08-08 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 21, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 8 AND z.hostujici_tym_id = 14 AND z.zacatek_zapasu = '2026-08-08 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 22, z.id, 0, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 8 AND z.hostujici_tym_id = 14 AND z.zacatek_zapasu = '2026-08-08 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 25, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 18 AND z.hostujici_tym_id = 2 AND z.zacatek_zapasu = '2026-08-08 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 24, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 18 AND z.hostujici_tym_id = 2 AND z.zacatek_zapasu = '2026-08-08 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 14, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 18 AND z.hostujici_tym_id = 2 AND z.zacatek_zapasu = '2026-08-08 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 17, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 18 AND z.hostujici_tym_id = 2 AND z.zacatek_zapasu = '2026-08-08 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 16, z.id, 1, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 18 AND z.hostujici_tym_id = 2 AND z.zacatek_zapasu = '2026-08-08 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 15, z.id, 0, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 18 AND z.hostujici_tym_id = 2 AND z.zacatek_zapasu = '2026-08-08 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 18, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 18 AND z.hostujici_tym_id = 2 AND z.zacatek_zapasu = '2026-08-08 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 19, z.id, 0, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 18 AND z.hostujici_tym_id = 2 AND z.zacatek_zapasu = '2026-08-08 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 20, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 18 AND z.hostujici_tym_id = 2 AND z.zacatek_zapasu = '2026-08-08 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 21, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 18 AND z.hostujici_tym_id = 2 AND z.zacatek_zapasu = '2026-08-08 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 22, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 18 AND z.hostujici_tym_id = 2 AND z.zacatek_zapasu = '2026-08-08 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 25, z.id, 2, 4, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 7 AND z.hostujici_tym_id = 4 AND z.zacatek_zapasu = '2026-08-08 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 24, z.id, 2, 3, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 7 AND z.hostujici_tym_id = 4 AND z.zacatek_zapasu = '2026-08-08 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 14, z.id, 1, 3, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 7 AND z.hostujici_tym_id = 4 AND z.zacatek_zapasu = '2026-08-08 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 17, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 7 AND z.hostujici_tym_id = 4 AND z.zacatek_zapasu = '2026-08-08 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 16, z.id, 1, 3, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 7 AND z.hostujici_tym_id = 4 AND z.zacatek_zapasu = '2026-08-08 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 15, z.id, 2, 3, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 7 AND z.hostujici_tym_id = 4 AND z.zacatek_zapasu = '2026-08-08 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 18, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 7 AND z.hostujici_tym_id = 4 AND z.zacatek_zapasu = '2026-08-08 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 19, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 7 AND z.hostujici_tym_id = 4 AND z.zacatek_zapasu = '2026-08-08 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 20, z.id, 0, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 7 AND z.hostujici_tym_id = 4 AND z.zacatek_zapasu = '2026-08-08 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 21, z.id, 0, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 7 AND z.hostujici_tym_id = 4 AND z.zacatek_zapasu = '2026-08-08 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 22, z.id, 0, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 7 AND z.hostujici_tym_id = 4 AND z.zacatek_zapasu = '2026-08-08 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 25, z.id, 4, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 5 AND z.hostujici_tym_id = 17 AND z.zacatek_zapasu = '2026-08-09 15:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 24, z.id, 4, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 5 AND z.hostujici_tym_id = 17 AND z.zacatek_zapasu = '2026-08-09 15:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 14, z.id, 4, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 5 AND z.hostujici_tym_id = 17 AND z.zacatek_zapasu = '2026-08-09 15:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 17, z.id, 3, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 5 AND z.hostujici_tym_id = 17 AND z.zacatek_zapasu = '2026-08-09 15:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 16, z.id, 3, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 5 AND z.hostujici_tym_id = 17 AND z.zacatek_zapasu = '2026-08-09 15:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 15, z.id, 4, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 5 AND z.hostujici_tym_id = 17 AND z.zacatek_zapasu = '2026-08-09 15:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 18, z.id, 3, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 5 AND z.hostujici_tym_id = 17 AND z.zacatek_zapasu = '2026-08-09 15:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 19, z.id, 3, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 5 AND z.hostujici_tym_id = 17 AND z.zacatek_zapasu = '2026-08-09 15:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 20, z.id, 3, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 5 AND z.hostujici_tym_id = 17 AND z.zacatek_zapasu = '2026-08-09 15:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 21, z.id, 3, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 5 AND z.hostujici_tym_id = 17 AND z.zacatek_zapasu = '2026-08-09 15:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 22, z.id, 2, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 5 AND z.hostujici_tym_id = 17 AND z.zacatek_zapasu = '2026-08-09 15:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 25, z.id, 2, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 9 AND z.hostujici_tym_id = 13 AND z.zacatek_zapasu = '2026-08-09 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 24, z.id, 1, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 9 AND z.hostujici_tym_id = 13 AND z.zacatek_zapasu = '2026-08-09 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 14, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 9 AND z.hostujici_tym_id = 13 AND z.zacatek_zapasu = '2026-08-09 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 17, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 9 AND z.hostujici_tym_id = 13 AND z.zacatek_zapasu = '2026-08-09 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 16, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 9 AND z.hostujici_tym_id = 13 AND z.zacatek_zapasu = '2026-08-09 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 15, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 9 AND z.hostujici_tym_id = 13 AND z.zacatek_zapasu = '2026-08-09 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 18, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 9 AND z.hostujici_tym_id = 13 AND z.zacatek_zapasu = '2026-08-09 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 19, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 9 AND z.hostujici_tym_id = 13 AND z.zacatek_zapasu = '2026-08-09 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 20, z.id, 2, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 9 AND z.hostujici_tym_id = 13 AND z.zacatek_zapasu = '2026-08-09 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 21, z.id, 2, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 9 AND z.hostujici_tym_id = 13 AND z.zacatek_zapasu = '2026-08-09 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 22, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 9 AND z.hostujici_tym_id = 13 AND z.zacatek_zapasu = '2026-08-09 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 25, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 6 AND z.hostujici_tym_id = 16 AND z.zacatek_zapasu = '2026-08-09 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 24, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 6 AND z.hostujici_tym_id = 16 AND z.zacatek_zapasu = '2026-08-09 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 14, z.id, 1, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 6 AND z.hostujici_tym_id = 16 AND z.zacatek_zapasu = '2026-08-09 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 17, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 6 AND z.hostujici_tym_id = 16 AND z.zacatek_zapasu = '2026-08-09 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 16, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 6 AND z.hostujici_tym_id = 16 AND z.zacatek_zapasu = '2026-08-09 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 15, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 6 AND z.hostujici_tym_id = 16 AND z.zacatek_zapasu = '2026-08-09 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 18, z.id, 2, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 6 AND z.hostujici_tym_id = 16 AND z.zacatek_zapasu = '2026-08-09 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 19, z.id, 3, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 6 AND z.hostujici_tym_id = 16 AND z.zacatek_zapasu = '2026-08-09 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 20, z.id, 3, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 6 AND z.hostujici_tym_id = 16 AND z.zacatek_zapasu = '2026-08-09 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 21, z.id, 2, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 6 AND z.hostujici_tym_id = 16 AND z.zacatek_zapasu = '2026-08-09 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 22, z.id, 1, 0, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 6 AND z.hostujici_tym_id = 16 AND z.zacatek_zapasu = '2026-08-09 17:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 25, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 15 AND z.hostujici_tym_id = 12 AND z.zacatek_zapasu = '2026-08-09 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 24, z.id, 2, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 15 AND z.hostujici_tym_id = 12 AND z.zacatek_zapasu = '2026-08-09 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 14, z.id, 2, 4, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 15 AND z.hostujici_tym_id = 12 AND z.zacatek_zapasu = '2026-08-09 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 17, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 15 AND z.hostujici_tym_id = 12 AND z.zacatek_zapasu = '2026-08-09 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 16, z.id, 1, 3, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 15 AND z.hostujici_tym_id = 12 AND z.zacatek_zapasu = '2026-08-09 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 15, z.id, 1, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 15 AND z.hostujici_tym_id = 12 AND z.zacatek_zapasu = '2026-08-09 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 18, z.id, 1, 1, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 15 AND z.hostujici_tym_id = 12 AND z.zacatek_zapasu = '2026-08-09 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 19, z.id, 2, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 15 AND z.hostujici_tym_id = 12 AND z.zacatek_zapasu = '2026-08-09 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 20, z.id, 0, 2, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 15 AND z.hostujici_tym_id = 12 AND z.zacatek_zapasu = '2026-08-09 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 21, z.id, 1, 3, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 15 AND z.hostujici_tym_id = 12 AND z.zacatek_zapasu = '2026-08-09 20:00:00';

INSERT INTO PredpovedVysledku (uzivatel_id, zapas_id, predpoved_domaci_skore, predpoved_hostujici_skore, is_joker, body_ziskane) SELECT 22, z.id, 2, 4, 0, 0 FROM Zapas z JOIN Kolo k ON k.id = z.kolo_id WHERE k.cislo_kola = 3 AND z.domaci_tym_id = 15 AND z.hostujici_tym_id = 12 AND z.zacatek_zapasu = '2026-08-09 20:00:00';

COMMIT;
