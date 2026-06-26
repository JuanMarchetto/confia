// Confía — curated rumor knowledge base for the June 24 2026 Venezuela earthquakes.
// Each entry rebuts a real, fact-checked misinformation pattern. FALSO entries are
// PATTERN-GATED (see classify.ts): a FALSO verdict only fires on a specific pattern
// match, never on stray keywords, so legitimate messages are never branded false.
// Rebuttals are grounded in fact-checkers (Factchequeado, Maldita.es, INFOVERITAS),
// USGS science, and official institutions. Bounded quantifiers avoid ReDoS.

import type { InfoStatus, Source } from "../types";

export interface RumorEntry {
  id: string;
  status: InfoStatus;
  patterns: RegExp[]; // strong signals (weight 3) — REQUIRED for a FALSO verdict
  keywords: string[]; // weak signals (weight 1)
  title: string;
  detail: string;
  advice: string;
  sources: Source[];
}

const USGS: Source = { name: "USGS — ¿Se pueden predecir los terremotos?", url: "https://www.usgs.gov/faqs/can-you-predict-earthquakes" };
const FUNVISIS: Source = { name: "FUNVISIS", url: "https://www.funvisis.gob.ve", handle: "@SomosFunvisis" };
const FACTCHEQUEADO: Source = { name: "Factchequeado", url: "https://factchequeado.com" };
const MALDITA: Source = { name: "Maldita.es", url: "https://maldita.es" };
const INFOVERITAS: Source = { name: "INFOVERITAS", url: "https://info-veritas.com" };
const CRUZ: Source = { name: "Cruz Roja Venezolana", url: "https://cruzroja.ve", handle: "@CruzRojaVe" };
const PC: Source = { name: "Protección Civil Venezuela", url: "https://www.pcivil.gob.ve", handle: "@PCivil_Ve" };

