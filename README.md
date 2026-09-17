# Painel de Faturamento

Sistema de painéis em HTML alimentado pelos prints diários da planilha de descarga.
Não depende de internet nem de build — abra os arquivos `.html` direto no navegador.

## Estrutura

```
index.html              -> Painel Gerencial (cartão por site/contrato)
paineis/tps.html         -> Painel de Descarga detalhado do contrato TPS
data/gerencial.js        -> dados dos cartões do painel gerencial
data/tps.js              -> dados diários/mensais do TPS
assets/dashboard.css     -> estilo compartilhado
assets/charts.js         -> gráficos (SVG puro, sem lib externa)
```

Cada site/contrato (TPS, LOM 1, LOM 2, Arme Rio, Central de Resíduo) é um cartão
no Painel Gerencial. Hoje só o **TPS** tem painel próprio; os demais aparecem como
"aguardando dados" no mesmo formato de cartão, prontos para receber um painel
(`paineis/<site>.html` + `data/<site>.js`) assim que os prints daquele site
começarem a chegar.

## Rotina diária (o que fazer a cada novo print)

Você recebe o print da planilha por volta das **7h** e das **19h**. A cada novo
print enviado nesta conversa:

1. Abra `data/tps.js` (ou o arquivo do site correspondente).
2. Localize o dia em `diarioPorMes["2026-09"]` (ou crie o mês seguinte quando
   virar o mês).
3. Preencha os campos daquele dia com os valores do print:
   - `volumeRealizado`, `vagoesRealizado`, `vagoesHora`, `horaVagoesHora`
   - `vagoes7as19` / `tempo7as19` e `vagoes19as7` / `tempo19as7`
   - troque `status` de `"pendente"` para `"realizado"`
4. **Se não houve operação naquele dia**, marque `status: "sem_operacao"` e deixe
   os valores como `null` — o painel mostra o dia em branco sem quebrar o gráfico
   (é o mesmo tratamento usado nos dias 7 e 8/set no print original).
5. Atualize os totais do topo (`mensal.realizado` do mês corrente, `meta`,
   `kpisTonelagem`, `kpisVagoes`, `turno7as19`, `turno19as7`) com os números que
   aparecem nos cartões cinza/amarelo e no medidor do print mais recente — eles
   já vêm acumulados/atualizados no próprio print.
6. Atualize `atualizadoEm` com a data do print.
7. Se o resultado muda os números-resumo do cartão no gerencial (aderência,
   projeção), atualize também `data/gerencial.js` → `resumo` do cartão `tps`.

Quando o mês virar, crie uma nova chave em `diarioPorMes` (ex.: `"2026-10"`),
atualize `mesAtual` e preencha `mensal.desafio/plano/realizado` do novo mês.

## Adicionando um novo site (LOM 1, LOM 2, Arme Rio, Central de Resíduo)

1. Copie `data/tps.js` para `data/<site>.js`, ajustando `window.PAINEL_DATA.<site>`.
2. Copie `paineis/tps.html` para `paineis/<site>.html`, trocando as referências
   de `tps` pelo novo id.
3. Em `data/gerencial.js`, mude o cartão do site de `status: "aguardando_dados"`
   para `status: "ativo"`, preencha `link` e `resumo`.
