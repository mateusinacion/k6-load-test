# Teste de carga com k6 — Game of Thrones API

Teste de performance com [k6](https://k6.io) contra a API Game of Thrones
(`https://got-api.mateusinacio2006.workers.dev/api`), executado no GitHub Actions.

## Cenário

- **Rampa (stages):** inicia com 7 VUs, chega ao máximo de 92 VUs, duração total de 3,5 minutos.
- **Thresholds:**
  - `http_req_duration`: `p(90) < 6800ms`
  - `http_req_failed`: `rate < 0.25`

## Executar localmente

```sh
k6 run src/got-load.test.js
```

## Pipeline

`.github/workflows/k6.yml` roda o teste a cada push/PR na `main`.
