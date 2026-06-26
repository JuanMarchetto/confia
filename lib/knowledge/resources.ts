// Confía — resource lookups. We do NOT invent shelter addresses or live capacities
// (fabricated safety data is dangerous). We route to verified official channels and
// give correct, stable safety guidance. A live verified directory, populated only from
// official sources with timestamps, is the Phase-2 module.

import type { InfoStatus, Source } from "../types";

export interface ResourceIntent {
  id: string;
  status: InfoStatus;
  keywords: string[];
  patterns: RegExp[];
  title: string;
  detail: string;
  advice: string;
  sources: Source[];
}

const PC: Source = { name: "Protección Civil Venezuela", url: "https://www.pcivil.gob.ve", handle: "@PCivil_Ve" };
const CRUZ: Source = { name: "Cruz Roja Venezolana", url: "https://cruzroja.ve", handle: "@CruzRojaVe" };
const E911: Source = { name: "Emergencias 911", url: "tel:911" };
const E171: Source = { name: "Emergencias 171 (respaldo)", url: "tel:171" };
const BOMBEROS: Source = { name: "Bomberos (DGNB)", url: "https://dgnb.gob.ve", handle: "@DGNBEnLinea" };
const FUNVISIS: Source = { name: "FUNVISIS", url: "https://www.funvisis.gob.ve", handle: "@SomosFunvisis" };

export const RESOURCE_INTENTS: ResourceIntent[] = [
  {
    id: "gas_leak",
    status: "verificado",
    keywords: ["fuga de gas", "olor a gas", "huele a gas"],
    patterns: [/(huele a gas|olor a gas|fuga de gas|escape de gas)/i],
    title: "Olor a gas: actúa de inmediato",
    detail:
      "Tras un sismo es común que haya fugas de gas. El gas acumulado puede explotar con una sola chispa.",
    advice:
      "NO enciendas luces, fósforos ni velas. NO uses interruptores ni el celular dentro. Cierra la llave del gas, abre puertas y ventanas, sal del lugar y reporta a Bomberos o al 911 desde afuera.",
    sources: [BOMBEROS, E911],
  },
  {
    id: "shelter",
    status: "sin_confirmar",
    keywords: ["refugio", "albergue", "dónde dormir", "donde dormir", "techo", "evacuado", "casa cayó", "casa se cayó", "damnificado"],
    patterns: [/refugio.{0,20}(cerca|m[áa]s cercano|abierto|cuman[áa]|disponible)/i, /(d[óo]nde|donde).{0,15}(refugio|albergue|dormir)/i],
    title: "Refugios: confirma siempre por canal oficial",
    detail:
      "Por seguridad no mostramos ubicaciones de refugios sin verificarlas con una fuente oficial y con fecha de actualización; una dirección equivocada puede poner a alguien en peligro. Los refugios y su disponibilidad cambian hora a hora.",
    advice:
      "Llama al 911 (o 171), o consulta a Protección Civil para el refugio abierto más cercano y con cupo. Si ves un refugio anunciado en un mensaje reenviado, no lo des por cierto hasta confirmarlo.",
    sources: [E911, E171, PC],
  },
  {
    id: "medical",
    status: "sin_confirmar",
    keywords: ["hospital", "médico", "medico", "herido", "lesionado", "ambulancia", "punto médico", "atención médica", "primeros auxilios", "donar sangre"],
    patterns: [/(hospital|punto m[ée]dico|ambulancia).{0,20}(cerca|abierto|cercano)/i, /(d[óo]nde|donde).{0,15}(hospital|m[ée]dico|atenci[óo]n)/i],
    title: "Atención médica: usa el canal de emergencia",
    detail:
      "Para una emergencia médica, el canal correcto es el sistema de emergencias, que coordina ambulancias y centros con capacidad. No confiamos puntos médicos no verificados.",
    advice:
      "Llama al 911 (o 171) para una ambulancia o el centro de salud con capacidad más cercano. La Cruz Roja Venezolana coordina atención y donación de sangre.",
    sources: [E911, E171, CRUZ],
  },
  {
    id: "donate",
    status: "sin_confirmar",
    keywords: ["donar", "donación", "ayudar", "colaborar", "aporte", "víveres", "viveres", "colecta", "dónde dono", "donde dono"],
    patterns: [/(d[óo]nde|c[óo]mo).{0,15}(dono|donar|ayudar|colaborar)/i, /quiero (ayudar|donar|colaborar)/i],
    title: "Donar de forma segura",
    detail:
      "Las donaciones son un blanco frecuente de estafa tras un desastre. Dona solo a organizaciones reconocidas por sus canales oficiales verificados, nunca a cuentas personales que te llegan por mensaje.",
    advice:
      "Dona por canales oficiales (p. ej. Cruz Roja Venezolana). Si te comparten una dirección de cripto, pégala en Confía y la analizamos en cadena antes de que envíes.",
    sources: [CRUZ, PC],
  },
  {
    id: "missing",
    status: "sin_confirmar",
    keywords: ["desaparecido", "no encuentro", "buscar persona", "perdido", "atrapado", "atrapados", "rescate"],
    patterns: [/(busco|no encuentro|desaparecid\w*).{0,25}(familiar|persona|hijo|madre|padre|herman)/i, /(hay|personas).{0,10}atrapad/i],
    title: "Personas desaparecidas o atrapadas",
    detail:
      "Para reportar personas atrapadas o desaparecidas, el canal correcto es el sistema de emergencias y los equipos de rescate oficiales, que coordinan la búsqueda.",
    advice:
      "Reporta al 911 (o 171) de inmediato con la ubicación más precisa posible. La Cruz Roja gestiona el restablecimiento de contacto entre familiares.",
    sources: [E911, E171, CRUZ],
  },
  {
    id: "seismic_info",
    status: "sin_confirmar",
    keywords: [],
    patterns: [
      /(informaci[óo]n|datos|reporte|cu[áa]l fue|qu[ée])\b.{0,20}(sismo|s[íi]smic\w*|terremoto|magnitud|epicentro|r[ée]plica)/i,
      /(magnitud|epicentro)\b.{0,20}(del|de la)?\s*(sismo|terremoto)/i,
    ],
    title: "Información sísmica oficial",
    detail:
      "La fuente oficial para magnitud, epicentro y réplicas en Venezuela es FUNVISIS. Desconfía de cifras o 'predicciones' que no provengan de ahí. No confirmamos datos sísmicos específicos por nuestra cuenta.",
    advice: "Consulta FUNVISIS para los datos confirmados del sismo y sus réplicas.",
    sources: [FUNVISIS],
  },
];
