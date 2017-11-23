import axios from 'axios';
import dotenv from 'dotenv';
import article from './article';
import getFlags from './flags';
import getOnwardJourney from './onward-journey';

export default async (environment = 'development') => {
  const d = await article(environment);
  const flags = await getFlags(environment);
  const onwardJourney = await getOnwardJourney(environment);

  dotenv.load({ silent: true });

  const topGraphics = (await axios(`https://api.keen.io/3.0/projects/56671212d2eaaa6dd6483dae/queries/count?api_key=${process.env.KEEN_KEY}&event_collection=cta%3Aclick&group_by=%5B%22context.imageuuid%22%2C%22page.location.pathname%22%5D&timezone=UTC&timeframe=this_14_days&filters=%5B%7B%22property_name%22%3A%22click.dataTrackablePath%22%2C%22operator%22%3A%22contains%22%2C%22property_value%22%3A%22component-share%22%7D%5D`)).data.result;

  const filteredTopGraphics = topGraphics.filter(n => n['context.imageuuid'] !== null)
    .sort((a, b) => b.result - a.result)
    .slice(0, 52);

  /*
  An experimental demo that gets content from the API
  and overwrites some model values. This requires the Link File
  to have been published. Also next-es-interface.ft.com probably
  isn't a reliable source. Also this has no way to prevent development
  values being seen in productions... use with care.

  try {
    const a = (await axios(`https://next-es-interface.ft.com/content/${d.id}`)).data;
    d.headline = a.title;
    d.byline = a.byline;
    d.summary = a.summaries[0];
    d.title = d.title || a.title;
    d.description = d.description || a.summaries[1] || a.summaries[0];
    d.publishedDate = new Date(a.publishedDate);
    f.comments = a.comments;
  } catch (e) {
    console.log('Error getting content from content API');
  }

  */

  return {
    ...d,
    flags,
    onwardJourney,
    filteredTopGraphics,
  };
};
