# Dogodki — demo aplikacija za predavanja

Demo aplikacija predmeta **Razvoj spletnih rešitev**. Na predavanjih jo odkrivamo po delih:
vsak sklop ima svoj git tag (`be-s1` … `be-s6`, `fe-s1` … `fe-s6`).

Domena: dogodki in vstopnice. Namenoma drugačna od vaj (knjižnica), da predavanje ne izda rešitev.

## Prenos in zagon

Potrebuješ Git in Node.js 22.22 ali novejši (priporočeno 24 LTS).

```bash
git clone https://github.com/islammusicscv/dogodki-demo.git
cd dogodki-demo
npm install
npm run start
```

Ko je objavljen nov sklop: `git pull`, nato `npm install` in `npm run start`.
Stanje določenega sklopa (npr. za zagovor): `git checkout be-s3`.

Aplikacija teče na `http://localhost:3000`. Ob prvem zagonu se baza `dogodki.db` napolni iz `seed.json`.
Za svež začetek: `npm run reset` (izbriše `dogodki.db`), nato `npm run start`.

Datumi v `seed.json` so relativni (npr. `"startsInDays": 45, "time": "19:00"`): ob ustvarjanju baze se izračunajo
od današnjega dne, zato so dogodki vedno v prihodnosti in so pri vsakem drugačni. `SEED_DATE=2026-10-01` izhodišče zamrzne
(uporabljajo ga preizkusi in posnetki za predavanja).

Windows (PowerShell): če `npm` javi napako o izvajanju skript, enkrat poženi
`Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` ali uporabljaj `npm.cmd`.

## Preizkus

Zahteve so v mapi `requests/` (npr. `requests/be-s1.http`). Primer s curl:

```bash
curl -i http://localhost:3000/events
```

## Stanje po sklopih

| Tag | Kaj doda |
|---|---|
| `be-s1` | moduli, controllerji, servisi, repository; CRUD `/events`, vstopnice (branje), gnezdena pot, query parameter |
| `be-s2` | DTO-ji, class-validator, globalni `ValidationPipe`, `ParseIntPipe`, custom validator `@IsInFuture`, nakup vstopnic (cena na strežniku, 409 ob razprodaji) |

## Struktura

```
src/
├── main.ts              # zagon aplikacije
├── app.module.ts        # korenski modul: baza + moduli
├── common/validators/   # custom validatorji (@IsInFuture)
├── events/              # dogodki: entity, dto/, controller, service, module
├── tickets/             # vstopnice: entity, dto/, controller, service, module
├── health/              # GET /health
└── seed/                # polnjenje baze iz seed.json
```
