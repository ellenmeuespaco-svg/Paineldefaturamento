/*
 * Dados do TPS — Painel de Descarga.
 * Este arquivo é a ÚNICA coisa que precisa ser atualizada a cada novo print
 * recebido (ver README.md na raiz do projeto para o passo a passo diário).
 *
 * Convenção de "status" por dia em diarioPorMes[mes][i]:
 *   "realizado"     -> dia com operação e valores lançados
 *   "sem_operacao"  -> dia sem descarga (ex.: domingo/feriado) — informado no print
 *   "pendente"      -> dia ainda não ocorrido / print ainda não recebido
 */
window.PAINEL_DATA = window.PAINEL_DATA || {};

window.PAINEL_DATA.tps = {
  titulo: "PAINEL DE DESCARGA",
  contrato: "TPS",
  ano: 2026,
  mesAtual: "2026-09",
  atualizadoEm: "2026-09-15",

  mensal: {
    meses: [
      "JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO",
      "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO",
    ],
    desafio:   [220000, 164391, 104500, 183163, 163267, 106995, 58883, 93557, 121000, 0, 0, 0],
    plano:     [200852, 149446, 95000,  166512, 148424, 97268,  53530, 85052, 110000, 0, 0, 0],
    realizado: [190703, 144740, 117798, 137195, 158042, 101923, 68857, 102679, 69800, 0, 0, 0],
  },

  meta: { real: 69800, saldo: 40200, meta: 110000 },

  kpisTonelagem: {
    planoMedioDiario: 4940,
    realizadoMedioDiario: 5369,
    aderenciaPercent: 109,
    projecaoMensal: 85908,
  },

  kpisVagoes: {
    planoMedioDiario: 54,
    realizadoMedioDiario: 57,
    aderenciaPercent: 105,
    ritmoMedioVgHr: 4.4,
  },

  turno7as19: { tempoMedio: "07:14", vagoesMedio: 30.5 },
  turno19as7: { tempoMedio: "08:01", vagoesMedio: 36.4 },

  planoDiarioVolume: 4940,
  planoRecuperacaoMediaVolume: 5953,
  planoDiarioVagoes: 54,
  planoRecuperacaoMediaVagoes: 63,

  diarioPorMes: {
    "2026-09": [
      { dia: 1,  data: "1/9/2026",  status: "realizado",    volumeRealizado: 5534, vagoesRealizado: 61, vagoesHora: 4.69, horaVagoesHora: "13:00", vagoes7as19: 28, tempo7as19: "05:05", vagoes19as7: 33, tempo19as7: "07:55" },
      { dia: 2,  data: "2/9/2026",  status: "realizado",    volumeRealizado: 6334, vagoesRealizado: 64, vagoesHora: 3.90, horaVagoesHora: "16:25", vagoes7as19: 15, tempo7as19: "07:50", vagoes19as7: 49, tempo19as7: "08:35" },
      { dia: 3,  data: "3/9/2026",  status: "realizado",    volumeRealizado: 7054, vagoesRealizado: 75, vagoesHora: 4.46, horaVagoesHora: "16:50", vagoes7as19: 35, tempo7as19: "08:50", vagoes19as7: 40, tempo19as7: "08:00" },
      { dia: 4,  data: "4/9/2026",  status: "realizado",    volumeRealizado: 3490, vagoesRealizado: 35, vagoesHora: 4.72, horaVagoesHora: "7:25",  vagoes7as19: 35, tempo7as19: "07:25", vagoes19as7: 0,  tempo19as7: "00:00" },
      { dia: 5,  data: "5/9/2026",  status: "realizado",    volumeRealizado: 2813, vagoesRealizado: 33, vagoesHora: 3.86, horaVagoesHora: "8:33",  vagoes7as19: 0,  tempo7as19: "06:05", vagoes19as7: 33, tempo19as7: "08:33" },
      { dia: 6,  data: "6/9/2026",  status: "realizado",    volumeRealizado: 4821, vagoesRealizado: 51, vagoesHora: 3.62, horaVagoesHora: "14:05", vagoes7as19: 25, tempo7as19: "00:00", vagoes19as7: 26, tempo19as7: "00:00" },
      { dia: 7,  data: "7/9/2026",  status: "sem_operacao", volumeRealizado: null, vagoesRealizado: null, vagoesHora: null, horaVagoesHora: null, vagoes7as19: 0,  tempo7as19: "06:05", vagoes19as7: 0,  tempo19as7: "08:55" },
      { dia: 8,  data: "8/9/2026",  status: "sem_operacao", volumeRealizado: null, vagoesRealizado: null, vagoesHora: null, horaVagoesHora: null, vagoes7as19: 28, tempo7as19: "07:40", vagoes19as7: 36, tempo19as7: "06:55" },
      { dia: 9,  data: "9/9/2026",  status: "realizado",    volumeRealizado: 6209, vagoesRealizado: 64, vagoesHora: 3.86, horaVagoesHora: "16:35", vagoes7as19: 27, tempo7as19: "06:10", vagoes19as7: 29, tempo19as7: "08:47" },
      { dia: 10, data: "10/9/2026", status: "realizado",    volumeRealizado: 5158, vagoesRealizado: 56, vagoesHora: 4.28, horaVagoesHora: "13:05", vagoes7as19: 30, tempo7as19: "06:05", vagoes19as7: 42, tempo19as7: "00:00" },
      { dia: 11, data: "11/9/2026", status: "realizado",    volumeRealizado: 6757, vagoesRealizado: 72, vagoesHora: 4.84, horaVagoesHora: "14:52", vagoes7as19: 45, tempo7as19: "09:15", vagoes19as7: 0,  tempo19as7: "06:20" },
      { dia: 12, data: "12/9/2026", status: "realizado",    volumeRealizado: 4461, vagoesRealizado: 45, vagoesHora: 4.86, horaVagoesHora: "9:15",  vagoes7as19: 0,  tempo7as19: "00:00", vagoes19as7: 25, tempo19as7: "08:05" },
      { dia: 13, data: "13/9/2026", status: "realizado",    volumeRealizado: 2488, vagoesRealizado: 25, vagoesHora: 3.95, horaVagoesHora: "6:20",  vagoes7as19: 28, tempo7as19: "07:40", vagoes19as7: 39, tempo19as7: "08:10" },
      { dia: 14, data: "14/9/2026", status: "realizado",    volumeRealizado: 6587, vagoesRealizado: 67, vagoesHora: 4.44, horaVagoesHora: "15:05", vagoes7as19: 39, tempo7as19: "08:15", vagoes19as7: 48, tempo19as7: "00:00" },
      { dia: 15, data: "15/9/2026", status: "realizado",    volumeRealizado: 8095, vagoesRealizado: 87, vagoesHora: 5.30, horaVagoesHora: "16:25", vagoes7as19: 0,  tempo7as19: "00:00", vagoes19as7: 0,  tempo19as7: "00:00" },
      { dia: 16, data: "16/9/2026", status: "pendente",     volumeRealizado: null, vagoesRealizado: null, vagoesHora: null, horaVagoesHora: null, vagoes7as19: 0, tempo7as19: "00:00", vagoes19as7: 0, tempo19as7: "00:00" },
      { dia: 17, data: "17/9/2026", status: "pendente",     volumeRealizado: null, vagoesRealizado: null, vagoesHora: null, horaVagoesHora: null, vagoes7as19: 0, tempo7as19: "00:00", vagoes19as7: 0, tempo19as7: "00:00" },
      { dia: 18, data: "18/9/2026", status: "pendente",     volumeRealizado: null, vagoesRealizado: null, vagoesHora: null, horaVagoesHora: null, vagoes7as19: 0, tempo7as19: "00:00", vagoes19as7: 0, tempo19as7: "00:00" },
      { dia: 19, data: "19/9/2026", status: "pendente",     volumeRealizado: null, vagoesRealizado: null, vagoesHora: null, horaVagoesHora: null, vagoes7as19: 0, tempo7as19: "00:00", vagoes19as7: 0, tempo19as7: "00:00" },
      { dia: 20, data: "20/9/2026", status: "pendente",     volumeRealizado: null, vagoesRealizado: null, vagoesHora: null, horaVagoesHora: null, vagoes7as19: 0, tempo7as19: "00:00", vagoes19as7: 0, tempo19as7: "00:00" },
      { dia: 21, data: "21/9/2026", status: "pendente",     volumeRealizado: null, vagoesRealizado: null, vagoesHora: null, horaVagoesHora: null, vagoes7as19: 0, tempo7as19: "00:00", vagoes19as7: 0, tempo19as7: "00:00" },
      { dia: 22, data: "22/9/2026", status: "pendente",     volumeRealizado: null, vagoesRealizado: null, vagoesHora: null, horaVagoesHora: null, vagoes7as19: 0, tempo7as19: "00:00", vagoes19as7: 0, tempo19as7: "00:00" },
      { dia: 23, data: "23/9/2026", status: "pendente",     volumeRealizado: null, vagoesRealizado: null, vagoesHora: null, horaVagoesHora: null, vagoes7as19: 0, tempo7as19: "00:00", vagoes19as7: 0, tempo19as7: "00:00" },
      { dia: 24, data: "24/9/2026", status: "pendente",     volumeRealizado: null, vagoesRealizado: null, vagoesHora: null, horaVagoesHora: null, vagoes7as19: 0, tempo7as19: "00:00", vagoes19as7: 0, tempo19as7: "00:00" },
      { dia: 25, data: "25/9/2026", status: "pendente",     volumeRealizado: null, vagoesRealizado: null, vagoesHora: null, horaVagoesHora: null, vagoes7as19: 0, tempo7as19: "00:00", vagoes19as7: 0, tempo19as7: "00:00" },
      { dia: 26, data: "26/9/2026", status: "pendente",     volumeRealizado: null, vagoesRealizado: null, vagoesHora: null, horaVagoesHora: null, vagoes7as19: 0, tempo7as19: "00:00", vagoes19as7: 0, tempo19as7: "00:00" },
      { dia: 27, data: "27/9/2026", status: "pendente",     volumeRealizado: null, vagoesRealizado: null, vagoesHora: null, horaVagoesHora: null, vagoes7as19: 0, tempo7as19: "00:00", vagoes19as7: 0, tempo19as7: "00:00" },
      { dia: 28, data: "28/9/2026", status: "pendente",     volumeRealizado: null, vagoesRealizado: null, vagoesHora: null, horaVagoesHora: null, vagoes7as19: 0, tempo7as19: "00:00", vagoes19as7: 0, tempo19as7: "00:00" },
      { dia: 29, data: "29/9/2026", status: "pendente",     volumeRealizado: null, vagoesRealizado: null, vagoesHora: null, horaVagoesHora: null, vagoes7as19: 0, tempo7as19: "00:00", vagoes19as7: 0, tempo19as7: "00:00" },
      { dia: 30, data: "30/9/2026", status: "pendente",     volumeRealizado: null, vagoesRealizado: null, vagoesHora: null, horaVagoesHora: null, vagoes7as19: 0, tempo7as19: "00:00", vagoes19as7: 0, tempo19as7: "00:00" },
      { dia: 31, data: "31/9/2026", status: "pendente",     volumeRealizado: null, vagoesRealizado: null, vagoesHora: null, horaVagoesHora: null, vagoes7as19: 0, tempo7as19: "00:00", vagoes19as7: 0, tempo19as7: "00:00" },
    ],
  },
};