export const RUMORS: RumorEntry[] = [
  {
    id: "aftershock_prediction",
    status: "falso",
    patterns: [
      /(va a|vendr[áa]|viene|se viene|habr[áa]|predic\w*|anunci\w*|prep[áa]r\w*|alerta de)\b.{0,30}(r[ée]plica|sismo|terremoto|temblor)/i,
      /(viene|se viene|habr[áa]|va a (haber|temblar|venir))\b.{0,40}(magnitud|de\s*\d|a las\s*\d)/i,
      /(animales|la luna|alineaci[óo]n|luces en el cielo|haarp)\b.{0,30}(terremoto|sismo|predic)/i,
    ],
    keywords: ["predicen", "predicción", "más fuerte", "evacuen ya", "alerta sísmica"],
    title: "FALSO: nadie puede predecir un terremoto con hora y magnitud exactas",
    detail:
      "La ciencia NO puede predecir un terremoto ni una réplica con fecha, hora o magnitud precisas. Tras los sismos del 24 de junio de 2026, FUNVISIS ha registrado muchas réplicas, pero ninguna puede anunciarse de antemano con hora exacta. Cualquier mensaje del tipo 'va a temblar a tal hora' o 'viene una réplica de magnitud X' busca generar pánico.",
    advice:
      "No reenvíes. Sigue solo a FUNVISIS para información sísmica oficial. Ante una réplica real: agáchate, cúbrete y agárrate.",
    sources: [USGS, FUNVISIS],
  },
  {
    id: "fake_bono_aid_phishing",
    status: "falso",
    patterns: [
      /(bono|subsidio|cesta|ayuda)\s*(por|del|de|para)?\s*(terremoto|damnificad\w*|v[íi]ctima\w*).{0,60}(reg[íi]str\w*|inscr\w*|c[ée]dula|datos|clave|contrase\w*|enlace|link|clic|formulario)/i,
      /(reg[íi]strate|inscr[íi]bete|llena.{0,15}formulario).{0,40}(bono|ayuda|subsidio|damnificad)/i,
      /(haz clic|ingresa aqu[íi]|entra a este enlace).{0,30}(cobrar|recibir|bono|ayuda)/i,
    ],
    keywords: ["datos bancarios", "cédula", "clave", "contraseña"],
    title: "FALSO: registros de 'bonos' que piden tus datos son phishing",
    detail:
      "Los formularios que prometen un 'bono por el terremoto' o ayuda a damnificados a cambio de tu cédula, datos bancarios, clave o un clic en un enlace son estafas de phishing para robar tu información o tu dinero. Las instituciones oficiales no piden contraseñas ni datos sensibles por enlaces de WhatsApp, SMS o redes.",
    advice:
      "No entregues datos ni hagas clic en enlaces reenviados. Verifica cualquier ayuda en los canales oficiales del Estado o de organizaciones reconocidas como la Cruz Roja Venezolana.",
    sources: [FACTCHEQUEADO, CRUZ],
  },
  {
    id: "fake_bono_patria_phishing",
    status: "falso",
    patterns: [
      /(carnet|monedero|sistema|plataforma)\s+de?\s*la\s*patria.{0,40}(bono|terremoto|activa|registr|clave|contrase|enlace|link)/i,
      /(activa|cobra|reclama).{0,20}(bono).{0,20}(patria|terremoto)/i,
      /patria\.\w{2,}.{0,40}(bono|terremoto|activa|clave|contrase)/i,
    ],
    keywords: ["sistema patria", "carnet de la patria", "monedero patria", "bono terremoto"],
    title: "FALSO: 'bono terremoto' por el Sistema Patria es phishing",
    detail:
      "Circulan enlaces que imitan al Sistema Patria/Carnet de la Patria prometiendo un 'bono terremoto'. La plataforma oficial NUNCA te pide tu clave por WhatsApp, SMS ni por un enlace. Los estafadores usan dominios parecidos (lookalikes de patria.org.ve) para robar tu acceso.",
    advice:
      "No ingreses tu clave en enlaces reenviados. Entra solo escribiendo tú mismo la dirección oficial. Si dudas, no hagas clic.",
    sources: [FACTCHEQUEADO],
  },
  {
    id: "crypto_donation_solicitation",
    status: "sin_confirmar",
    patterns: [
      /(env[íi]a|dona|transfiere|deposita)\b.{0,30}(usdt|usdc|cripto|bitcoin|\bsol\b|wallet|billetera|direcci[óo]n)/i,
      /(wallet|billetera|direcci[óo]n)\b.{0,30}(v[íi]ctimas|damnificad\w*|ayuda|terremoto)/i,
    ],
    keywords: ["usdt", "usdc", "cripto", "bitcoin", "binance", "trc20"],
    title: "PRECAUCIÓN: pega la dirección de cripto para analizarla",
    detail:
      "Las campañas de donación en cripto son un blanco frecuente de estafa tras un desastre, sobre todo dirigidas a la diáspora. No envíes fondos solo porque un mensaje lo pida.",
    advice:
      "Pega aquí la dirección de la wallet (Solana, USDT…) y la analizamos en cadena antes de que dones. Dona solo por canales oficiales verificados.",
    sources: [CRUZ],
  },
  {
    id: "ngo_impersonation_donations",
    status: "sin_confirmar",
    patterns: [
      /(cuenta|p[áa]gina|v[íi]a|grupo)\b.{0,15}oficial.{0,20}(donaci|ayuda|terremoto)/i,
      /(esta es la|[úu]nica)\b.{0,15}(cuenta|v[íi]a|cuenta oficial)/i,
    ],
    keywords: ["cuenta oficial", "donaciones", "única vía", "verificado", "diáspora"],
    title: "PRECAUCIÓN: verifica que una 'cuenta oficial' lo sea de verdad",
    detail:
      "En emergencias se multiplican cuentas y páginas que imitan a organizaciones reales (Cruz Roja, ONU, fundaciones) o se autoproclaman 'la cuenta oficial' para desviar donaciones. Que un mensaje diga 'oficial' o muestre logos no lo prueba.",
    advice:
      "Busca el canal de donación en el sitio web oficial de la organización, no por enlaces reenviados. Desconfía de cuentas nuevas o que presionan a donar ya.",
    sources: [CRUZ, PC],
  },
  {
    id: "fake_corpoelec_blackout",
    status: "falso",
    patterns: [
      /(corpoelec|apag[óo]n)\b.{0,30}(nacional|24 horas|programad\w*|por.{0,10}sismo|por.{0,10}terremoto)/i,
      /apag[óo]n nacional/i,
    ],
    keywords: ["corpoelec", "blackout", "corte de luz"],
    title: "FALSO: 'apagón nacional de 24 horas por el sismo'",
    detail:
      "Mensajes en TikTok y WhatsApp afirman que Corpoelec decretó un 'apagón nacional' de más de 24 horas por la actividad sísmica. Corpoelec no publicó ese anuncio en sus canales oficiales. Hubo cortes puntuales, pero no un apagón total programado a nivel nacional.",
    advice: "Verifica cualquier anuncio de apagón en los canales oficiales de Corpoelec. No reenvíes mensajes que generan compras de pánico.",
    sources: [FACTCHEQUEADO],
  },
  {
    id: "recycled_old_videos",
    status: "falso",
    patterns: [
      /(video|imagen|grabaci[óo]n)\b.{0,40}(turqu[íi]a|siria|2018|2023|2025|otro pa[íi]s|reciclad\w*|viejo|antiguo|fuera de contexto)/i,
      /(este video|esta imagen)\b.{0,30}(no es|es de otro|es viejo|es antiguo)/i,
    ],
    keywords: ["video viral", "turquía", "siria", "fuera de contexto", "reciclado"],
    title: "FALSO: videos viejos o de otros países presentados como Venezuela 2026",
    detail:
      "Varios videos virales atribuidos al terremoto de junio de 2026 en Venezuela son en realidad de otros eventos (Turquía-Siria 2023, Venezuela 2018, u otros). Una búsqueda inversa de los fotogramas lo confirma; se difunden para amplificar el miedo.",
    advice: "No reenvíes videos sin verificar. Antes de compartir, comprueba si el material es antiguo o de otro país. Confía solo en medios y autoridades reconocidas.",
    sources: [MALDITA],
  },
  {
    id: "ai_generated_images",
    status: "falso",
    patterns: [
      /(imagen|foto|video)\b.{0,30}(inteligencia artificial|generad\w+ con ia|hecha con ia|\bia\b|synthid|deepfake)/i,
      /(mujeres llorando|edificio derrumb\w+)\b.{0,25}(acarigua|terremoto|venezuela)/i,
    ],
    keywords: ["inteligencia artificial", "imagen generada", "synthid", "deepfake"],
    title: "FALSO: imágenes del terremoto creadas con inteligencia artificial",
    detail:
      "Circulan fotos muy impactantes (mujeres llorando entre escombros, un edificio derrumbándose en Acarigua) presentadas como del terremoto. Verificadores detectaron que son generadas con IA (detalles antinaturales y marcas digitales como SynthID). El terremoto fue real, pero esas imágenes no.",
    advice: "Desconfía de imágenes muy dramáticas que solo comparten cuentas anónimas. Si ningún medio reconocido la publicó, probablemente es falsa o hecha con IA. No la reenvíes.",
    sources: [INFOVERITAS],
  },
  {
    id: "tsunami_alert",
    status: "sin_confirmar",
    patterns: [
      /(alerta|viene|llega|vie ne)\b.{0,20}(tsunami|maremoto)/i,
      /(tsunami|maremoto)\b.{0,25}(la guaira|costa|venezuela|caribe|vargas)/i,
    ],
    keywords: ["tsunami", "maremoto", "ola gigante", "evacuación masiva"],
    title: "SIN CONFIRMAR: no difundas alertas de tsunami sin fuente oficial",
    detail:
      "Se viralizó un video de sirenas y olas como 'alerta de tsunami para La Guaira' que en realidad es del tsunami de Japón de 2011. Una alerta de tsunami solo es válida si proviene de Protección Civil o autoridades oficiales.",
    advice: "No reenvíes alertas de tsunami sin fuente oficial. Verifica con Protección Civil. Evacúa solo si hay una orden oficial; no actúes por un video en cadena.",
    sources: [PC, FACTCHEQUEADO],
  },
  {
    id: "water_contamination",
    status: "sin_confirmar",
    patterns: [
      /agua\b.{0,20}(contaminad\w*|envenenad\w*|no.{0,6}(beb|tom)\w*|peligros\w*)/i,
      /(no tomen|no beban)\b.{0,10}agua/i,
    ],
    keywords: ["agua", "contaminada", "envenenada", "grifo", "potable", "tubería"],
    title: "SIN CONFIRMAR: la seguridad del agua depende de tu zona",
    detail:
      "Tras un sismo las tuberías pueden dañarse y el agua puede no ser segura en algunas zonas, pero un mensaje general de 'el agua está contaminada' sin fuente oficial no es confiable y puede ser falso. Varía por localidad.",
    advice:
      "Confirma con tu hidrológica local o Protección Civil. Por precaución, si dudas, hierve el agua a borbotones 1 minuto (3 minutos en zonas altas de los Andes, sobre 2.000 m) o usa agua sellada antes de beber.",
    sources: [PC],
  },
  {
    id: "inflated_casualty_figures",
    status: "sin_confirmar",
    patterns: [
      /(muertos|fallecidos|desaparecidos|v[íi]ctimas|heridos)\b.{0,20}\d{3,}/i,
      /\d{3,}\b.{0,15}(muertos|fallecidos|desaparecidos|v[íi]ctimas)/i,
    ],
    keywords: ["muertos", "fallecidos", "desaparecidos", "cifra", "balance"],
    title: "SIN CONFIRMAR: cifras virales de víctimas",
    detail:
      "Circulan cifras muy dispares de víctimas, desde el balance oficial hasta webs anónimas que hablan de decenas de miles. Las cifras cambian hora a hora y las versiones extremas que se viralizan suelen venir de páginas no oficiales. Compartir números sin confirmar alimenta el caos.",
    advice: "No difundas cifras sin fuente. Guíate por Protección Civil, FUNVISIS y medios reconocidos; desconfía de webs anónimas con números alarmantes.",
    sources: [FUNVISIS, PC],
  },
  {
    id: "miracle_rescue_hoax",
    status: "sin_confirmar",
    patterns: [
      /(rescate|rescatad\w+|sacaron)\b.{0,25}(milagro|con vida|escombros|beb[ée])/i,
      /milagro\b.{0,20}(terremoto|escombros|rescate)/i,
    ],
    keywords: ["rescate milagroso", "milagro", "sobreviviente", "héroe"],
    title: "SIN CONFIRMAR: 'rescate milagroso' entre los escombros",
    detail:
      "Tras cada gran terremoto se viralizan 'rescates milagrosos' (un bebé sacado con vida días después) que a menudo son imágenes de otros desastres, fotos de IA o relatos sin verificar, hechos para ganar likes o difundir enlaces fraudulentos.",
    advice: "No reenvíes historias de rescates sin fuente oficial. Verifica con Protección Civil, bomberos o medios reconocidos. Las imágenes muy emotivas de cuentas anónimas suelen ser falsas.",
    sources: [MALDITA],
  },
];
