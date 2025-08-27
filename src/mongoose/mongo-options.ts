import fs from 'fs';
import path from 'path';

export function buildMongoOptions() {
  const tlsEnabled = String(process.env.MONGO_TLS || 'false').toLowerCase() === 'true';
  let tlsCAFile = process.env.MONGO_TLS_CA;
  const defaultPem = path.join(process.cwd(), 'certs', 'global-bundle.pem');
  if (!tlsCAFile && fs.existsSync(defaultPem)) tlsCAFile = defaultPem;

  const options: any = {};
  if (tlsEnabled) options.tls = true;
  if (tlsCAFile) options.tlsCAFile = tlsCAFile;

  // LOGS para debug
  console.log('[MongoDB] URI:', process.env.MONGO_URI);
  console.log('[MongoDB] TLS Enabled:', tlsEnabled);
  console.log('[MongoDB] TLS CA File:', tlsCAFile);
  console.log('[MongoDB] Options:', options);

  // Validações
  if (!process.env.MONGO_URI) {
    throw new Error('[MongoDB] MONGO_URI não definida nas variáveis de ambiente!');
  }
  if (tlsEnabled && !tlsCAFile) {
    throw new Error('[MongoDB] TLS está ativado mas o arquivo CA não foi encontrado!');
  }
  if (tlsCAFile && !fs.existsSync(tlsCAFile)) {
    throw new Error(`[MongoDB] TLS CA File não existe: ${tlsCAFile}`);
  }

  return options;
}
