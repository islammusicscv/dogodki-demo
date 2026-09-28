# Dogodki — demo aplikacija za predavanja

Demo aplikacija predmeta **Razvoj spletnih rešitev**. Na predavanjih jo odkrivamo po delih:
vsak sklop ima svoj git tag (`be-s1` … `be-s6`, `fe-s1` … `fe-s6`).

Domena: dogodki in vstopnice. Namenoma drugačna od vaj (knjižnica), da predavanje ne izda rešitev.

## Zagon

Potrebuješ Node.js 22.22 ali novejši (priporočeno 24 LTS).

```bash
npm install
npm run start
```

Aplikacija teče na `http://localhost:3000`. Ob prvem zagonu se baza `dogodki.db` napolni iz `seed.json`.
Za svež začetek izbriši `dogodki.db` in aplikacijo zaženi znova.

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

## Struktura

```
src/
├── main.ts              # zagon aplikacije
├── app.module.ts        # korenski modul: baza + moduli
├── events/              # dogodki: entity, controller, service, module
├── tickets/             # vstopnice: entity, controller, service, module
├── health/              # GET /health
└── seed/                # polnjenje baze iz seed.json
```
