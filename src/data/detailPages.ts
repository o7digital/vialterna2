export type DetailPage = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  problemTitle?: string;
  problem?: string;
  sectionTitle: string;
  items: { title: string; text: string }[];
  benefits: string[];
};

export const solutionPages: DetailPage[] = [
  {
    slug: "edge",
    eyebrow: "Sitios distribuidos. Siempre activos.",
    title: "Conectividad resiliente para cada sitio de tu operación distribuida",
    description: "Construimos sobre tu conectividad actual, añadimos respaldo independiente y lo integramos con SuperWAN en una conexión siempre activa con failover automático.",
    problemTitle: "Cuando los sitios distribuidos se desconectan, tu negocio se detiene",
    problem: "Cajeros, sucursales, tiendas, franquicias y sitios remotos necesitan continuidad operativa. Un solo enlace por sitio y un failover manual son una vulnerabilidad aceptada, no una estrategia.",
    sectionTitle: "Resiliencia por capas, según la criticidad de cada sitio",
    items: [
      { title: "Infraestructura actual", text: "Conservamos lo que funciona sin cambiar IPs ni configuraciones existentes." },
      { title: "Respaldo independiente", text: "Añadimos LTE, 5G o Starlink LEO sobre infraestructura separada." },
      { title: "SuperWAN", text: "Integra los enlaces con bonding y failover automático en caliente." },
      { title: "Gestión 24/7", text: "Diseño por sitio, CPE en comodato, monitoreo NOC y ciclo de vida administrado." }
    ],
    benefits: ["Capa de resiliencia multinetwork", "Hasta 99.97% de disponibilidad por sitio", "Failover automático", "Piloto de 1 a 5 sitios", "Despliegue nacional"]
  },
  {
    slug: "core",
    eyebrow: "Managed SD-WAN y orquestación",
    title: "Una capa de gestión responsable sobre toda tu red",
    description: "Conservas tus proveedores. Nosotros orquestamos el tráfico, gobernamos los SLA y entregamos datos auditables por proveedor.",
    problemTitle: "Una red fragmentada sin un responsable único",
    problem: "Decenas o cientos de sitios, contratos y mesas de soporte crean complejidad, redundancia teórica y una operación basada en escalaciones.",
    sectionTitle: "Una capa administrada sobre toda la infraestructura",
    items: [
      { title: "Orquestación", text: "SD-WAN, ruteo por aplicación y failover inteligente entre tus redes actuales." },
      { title: "Responsabilidad única", text: "Gestionamos desempeño, incidentes y gobierno de SLA en toda la red." },
      { title: "Reportes auditables", text: "Datos mensuales por proveedor para exigir SLA y recuperar penalizaciones." },
      { title: "Diversidad real", text: "Verificamos separación física en los puntos críticos de agregación." }
    ],
    benefits: ["99.99% de SLA sobre la red", "Visibilidad centralizada", "Gobierno por proveedor", "Despliegue sin interrupciones"]
  },
  {
    slug: "telco-as-a-service",
    eyebrow: "La conectividad es una decisión de balance",
    title: "Auditamos, reestructuramos y gobernamos todo tu gasto Telco",
    description: "Mapeamos enlaces, contratos y costos para eliminar gasto redundante, corregir bajo desempeño y construir una mejor arquitectura.",
    problemTitle: "Nadie administra proactivamente tu stack Telco",
    problem: "Los contratos heredados, las fugas de SLA y los firewalls por sitio pueden ocultar sobrecostos significativos. La auditoría los cuantifica.",
    sectionTitle: "Strategic sourcing en cuatro fases",
    items: [
      { title: "Diagnóstico", text: "Inventario completo de enlaces, contratos, costos y SLA." },
      { title: "Benchmark y análisis", text: "Cuantificamos redundancias, bajo desempeño, fugas y consolidación." },
      { title: "Reestructuración", text: "Renegociación, sourcing y arquitectura financiada con ahorros." },
      { title: "Gobierno continuo", text: "Monitoreo permanente por proveedor para sostener el resultado." }
    ],
    benefits: ["15–30% menos gasto total típico", "Baseline financiero", "Plan de reestructuración", "Gobierno continuo"]
  },
  {
    slug: "iot-sim",
    eyebrow: "Dispositivos y máquinas, no sitios",
    title: "Conectividad administrada para flotas e IoT",
    description: "SIM y eSIM a escala mediante nuestro MVNO, monitoreo de consumo, optimización de planes, IMEI lock y sensores IoT.",
    problemTitle: "Tu flota crece. La gestión manual de SIM no",
    problem: "Las hojas de cálculo y portales aislados fallan cuando operas cientos o miles de terminales, sensores, cajeros o trackers.",
    sectionTitle: "Ciclo de vida SIM y sensores totalmente administrado",
    items: [
      { title: "SIM y eSIM a escala", text: "Aprovisionamiento masivo, activación remota y multioperador." },
      { title: "Monitoreo", text: "Alertas de consumo, anomalías y dispositivos silenciosos." },
      { title: "Optimización", text: "Planes alineados al consumo real de cada flota." },
      { title: "Sensores IoT", text: "Temperatura, presencia, presión, estado de equipos y ubicación." }
    ],
    benefits: ["Control centralizado", "Menos gasto de datos", "Seguridad IMEI", "Gestión completa del ciclo de vida"]
  }
];

