// Confía — SEO article content model + data.
// Articles authored + QA'd + fixed by the confia-seo-articles / confia-articles-fix workflows.

export interface ArticleSection { heading: string; paragraphs: string[] }
export interface ArticleFaq { q: string; a: string }
export interface ArticleSource { name: string; url?: string }
export interface Article {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  excerpt: string;
  readingMinutes: number;
  updatedAt: string;
  sections: ArticleSection[];
  faq: ArticleFaq[];
  sources: ArticleSource[];
  cta: string;
  related?: string[];
}

export const SITE_URL = process.env.CONFIA_PUBLIC_URL || "https://confia-rose.vercel.app";

export const ARTICLES: Article[] = [
  {
    "slug": "donar-venezuela-sin-estafas",
    "title": "Cómo donar a Venezuela tras el terremoto sin caer en estafas",
    "metaTitle": "Donar a Venezuela sin estafas | Guía verificada",
    "metaDescription": "Tras el terremoto del 24 de junio de 2026, aprende a donar seguro a Venezuela: elige ONG reales, detecta estafas y verifica antes de enviar tu dinero.",
    "keywords": [
      "como donar a Venezuela terremoto sin caer en estafas",
      "donaciones terremoto Venezuela seguras",
      "estafa donaciones terremoto Venezuela",
      "como saber si una donacion es real",
      "ONG verificadas terremoto Venezuela",
      "estafa familiar atrapado terremoto",
      "bono Patria falso WhatsApp estafa",
      "donar a cuenta institucional Venezuela",
      "como ayudar a Venezuela terremoto",
      "donar a la Cruz Roja Venezolana"
    ],
    "excerpt": "Una guía clara para donar a los afectados por el terremoto del 24 de junio de 2026 en Venezuela: cómo elegir organizaciones reales, reconocer las señales de estafa y verificar cualquier cuenta antes de enviar tu dinero.",
    "readingMinutes": 7,
    "sections": [
      {
        "heading": "El terremoto despertó la solidaridad… y también a los estafadores",
        "paragraphs": [
          "Tras el doblete sísmico del 24 de junio de 2026 en el norte de Venezuela, miles de personas dentro y fuera del país quieren ayudar de inmediato. Esa generosidad es justo lo que aprovechan los delincuentes: en cuestión de horas aparecieron campañas falsas, cuentas bancarias dudosas y direcciones de criptomonedas fraudulentas circulando por WhatsApp, Instagram, Facebook y X.",
          "Las asociaciones bancarias del país, como la Asociación Bancaria de Venezuela (ABV), han alertado sobre plataformas de recaudación de origen dudoso que se aprovechan de la emergencia. La buena noticia: con unos pocos reflejos de verificación puedes asegurarte de que tu dinero llegue a quien lo necesita.",
          "Esta guía no te va a decir a cuál cuenta enviar (desconfía de quien lo haga sin que tú lo compruebes). Te va a enseñar a verificar tú mismo, en segundos, antes de donar."
        ]
      },
      {
        "heading": "Cómo elegir una organización real para donar",
        "paragraphs": [
          "La regla de oro es donar solo a ONG legalmente registradas, fundaciones corporativas formales y organizaciones acreditadas, mediante transferencia a cuentas institucionales, nunca a cuentas personales de desconocidos.",
          "Empieza por instituciones con trayectoria y rendición de cuentas, como la Cruz Roja Venezolana (cruzroja.ve, @CruzRojaVe en redes), UNICEF o plataformas de donación que verifican antes a las ONG receptoras. Entra siempre escribiendo tú mismo la dirección oficial en el navegador o usando la app oficial, no por un enlace que te reenviaron.",
          "Antes de enviar nada, busca el nombre de la campaña junto a la palabra 'estafa' o 'fraude', revisa cuánto tiempo lleva activa la organización y confirma los datos de la cuenta directamente en su sitio web o en sus redes verificadas (con la marca de verificación), no en la imagen que llegó al grupo de WhatsApp.",
          "Si quieres aportar desde fuera del país, revisa nuestra guía sobre cómo [ayudar a Venezuela desde el exterior](/ayudar-venezuela-desde-el-exterior) con canales seguros."
        ]
      },
      {
        "heading": "Señales de alarma: cómo reconocer una estafa de donación",
        "paragraphs": [
          "La urgencia extrema es la principal bandera roja. Las autoridades de consumo internacionales (FTC, FBI) coinciden: desconfía si te presionan para pagar ya mismo y, sobre todo, si te exigen un método de pago concreto como criptomonedas, tarjetas de regalo (gift cards), transferencia inmediata o efectivo. Esa exigencia de método es en sí misma una señal de fraude.",
          "Otra táctica común es el reciclaje de imágenes: muchas campañas falsas usan fotos y videos de otros países o de sismos anteriores (por ejemplo, imágenes del terremoto de Turquía y Siria de 2023 o del sismo de Venezuela de 2018) presentándolos como del terremoto actual para dar credibilidad. Una búsqueda inversa de imágenes suele desenmascararlas.",
          "Cuidado también con las estafas que usan supuestos bonos del Sistema Patria y que llegan por WhatsApp con nombres llamativos como 'bono de ayuda' o 'gran misión solidaria': piden tus datos o un pago para 'desbloquear' un bono que no existe en el calendario oficial. No abras el enlace ni registres tu información."
        ]
      },
      {
        "heading": "Por qué nunca debes donar a una cuenta personal que llega por mensaje",
        "paragraphs": [
          "Una cuenta personal o un número de Pago Móvil que aparece en una imagen reenviada no tiene ningún respaldo institucional: si es un fraude, no hay a quién reclamar y el dinero rara vez se recupera. Por eso la recomendación es donar a cuentas institucionales de organizaciones formales, no a personas que no conoces.",
          "Ten especial cuidado con la estafa del 'familiar atrapado'. Delincuentes escriben por WhatsApp o SMS haciéndose pasar por un pariente herido o atrapado bajo los escombros y exigen dinero urgente, apuntando sobre todo a la diáspora. Antes de enviar un solo bolívar o euro, verifica con una llamada de voz real a esa persona o a otro familiar.",
          "Y recuerda: tu banco nunca te pedirá contraseñas, usuarios ni códigos OTP por teléfono, redes sociales o apps de mensajería. Si alguien te los pide 'para procesar tu donación', es una estafa."
        ]
      },
      {
        "heading": "Donar en criptomonedas: hazlo, pero verifica primero",
        "paragraphs": [
          "Las criptomonedas permiten ayudar rápido desde el exterior, pero las transacciones son irreversibles: si envías a la dirección equivocada, no hay vuelta atrás. Por eso, antes de mover un solo dólar, confirma la dirección en el canal oficial verificado de la organización y compárala carácter por carácter, no solo el inicio y el final.",
          "Existen ataques diseñados justo para este momento de solidaridad, como el envenenamiento de direcciones, que busca que copies y pegues una wallet falsa parecida a la real. Si vas a donar en cripto, lee primero nuestra guía detallada sobre [cómo verificar una wallet de donación y evitar estafas cripto](/estafas-cripto-donacion-verificar-wallet).",
          "Como regla rápida: nunca copies una dirección desde tu historial de transacciones ni desde un chat reenviado, y desconfía de una billetera 'oficial' recién creada y sin historial."
        ]
      },
      {
        "heading": "Verifica antes de donar: tu reflejo de seguridad en segundos",
        "paragraphs": [
          "Convierte la verificación en un hábito: antes de enviar dinero o de reenviar una campaña, detente y compruébalo. Confirma la organización en su sitio oficial, revisa la cuenta y desconfía de cualquier mensaje que te apure.",
          "Aquí es donde Confía te ayuda. Puedes pegar el rumor o la cadena que te llegó para saber si es VERIFICADO, FALSO o SIN CONFIRMAR, y puedes pegar una dirección de criptomonedas para analizarla on-chain y detectar señales de estafa antes de enviar tu dinero.",
          "Donar está bien; donar verificado está mejor. Un minuto de comprobación protege tu dinero y asegura que la ayuda llegue de verdad a los afectados."
        ]
      }
    ],
    "faq": [
      {
        "q": "¿Cómo puedo donar a las víctimas del terremoto de Venezuela sin que me estafen?",
        "a": "Dona solo a ONG legalmente registradas y organizaciones acreditadas (como la Cruz Roja Venezolana o UNICEF) a través de sus cuentas institucionales, nunca a cuentas personales que te llegan por mensaje. Entra siempre escribiendo tú mismo la dirección oficial en el navegador y verifica los datos antes de enviar. Ante la duda, comprueba la campaña en Confía."
      },
      {
        "q": "¿A qué organizaciones confiables puedo donar para ayudar tras el terremoto?",
        "a": "Prioriza instituciones con trayectoria y rendición de cuentas. La Cruz Roja Venezolana (cruzroja.ve, @CruzRojaVe) y agencias internacionales como UNICEF son puntos de partida sólidos. Confirma siempre los datos de la cuenta en el sitio oficial o en las redes verificadas de la organización, no en una imagen reenviada."
      },
      {
        "q": "¿Qué hago si me escribe un 'familiar atrapado' pidiendo dinero urgente?",
        "a": "Es un patrón de estafa documentado tras el terremoto, dirigido sobre todo a la diáspora. No transfieras nada de inmediato: verifica con una llamada de voz real a esa persona o a otro familiar. Los estafadores se aprovechan de la angustia para presionar pagos rápidos."
      },
      {
        "q": "¿El bono del Sistema Patria que me llegó por WhatsApp es real?",
        "a": "Desconfía. Circulan supuestos bonos con nombres llamativos que no existen en el calendario oficial y que piden tus datos o un pago para 'desbloquearlos'. No abras el enlace ni registres tu información; confirma siempre en los canales oficiales y, si dudas, verifica el mensaje en Confía."
      },
      {
        "q": "¿Puedo ayudar a Venezuela si estoy fuera del país?",
        "a": "Sí. Puedes donar desde el exterior a través de organizaciones internacionales o plataformas que verifican a las ONG receptoras, y aplicando las mismas reglas: cuentas institucionales y verificación previa. Revisa nuestra guía sobre cómo ayudar a Venezuela desde el exterior para conocer canales seguros."
      }
    ],
    "sources": [
      {
        "name": "Cruz Roja Venezolana",
        "url": "https://cruzroja.ve"
      },
      {
        "name": "Factchequeado — Verificación de desinformación",
        "url": "https://factchequeado.com"
      },
      {
        "name": "Maldita.es — Verificación de bulos",
        "url": "https://maldita.es"
      },
      {
        "name": "FTC — Cómo donar con seguridad tras un desastre",
        "url": "https://consumer.ftc.gov"
      },
      {
        "name": "FBI — Charity and Disaster Fraud",
        "url": "https://www.fbi.gov"
      },
      {
        "name": "Ledger Academy — Address Poisoning Attacks",
        "url": "https://www.ledger.com"
      },
      {
        "name": "TRONSCAN — Explorador de la blockchain TRON",
        "url": "https://tronscan.org"
      }
    ],
    "cta": "Antes de donar a una cuenta o de reenviar una campaña, verifícala en Confía: pega el mensaje o la dirección de criptomonedas en https://confia-rose.vercel.app y comprueba en segundos si es real o una estafa.",
    "related": [
      "estafas-cripto-donacion-verificar-wallet",
      "ayudar-venezuela-desde-el-exterior",
      "canales-oficiales-emergencia-venezuela"
    ],
    "updatedAt": "2026-06-27T00:00:00.000Z"
  },
  {
    "slug": "estafas-cripto-donacion-verificar-wallet",
    "title": "Estafas de donación en cripto tras el terremoto: cómo verificar una wallet antes de enviar tu dinero",
    "metaTitle": "Estafas cripto terremoto: verifica la wallet antes de donar",
    "metaDescription": "Tras el terremoto en Venezuela circulan wallets falsas y donaciones fraudulentas. Aprende a verificar una dirección USDT on-chain antes de donar.",
    "keywords": [
      "estafa donaciones terremoto Venezuela",
      "como verificar wallet cripto donacion",
      "estafa USDT donacion Venezuela",
      "address poisoning que es",
      "verificar direccion USDT TRC20 tronscan",
      "donar cripto Venezuela seguro",
      "como saber si una donacion es real",
      "direcciones gemelas cripto",
      "wallet falsa donacion terremoto",
      "verificar wallet antes de donar"
    ],
    "excerpt": "Después del terremoto del 24 de junio de 2026 se multiplicaron las wallets falsas y las campañas de donación fraudulentas. Te explicamos los patrones de estafa y cómo revisar una dirección de cripto on-chain antes de enviar un solo dólar.",
    "readingMinutes": 7,
    "sections": [
      {
        "heading": "Por qué las donaciones en cripto son un imán para estafadores",
        "paragraphs": [
          "Tras el terremoto del 24 de junio de 2026 en el norte de Venezuela, miles de personas dentro y fuera del país quisieron ayudar de inmediato. Esa urgencia y esa buena fe son, justamente, lo que aprovechan los estafadores: al calor de cada emergencia aparecen plataformas de recaudación de origen dudoso y campañas improvisadas que se presentan como oficiales sin serlo.",
          "La cripto agrava el problema por una razón técnica: las transacciones son irreversibles. Si envías USDT o Bitcoin a la dirección equivocada, no hay banco que reverse la operación ni botón de \"deshacer\". Por eso, donar en cripto exige un paso extra que mucha gente se salta: verificar la dirección antes de enviar.",
          "Donar es un acto noble. La idea de este artículo no es asustarte para que no ayudes, sino que ayudes con seguridad: aprender a reconocer las señales de fraude y a revisar una wallet por tu cuenta en pocos minutos."
        ]
      },
      {
        "heading": "Patrones de estafa que circulan tras el terremoto",
        "paragraphs": [
          "Wallet nueva y sin historial: una billetera presentada como \"oficial\" de una campaña pero creada hace pocas horas y sin movimientos previos es una señal de alarma. Las organizaciones serias suelen tener direcciones con historial verificable.",
          "Falsos \"oficiales\": perfiles en Instagram, Facebook, X o cadenas de WhatsApp que se hacen pasar por una ONG, una fundación o incluso por un familiar (\"mi hijo está atrapado bajo los escombros, manda dinero ya\"). El apuro emocional es la herramienta principal de presión. Verifica siempre con una llamada de voz real antes de transferir.",
          "Drenaje y reciclaje: algunas campañas usan fotos y videos de otras catástrofes o de sismos anteriores —como el terremoto de Turquía y Siria de 2023 o imágenes de Venezuela de 2018— para dar credibilidad, recaudan rápido y vacían la wallet antes de que nadie reaccione. Si te exigen pagar solo por cripto, gift cards o transferencia inmediata, eso en sí mismo ya es una señal de fraude, según la FTC y el FBI."
        ]
      },
      {
        "heading": "Direcciones gemelas y \"address poisoning\": la trampa del copiar y pegar",
        "paragraphs": [
          "El envenenamiento de direcciones (address poisoning) es una de las estafas más sutiles. El atacante genera una wallet cuyos primeros y últimos caracteres son idénticos a los de una dirección legítima, y luego te envía un monto mínimo (\"dust\") para que esa dirección falsa aparezca en tu historial de transacciones.",
          "La trampa funciona así: la próxima vez que vayas a donar, copias la dirección desde tu historial reciente sin fijarte en el medio, y los fondos terminan en la wallet del estafador. Con esta técnica se han perdido grandes sumas en minutos, porque al confirmar la transacción ya no hay vuelta atrás.",
          "La defensa es simple pero estricta: nunca copies una dirección desde el historial de transacciones ni desde un chat reenviado. Verifica carácter por carácter, no solo el inicio y el final, y confirma la dirección únicamente en el canal oficial verificado de la organización."
        ]
      },
      {
        "heading": "USDT no es una sola cosa: cuidado con la red",
        "paragraphs": [
          "Un error común que los estafadores explotan es la confusión entre redes. El USDT (Tether) existe en varias blockchains: TRON (TRC-20), Ethereum (ERC-20), BNB Smart Chain (BEP-20) y otras. Una misma organización puede tener direcciones distintas para cada red.",
          "Si envías USDT por una red distinta a la que espera el receptor, o a una dirección que no corresponde a esa red, puedes perder los fondos. Antes de donar, confirma tres cosas: la dirección exacta, la red correcta y el activo correcto.",
          "En Venezuela, la red más usada para donaciones en USDT suele ser TRON (TRC-20) por sus comisiones bajas, pero no lo des por sentado: verifica siempre qué red indica la organización en su canal oficial."
        ]
      },
      {
        "heading": "Cómo revisar una dirección on-chain paso a paso",
        "paragraphs": [
          "Lo bueno de la blockchain es que es pública: cualquiera puede inspeccionar una dirección. Para wallets en la red TRON (USDT TRC-20), usa el explorador oficial tronscan.org; para Ethereum existe etherscan.io. Pega la dirección en el buscador del explorador.",
          "Revisa estas señales: la antigüedad de la wallet (¿se creó hace años o hace horas?), el historial de transacciones (¿tiene movimientos coherentes con una organización real?), el saldo y, si aplica, si el contrato está verificado. Una billetera \"oficial\" recién creada, sin historial y que ya recibe transferencias urgentes, es motivo para frenar.",
          "Estos pasos no garantizan certeza total, pero combinados con la verificación carácter por carácter y la confirmación en el canal oficial, reducen muchísimo el riesgo de caer en una dirección suplantada."
        ]
      },
      {
        "heading": "Reglas de oro antes de donar",
        "paragraphs": [
          "Dona solo a organizaciones legalmente registradas y acreditadas, como la Cruz Roja Venezolana (cruzroja.ve, @CruzRojaVe), UNICEF u otras con presencia comprobable, y confirma sus datos en sus sitios y redes oficiales, nunca a través de un enlace que te reenviaron.",
          "Desconfía de la urgencia. Ningún pedido legítimo te obliga a transferir en segundos. Tu banco, además, nunca te pedirá contraseñas, usuarios ni códigos OTP por teléfono, redes o mensajería.",
          "Para datos del terremoto y canales de ayuda, consulta fuentes oficiales como FUNVISIS (funvisis.gob.ve, @SomosFunvisis) y Protección Civil (@PCivil_Ve). No tomes cifras ni \"cuentas para donar\" de cadenas de WhatsApp como confirmadas."
        ]
      },
      {
        "heading": "Verifica la wallet en Confía antes de mandar un solo dólar",
        "paragraphs": [
          "Toda esta verificación puede sentirse técnica cuando estás apurado por ayudar. Por eso existe Confía: pegas la dirección de cripto que te pasaron y la analizamos on-chain por ti, para detectar señales de wallet nueva, patrones de drenaje o direcciones sospechosas.",
          "Confía también verifica rumores y mensajes reenviados (VERIFICADO / FALSO / SIN CONFIRMAR), justo el vector de las campañas falsas y los supuestos bonos de ayuda con nombres llamativos que circulan tras el terremoto. Es el segundo de chequeo que te puede ahorrar una pérdida irreversible.",
          "Antes de reenviar una campaña o donar a cualquier wallet, verifícala. Donar bien empieza por verificar."
        ]
      }
    ],
    "faq": [
      {
        "q": "¿Cómo verifico si una wallet de donación en cripto es real o falsa?",
        "a": "Pega la dirección en un explorador oficial de la blockchain (tronscan.org para TRON/USDT TRC-20, etherscan.io para Ethereum) y revisa su antigüedad, historial y saldo. Confirma la dirección carácter por carácter contra el canal oficial de la organización, nunca contra un mensaje reenviado. También puedes pegarla en Confía para un análisis on-chain rápido."
      },
      {
        "q": "¿Qué es el address poisoning y cómo lo evito al donar USDT?",
        "a": "Es una estafa en la que el atacante crea una dirección con los mismos primeros y últimos caracteres que una legítima y te envía un monto mínimo para que aparezca en tu historial. Si copias desde el historial, mandas los fondos a la wallet falsa. Evítalo no copiando nunca direcciones del historial ni de chats, y verificando carácter por carácter."
      },
      {
        "q": "¿Por qué importa la red (TRC-20, ERC-20, BEP-20) cuando dono USDT?",
        "a": "El USDT existe en varias redes y una organización puede tener una dirección distinta para cada una. Si envías por la red equivocada, o a una dirección que no corresponde a esa red, puedes perder los fondos. Antes de donar confirma la dirección, la red y el activo exactos con la organización."
      },
      {
        "q": "¿Puedo recuperar mi dinero si envío cripto a una dirección equivocada o falsa?",
        "a": "No. Las transacciones en cripto son irreversibles: una vez confirmadas no hay banco ni soporte que las deshaga. Por eso la única protección real es verificar la dirección y la red antes de enviar, no después."
      },
      {
        "q": "¿Qué señales en un explorador on-chain indican que una wallet de campaña es sospechosa?",
        "a": "Que la billetera se haya creado hace pocas horas, que no tenga historial coherente con una organización real y que ya esté recibiendo transferencias urgentes. Una wallet \"oficial\" sin antigüedad ni movimientos previos es motivo para frenar y confirmar por el canal oficial."
      }
    ],
    "sources": [
      {
        "name": "TRONSCAN - Explorador oficial de la blockchain TRON",
        "url": "https://tronscan.org"
      },
      {
        "name": "Ledger Academy - Address Poisoning Attacks",
        "url": "https://www.ledger.com/academy"
      },
      {
        "name": "FTC - Cómo donar sabiamente tras un desastre",
        "url": "https://consumer.ftc.gov"
      },
      {
        "name": "FBI - Charity and Disaster Fraud",
        "url": "https://www.fbi.gov"
      },
      {
        "name": "FUNVISIS - Fundación Venezolana de Investigaciones Sismológicas",
        "url": "https://www.funvisis.gob.ve"
      },
      {
        "name": "Cruz Roja Venezolana",
        "url": "https://cruzroja.ve"
      }
    ],
    "cta": "Antes de donar a cualquier wallet o reenviar una campaña, pega la dirección en Confía y verifica si es real en segundos: https://confia-rose.vercel.app",
    "related": [
      "donar-venezuela-sin-estafas",
      "ayudar-venezuela-desde-el-exterior",
      "bulos-terremoto-venezuela-como-detectarlos"
    ],
    "updatedAt": "2026-06-27T00:00:00.000Z"
  },
  {
    "slug": "predecir-terremotos-replicas-mitos",
    "title": "¿Se pueden predecir los terremotos y las réplicas? Mitos vs. ciencia",
    "metaTitle": "¿Se pueden predecir los terremotos? Mitos y ciencia",
    "metaDescription": "Tras el sismo del 24 de junio en Venezuela circulan mensajes que anuncian otra réplica a tal hora. La ciencia dice que es imposible: te explicamos por qué.",
    "keywords": [
      "se pueden predecir los terremotos",
      "réplicas de un terremoto cuánto duran",
      "es verdad que viene otro terremoto en Venezuela",
      "réplicas terremoto Venezuela hoy",
      "terremoto Venezuela 24 junio",
      "FUNVISIS sismos hoy Venezuela",
      "viene una réplica magnitud",
      "predecir terremotos mitos",
      "pronóstico de réplicas USGS",
      "verificar cadena de WhatsApp terremoto",
      "alerta temprana terremoto",
      "noticias falsas terremoto Venezuela"
    ],
    "excerpt": "Después del doblete sísmico del 24 de junio en Venezuela, se viralizaron mensajes que \"predicen\" una nueva réplica de magnitud exacta a una hora exacta. Según el USGS y FUNVISIS, eso es científicamente imposible: aquí te explicamos la diferencia entre predecir, pronosticar y alertar.",
    "readingMinutes": 7,
    "sections": [
      {
        "heading": "\"Viene una réplica de magnitud 7 a las 9 de la noche\": por qué eso es falso",
        "paragraphs": [
          "Tras los sismos del 24 de junio de 2026 en el norte de Venezuela, los chats de WhatsApp se llenaron de mensajes alarmantes: \"alerta, viene otro terremoto más fuerte esta madrugada\", \"FUNVISIS confirma réplica de magnitud X a tal hora\". Suenan oficiales, dan miedo y se reenvían en segundos.",
          "La verdad científica es contundente: nadie puede decir con anticipación la fecha, la hora, el lugar y la magnitud exactas de un sismo o de una réplica. Si un mensaje afirma eso, es falso, sin importar de quién diga venir.",
          "Entender por qué es imposible te da una herramienta poderosa: la próxima vez que recibas uno de esos mensajes, sabrás que no hay que reenviarlo."
        ]
      },
      {
        "heading": "Los terremotos NO se pueden predecir",
        "paragraphs": [
          "El Servicio Geológico de Estados Unidos (USGS) lo dice de forma directa: ni el USGS ni ningún otro científico ha predicho jamás un gran terremoto, y no esperan poder hacerlo en el futuro previsible. La sismología no tiene forma de anunciar un sismo específico antes de que ocurra.",
          "Una predicción real tendría que decir tres cosas a la vez: cuándo, dónde y de qué magnitud. Hoy la ciencia no puede acertar esas tres variables con la precisión de una fecha y una hora. Lo que sí se puede calcular son probabilidades a largo plazo sobre zonas de riesgo, no avisos para un día concreto.",
          "Por eso, cualquier mensaje que ponga fecha y hora a un próximo terremoto en Venezuela —o en cualquier parte del mundo— contradice lo que dicen FUNVISIS y el USGS."
        ]
      },
      {
        "heading": "Predecir, pronosticar y alertar: tres cosas distintas",
        "paragraphs": [
          "Gran parte de la confusión nace de mezclar tres conceptos que el USGS distingue con claridad:",
          "Predicción: decir cuándo, dónde y qué magnitud tendrá un sismo concreto. Esto es lo imposible hoy. Pronóstico (o probabilidad): estimar, como el clima, qué tan probable es que haya cierta actividad sísmica en una ventana de tiempo y una región. No dice la hora exacta. Alerta temprana: una vez que el sismo YA empezó, sistemas como el de Alertas de Terremotos de Android pueden avisar segundos antes de que lleguen las ondas más fuertes, porque la señal viaja por internet más rápido que la sacudida.",
          "Confundir un pronóstico probabilístico con una predicción exacta es justo lo que aprovechan los rumores virales para sonar creíbles."
        ]
      },
      {
        "heading": "Las réplicas SÍ se pronostican, pero NO se predicen",
        "paragraphs": [
          "Aquí está el matiz que más se manipula. Después de un sismo grande, el USGS publica pronósticos de réplicas para eventos de magnitud mayor a 5: estiman, con base en modelos estadísticos, cuántas réplicas son probables y con qué rango de magnitud en los próximos días o semanas.",
          "Pero eso es una probabilidad, no una agenda. El pronóstico puede decir \"es probable que haya réplicas en las próximas semanas\", nunca \"habrá una réplica de magnitud 6,8 mañana a las 3:15 p.m.\". El modelo estadístico de referencia del USGS (Reasenberg-Jones) se calibró con datos de California y entrega estimaciones, no garantías.",
          "Así que si un mensaje te da una hora puntual para una réplica, ya sabes: confunde —a propósito o por error— pronóstico con predicción."
        ]
      },
      {
        "heading": "¿Cuánto duran las réplicas? Lo que sí sabemos",
        "paragraphs": [
          "Las réplicas son completamente normales después de un sismo fuerte. El USGS y la Cruz Roja explican que suelen ser más débiles que el evento principal, más frecuentes en las primeras horas y días, y que van disminuyendo con el tiempo. Pueden prolongarse durante semanas o meses.",
          "FUNVISIS registró muchas réplicas tras los sismos principales del 24 de junio. Que sigan ocurriendo réplicas no significa que \"viene una peor\": significa que la corteza terrestre se está reacomodando, algo esperado. Para conocer la magnitud y el conteo confirmados, la referencia es FUNVISIS, no las cadenas de WhatsApp.",
          "Por eso la recomendación práctica no es esperar un \"aviso\": es mantenerse alejado de estructuras dañadas, porque una réplica puede derrumbar lo que ya quedó debilitado."
        ]
      },
      {
        "heading": "Cómo reconocer un mensaje falso sobre el \"próximo terremoto\"",
        "paragraphs": [
          "Hay señales que delatan estos bulos casi siempre: dan fecha y hora exactas (\"esta noche a las 2 a.m.\"), atribuyen el aviso a la NASA, a FUNVISIS o a un \"experto\" sin enlace verificable, usan urgencia emocional (\"reenvía para salvar vidas\") y nunca citan una fuente oficial que puedas abrir.",
          "Qué hacer en su lugar: no reenviarlo, y consultar las fuentes reales. En Venezuela, el organismo sismológico oficial es FUNVISIS (funvisis.gob.ve); para sismos a nivel mundial está el USGS; para riesgo de tsunami en zonas costeras, tsunami.gov, que muestra si hay alguna alerta vigente.",
          "Recuerda: ningún canal oficial serio anuncia un terremoto con hora exacta, porque la ciencia no lo permite. Si lo viste en una cadena, casi con certeza es falso."
        ]
      },
      {
        "heading": "Antes de reenviar ese mensaje, verifícalo",
        "paragraphs": [
          "Los rumores de \"viene otra réplica\" hacen daño real: generan pánico, saturan las líneas de emergencia y distraen de la información que sí salva vidas. El reflejo más útil que puedes adoptar es sencillo: dudar antes de reenviar.",
          "Si te llegó un mensaje que anuncia un nuevo sismo, una alerta de tsunami o una campaña de donación, no lo des por cierto por venir de alguien conocido. Verifícalo primero.",
          "Para eso existe Confía: pegas el mensaje que te reenviaron y te dice si es VERIFICADO, FALSO o SIN CONFIRMAR, y también analiza direcciones de criptomonedas para donaciones y detectar estafas."
        ]
      }
    ],
    "faq": [
      {
        "q": "¿La ciencia puede predecir un terremoto antes de que ocurra?",
        "a": "No. El USGS afirma que ni él ni ningún científico ha predicho jamás un gran terremoto, y no esperan poder hacerlo en el futuro previsible. Cualquier mensaje que ponga fecha, hora y magnitud a un sismo es falso. Consulta FUNVISIS (funvisis.gob.ve) para información real."
      },
      {
        "q": "¿Cuál es la diferencia entre predecir, pronosticar y alertar un sismo?",
        "a": "Predecir es decir cuándo, dónde y con qué magnitud temblará: hoy es imposible. Pronosticar es estimar, como el clima, qué tan probable es la actividad sísmica en una ventana de tiempo. Alertar es avisar cuando el sismo YA empezó, segundos antes de que lleguen las ondas más fuertes."
      },
      {
        "q": "¿Por qué las réplicas se pronostican pero no se predicen?",
        "a": "Porque la ciencia solo puede pronosticar réplicas de forma estadística (qué tan probables son en una ventana de tiempo), no predecirlas con hora y magnitud exactas. El USGS emite pronósticos probabilísticos para sismos mayores a magnitud 5, pero son estimaciones, no agendas."
      },
      {
        "q": "¿Sirven los animales, el clima o la Luna para anunciar un terremoto?",
        "a": "No. No existe evidencia científica de que los animales, el clima, la Luna o las llamadas \"luces de terremoto\" permitan anunciar un sismo con antelación. El USGS lo descarta: no hay ningún patrón confiable que diga cuándo, dónde y con qué magnitud va a temblar."
      },
      {
        "q": "¿Es verdad el mensaje que dice que viene otro terremoto a tal hora?",
        "a": "Casi con seguridad es falso. Ningún organismo científico anuncia terremotos con fecha y hora exactas porque es imposible. Si te llegó por WhatsApp, no lo reenvíes y verifícalo en Confía antes de compartirlo."
      }
    ],
    "sources": [
      {
        "name": "USGS — Ciencia de la predicción de sismos y pronóstico de réplicas",
        "url": "https://www.usgs.gov"
      },
      {
        "name": "FUNVISIS — Fundación Venezolana de Investigaciones Sismológicas",
        "url": "https://www.funvisis.gob.ve"
      },
      {
        "name": "Cruz Roja Venezolana",
        "url": "https://cruzroja.ve"
      },
      {
        "name": "Sistema de Alerta de Tsunamis (NOAA) — tsunami.gov",
        "url": "https://www.tsunami.gov"
      }
    ],
    "cta": "Antes de reenviar ese mensaje que anuncia otro terremoto o una réplica a tal hora, verifícalo en Confía: https://confia-rose.vercel.app",
    "related": [
      "bulos-terremoto-venezuela-como-detectarlos",
      "que-hacer-replica-terremoto-seguridad",
      "canales-oficiales-emergencia-venezuela"
    ],
    "updatedAt": "2026-06-27T00:00:00.000Z"
  },
  {
    "slug": "que-hacer-replica-terremoto-seguridad",
    "title": "Qué hacer durante y después de una réplica: guía de seguridad para Venezuela",
    "metaTitle": "Qué hacer en una réplica: guía de seguridad",
    "metaDescription": "Tras el sismo del 24 de junio en Venezuela las réplicas siguen. Aprende qué hacer durante y después: agáchate-cúbrete-agárrate, gas, agua segura y kit.",
    "keywords": [
      "qué hacer durante un terremoto",
      "qué hacer después de un sismo",
      "réplicas de un terremoto cuánto duran",
      "agáchate cúbrete y agárrate",
      "réplicas terremoto Venezuela",
      "fuga de gas después de terremoto qué hacer",
      "agua segura después de un sismo",
      "es seguro volver a casa después de terremoto",
      "kit de emergencia sismo",
      "FUNVISIS recomendaciones sismo",
      "punto de encuentro familiar terremoto",
      "terremoto Venezuela 24 junio"
    ],
    "excerpt": "Después del terremoto del 24 de junio de 2026, las réplicas en el norte de Venezuela siguen. Esta guía práctica te explica qué hacer durante y después de un temblor: agáchate-cúbrete-agárrate, qué hacer si hueles gas, cómo conseguir agua segura, cuándo volver a un edificio dañado y qué llevar en tu kit de emergencia.",
    "readingMinutes": 7,
    "sections": [
      {
        "heading": "Las réplicas son normales: por qué siguen temblando",
        "paragraphs": [
          "Después de un sismo fuerte como el doblete del 24 de junio de 2026 en el norte de Venezuela, es completamente normal que la tierra siga moviéndose. Esos movimientos se llaman réplicas (aftershocks) y suelen ser más débiles que el sismo principal, aunque algunas pueden sentirse fuerte.",
          "Las réplicas son más frecuentes en las primeras horas y días, y van disminuyendo con el tiempo; pueden durar semanas o incluso meses. Tras los sismos principales se han registrado muchas réplicas, lo cual es esperable. No te alarmes por la cantidad: es el comportamiento normal de la corteza terrestre acomodándose. Para datos del evento, sigue a FUNVISIS (@SomosFunvisis).",
          "Algo clave: los terremotos y sus réplicas NO se pueden predecir. La ciencia puede pronosticar de forma estadística cuántas réplicas son probables, pero nadie puede decir la hora, el lugar ni la magnitud exacta del próximo temblor. Cualquier mensaje que 'anuncie' otro terremoto para una fecha y hora precisas es falso (USGS)."
        ]
      },
      {
        "heading": "Durante el temblor: agáchate, cúbrete y agárrate",
        "paragraphs": [
          "La recomendación internacional, respaldada por la Cruz Roja y FUNVISIS, es clara: AGÁCHATE, CÚBRETE y AGÁRRATE (Drop, Cover, Hold On). Bájate sobre tus manos y rodillas, protege la cabeza y el cuello, métete debajo de una mesa firme si la hay y sujétate hasta que pare el movimiento.",
          "No corras hacia la salida ni uses el ascensor durante el temblor: la mayoría de las lesiones ocurren al intentar moverse mientras el piso se sacude. Aléjate de ventanas, espejos y objetos que puedan caer.",
          "Si estás en cama, quédate ahí, enróllate y protege la cabeza con la almohada. Al aire libre, busca un lugar despejado lejos de edificios, postes, cables y árboles. Si vas manejando, detente en un sitio seguro lejos de puentes y cables, y permanece dentro del vehículo con el cinturón puesto (American Red Cross)."
        ]
      },
      {
        "heading": "Justo después: sal con calma y anticipa más réplicas",
        "paragraphs": [
          "Cuando pare el movimiento, respira y actúa con calma. Ponte calzado resistente: tras un sismo el piso suele estar lleno de vidrios rotos y escombros. Usa las escaleras, nunca el ascensor, y sal anticipando que puede venir otra réplica en cualquier momento.",
          "Mantente alejado de estructuras dañadas, fachadas agrietadas, balcones y muros. Las réplicas pueden derrumbar lo que ya quedó debilitado.",
          "Si estás en la costa y el sismo fue fuerte o largo, no esperes una alerta oficial: sube a un lugar alto o aléjate tierra adentro de inmediato. Para confirmar si hay un aviso de tsunami vigente, la fuente oficial es tsunami.gov; ten en cuenta que durante esta emergencia circularon falsas alertas con videos de otros países o de sismos anteriores."
        ]
      },
      {
        "heading": "Si hueles gas: ni una chispa",
        "paragraphs": [
          "Si hueles o sospechas una fuga de gas, no enciendas fósforos ni encendedores, no acciones interruptores de luz y no uses electrodomésticos. Una sola chispa puede provocar una explosión.",
          "Sal del lugar, llama a emergencias (911, y 171 como respaldo regional según tu zona) y reporta la fuga a la empresa de gas. Si hay daños, cierra las llaves de gas, agua y electricidad de tu vivienda.",
          "Antes de volver a usar luz o aparatos, espera a que personal capacitado confirme que es seguro. La prudencia aquí salva vidas (American Red Cross / CDC)."
        ]
      },
      {
        "heading": "Agua segura: no confíes en el grifo",
        "paragraphs": [
          "Después de un terremoto el suministro puede contaminarse por roturas en tuberías. Para beber, cocinar, lavar alimentos, cepillarte los dientes o preparar fórmula de bebé, usa solo agua embotellada, hervida o tratada.",
          "Sigue siempre los avisos de las autoridades locales sobre la potabilidad del agua en tu zona. Si tienes dudas, asume que no es segura hasta que lo confirmen.",
          "Tener algunos litros de agua almacenada de antemano marca la diferencia en las primeras horas, cuando los servicios pueden estar interrumpidos (CDC / American Red Cross)."
        ]
      },
      {
        "heading": "¿Es seguro volver a un edificio dañado?",
        "paragraphs": [
          "No entres a una edificación con daños hasta que las autoridades competentes digan que es seguro. Las réplicas pueden colapsar estructuras ya golpeadas por el sismo principal.",
          "Revisa si hay grietas en columnas, cimientos o muros de carga, inclinaciones o puertas que no cierran. Ante cualquier señal de daño estructural, reubícate en un lugar seguro o en un refugio y espera la evaluación de un profesional.",
          "Para información sobre albergues y puntos de atención, guíate únicamente por canales oficiales como Protección Civil (@PCivil_Ve), Bomberos (@DGNBEnLinea) y la Cruz Roja Venezolana (@CruzRojaVe). No te bases en listas que circulan por cadenas de WhatsApp, porque esa misma información falsa la usan los estafadores."
        ]
      },
      {
        "heading": "Kit de emergencia y reencuentro familiar",
        "paragraphs": [
          "FUNVISIS recomienda tener listo un kit de emergencia con: agua potable, comida no perecedera, linterna, radio a pilas, botiquín, tus medicamentos personales, pilas, cargador portátil, silbato y copias de documentos importantes.",
          "Para el reencuentro: acuerden de antemano un punto de encuentro y un contacto fuera de la zona afectada. Tras un sismo, los mensajes de texto suelen pasar mejor que las llamadas porque saturan menos la red. La Cruz Roja Venezolana ofrece servicios de Restablecimiento del Contacto entre Familiares.",
          "Cuidado con el fraude emocional: circularon mensajes de supuestos parientes 'atrapados bajo los escombros' pidiendo dinero urgente. Antes de transferir nada, confirma siempre con una llamada de voz directa al familiar."
        ]
      },
      {
        "heading": "Antes de reenviar o donar: verifica",
        "paragraphs": [
          "En medio de la emergencia se mueven muchísimos mensajes reenviados: supuestos avisos de 'otro terremoto', falsos apagones, imágenes hechas con inteligencia artificial, videos viejos de otros países o de sismos anteriores y campañas de donación fraudulentas con nombres llamativos como 'bono de ayuda'. Reenviar sin verificar puede sembrar pánico o ayudar a una estafa.",
          "Recuerda las dos reglas de oro: ningún mensaje puede predecir el próximo sismo, y ninguna dirección de criptomonedas o cuenta para donar debe usarse sin confirmarla en el canal oficial de la organización.",
          "Para cifras y reportes oficiales del evento, consulta a FUNVISIS, Protección Civil y la Cruz Roja Venezolana, no las cadenas de WhatsApp."
        ]
      }
    ],
    "faq": [
      {
        "q": "¿Cuánto duran las réplicas después de un terremoto fuerte?",
        "a": "Las réplicas son más frecuentes en las primeras horas y días y van disminuyendo con el tiempo, pero pueden continuar durante semanas o meses. Son más débiles que el sismo principal, aunque algunas pueden sentirse con fuerza. Es un comportamiento normal de la corteza terrestre (USGS)."
      },
      {
        "q": "¿Qué hago durante un sismo si estoy en casa, en la calle o manejando?",
        "a": "En casa: agáchate, cúbrete y agárrate, bajo una mesa firme, protegiendo cabeza y cuello. En la calle: busca un lugar despejado lejos de edificios, postes y cables. Manejando: detente en un sitio seguro lejos de puentes y cables y quédate dentro con el cinturón puesto (American Red Cross)."
      },
      {
        "q": "¿Qué hago si huelo gas después del sismo?",
        "a": "No enciendas fósforos ni encendedores, no acciones interruptores de luz ni uses electrodomésticos: una chispa puede causar una explosión. Sal del lugar, llama a emergencias (911) y reporta la fuga a la empresa de gas. Si hay daños, cierra las llaves de gas, agua y electricidad."
      },
      {
        "q": "¿Es seguro tomar agua del grifo después de un terremoto?",
        "a": "No lo asumas. El agua puede contaminarse por roturas en las tuberías. Usa solo agua embotellada, hervida o tratada para beber, cocinar y la higiene, y sigue los avisos de las autoridades locales (CDC / American Red Cross)."
      },
      {
        "q": "¿Cuándo puedo volver a entrar a mi casa después de un sismo?",
        "a": "Solo cuando las autoridades confirmen que el edificio es seguro. Las réplicas pueden derrumbar estructuras ya debilitadas. Revisa grietas en columnas y cimientos; ante cualquier daño estructural, reubícate en un lugar seguro o refugio."
      },
      {
        "q": "¿Qué debe llevar un kit de emergencia para sismos?",
        "a": "Agua potable, comida no perecedera, linterna, radio a pilas, botiquín, tus medicamentos personales, pilas, cargador portátil, silbato y copias de tus documentos. Acuerda además un punto de encuentro familiar y un contacto fuera de la zona afectada (FUNVISIS)."
      }
    ],
    "sources": [
      {
        "name": "American Red Cross - Earthquake Safety",
        "url": "https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/earthquake.html"
      },
      {
        "name": "American Red Cross - Drop, Cover and Hold On (Great ShakeOut)",
        "url": "https://www.shakeout.org/dropcoverholdon/"
      },
      {
        "name": "CDC - Safety Guidelines: After an Earthquake",
        "url": "https://www.cdc.gov/earthquakes/safety/stay-safe-after-an-earthquake.html"
      },
      {
        "name": "FUNVISIS",
        "url": "https://www.funvisis.gob.ve"
      },
      {
        "name": "USGS - Can you predict earthquakes?",
        "url": "https://www.usgs.gov"
      },
      {
        "name": "US Tsunami Warning System (NOAA)",
        "url": "https://www.tsunami.gov"
      },
      {
        "name": "Cruz Roja Venezolana",
        "url": "https://cruzroja.ve"
      }
    ],
    "cta": "Antes de reenviar un aviso de 'otro terremoto' o donar a cualquier cuenta o dirección de criptomonedas, verifícalo en Confía: https://confia-rose.vercel.app. Pega el mensaje o la wallet y descubre en segundos si es VERIFICADO, FALSO o SIN CONFIRMAR.",
    "related": [
      "predecir-terremotos-replicas-mitos",
      "canales-oficiales-emergencia-venezuela",
      "bulos-terremoto-venezuela-como-detectarlos"
    ],
    "updatedAt": "2026-06-27T00:00:00.000Z"
  },
  {
    "slug": "bulos-terremoto-venezuela-como-detectarlos",
    "title": "Bulos del terremoto de Venezuela: cómo detectar imágenes con IA, videos viejos y falsas alertas",
    "metaTitle": "Bulos del terremoto de Venezuela: cómo detectarlos",
    "metaDescription": "Tras el sismo del 24 de junio de 2026 circulan imágenes con IA, videos reciclados y falsas alertas. Aprende a detectar los bulos y verifícalos antes de reenviar.",
    "keywords": [
      "terremoto Venezuela bulos",
      "fake news terremoto Venezuela 2026",
      "imágenes falsas terremoto Venezuela",
      "video falso terremoto Venezuela",
      "alerta tsunami Venezuela verdad",
      "apagón CORPOELEC terremoto bulo",
      "cómo saber si una imagen es de inteligencia artificial",
      "verificar noticias terremoto Venezuela",
      "alerta Google terremoto Venezuela",
      "búsqueda inversa de imágenes terremoto",
      "cifras infladas terremoto Venezuela",
      "verificar cadena de WhatsApp terremoto"
    ],
    "excerpt": "Después del terremoto del 24 de junio de 2026 se llenaron los chats de imágenes con IA, videos de otros países y falsas alertas. Te enseñamos a reconocer los bulos más comunes y a verificar cualquier mensaje antes de reenviarlo.",
    "readingMinutes": 7,
    "sections": [
      {
        "heading": "Después del sismo llegó la avalancha de mensajes",
        "paragraphs": [
          "El 24 de junio de 2026, un fuerte movimiento sísmico sacudió el norte de Venezuela y se sintió en varios estados, en Caracas y hasta en países vecinos. En las horas siguientes hubo muchas réplicas, algo normal después de un sismo grande.",
          "En medio del miedo y la incertidumbre, los grupos de WhatsApp, Facebook, Instagram y X se llenaron de audios, fotos y videos. Muchos buscaban ayudar; otros, lamentablemente, buscaban engañar. Verificadores como Maldita.es, Factchequeado y Newtral documentaron decenas de bulos en cuestión de horas.",
          "Este artículo no inventa cifras ni nombra refugios sin fuente: para los datos del evento, la magnitud y los balances de víctimas, consulta siempre a FUNVISIS, al USGS y a Protección Civil. Lo que sí te damos aquí es algo concreto: cómo reconocer un bulo y qué hacer antes de reenviarlo."
        ]
      },
      {
        "heading": "Imágenes hechas con inteligencia artificial",
        "paragraphs": [
          "Uno de los bulos más comunes fue una imagen de un edificio colapsado generada con inteligencia artificial y presentada como si fuera un daño real del sismo. En cada catástrofe aparecen fotos así: impactantes, sin fuente y diseñadas para volverse virales.",
          "Para sospechar de una imagen con IA, fíjate en los detalles: manos o letreros deformes, texturas demasiado lisas, sombras que no cuadran, ventanas o escombros que se repiten de forma extraña. Hay herramientas que ayudan, como los detectores de contenido sintético (por ejemplo, Hive Moderation) o la marca de agua SynthID de Google, pero ninguna es infalible: úsalas como una señal más, no como prueba absoluta.",
          "Ante la duda, no la reenvíes. Una foto impactante que llega sin fuente, sin fecha y sin lugar verificable merece desconfianza, por muy real que parezca."
        ]
      },
      {
        "heading": "Videos viejos o de otros países, sacados de contexto",
        "paragraphs": [
          "El patrón más común no son imágenes inventadas, sino videos y fotos auténticos pero de otro lugar o de otra fecha. Los verificadores han mostrado, una y otra vez, cómo se recicla material de catástrofes pasadas y se presenta como si fuera de ahora.",
          "Dos clásicos que vuelven a circular en cada sismo grande: escenas del terremoto de Turquía y Siria de 2023 y videos del sismo que sacudió a Venezuela en 2018. Son grabaciones reales, pero no del 24 de junio de 2026.",
          "La mejor defensa es la búsqueda inversa de imágenes: toma una captura del video o de la foto y búscala en Google Imágenes, TinEye o Google Lens. Si aparece en notas de hace meses o años, ya tienes la respuesta."
        ]
      },
      {
        "heading": "La falsa alerta de tsunami",
        "paragraphs": [
          "Circuló una supuesta 'alerta de tsunami para La Guaira' acompañada de un video de sirenas y olas. Ese video era un bulo: las imágenes correspondían a un tsunami ocurrido en otro país, recicladas para asustar. La pieza mezclaba un hecho real (hubo un sismo) con material ajeno y un nivel de alarma exagerado.",
          "Si te preocupa un tsunami, no te guíes por cadenas de WhatsApp: la fuente oficial es el sistema de alertas de tsunamis de la NOAA (tsunami.gov). Si no hay marcadores activos en el mapa, no hay alerta vigente.",
          "Y recuerda la regla de oro de la costa: si estás cerca del mar y el sismo es fuerte o muy largo, no esperes ningún aviso oficial. Aléjate de inmediato hacia un lugar alto."
        ]
      },
      {
        "heading": "El falso apagón de CORPOELEC y las cifras infladas",
        "paragraphs": [
          "Otro bulo afirmaba que CORPOELEC había anunciado un 'apagón nacional de más de 24 horas'. La empresa eléctrica no emitió ese comunicado y los verificadores lo desmintieron. Cuidado con los supuestos comunicados oficiales que llegan como captura de pantalla, sin enlace a la fuente real.",
          "Con las cifras de víctimas pasa algo parecido. Los balances oficiales son provisionales y cambian rápido durante los primeros días, y distintas fuentes manejan números muy diferentes. Por eso, cualquier mensaje que afirme un número exacto y definitivo de fallecidos o desaparecidos debe tomarse con pinzas.",
          "La regla es simple: las cifras se consultan en los canales oficiales —FUNVISIS, USGS, Protección Civil y Cruz Roja Venezolana—, no en una cadena reenviada. Y desconfía de los 'rescates milagrosos' y de los anuncios de nuevos terremotos a hora exacta: los sismos no se pueden predecir."
        ]
      },
      {
        "heading": "La alerta de Google NO es un bulo",
        "paragraphs": [
          "Mucha gente se sorprendió al recibir una alerta de Google en su teléfono segundos antes de sentir el temblor, y algunos pensaron que era falsa. No lo es: se trata del Sistema Android de Alertas de Terremotos, una herramienta real que usa los sensores de millones de celulares para detectar el movimiento.",
          "Esa alerta puede llegar 'antes' del temblor porque viaja por internet, que es más rápido que las ondas sísmicas que se propagan por el suelo. Es una función legítima y útil, no desinformación.",
          "Mencionamos esto para que no caigas en el extremo contrario: no todo lo inusual es mentira. Por eso lo valioso no es desconfiar de todo, sino tener una forma rápida y confiable de verificar."
        ]
      },
      {
        "heading": "Antes de reenviar, verifícalo: tu checklist",
        "paragraphs": [
          "Hazte estas preguntas antes de tocar 'reenviar': ¿De dónde salió? ¿Tiene fecha y lugar verificables? ¿Te genera urgencia o miedo para que actúes rápido? ¿Te piden dinero, datos o que dones a una cuenta o wallet desconocida? La urgencia emocional es la herramienta favorita de los estafadores.",
          "Las estafas de donaciones se disparan tras un sismo: campañas falsas, cuentas fraudulentas, direcciones de criptomonedas suplantadas y la cruel estafa del 'familiar atrapado', en la que alguien se hace pasar por un pariente herido bajo los escombros para exigirte dinero. Verifica siempre con una llamada de voz real antes de enviar nada.",
          "No tienes que ser experto en verificación para protegerte y proteger a los tuyos. Si te llegó un mensaje, una imagen, una noticia o una dirección de donación y no sabes si es real, puedes verificarlo en segundos con Confía."
        ]
      }
    ],
    "faq": [
      {
        "q": "¿Son reales las imágenes del terremoto de Venezuela que circulan por WhatsApp?",
        "a": "Muchas no lo son. Se han confirmado imágenes generadas con inteligencia artificial y, sobre todo, videos y fotos auténticos pero de otros países o de fechas anteriores —por ejemplo, escenas del terremoto de Turquía y Siria de 2023 o del sismo de Venezuela en 2018— presentados como si fueran del 24 de junio de 2026. Antes de creer o reenviar, haz una búsqueda inversa de imágenes y verifica fecha y lugar."
      },
      {
        "q": "¿Hubo una alerta de tsunami en La Guaira por el terremoto?",
        "a": "El video viral de sirenas y olas atribuido a La Guaira era un bulo: las imágenes correspondían a un tsunami ocurrido en otro país y se reciclaron para asustar. Para saber si hay una alerta de tsunami vigente, consulta el sistema oficial de la NOAA en tsunami.gov; si no hay marcadores activos en el mapa, no hay alerta."
      },
      {
        "q": "¿CORPOELEC anunció un apagón nacional tras el terremoto?",
        "a": "No. El supuesto comunicado de un 'apagón de más de 24 horas' fue desmentido por los verificadores; CORPOELEC no emitió ese aviso. Desconfía de las capturas de pantalla de 'comunicados oficiales' que llegan sin un enlace a la fuente real."
      },
      {
        "q": "¿Por qué me llegó una alerta de Google antes del temblor?",
        "a": "No es un bulo. Es el Sistema Android de Alertas de Terremotos, que detecta el movimiento con los sensores de millones de teléfonos. Puede avisarte antes de que sientas el sismo porque la alerta viaja por internet, más rápido que las ondas sísmicas."
      },
      {
        "q": "¿Cómo distingo un bulo del terremoto de una noticia real?",
        "a": "Revisa el origen, la fecha y el lugar; haz una búsqueda inversa de imágenes y desconfía de cualquier mensaje que te apure o te pida dinero a cuentas o wallets desconocidas. Para cifras, magnitud y emergencias acude a FUNVISIS, USGS, Protección Civil y Cruz Roja Venezolana. Y si te queda la duda, pega el mensaje o la dirección de donación en el verificador de Confía para saber si es real."
      }
    ],
    "sources": [
      {
        "name": "Maldita.es — Verificación de bulos",
        "url": "https://maldita.es"
      },
      {
        "name": "Factchequeado — Desinformación y verificación",
        "url": "https://factchequeado.com"
      },
      {
        "name": "Newtral — Verificación de contenidos",
        "url": "https://www.newtral.es"
      },
      {
        "name": "FUNVISIS — Fundación Venezolana de Investigaciones Sismológicas",
        "url": "https://www.funvisis.gob.ve"
      },
      {
        "name": "USGS — Servicio Geológico de Estados Unidos",
        "url": "https://www.usgs.gov"
      },
      {
        "name": "Sistema de Alertas de Tsunamis (NOAA)",
        "url": "https://www.tsunami.gov"
      },
      {
        "name": "Cruz Roja Venezolana",
        "url": "https://cruzroja.ve"
      }
    ],
    "cta": "¿Te llegó una imagen, una noticia o una dirección de donación y no sabes si es real? No la reenvíes a ciegas: pégala en Confía y verifícala en segundos antes de compartir o donar. Verifica ahora en https://confia-rose.vercel.app",
    "related": [
      "predecir-terremotos-replicas-mitos",
      "donar-venezuela-sin-estafas",
      "canales-oficiales-emergencia-venezuela"
    ],
    "updatedAt": "2026-06-27T00:00:00.000Z"
  },
  {
    "slug": "canales-oficiales-emergencia-venezuela",
    "title": "Canales oficiales y números de emergencia en Venezuela tras el terremoto: directorio confiable",
    "metaTitle": "Números de emergencia Venezuela: 911, 171, FUNVISIS",
    "metaDescription": "Directorio confiable de canales oficiales tras el terremoto en Venezuela: 911, 171, FUNVISIS, Protección Civil, Cruz Roja y Bomberos. Qué hace cada uno.",
    "keywords": [
      "números de emergencia Venezuela",
      "911 171 Venezuela",
      "FUNVISIS sismos hoy",
      "canales oficiales terremoto Venezuela",
      "Protección Civil Venezuela",
      "Cruz Roja Venezolana donar",
      "Bomberos Venezuela emergencia",
      "terremoto Venezuela hoy",
      "réplicas terremoto Venezuela",
      "información oficial sismo Venezuela",
      "cuentas oficiales emergencia Venezuela",
      "qué hacer después de un terremoto"
    ],
    "excerpt": "Guía clara de a quién llamar y a quién consultar tras el terremoto en Venezuela: 911, 171, FUNVISIS, Protección Civil, Cruz Roja Venezolana y Bomberos, con qué hace cada uno, sus cuentas oficiales y cuándo usarlo.",
    "readingMinutes": 7,
    "sections": [
      {
        "heading": "Por qué necesitas un directorio confiable en plena emergencia",
        "paragraphs": [
          "Tras el terremoto en el norte de Venezuela, los teléfonos y los grupos de WhatsApp se llenaron de mensajes reenviados: supuestos números de rescate, cuentas para donar, avisos de réplicas y hasta falsas alertas de tsunami. En medio de la angustia, es fácil llamar al número equivocado o creer en una cadena.",
          "Por eso reunimos aquí los canales oficiales reales: a quién llamar para salvar una vida, a quién consultar para saber si la información es verdad y dónde verificar las cifras del sismo. Guarda esta página y compártela solo con datos confirmados.",
          "Regla base: para una emergencia que ocurre ahora, llama. Para entender qué pasó o qué viene (magnitud, réplicas, alertas), consulta a las instituciones científicas. Y antes de reenviar cualquier mensaje, verifícalo."
        ]
      },
      {
        "heading": "911 y 171: los números de emergencia para llamar ya",
        "paragraphs": [
          "El 911 es el número único de emergencias en Venezuela. El 171 funciona como respaldo en varias zonas, aunque su disponibilidad varía por región. Úsalos cuando haya una vida en riesgo: una persona atrapada bajo escombros, un herido grave, un incendio, una fuga de gas o un colapso inminente.",
          "Al llamar, mantén la calma y da datos concretos: qué pasó, cuántas personas están afectadas, la dirección exacta o puntos de referencia y si hay heridos, fuego o gas. No cuelgues hasta que el operador te lo indique.",
          "Importante: la disponibilidad de las líneas puede variar por zona y por la saturación de la red tras un sismo. Si una no responde, intenta la otra y, si conoces el número local de Bomberos o de Protección Civil de tu municipio, tenlo también a mano. Verifica siempre el número vigente con la autoridad de tu localidad."
        ]
      },
      {
        "heading": "FUNVISIS: la fuente científica del sismo y las réplicas",
        "paragraphs": [
          "FUNVISIS (Fundación Venezolana de Investigaciones Sismológicas) es el organismo oficial que monitorea la actividad sísmica del país. Es la referencia para saber la magnitud de un sismo, su epicentro, su profundidad y cuántas réplicas se han registrado.",
          "Tras un terremoto fuerte, las réplicas son normales: suelen ser más débiles, más frecuentes en las primeras horas y van disminuyendo con el tiempo, aunque pueden durar días o semanas. Se han registrado muchas réplicas, y eso es esperable. Lo que NINGUNA institución puede hacer es predecir la hora, el lugar y la magnitud exactos del próximo sismo. Cualquier mensaje que 'anuncie' otro terremoto para una fecha y hora precisas es falso (USGS).",
          "Consulta a FUNVISIS en funvisis.gob.ve y en su cuenta oficial @SomosFunvisis. Para el catálogo sísmico internacional puedes apoyarte en el USGS (usgs.gov). Si te llega una cifra de magnitud por cadena, contrástala con estas fuentes antes de darla por cierta."
        ]
      },
      {
        "heading": "Protección Civil: balances oficiales, refugios y coordinación",
        "paragraphs": [
          "Protección Civil coordina la respuesta ante desastres: evaluación de daños, evacuaciones, habilitación de refugios y los balances oficiales de víctimas y personas afectadas. Es la fuente a la que debes remitirte para las cifras del evento. Su cuenta oficial es @PCivil_Ve.",
          "Las cifras de fallecidos, heridos y desaparecidos cambian rápidamente durante los primeros días a medida que avanzan las labores de rescate. No tomes por definitivo un número que veas en redes: consulta el último balance oficial de Protección Civil y atribúyelo a esa fuente.",
          "Protección Civil también informa sobre los albergues y puntos de atención habilitados. Desconfía de listas de refugios o 'puntos de acopio' que circulan por WhatsApp sin respaldo oficial, porque son terreno fértil para estafas."
        ]
      },
      {
        "heading": "Cruz Roja Venezolana: atención humanitaria y reencuentro familiar",
        "paragraphs": [
          "La Cruz Roja Venezolana brinda primeros auxilios, atención médica y apoyo humanitario a las personas afectadas. También ofrece servicios de Restablecimiento del Contacto entre Familiares, clave cuando alguien quedó incomunicado tras el sismo. Su cuenta oficial es @CruzRojaVe.",
          "Si buscas a un familiar, prioriza los canales de la Cruz Roja y los oficiales. Tras un terremoto, los mensajes de texto suelen funcionar mejor que las llamadas porque saturan menos la red. Acuerden, si pueden, un punto de encuentro y un contacto fuera de la zona.",
          "Si quieres donar, hazlo a organizaciones legalmente registradas como la Cruz Roja a través de sus canales oficiales (cruzroja.ve), nunca a cuentas personales ni a direcciones que te llegaron reenviadas sin verificar."
        ]
      },
      {
        "heading": "Bomberos: rescate, incendios y fugas de gas",
        "paragraphs": [
          "El Cuerpo de Bomberos atiende incendios, rescates en estructuras colapsadas, fugas de gas y materiales peligrosos. En muchas zonas se contacta a través del 911 o del 171; la Dirección General Nacional de Bomberos (DGNB) informa además en su cuenta oficial @DGNBEnLinea. Si tienes el número directo de los Bomberos de tu municipio, guárdalo.",
          "Si hueles o sospechas una fuga de gas tras el sismo, no enciendas fósforos, encendedores ni interruptores de luz y no uses electrodomésticos: una chispa puede provocar una explosión. Sal del lugar, cierra la llave de gas si puedes hacerlo con seguridad y llama a emergencias.",
          "No entres a edificaciones con daños hasta que las autoridades confirmen que es seguro: las réplicas pueden derrumbar estructuras ya debilitadas."
        ]
      },
      {
        "heading": "Cómo usar cada canal: la regla rápida",
        "paragraphs": [
          "Emergencia que ocurre ahora (vida en riesgo, fuego, gas, persona atrapada): 911 o 171, y Bomberos (@DGNBEnLinea).",
          "Datos del sismo, magnitud y réplicas: FUNVISIS (@SomosFunvisis) y USGS. Balances oficiales de víctimas, refugios y evacuaciones: Protección Civil (@PCivil_Ve). Atención humanitaria y búsqueda de familiares: Cruz Roja Venezolana (@CruzRojaVe).",
          "Antes de reenviar un mensaje o donar a una cuenta: verifícalo. Un número de teléfono, una alerta o una dirección para donar que llega por cadena puede ser falsa. Confírmala en los canales oficiales y, si tienes dudas, pásala por un verificador antes de actuar."
        ]
      },
      {
        "heading": "Antes de compartir o donar: verifica lo que te llegó",
        "paragraphs": [
          "Después de cada desastre proliferan los rumores: imágenes hechas con inteligencia artificial, videos de otros países o de sismos anteriores presentados como del terremoto (se han reciclado, por ejemplo, escenas de Turquía-Siria 2023 o de Venezuela 2018), falsos comunicados de apagón y campañas de donación fraudulentas dirigidas sobre todo a la diáspora.",
          "Una práctica especialmente peligrosa es donar a direcciones de criptomonedas suplantadas: las transacciones son irreversibles y existen ataques como el 'address poisoning' que cambian la dirección a la que crees estar enviando. Verifica carácter por carácter y confírmala en el canal oficial de la organización.",
          "Confía te ayuda con eso: puedes pegar el mensaje reenviado para saber si es VERIFICADO, FALSO o SIN CONFIRMAR, y analizar una dirección de donación on-chain antes de enviar un solo bolívar o dólar. La regla es simple: antes de reenviar o donar, verifícalo."
        ]
      }
    ],
    "faq": [
      {
        "q": "¿A qué número llamo en una emergencia tras el terremoto en Venezuela?",
        "a": "Llama al 911, el número único de emergencias, cuando haya una vida en riesgo, un incendio, una fuga de gas o una persona atrapada. El 171 funciona como respaldo en algunas zonas, pero su disponibilidad varía por región. Si una línea no responde, intenta la otra y ten a mano el número local de Bomberos o de Protección Civil. Verifica el número vigente con la autoridad de tu localidad."
      },
      {
        "q": "¿Cuáles son las cuentas oficiales de las instituciones de emergencia en redes?",
        "a": "Las cuentas oficiales son: FUNVISIS @SomosFunvisis (funvisis.gob.ve), Protección Civil @PCivil_Ve, Bomberos (DGNB) @DGNBEnLinea y la Cruz Roja Venezolana @CruzRojaVe (cruzroja.ve). Desconfía de cuentas parecidas con errores de ortografía o sin verificación, y para una emergencia inmediata marca primero el 911."
      },
      {
        "q": "¿Dónde consulto las cifras oficiales del sismo: víctimas, magnitud y réplicas?",
        "a": "Para magnitud, epicentro y réplicas, consulta a FUNVISIS (funvisis.gob.ve) y, como referencia internacional, al USGS (usgs.gov). Para balances oficiales de víctimas, refugios y evacuaciones, remítete a Protección Civil. Las cifras cambian día a día durante el rescate, así que evita dar por definitivo cualquier número que circule por WhatsApp."
      },
      {
        "q": "¿Cómo decido si debo llamar o solo consultar información?",
        "a": "Si hay una emergencia que ocurre ahora (persona atrapada, fuego, fuga de gas, herido grave), llama al 911 o al 171. Si lo que quieres es entender qué pasó o qué puede venir (magnitud, réplicas, alertas), no satures las líneas de emergencia: consulta a FUNVISIS, USGS o Protección Civil. Reserva el teléfono de emergencias para salvar vidas."
      },
      {
        "q": "¿Dónde aprendo a detectar bulos y donar sin caer en estafas?",
        "a": "Este directorio reúne los canales oficiales, pero si quieres profundizar tenemos guías dedicadas: cómo detectar bulos del terremoto, cómo donar a Venezuela sin estafas y cómo verificar una wallet antes de enviar cripto. Como regla general, dona solo a organizaciones registradas por sus canales oficiales y pasa cualquier mensaje o dirección por el verificador de Confía antes de actuar."
      }
    ],
    "sources": [
      {
        "name": "FUNVISIS - Fundación Venezolana de Investigaciones Sismológicas",
        "url": "https://www.funvisis.gob.ve"
      },
      {
        "name": "USGS - United States Geological Survey",
        "url": "https://www.usgs.gov"
      },
      {
        "name": "Cruz Roja Venezolana",
        "url": "https://cruzroja.ve"
      },
      {
        "name": "Maldita.es - verificación de desinformación",
        "url": "https://maldita.es"
      },
      {
        "name": "Factchequeado - verificación en español",
        "url": "https://factchequeado.com"
      }
    ],
    "cta": "Antes de reenviar un mensaje o donar a una cuenta, verifícalo en Confía: pega el rumor o la dirección de la donación y descubre en segundos si es VERIFICADO, FALSO o SIN CONFIRMAR. Entra en https://confia-rose.vercel.app",
    "related": [
      "bulos-terremoto-venezuela-como-detectarlos",
      "donar-venezuela-sin-estafas",
      "que-hacer-replica-terremoto-seguridad"
    ],
    "updatedAt": "2026-06-27T00:00:00.000Z"
  },
  {
    "slug": "ayudar-venezuela-desde-el-exterior",
    "title": "Cómo ayudar a Venezuela desde el exterior tras el terremoto: guía segura para la diáspora",
    "metaTitle": "Ayudar a Venezuela desde el exterior: guía segura",
    "metaDescription": "Guía para la diáspora: cómo donar dinero, cripto e insumos a Venezuela tras el terremoto sin caer en estafas. Verifica cada wallet y campaña antes de enviar.",
    "keywords": [
      "cómo ayudar a Venezuela terremoto",
      "ayudar a Venezuela desde el exterior",
      "cómo ayudar a Venezuela desde España",
      "cómo donar a Venezuela terremoto sin caer en estafas",
      "donaciones terremoto Venezuela seguras",
      "donar cripto Venezuela terremoto",
      "estafas donaciones terremoto Venezuela",
      "enviar dinero a Venezuela desde el exterior",
      "estafa familiar atrapado terremoto",
      "ONG verificadas terremoto Venezuela",
      "Cruz Roja Venezolana donar terremoto",
      "localizar familiar Venezuela terremoto"
    ],
    "excerpt": "Si estás en la diáspora y quieres ayudar a Venezuela tras el terremoto del 24 de junio de 2026, esta guía te muestra cómo donar dinero, cripto e insumos de forma segura, reconocer las estafas dirigidas a venezolanos en el exterior y verificar cada campaña o wallet antes de enviar un solo bolívar.",
    "readingMinutes": 8,
    "sections": [
      {
        "heading": "Quieres ayudar desde lejos: empecemos por lo seguro",
        "paragraphs": [
          "Estás en Colombia, Argentina, España, Estados Unidos, Chile o donde la vida te haya llevado, y lo primero que sentiste al enterarte del terremoto del 24 de junio de 2026 fue la urgencia de hacer algo por los tuyos. Esa urgencia es valiosa, pero también es justo lo que aprovechan los estafadores. Ayudar bien empieza por ayudar con calma.",
          "Las cifras de víctimas, magnitud y daños han ido cambiando según los balances oficiales, así que no te guíes por números que circulan en cadenas. Para datos confirmados del sismo (epicentro en la zona de San Felipe y Yumare, en Yaracuy, las réplicas y las regiones afectadas) consulta a FUNVISIS (@SomosFunvisis) y al USGS; para el balance humano, a Protección Civil (@PCivil_Ve) y a la Cruz Roja Venezolana (@CruzRojaVe).",
          "La regla que recorre toda esta guía es simple: antes de enviar dinero, cripto o reenviar una campaña, verifícala. Un minuto de verificación pesa más que mil buenas intenciones."
        ]
      },
      {
        "heading": "Dónde donar desde el exterior: organizaciones reconocidas",
        "paragraphs": [
          "La forma más segura de ayudar desde la diáspora es a través de organizaciones legalmente registradas, con presencia en el terreno y rendición de cuentas. La Cruz Roja Venezolana (https://cruzroja.ve) trabaja en emergencias y además ofrece servicios de Restablecimiento del Contacto entre Familiares, clave si buscas a un ser querido a distancia.",
          "Algunas plataformas internacionales de donación con verificación de ONG también pueden ser una vía cómoda si pagas con tarjeta en el exterior, pero solo si confirmas que tienen una campaña activa y verificada específicamente para Venezuela. No des por hecho que una organización grande está recaudando para este terremoto: entra siempre escribiendo tú mismo la dirección web oficial y comprueba que la campaña existe, nunca por un enlace que te reenviaron.",
          "No avalamos aquí ninguna campaña ni cuenta puntual: los canales oficiales pueden cambiar y los dominios se suplantan. Confirma siempre en la web o en las redes verificadas de la propia organización antes de transferir."
        ]
      },
      {
        "heading": "Enviar dinero por transferencia: la regla de oro",
        "paragraphs": [
          "La Asociación Bancaria de Venezuela alertó, tras el sismo, sobre plataformas de recaudación de origen dudoso que se aprovechan de la emergencia. Su recomendación es clara: dona a cuentas institucionales de ONG y fundaciones formales, no a cuentas personales ni por Pago Móvil a desconocidos (salvo que sea un familiar directo a quien verificaste por voz).",
          "Recuerda que tu banco nunca te pedirá contraseñas, usuarios ni códigos OTP por teléfono, redes sociales o WhatsApp. Si alguien te los pide 'para procesar tu donación', es una estafa.",
          "Desconfía del método de pago como señal de alarma: si te exigen pagar sí o sí por cripto, tarjetas de regalo (gift cards), efectivo o una transferencia inmediata e irreversible, frena. La FTC y el FBI coinciden en que esa exigencia es, en sí misma, una bandera roja de fraude."
        ]
      },
      {
        "heading": "Donar en cripto sin perder tus fondos",
        "paragraphs": [
          "La cripto permite enviar ayuda rápida y sin fronteras, algo atractivo cuando estás lejos, pero las transacciones son irreversibles: si mandas a la dirección equivocada, no hay reverso. Por eso verificar la wallet antes de enviar no es opcional.",
          "Cuidado con el envenenamiento de direcciones (address poisoning): el estafador crea una billetera con los mismos primeros y últimos caracteres que la legítima y la cuela en tu historial con un envío mínimo, esperando que copies y pegues la falsa. Por eso nunca copies una dirección desde el historial de transacciones ni desde un chat reenviado, y compárala carácter por carácter, no solo el inicio y el final. Si quieres el detalle completo de este truco, lo desglosamos en nuestra guía de estafas cripto.",
          "Antes de donar, pega la dirección en el explorador oficial de la red correspondiente (por ejemplo tronscan.org para direcciones en red TRON) para ver su antigüedad, saldo e historial. Una wallet 'oficial' recién creada y sin movimientos es señal de alarma. Y si quieres un veredicto rápido y en español, pega la dirección en el verificador de Confía, que analiza la wallet on-chain por ti."
        ]
      },
      {
        "heading": "Enviar insumos: cuándo sí y cuándo mejor no",
        "paragraphs": [
          "Muchos en la diáspora quieren enviar agua, alimentos no perecederos, medicinas o ropa. El gesto es noble, pero el envío internacional de insumos suele ser lento, caro en aduana y a veces no coincide con lo que de verdad hace falta sobre el terreno.",
          "Si vas a aportar en especie, hazlo a través de campañas de organizaciones reconocidas que estén pidiendo artículos específicos y que indiquen puntos de acopio oficiales. No te guíes por 'puntos de acopio' que aparecen solo en una cadena de WhatsApp: confirma que existen en el canal oficial de la organización.",
          "En la mayoría de los casos, una donación de dinero a una ONG seria rinde más que un paquete: ellos compran lo necesario, a escala y cerca de la zona afectada, sin esperas de aduana."
        ]
      },
      {
        "heading": "Estafas dirigidas a la diáspora: cómo reconocerlas",
        "paragraphs": [
          "La distancia te hace un objetivo. La estafa del 'familiar atrapado' es la más cruel: alguien escribe por WhatsApp o SMS haciéndose pasar por un hijo, hermano o pariente herido o atrapado bajo escombros, y exige dinero urgente. Antes de enviar nada, verifica con una llamada de voz real a la persona o a otro familiar de confianza.",
          "También circulan supuestos bonos del Sistema Patria con nombres llamativos como 'bono de ayuda' o 'ayuda por el terremoto' que no existen en el calendario oficial y que piden tus datos o un pago para 'desbloquearlos'. No abras el enlace ni registres nada. Y muchas campañas falsas reciclan fotos y videos de otros países o de sismos anteriores (se han visto imágenes del terremoto de Turquía-Siria de 2023 o de Venezuela en 2018) o imágenes hechas con inteligencia artificial para dar credibilidad.",
          "La búsqueda inversa de imágenes ayuda a detectar fotos viejas o de otros países. Y ante cualquier urgencia emocional que te apure a pagar, respira: la prisa es la herramienta favorita del estafador."
        ]
      },
      {
        "heading": "Verifica antes de enviar: tu reflejo de oro",
        "paragraphs": [
          "Reúne todo en un solo hábito: antes de donar a una cuenta, una wallet o una campaña, y antes de reenviar un mensaje a tu grupo familiar, verifícalo. Confirma la organización en su web oficial, revisa la dirección cripto en el explorador oficial de su red y desconfía de cualquiera que te apure o te pida métodos de pago irreversibles.",
          "Confía te lo simplifica: pega el rumor o la dirección de criptomonedas que te llegó y obtén un veredicto (VERIFICADO, FALSO o SIN CONFIRMAR), con análisis on-chain de la wallet incluido. Es el paso que convierte tu buena intención en ayuda real.",
          "Tu aporte cuenta el doble cuando llega a manos correctas. Verifica, dona y luego comparte la información verificada con tu comunidad: así proteges a otros venezolanos en el exterior de caer en el mismo fraude."
        ]
      }
    ],
    "faq": [
      {
        "q": "¿Cómo puedo ayudar a Venezuela desde el exterior tras el terremoto?",
        "a": "La forma más segura desde la diáspora es donar dinero a organizaciones reconocidas y legalmente registradas, como la Cruz Roja Venezolana (https://cruzroja.ve), entrando siempre por su web oficial. Evita cuentas personales y campañas que solo viste en una cadena de WhatsApp, y verifica cada canal antes de enviar."
      },
      {
        "q": "¿Cómo ayudo desde España, Estados Unidos u otro país si no tengo cuenta bancaria en Venezuela?",
        "a": "Puedes donar con tarjeta a través de organizaciones internacionales o plataformas de donación con verificación de ONG, siempre que confirmes que tienen una campaña activa específicamente para Venezuela. La cripto es otra vía sin fronteras, pero verifica la wallet antes de enviar porque es irreversible. Escribe tú mismo la dirección web oficial; no entres por enlaces reenviados."
      },
      {
        "q": "¿Conviene más enviar dinero o insumos desde el exterior?",
        "a": "En la mayoría de los casos, el dinero a una ONG seria rinde más que un paquete: ellos compran lo necesario a escala y cerca de la zona, sin esperas de aduana. El envío internacional de insumos suele ser lento, caro y a veces no coincide con lo que de verdad hace falta. Si donas en especie, hazlo solo a través de campañas oficiales que pidan artículos específicos."
      },
      {
        "q": "¿Cómo localizo a un familiar en Venezuela después del terremoto?",
        "a": "La Cruz Roja Venezolana (@CruzRojaVe) ofrece el servicio de Restablecimiento del Contacto entre Familiares, pensado para casos como el tuyo. Apóyate también en los canales oficiales de emergencia y desconfía de cualquier mensaje que use a tu familiar como gancho para pedirte dinero antes de que puedas confirmar nada."
      },
      {
        "q": "¿Qué hago si un 'familiar atrapado' me pide dinero urgente por WhatsApp?",
        "a": "Es un patrón de estafa muy común contra la diáspora. No transfieras nada de inmediato: verifica con una llamada de voz real a esa persona o a otro familiar de confianza. Los estafadores se hacen pasar por parientes heridos o atrapados para presionarte a pagar rápido, y la prisa es su principal herramienta."
      }
    ],
    "sources": [
      {
        "name": "FUNVISIS - Fundación Venezolana de Investigaciones Sismológicas",
        "url": "https://www.funvisis.gob.ve"
      },
      {
        "name": "USGS - United States Geological Survey",
        "url": "https://www.usgs.gov"
      },
      {
        "name": "Cruz Roja Venezolana",
        "url": "https://cruzroja.ve"
      },
      {
        "name": "Asociación Bancaria de Venezuela (ABV)",
        "url": "https://www.asobanca.com.ve"
      },
      {
        "name": "FTC - Federal Trade Commission (donaciones tras desastres)",
        "url": "https://www.ftc.gov"
      },
      {
        "name": "FBI - Charity and Disaster Fraud",
        "url": "https://www.fbi.gov"
      },
      {
        "name": "TRONSCAN - Explorador oficial de la blockchain TRON",
        "url": "https://tronscan.org"
      },
      {
        "name": "Factchequeado - verificación de desinformación",
        "url": "https://factchequeado.com"
      }
    ],
    "cta": "Antes de donar a una wallet o reenviar una campaña, pégala en Confía y verifica en segundos si es real: https://confia-rose.vercel.app",
    "related": [
      "donar-venezuela-sin-estafas",
      "estafas-cripto-donacion-verificar-wallet",
      "canales-oficiales-emergencia-venezuela"
    ],
    "updatedAt": "2026-06-27T00:00:00.000Z"
  }
];

export function getAllArticles(): Article[] {
  return [...ARTICLES].sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
