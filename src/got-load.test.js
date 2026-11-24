import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL =
  __ENV.BASE_URL || 'https://got-api.mateusinacio2006.workers.dev/api';

export const options = {
  // Rampa: inicia com 7 VUs, máximo de 92 VUs, total de 3,5 minutos (210s)
  stages: [
    { duration: '30s', target: 7 }, // início com 7 VUs
    { duration: '60s', target: 50 }, // subida
    { duration: '60s', target: 92 }, // pico de 92 VUs
    { duration: '30s', target: 92 }, // sustenta o pico
    { duration: '30s', target: 0 } // descida
  ], // 30 + 60 + 60 + 30 + 30 = 210s = 3,5 min
  thresholds: {
    // 90% das respostas abaixo de 6800ms
    http_req_duration: ['p(90)<6800'],
    // menos de 25% das requisições com erro
    http_req_failed: ['rate<0.25']
  }
};

export default function () {
  const health = http.get(`${BASE_URL}/health`);
  check(health, {
    'health: status 200': (r) => r.status === 200
  });

  const characters = http.get(`${BASE_URL}/characters?house=Stark`);
  check(characters, {
    'characters: status 200': (r) => r.status === 200,
    'characters: retorna lista': (r) => Array.isArray(r.json('data'))
  });

  sleep(1);
}
