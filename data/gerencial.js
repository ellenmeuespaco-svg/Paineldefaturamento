/*
 * Cartões do Painel Gerencial.
 * Cada site/contrato é um cartão no mesmo formato. Sites sem painel próprio
 * ainda ficam com status "aguardando_dados" e aparecem "vazios" até que um
 * painel (como o do TPS) seja construído e ligado aqui via `link` + `resumo`.
 */
window.PAINEL_DATA = window.PAINEL_DATA || {};

window.PAINEL_DATA.gerencial = {
  atualizadoEm: "2026-09-16",
  cartoes: [
    {
      id: "tps",
      nome: "TPS",
      subtitulo: "Painel de Descarga",
      status: "ativo",
      link: "paineis/tps.html",
      resumo: {
        metrica1: { valor: "105%", label: "Aderência ao plano" },
        metrica2: { valor: "83.095", label: "Projeção mensal (t)" },
      },
    },
    {
      id: "lon-i",
      nome: "LON I",
      subtitulo: "Painel de Descarga",
      status: "aguardando_dados",
      link: null,
      resumo: null,
    },
    {
      id: "lon-ii",
      nome: "LON II",
      subtitulo: "Painel de Descarga",
      status: "aguardando_dados",
      link: null,
      resumo: null,
    },
    {
      id: "arme-rio",
      nome: "Arme Rio",
      subtitulo: "Painel de Descarga",
      status: "aguardando_dados",
      link: null,
      resumo: null,
    },
    {
      id: "central-residuo",
      nome: "Central de Resíduo",
      subtitulo: "Painel de Descarga",
      status: "aguardando_dados",
      link: null,
      resumo: null,
    },
  ],
};
