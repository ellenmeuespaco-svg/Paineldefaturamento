/*
 * Cartões do Painel Gerencial.
 * Cada site/contrato é um cartão no mesmo formato. Sites sem painel próprio
 * ainda ficam com status "aguardando_dados" e aparecem "vazios" até que um
 * painel (como o do TPS) seja construído e ligado aqui via `link` + `resumo`.
 */
window.PAINEL_DATA = window.PAINEL_DATA || {};

window.PAINEL_DATA.gerencial = {
  atualizadoEm: "2026-09-15",
  cartoes: [
    {
      id: "tps",
      nome: "TPS",
      subtitulo: "Painel de Descarga",
      status: "ativo",
      link: "paineis/tps.html",
      resumo: {
        metrica1: { valor: "109%", label: "Aderência ao plano" },
        metrica2: { valor: "85.908", label: "Projeção mensal (t)" },
      },
    },
    {
      id: "lom1",
      nome: "LOM 1",
      subtitulo: "Painel de Descarga",
      status: "aguardando_dados",
      link: null,
      resumo: null,
    },
    {
      id: "lom2",
      nome: "LOM 2",
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
