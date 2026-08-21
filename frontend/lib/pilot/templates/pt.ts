import type { PilotTemplateModule } from "./types";

/** Portuguese adaptation of the Pilot Agreement Standard Terms - see en.ts for the source note. */
const STANDARD_TERMS_TEMPLATE = `1. **Acesso Piloto**. Durante o Período Piloto e sujeito aos termos deste Acordo, o Cliente pode aceder e utilizar o Produto, e qualquer Software incluído, exclusivamente para {{EVALUATION_PURPOSE}}. O Cliente é responsável por todas as ações realizadas nas contas dos seus Utilizadores e pelo cumprimento deste Acordo por parte destes. O Cliente pode fornecer Comentários ao Fornecedor, que este pode utilizar livremente, e o Fornecedor pode recolher e analisar Dados de Utilização agregados para manter, melhorar e promover os seus produtos e serviços. Salvo se expressamente permitido por este Acordo, o Cliente não fará engenharia inversa, revenda ou sublicenciamento do Produto, não removerá avisos de propriedade e não o utilizará para desenvolver um produto concorrente. Exceto por esta licença limitada, o Fornecedor conserva todos os direitos, título e interesse sobre o Produto, e o Cliente conserva todos os direitos, título e interesse sobre o seu Conteúdo.

2. **Vigência e Rescisão**. Este Acordo entra em vigor em {{EFFECTIVE_DATE}} e, salvo rescisão antecipada, mantém-se por {{PILOT_PERIOD}}. Qualquer das partes pode rescindir imediatamente se a outra parte não sanar um incumprimento substancial no prazo de 30 dias após a notificação, se tornar insolvente, ou mediante aviso prévio de 30 dias, por qualquer motivo. Após a expiração ou rescisão: o Cliente deixará de utilizar o Produto e, se aplicável, desinstalará qualquer Software; o Fornecedor eliminará o Conteúdo do Cliente no prazo de 60 dias após o pedido; e cada parte devolverá ou destruirá as Informações Confidenciais da outra em sua posse.

3. **Declarações**. Cada parte declara à outra que tem poder legal para celebrar este Acordo e que está devidamente constituída e em situação regular nos termos da legislação aplicável da sua jurisdição de origem.

4. **Exclusão de Garantias**. O Fornecedor não garante que o Produto estará sempre livre de interrupções ou erros. **O Produto é fornecido "TAL COMO ESTÁ" e "CONFORME DISPONÍVEL", e o Fornecedor exclui todas as garantias e condições, expressas ou implícitas, incluindo as garantias implícitas de comercialização, adequação a um fim específico e não violação, na máxima medida permitida pela legislação aplicável.**

5. **Limitação de Responsabilidade**. **Exceto em caso de violação da Secção 6 (Confidencialidade), a responsabilidade cumulativa total de cada parte por todas as reclamações decorrentes deste Acordo não excederá {{GENERAL_CAP_AMOUNT}}, e em nenhuma circunstância qualquer das partes será responsável perante a outra por lucros cessantes ou por danos consequenciais, especiais, indiretos, exemplares, punitivos ou incidentais, mesmo que tenha sido informada da possibilidade de tais danos.** Estas limitações aplicam-se a toda a responsabilidade, seja em responsabilidade civil extracontratual, contratual ou outra, salvo na medida proibida pela legislação aplicável.

6. **Confidencialidade**. Exceto quando necessário para a execução deste Acordo, a parte que receber Informações Confidenciais da outra não as utilizará nem divulgará, e protegê-las-á com pelo menos o mesmo cuidado que aplica às suas próprias informações semelhantes. Estas obrigações não se aplicam a informações que sejam ou se tornem públicas, que já fossem conhecidas sem restrições, ou desenvolvidas de forma independente sem referência às Informações Confidenciais, podendo uma parte divulgar Informações Confidenciais na medida exigida por lei, após aviso prévio razoável sempre que legalmente permitido.

7. **Lei Aplicável e Tribunais Escolhidos**. Este Acordo e todas as questões a ele relacionadas regem-se e são interpretados de acordo com as leis de {{GOVERNING_LAW}}, sem consideração das respetivas normas de conflito de leis. Qualquer ação judicial relacionada com este Acordo deve ser instaurada nos tribunais de {{JURISDICTION}}, à cuja jurisdição exclusiva cada parte se submete irrevogavelmente. Uma violação da Secção 6 (Confidencialidade) pode causar dano irreparável, podendo a parte não infratora solicitar medidas cautelares, além dos demais recursos disponíveis.

8. **Disposições Gerais**. Este Acordo constitui a totalidade do acordo entre as partes quanto ao seu objeto e substitui todas as discussões anteriores. Qualquer alteração, renúncia ou aditamento deve ser feito por escrito e assinado por ambas as partes, e se alguma disposição for considerada inexequível, o restante do Acordo permanece em vigor. Nenhuma das partes poderá ceder este Acordo sem o consentimento prévio por escrito da outra, exceto em caso de fusão, reorganização ou venda da totalidade ou da quase totalidade dos seus ativos. As partes são contratantes independentes, e nenhuma delas será responsável por um atraso causado por um Evento de Força Maior. Este Acordo pode ser assinado em várias vias, incluindo eletronicamente, considerando-se cada uma delas um original.

Adaptado do Common Paper Pilot Agreement [Standard Terms Version 1.1](https://commonpaper.com/standards/pilot-agreement/1.1), de livre utilização ao abrigo da licença [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
`;

function pluralMonths(n: number): string {
  return `${n} ${n === 1 ? "mês" : "meses"}`;
}

function describePilotPeriod(months: number): string {
  return `${pluralMonths(months)} a partir da Data de Vigência`;
}

export const pt: PilotTemplateModule = {
  STANDARD_TERMS_TEMPLATE,
  describePilotPeriod,
};
