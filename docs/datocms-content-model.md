# DatoCMS content model

The site reads editable content from one `SitePage` model and keeps local fallbacks when DatoCMS is not configured.

## Environment

- `DATOCMS_API_TOKEN`: read-only DatoCMS API token.
- `DATOCMS_ENVIRONMENT`: optional DatoCMS environment name.

## Model: SitePage

Create one record per editable route/area.

Fields:

- `pageId` single-line string, unique.
- `seoTitle` single-line string.
- `seoDescription` multi-line text.
- `eyebrow` single-line string.
- `heading` single-line string.
- `intro` multi-line text.
- `ctaLabel` single-line string.
- `ctaHref` single-line string.
- `secondaryCtaLabel` single-line string.
- `secondaryCtaHref` single-line string.
- `sections` JSON field.

## Required records

- `home`: homepage hero and homepage sections.
- `empresa`: Spanish company page.
- `noticias`: Spanish news/blog index page.
- `faq`: Spanish FAQ page.
- `contacto`: Spanish contact page.
- `edge`, `core`, `telco-as-a-service`, `iot-sim`: solution detail pages.
- `servicios-financieros`, `retail-franquicias`, `energia-industria`, `infraestructura-pagos`, `logistica-cadena-frio`: industry detail pages.

English pages use the same `pageId` values with DatoCMS locale `en`.

## Home sections JSON

The `home.sections` field controls every homepage section. Use `key` for structure and keep `title` as the visible editable title.

Supported section keys:

- `risk`
- `pillars`
- `phases`
- `solutions`
- `architecture`
- `industries`
- `contact`

Example:

```json
[
  {
    "key": "risk",
    "eyebrow": "El riesgo operativo",
    "title": "La conectividad no es un servicio básico. | Es un riesgo operativo.",
    "intro": "Cuando uno de tus sitios se desconecta, los ingresos se detienen. Las transacciones fallan. Tus equipos regresan a procesos manuales.",
    "text": "El tiempo de inactividad impacta directamente tu P&L. La mayoría de las empresas nunca lo han cuantificado.",
    "items": [
      {
        "title": "SD-WAN sobre una sola red",
        "text": "El tráfico se gestiona, pero la red subyacente sigue siendo un punto único de falla."
      },
      {
        "title": "Internet básico sin capa administrada",
        "text": "Sin SLA, monitoreo ni failover, el downtime se absorbe silenciosamente."
      }
    ]
  },
  {
    "key": "pillars",
    "eyebrow": "El modelo Vialterna",
    "title": "No vendemos conectividad. Diseñamos uptime.",
    "intro": "Vialterna es el socio de infraestructura independiente de red y tecnología para empresas distribuidas en México.",
    "text": "Tres pilares sustentan el servicio.",
    "items": [
      { "title": "Siempre activos por diseño", "text": "Arquitectura multirred para eliminar puntos únicos de falla." },
      { "title": "Gestión proactiva 24/7", "text": "NOC, monitoreo, alertas y resolución antes de que el sitio se detenga." },
      { "title": "Telco as a Service", "text": "Auditoría, gobierno y optimización continua del gasto Telco." }
    ]
  },
  {
    "key": "phases",
    "eyebrow": "Implementación",
    "title": "Una plataforma. Un solo modelo de interacción. Cuatro fases.",
    "items": [
      { "title": "Entrada", "text": "Diagnóstico del estado actual o problema específico." },
      { "title": "Diseño", "text": "Arquitectura por sitio con la combinación óptima de tecnologías." },
      { "title": "Despliegue", "text": "Coordinación de hardware, operadores y activación." },
      { "title": "Gestión y expansión", "text": "Optimización continua y escalamiento." }
    ]
  },
  {
    "key": "solutions",
    "eyebrow": "Soluciones",
    "title": "Soluciones",
    "intro": "Intro de soluciones.",
    "items": [
      {
        "eyebrow": "Edge · SuperWAN",
        "title": "Edge",
        "text": "Descripción.",
        "href": "/soluciones/edge/",
        "type": "rings",
        "label": "Endpoint / Failover / Monitoreo"
      }
    ]
  },
  {
    "key": "architecture",
    "eyebrow": "Arquitectura",
    "title": "SD-WAN y conectividad de respaldo.",
    "intro": "Redes SD-WAN multioperador para continuidad del negocio.",
    "items": [
      { "title": "SD-WAN", "text": "Fibra, LTE, 5G, satélite y enlaces inalámbricos con failover automático." },
      { "title": "Conectividad de respaldo", "text": "Capas de redundancia para mantener activos sitios críticos." }
    ]
  },
  {
    "key": "industries",
    "eyebrow": "Industrias",
    "title": "Construido para operaciones distribuidas donde el tiempo de inactividad tiene precio.",
    "items": [
      { "title": "Servicios financieros", "text": "Cajeros, sucursales, terminales y procesamiento transaccional.", "href": "/industrias/servicios-financieros/" },
      { "title": "Retail y franquicias", "text": "Tiendas, POS, inventarios, pedidos en línea y centros de distribución.", "href": "/industrias/retail-franquicias/" }
    ]
  },
  {
    "key": "contact",
    "eyebrow": "Diagnóstico",
    "title": "Empieza con una auditoría Telco.",
    "intro": "Analizamos contratos, gasto, infraestructura y SLA para construir un caso TCO y una arquitectura específica."
  }
]
```

For the homepage hero heading, use `|` to mark the accented part:

```text
Las redes se caen. | Tu negocio no.
```

## Internal page sections JSON

For `empresa`, `contacto`, solution pages, and industry pages:

```json
[
  {
    "key": "problem",
    "eyebrow": "Riesgo operativo",
    "title": "Section title",
    "text": "Section body"
  },
  {
    "key": "includes",
    "eyebrow": "Gestión administrada",
    "title": "What is included",
    "items": [
      { "title": "Item title", "text": "Item body" }
    ]
  },
  {
    "key": "benefits",
    "eyebrow": "Beneficios",
    "title": "Benefits",
    "items": [
      { "title": "Benefit one" },
      { "title": "Benefit two" }
    ]
  }
]
```

## Menu pages

Use these `pageId` values for the menu:

- `home`: homepage sections.
- `edge`, `core`, `telco-as-a-service`, `iot-sim`: pages shown from Soluciones.
- `servicios-financieros`, `retail-franquicias`, `energia-industria`, `infraestructura-pagos`, `logistica-cadena-frio`: pages shown from Industrias.
- `empresa`: Empresa page.
- `noticias`: Noticias index hero/SEO.
- `contacto`: Contacto page.

For FAQ records, each section is one question:

```json
[
  { "title": "¿Qué hace Vialterna?", "text": "Respuesta." }
]
```
