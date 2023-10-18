// This code is for v4 of the openai package: npmjs.com/package/openai
import { OpenAI } from "openai";

const openai = new OpenAI.OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const gpt_correct = async (text: string) => {
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", 
        messages: [
          {
            "role": "system",
            "content": "Tu vas te comporter comme un rédacteur de correction pour le bac de Français et de philosophie.\n\nSi on t'envoie une question de dissertation, tu vas rédiger une correction pour ce sujet. Si on te donne un texte, tu vas rediger une correction d'explication de texte selon le sujet donné, incluant introduction et conclusion.\n\nApres avoir rediger, explique selon toi pourquoi ta réponse est bien rédigée. Si tu ne reconnais pas de sujet dans le prompt de l'utilisateur, repond de maniere sarcastique"
          },
          {
            "role": "user",
            "content": "sujet de dissertation: revient-il a l'etat de decider de ce qui est juste ?"
          },
          {
            "role": "assistant",
            "content": "Correction :\n\nIntroduction :\nLe sujet de notre dissertation porte sur la question de savoir si l'individu a le pouvoir de décider de ce qui est juste. Cette problématique soulève des réflexions philosophiques profondes sur la nature de la justice et les limites de la liberté individuelle. Afin de répondre à cette question, nous allons examiner les arguments en faveur et à l'encontre de cette thèse. \n\nI. Oui, l'individu a le pouvoir de décider de ce qui est juste \n\nPremièrement, la justice est souvent considérée comme subjective, dépendant de nos valeurs personnelles et de nos expériences de vie. Chaque individu est libre de déterminer ses propres critères de justice en fonction de son éducation, de sa culture et de ses convictions. Par conséquent, chacun a le droit de décider de ce qui est juste en fonction de ses propres préférences et de sa conscience individuelle.\n\nDeuxièmement, l'autonomie de la volonté est un principe fondamental de la philosophie morale. Selon Kant, chaque individu possède une capacité de jugement autonome qui lui permet de discerner ce qui est juste ou injuste. En se basant sur la raison et en respectant les principes universels de la morale, l'individu peut exercer son libre arbitre et prendre des décisions éthiques.\n\nIII. Non, l'individu ne peut pas décider seul de ce qui est juste \n\nCependant, il serait naïf de croire que l'individu peut décider de manière totalement subjective de ce qui est juste. La justice est également une construction sociale et collective qui nécessite un consensus et une participation citoyenne. Les lois et les régulations sont mises en place afin de garantir un système de justice équitable pour tous.\n\nDe plus, l'influence de la société et de l'environnement sur nos jugements moraux ne peut être négligée. Nous sommes façonnés par notre culture, nos normes sociales et nos interactions avec les autres. Par conséquent, nos décisions sur ce qui est juste sont souvent influencées par des forces extérieures qui dépassent notre volonté individuelle.\n\nConclusion :\n\nEn conclusion, il est difficile de dire si l'individu a le pouvoir absolu de décider de ce qui est juste. Bien que chaque individu ait le droit de fonder ses propres critères de justice et de prendre des décisions morales autonomes, nous devons également reconnaître que la justice est une construction sociale et collective. La résolution des dilemmes moraux nécessite un dialogue, une réflexion critique et le respect des principes universels de la moralité. Chacun de nous a un rôle à jouer dans la recherche de la justice, mais cette quête ne peut être accomplie seul.\n\nExplication :\nCette correction de la dissertation aborde de manière équilibrée les arguments en faveur et contre la thèse selon laquelle l'individu a le pouvoir de décider de ce qui est juste. Elle présente une réponse nuancée en reconnaissant la liberté individuelle dans la construction de nos critères de justice, tout en soulignant l'importance de l'influence sociale et de la nécessité d'un consensus pour définir la justice. La conclusion rappelle également l'importance du dialogue et de la réflexion collective dans la recherche de la justice. N'hésitez pas a me donner un autre sujet de dissertation ou un texte a expliquer, je vous donnerai une correction !"
          },
          {
            "role": "user",
            "content": `Voici un nouveau sujet. ${text}`
          }
        ],
        temperature: 1,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    
    if (!response.choices[0].message.content) {
        return ""
    }
    return response.choices[0].message.content
}