export const industryPages: DetailPage[] = [
  {
    slug: "servicios-financieros", eyebrow: "Servicios financieros",
    title: "Servicios financieros: conectividad resiliente para cajeros, sucursales e infraestructura transaccional",
    description: "En servicios financieros, una interrupción de conectividad puede traducirse en transacciones perdidas, afectación al usuario y presión operativa.",
    sectionTitle: "Qué hace Vialterna",
    items: [
      { title: "Soluciones Edge para cajeros automáticos", text: "Arquitectura por sitio, CPE, SIMs celulares y respaldo." },
      { title: "Respaldo para sucursales bancarias", text: "Failover celular o satelital para mantener operación básica ante fallas." },
      { title: "Visibilidad y reportes", text: "Gestión de incidentes y visibilidad de desempeño." }
    ],
    benefits: ["Mayor disponibilidad para cajeros y sucursales", "Menor exposición a un solo operador", "Failover automático", "Supervisión de conectividad", "Reportes de desempeño"]
  },
  {
    slug: "retail-franquicias", eyebrow: "Retail y franquicias",
    title: "Retail y franquicias: conectividad resiliente para redes de tiendas",
    description: "Cada tienda desconectada puede significar ventas perdidas, procesos manuales, quejas de clientes y presión sobre el corporativo.",
    sectionTitle: "Qué hace Vialterna",
    items: [
      { title: "Gestión WAN", text: "Centralización de conectividad, desempeño y soporte." },
      { title: "Soluciones Edge para tiendas y POS", text: "Arquitectura de sitio con enlaces principales y respaldo." },
      { title: "Centros de distribución y hubs", text: "Conectividad para logística, inventario y coordinación operativa." }
    ],
    benefits: ["Menos ventas perdidas", "Mayor continuidad para POS", "Visibilidad centralizada", "Respaldo para tiendas críticas", "Supervisión de conectividad"]
  },
  {
    slug: "energia-industria", eyebrow: "Energía e industria",
    title: "Energía e industria: conectividad resiliente para sitios remotos y operación crítica",
    description: "Los sitios operativos remotos dependen de conectividad para telemetría, seguridad, sistemas industriales y control operativo.",
    sectionTitle: "Qué hace Vialterna",
    items: [
      { title: "Conectividad para sitios remotos", text: "Diseño de rutas y tecnologías disponibles por ubicación." },
      { title: "Arquitectura híbrida y satelital", text: "Combinación de enlaces terrestres, celulares y satelitales." },
      { title: "IoT / SIM para sensores", text: "Conectividad para telemetría, sensores y activos industriales." }
    ],
    benefits: ["Conectividad para sitios remotos", "Mayor visibilidad operativa", "Respaldo satelital o celular", "Conectividad IoT industrial", "Supervisión de conectividad"]
  },
  {
    slug: "infraestructura-pagos", eyebrow: "Infraestructura de pagos",
    title: "Infraestructura de pagos: conectividad administrada para terminales y procesamiento transaccional",
    description: "Las empresas de pagos necesitan administrar miles de SIMs, detectar terminales desconectadas, optimizar planes y proteger sitios de procesamiento.",
    sectionTitle: "Qué hace Vialterna",
    items: [
      { title: "Gestión de SIMs", text: "Aprovisionamiento, activación, control de consumo y optimización de planes." },
      { title: "Redundancia para procesamiento", text: "Arquitectura multioperador, diversidad de ruta y failover automático." },
      { title: "Reportes de desempeño", text: "Seguimiento proactivo, reportes de desempeño y atención a incidentes." }
    ],
    benefits: ["Gestión centralizada de SIMs", "Aprovisionamiento masivo", "Control de consumo", "Optimización de planes", "Redundancia para procesamiento", "Failover automático"]
  },
  {
    slug: "logistica-cadena-frio", eyebrow: "Logística y cadena de frío",
    title: "Logística y cadena de frío",
    description: "Conectividad resiliente para centros de distribución, cross docks, hubs de última milla y cámaras frías.",
    problemTitle: "Cuando un hub pierde conectividad, la cadena se detiene. Cuando el frío queda sin visibilidad, el inventario se pierde.",
    problem: "WMS, TMS, escáneres, despacho y refrigeración dependen de infraestructura siempre activa. Las fallas de red se convierten en retrasos, merma y riesgo operativo.",
    sectionTitle: "Casos de uso",
    items: [
      { title: "Hubs y almacenes → Edge", text: "SuperWAN y enlaces independientes mantienen WMS, TMS y despacho en línea." },
      { title: "Monitoreo de frío → IoT y SIM", text: "Sensores administrados reportan temperatura y estado de refrigeración de forma continua." },
      { title: "Despliegue de referencia", text: "Visibilidad centralizada y continuidad operativa a través de una red distribuida de almacenes." }
    ],
    benefits: ["Continuidad WMS/TMS", "Monitoreo de cadena de frío", "Conectividad desde el primer día"]
  }
];
